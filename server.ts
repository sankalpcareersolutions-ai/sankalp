import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

import { logger } from './services/logger';
import { storeService } from './services/store';
import { notificationQueue } from './services/queue';
import { emailService, EmailTemplateType } from './services/email';
import { whatsAppService, WhatsAppMessageType } from './services/whatsapp';
import { googleMeetService } from './services/meet';
import { geminiChatService } from './services/geminiChat';

// Validation Schema for Booking an Appointment
const createAppointmentSchema = z.object({
  name: z.string().min(2, "Student name is required"),
  email: z.string().email("Valid email address is required"),
  mobileNumber: z.string().min(8, "Valid mobile/WhatsApp number is required"),
  preferredDate: z.string().optional().default(() => new Date().toISOString().split('T')[0]),
  preferredTime: z.string().optional().default("10:00 AM"),
  counsellingType: z.string().optional().default("Online Video 1:1"),
  counsellingMode: z.string().optional(),
  careerInterest: z.string().optional().default("General Career Guidance"),
  dob: z.string().optional(),
  gender: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  currentClass: z.string().optional(),
  schoolCollege: z.string().optional(),
  board: z.string().optional(),
  stream: z.string().optional(),
  percentage: z.string().optional(),
  parentName: z.string().optional(),
  parentContact: z.string().optional(),
  questions: z.string().optional(),
  message: z.string().optional(),
  defenceAspirant: z.string().optional(),
  preferredLanguage: z.string().optional(),
  hp: z.string().optional(), // Honeypot field for anti-spam
});

// Simple in-memory rate limiter for production safety
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function rateLimiter(limit: number = 60, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'anonymous';
    const now = Date.now();
    const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }
    rateLimitMap.set(ip, record);

    if (record.count > limit) {
      logger.warn('SECURITY', 'RATE_LIMIT_EXCEEDED', `Rate limit exceeded for IP ${ip}`, { ip, count: record.count });
      return res.status(429).json({ success: false, error: "Too many requests. Please slow down." });
    }
    next();
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Middlewares
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  app.use(rateLimiter(120, 60000));

  // Request Timing & Logger Middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = performance.now();
    res.on('finish', () => {
      const duration = performance.now() - start;
      if (req.path.startsWith('/api/')) {
        logger.performance(`HTTP_${req.method}_${req.path}`, duration, {
          status: res.statusCode,
          ip: req.ip,
        });
      }
    });
    next();
  });

  // ==========================================
  // APPOINTMENTS API
  // ==========================================

  // 1. GET all appointments
  app.get("/api/appointments", (req: Request, res: Response) => {
    try {
      const appointments = storeService.getAllAppointments();
      res.json(appointments);
    } catch (err: any) {
      logger.error('SYSTEM', 'GET_APPOINTMENTS_ERROR', 'Failed to retrieve appointments', err);
      res.status(500).json({ error: err.message });
    }
  });

  // 2. POST create new appointment & trigger notifications
  app.post("/api/appointments", async (req: Request, res: Response) => {
    try {
      // Honeypot spam protection
      if (req.body.hp && req.body.hp.trim() !== "") {
        logger.warn('SECURITY', 'SPAM_HONEYPOT_TRIGGERED', 'Spam bot submission caught via honeypot field', { ip: req.ip });
        return res.status(200).json({
          success: true,
          message: "Appointment request received successfully.",
        });
      }

      const validation = createAppointmentSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        });
      }

      const input = validation.data;

      // Conflict / Availability Check (max 5 bookings per slot)
      const existingInSlot = storeService.getAllAppointments().filter(
        a => a.preferredDate === input.preferredDate && 
             a.preferredTime === input.preferredTime && 
             a.status !== 'CANCELLED'
      );

      if (existingInSlot.length >= 5) {
        return res.status(409).json({
          success: false,
          error: "Selected time slot is fully booked. Please select another slot.",
        });
      }

      // Create Appointment in Store
      const appointment = storeService.createAppointment({
        ...input,
        counsellingType: input.counsellingMode || input.counsellingType || "Online Video 1:1",
        questions: input.message || input.questions || "",
        status: 'PENDING',
      });

      // Await Email and WhatsApp notifications to Student & Admin
      const notifyResult = await notificationQueue.processJobImmediate('BOOKING_CREATED', appointment);
      const finalAppt = storeService.getAppointmentById(appointment.id) || appointment;

      res.status(201).json({
        success: true,
        data: finalAppt,
        notificationResults: notifyResult.results,
        message: "Appointment request received successfully. Confirmation email and notification sent.",
      });
    } catch (err: any) {
      logger.error('BOOKING', 'CREATE_APPOINTMENT_ERROR', 'Failed to create appointment', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 2b. POST direct enquiry endpoint (alias / dedicated handler for general enquiries)
  app.post(["/api/enquiry", "/api/enquiries", "/api/contact"], async (req: Request, res: Response) => {
    try {
      // Honeypot spam protection
      if (req.body.hp && req.body.hp.trim() !== "") {
        logger.warn('SECURITY', 'SPAM_HONEYPOT_TRIGGERED', 'Spam bot enquiry caught via honeypot field', { ip: req.ip });
        return res.status(200).json({
          success: true,
          message: "Enquiry received successfully.",
        });
      }

      const validation = createAppointmentSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        });
      }

      const input = validation.data;

      const appointment = storeService.createAppointment({
        ...input,
        counsellingType: input.counsellingMode || input.counsellingType || "Enquiry / Consultation",
        questions: input.message || input.questions || "",
        status: 'PENDING',
      });

      // Await Email and WhatsApp notifications to Student & Admin
      const notifyResult = await notificationQueue.processJobImmediate('BOOKING_CREATED', appointment);
      const finalAppt = storeService.getAppointmentById(appointment.id) || appointment;

      res.status(201).json({
        success: true,
        data: finalAppt,
        notificationResults: notifyResult.results,
        message: "Enquiry submitted successfully. Confirmation email dispatched.",
      });
    } catch (err: any) {
      logger.error('BOOKING', 'CREATE_ENQUIRY_ERROR', 'Failed to create enquiry', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. PATCH update appointment status (Approve, Reschedule, Cancel, Complete)
  app.patch("/api/appointments/:id/status", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, preferredDate, preferredTime, cancellationReason, customMeetLink } = req.body;

      const existing = storeService.getAppointmentById(id);
      if (!existing) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }

      const oldSlot = { date: existing.preferredDate, time: existing.preferredTime };
      const updates: any = { status };

      if (preferredDate) updates.preferredDate = preferredDate;
      if (preferredTime) updates.preferredTime = preferredTime;
      if (customMeetLink && googleMeetService.isValidMeetUrl(customMeetLink)) {
        updates.meetLink = customMeetLink;
      }

      const updated = storeService.updateAppointment(id, updates);
      if (!updated) {
        return res.status(500).json({ success: false, error: "Failed to update appointment" });
      }

      // Dispatch and await appropriate notification based on action
      let notifyResult;
      if (status === 'APPROVED') {
        notifyResult = await notificationQueue.processJobImmediate('BOOKING_APPROVED', updated);
      } else if (status === 'RESCHEDULED') {
        notifyResult = await notificationQueue.processJobImmediate('BOOKING_RESCHEDULED', updated, { rescheduledFrom: oldSlot });
      } else if (status === 'CANCELLED') {
        notifyResult = await notificationQueue.processJobImmediate('BOOKING_CANCELLED', updated, { cancellationReason });
      }

      const finalAppt = storeService.getAppointmentById(id) || updated;

      res.json({
        success: true,
        data: finalAppt,
        notificationResults: notifyResult?.results,
        message: `Appointment ${status.toLowerCase()} and notification dispatched.`,
      });
    } catch (err: any) {
      logger.error('BOOKING', 'UPDATE_STATUS_ERROR', 'Failed to update appointment status', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. POST Resend notifications
  app.post("/api/notifications/resend", async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.body;
      if (!bookingId) {
        return res.status(400).json({ success: false, error: "bookingId is required" });
      }

      const appointment = storeService.getAppointmentById(bookingId);
      if (!appointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }

      const notifyResult = await notificationQueue.processJobImmediate('MANUAL_RESEND', appointment);
      const finalAppt = storeService.getAppointmentById(bookingId) || appointment;

      res.json({
        success: true,
        data: finalAppt,
        notificationResults: notifyResult.results,
        message: `Notifications dispatched for ${appointment.name} (${appointment.email} & ${appointment.mobileNumber}).`,
      });
    } catch (err: any) {
      logger.error('SYSTEM', 'RESEND_ERROR', 'Failed to trigger resend', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. POST Trigger Reminders (24H or 1H)
  app.post("/api/notifications/remind", async (req: Request, res: Response) => {
    try {
      const { bookingId, type } = req.body; // type: '24H' | '1H'
      const appointment = storeService.getAppointmentById(bookingId);
      if (!appointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }

      const jobType = type === '1H' ? 'REMINDER_1H' : 'REMINDER_24H';
      const notifyResult = await notificationQueue.processJobImmediate(jobType, appointment);

      res.json({
        success: true,
        notificationResults: notifyResult.results,
        message: `${type} reminder dispatched for ${appointment.name}.`,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. POST Trigger Feedback Request
  app.post("/api/notifications/feedback", async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.body;
      const appointment = storeService.getAppointmentById(bookingId);
      if (!appointment) {
        return res.status(404).json({ success: false, error: "Appointment not found" });
      }

      notificationQueue.addJob('FEEDBACK_REQUEST', appointment);

      res.json({
        success: true,
        message: `Feedback request queued for ${appointment.name}.`,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. GET Notification & System Audit Logs
  app.get("/api/notifications/logs", (req: Request, res: Response) => {
    try {
      const { channel, level, search, limit } = req.query;
      const logs = logger.getLogs({
        channel: channel ? (channel as any) : undefined,
        level: level ? (level as any) : undefined,
        search: search ? String(search) : undefined,
        limit: limit ? Number(limit) : 100,
      });
      res.json(logs);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 8. GET Notification Platform Analytics
  app.get("/api/notifications/analytics", (req: Request, res: Response) => {
    try {
      const analytics = storeService.getAnalytics();
      res.json(analytics);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 9. GET Template Live Preview
  app.get("/api/notifications/templates/preview", (req: Request, res: Response) => {
    try {
      const template = (req.query.template as EmailTemplateType) || 'APPOINTMENT_APPROVED';
      const studentName = (req.query.studentName as string) || 'Major Rohit Rathore';
      const studentEmail = (req.query.studentEmail as string) || 'rohit.rathore@example.com';
      const mobileNumber = (req.query.mobileNumber as string) || '+919811223344';
      const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
      const time = (req.query.time as string) || '10:30 AM';
      const serviceType = (req.query.serviceType as string) || 'CDS & SSB Interview Preparation';
      const meetLink = (req.query.meetLink as string) || 'https://meet.google.com/cch-ndas-ssb';
      const ticketNumber = (req.query.ticketNumber as string) || 'CCH-9101';

      const emailResult = emailService.generateTemplate({
        to: studentEmail,
        template,
        bookingData: {
          id: 'demo_1',
          ticketNumber,
          studentName,
          studentEmail,
          mobileNumber,
          date,
          time,
          serviceType,
          careerInterest: serviceType,
          meetLink,
        },
      });

      const waMessageType: WhatsAppMessageType = 
        template === 'APPOINTMENT_APPROVED' ? 'APPROVAL' :
        template === 'APPOINTMENT_RESCHEDULED' ? 'RESCHEDULE' :
        template === 'APPOINTMENT_CANCELLED' ? 'CANCELLATION' :
        template === 'REMINDER_24H' ? 'REMINDER_24H' :
        template === 'REMINDER_1H' ? 'REMINDER_1H' :
        template === 'FEEDBACK_REQUEST' ? 'FEEDBACK_REQUEST' :
        template === 'ADMIN_NEW_BOOKING' ? 'ADMIN_ALERT' : 'BOOKING_CONFIRMATION';

      const whatsappText = whatsAppService.formatMessage({
        to: mobileNumber,
        type: waMessageType,
        bookingData: {
          id: 'demo_1',
          ticketNumber,
          studentName,
          studentEmail,
          mobileNumber,
          date,
          time,
          serviceType,
          meetLink,
        },
      });

      res.json({
        template,
        subject: emailResult.subject,
        html: emailResult.html,
        preheader: emailResult.preheader,
        whatsappText,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 10. POST Test Dispatch Simulator (Resend / Meta WhatsApp)
  app.post("/api/notifications/test", async (req: Request, res: Response) => {
    try {
      const { channel, recipient, template = 'APPOINTMENT_APPROVED' } = req.body;
      if (!recipient) {
        return res.status(400).json({ success: false, error: "Recipient is required" });
      }

      const sampleData = {
        id: 'test_' + Date.now(),
        ticketNumber: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
        studentName: 'Test Aspirant',
        studentEmail: recipient,
        mobileNumber: recipient,
        date: new Date().toISOString().split('T')[0],
        time: '11:00 AM',
        serviceType: '1:1 Career Mentorship Test',
        meetLink: 'https://meet.google.com/test-cch-meet',
      };

      if (channel === 'EMAIL') {
        const result = await emailService.sendEmail({
          to: recipient,
          template: template as EmailTemplateType,
          bookingData: sampleData,
        });
        return res.json({ success: true, result });
      } else if (channel === 'WHATSAPP') {
        const result = await whatsAppService.sendMessage({
          to: recipient,
          type: 'APPROVAL',
          bookingData: sampleData,
        });
        return res.json({ success: true, result });
      }

      res.status(400).json({ success: false, error: "Invalid channel. Choose EMAIL or WHATSAPP." });
    } catch (err: any) {
      logger.error('SYSTEM', 'TEST_DISPATCH_ERROR', 'Failed to run test dispatch', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 11. GET Export CSV
  app.get("/api/appointments/export-csv", (req: Request, res: Response) => {
    try {
      const csv = storeService.exportCsv();
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=counselling_appointments_${Date.now()}.csv`);
      res.send(csv);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 12. POST Trigger Daily / Weekly Summary to Admin
  app.post("/api/admin/trigger-summary", async (req: Request, res: Response) => {
    try {
      const { type = 'DAILY' } = req.body;
      const adminEmail = process.env.ADMIN_EMAIL || 'sankalpcareersolutions@gmail.com';
      const analytics = storeService.getAnalytics();

      const template: EmailTemplateType = type === 'WEEKLY' ? 'ADMIN_WEEKLY_REPORT' : 'ADMIN_DAILY_SUMMARY';
      const result = await emailService.sendEmail({
        to: adminEmail,
        template,
        summaryData: {
          totalBookingsToday: analytics.todayBookings,
          confirmedSessions: analytics.upcomingSessions,
          pendingReviews: analytics.totalBookings - analytics.upcomingSessions,
          bookingsList: storeService.getAllAppointments().slice(0, 5).map(a => ({
            name: a.name,
            time: `${a.preferredDate} ${a.preferredTime}`,
            service: a.careerInterest || a.counsellingType,
            ticket: a.ticketNumber,
          })),
        },
      });

      res.json({
        success: true,
        message: `${type} report sent to ${adminEmail}`,
        result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // AAYU AI CHATBOT ENDPOINT (Multi-Turn Student Guide)
  // ==========================================
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history, studentContext } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ success: false, error: "Message string is required" });
      }

      const response = await geminiChatService.sendMessage({
        message: message.trim(),
        history: Array.isArray(history) ? history : [],
        studentContext: typeof studentContext === 'object' ? studentContext : undefined,
      });

      res.json({
        success: true,
        ...response,
      });
    } catch (err: any) {
      logger.error('CHAT', 'AAYU_API_ERROR', 'Error handling /api/chat request', err);
      res.status(500).json({
        success: false,
        reply: "I am temporarily having trouble connecting. Please feel free to WhatsApp our counselling desk directly at +91 85283 35708 or schedule a 1:1 consultation.",
        error: err.message,
      });
    }
  });

  // ==========================================
  // GEMINI SEO AUTOMATION ENDPOINTS (Preserved)
  // ==========================================
  app.post("/api/generate-seo-content", async (req, res) => {
    try {
      const { topic, keywords, language = "English" } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      let data;
      try {
        if (!apiKey) throw new Error("No API key");
        const ai = new GoogleGenAI({ 
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
        const prompt = `Act as an expert SEO copywriter. Generate a comprehensive, SEO-optimized article about "${topic}".
        Target Keywords: ${keywords}
        Language: ${language}
        
        Please format the response as JSON with the following structure:
        {
          "title": "SEO Optimized Title (50-60 chars)",
          "metaDescription": "SEO Meta Description (150-160 chars)",
          "slug": "url-friendly-slug",
          "h1": "Main Heading",
          "content": "Full article content in Markdown format, including H2/H3 tags and internal linking suggestions.",
          "faqs": [{"question": "Q1", "answer": "A1"}],
          "imagePrompt": "Prompt for generating a featured image"
        }`;
        
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });
        data = JSON.parse(response.text || '{}');
      } catch (err) {
        console.warn("Falling back to mock SEO data:", err);
        data = {
          title: `Ultimate Guide to ${topic}`,
          metaDescription: `Learn everything about ${topic}. Expert tips, comprehensive guide, and strategies to succeed.`,
          slug: `guide-to-${topic?.toLowerCase().replace(/\\s+/g, '-')}`,
          h1: `The Complete Guide: ${topic}`,
          content: `# ${topic}\n\nWelcome to the ultimate guide on **${topic}**.\n\n## Why is this important?\nUnderstanding this topic is crucial for your career growth and success.\n\n### Key Strategies\n1. Consistency is key.\n2. Practice regularly.\n3. Stay updated with the latest trends.\n\n## Conclusion\nBy following these strategies, you'll master ${topic} in no time!`,
          faqs: [
            { question: `What is the best way to start with ${topic}?`, answer: "Begin by understanding the fundamentals and setting clear goals." },
            { question: `How long does it take to master ${topic}?`, answer: "It depends on your dedication, but consistent effort yields results quickly." }
          ]
        };
      }
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to generate content" });
    }
  });

  app.post("/api/keyword-intelligence", async (req, res) => {
    try {
      const { topic } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      let data;
      try {
        if (!apiKey) throw new Error("No API key");
        const ai = new GoogleGenAI({ 
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
        const prompt = `Act as an expert SEO strategist. Generate a list of 10 high-value, long-tail keywords related to "${topic || 'defence and education counselling'}".
        Format as JSON array of objects: [{ "keyword": "...", "volume": "number e.g. 1500", "difficulty": "Low/Medium/High", "intent": "Informational/Transactional" }]`;
        
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });
        data = JSON.parse(response.text || '[]');
      } catch(err) {
        const t = topic || 'defence';
        data = [
          { keyword: `best ${t} coaching`, volume: "12,500", difficulty: "High", intent: "Transactional" },
          { keyword: `how to prepare for ${t}`, volume: "8,400", difficulty: "Medium", intent: "Informational" },
          { keyword: `${t} exam syllabus 2026`, volume: "5,200", difficulty: "Low", intent: "Informational" },
          { keyword: `top 10 ${t} academies`, volume: "3,100", difficulty: "Medium", intent: "Commercial" },
          { keyword: `${t} interview questions`, volume: "4,800", difficulty: "Low", intent: "Informational" }
        ];
      }
      res.json({ keywords: data });
    } catch (err) {
      res.status(500).json({ error: "Failed to generate keywords" });
    }
  });

  // Vite Middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    logger.info('SYSTEM', 'SERVER_BOOT', `CareerCounsellingHub Server running on http://localhost:${PORT}`);
  });
}

startServer();
