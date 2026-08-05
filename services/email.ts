/**
 * CareerCounsellingHub - Resend Email Service
 * Production-grade email dispatch engine with branded responsive HTML templates,
 * Resend API integration, ICS calendar attachments, delivery analytics, and retry queueing.
 */

import { Resend } from 'resend';
import { logger } from './logger';
import { executeWithRetry } from './retry';

export type EmailTemplateType =
  // Student templates
  | 'APPOINTMENT_CONFIRMATION'
  | 'APPOINTMENT_APPROVED'
  | 'APPOINTMENT_RESCHEDULED'
  | 'APPOINTMENT_CANCELLED'
  | 'REMINDER_24H'
  | 'REMINDER_1H'
  | 'FEEDBACK_REQUEST'
  // Admin templates
  | 'ADMIN_NEW_BOOKING'
  | 'ADMIN_CANCELLATION'
  | 'ADMIN_RESCHEDULE'
  | 'ADMIN_DAILY_SUMMARY'
  | 'ADMIN_WEEKLY_REPORT';

export interface EmailRecipient {
  email: string;
  name: string;
}

export interface EmailDispatchPayload {
  to: string | string[];
  template: EmailTemplateType;
  bookingData?: {
    id: string;
    ticketNumber?: string;
    studentName: string;
    studentEmail: string;
    mobileNumber?: string;
    city?: string;
    state?: string;
    currentClass?: string;
    careerInterest?: string;
    counsellingMode?: string;
    serviceType?: string;
    date: string;
    time: string;
    message?: string;
    questions?: string;
    submittedAt?: string;
    meetLink?: string;
    rescheduledFrom?: { date: string; time: string };
    cancellationReason?: string;
    notes?: string;
    stream?: string;
    schoolCollege?: string;
    parentName?: string;
    parentContact?: string;
  };
  customSubject?: string;
  icsAttachment?: {
    filename: string;
    content: string;
  };
  summaryData?: {
    totalBookingsToday: number;
    confirmedSessions: number;
    pendingReviews: number;
    bookingsList?: Array<{ name: string; time: string; service: string; ticket: string }>;
    weeklyStats?: { total: number; attended: number; satisfactionRate: string; topStream: string };
  };
}

export interface EmailDispatchResult {
  id: string;
  status: 'SENT' | 'SIMULATED' | 'FAILED';
  recipient: string;
  template: EmailTemplateType;
  subject: string;
  timestamp: string;
  error?: string;
  openTrackingId?: string;
}

export class EmailService {
  private resendClient: Resend | null = null;
  private fromEmail: string;
  private adminEmail: string;
  private websiteUrl: string;
  private logoUrl: string;
  private companyName: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey.trim().length > 0 && !apiKey.includes('placeholder')) {
      this.resendClient = new Resend(apiKey);
    }
    const rawFrom = process.env.RESEND_FROM_EMAIL;
    if (rawFrom && rawFrom.trim().length > 0) {
      this.fromEmail = rawFrom.includes('<') ? rawFrom : `Career Counselling Hub <${rawFrom.trim()}>`;
    } else {
      this.fromEmail = 'CareerCounsellingHub <onboarding@resend.dev>';
    }
    this.adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_EMail || 'sankalpcareersolutions@gmail.com';
    this.websiteUrl = process.env.WEBSITE_URL || 'https://www.careercounsellinghub.com';
    this.logoUrl = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=160&auto=format&fit=crop&q=80';
    this.companyName = 'CareerCounsellingHub';
  }

  /**
   * Generates Base HTML Wrapper with Mobile Responsive Layout and Brand Colors
   */
  private wrapEmailHtml(title: string, preheader: string, contentBody: string): string {
    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #071224; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: auto !important; }
      .fluid-col { width: 100% !important; display: block !important; }
      .p-responsive { padding: 20px 16px !important; }
      .btn-responsive { width: 100% !important; display: block !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #071224; color: #F7FAFC;">
  <!-- Hidden Preheader -->
  <div style="display: none; font-size: 1px; color: #071224; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheader}
  </div>

  <center style="width: 100%; background-color: #071224; padding: 32px 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #0B1E3B; border-radius: 16px; border: 1px solid rgba(212, 175, 55, 0.25); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" class="email-container">
      
      <!-- Brand Header -->
      <tr>
        <td style="padding: 28px 32px; background: linear-gradient(135deg, #0B1E3B 0%, #102A54 100%); border-bottom: 2px solid #D4AF37; text-align: center;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center">
                <div style="display: inline-block; padding: 8px 16px; background-color: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.3); margin-bottom: 8px;">
                  <span style="font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #F5D061; font-family: sans-serif; text-transform: uppercase;">
                    CAREER COUNSELLING HUB
                  </span>
                </div>
                <div style="font-size: 12px; color: #E2E8F0; letter-spacing: 1px; text-transform: uppercase; font-family: monospace;">
                  Sankalp Career Solutions • Defence & Higher Education Mentorship
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Main Body Content -->
      <tr>
        <td style="padding: 36px 32px; background-color: #0B1E3B;" class="p-responsive">
          ${contentBody}
        </td>
      </tr>

      <!-- Brand Footer -->
      <tr>
        <td style="padding: 24px 32px; background-color: #06101E; border-top: 1px solid rgba(212, 175, 55, 0.15); text-align: center; font-size: 12px; color: #94A3B8; line-height: 18px;">
          <p style="margin: 0 0 8px 0; font-weight: bold; color: #E2E8F0;">
            CareerCounsellingHub - India's Sovereign Career & Defence Guidance Platform
          </p>
          <p style="margin: 0 0 12px 0;">
            Official Portal: <a href="${this.websiteUrl}" style="color: #F5D061; text-decoration: underline;">www.careercounsellinghub.com</a> | Helpline: <a href="mailto:${this.adminEmail}" style="color: #F5D061; text-decoration: underline;">${this.adminEmail}</a>
          </p>
          <p style="margin: 0; font-size: 11px; color: #64748B;">
            © ${new Date().getFullYear()} CareerCounsellingHub & Sankalp Solutions. All rights reserved. This is an automated official transaction notification.
          </p>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
  }

  /**
   * Helper to build interactive appointment detail card
   */
  private renderDetailsCard(data: NonNullable<EmailDispatchPayload['bookingData']>): string {
    return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0; background-color: #07152B; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 20px;">
      <tr>
        <td style="padding: 6px 0; font-size: 13px; color: #94A3B8; width: 40%; font-family: monospace; text-transform: uppercase;">Booking Reference:</td>
        <td style="padding: 6px 0; font-size: 14px; font-weight: bold; color: #F5D061; font-family: monospace;">${data.ticketNumber || data.id.substring(0, 8).toUpperCase()}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">Aspirant Name:</td>
        <td style="padding: 6px 0; font-size: 14px; font-weight: bold; color: #FFFFFF;">${data.studentName}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">Scheduled Date:</td>
        <td style="padding: 6px 0; font-size: 14px; font-weight: bold; color: #FFFFFF;">📅 ${data.date}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">Time Slot:</td>
        <td style="padding: 6px 0; font-size: 14px; font-weight: bold; color: #F5D061;">⏰ ${data.time} (IST)</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">Guidance Focus:</td>
        <td style="padding: 6px 0; font-size: 14px; color: #E2E8F0;">${data.careerInterest || data.serviceType || 'General Career Mentorship'}</td>
      </tr>
      ${data.meetLink ? `
      <tr>
        <td style="padding: 10px 0 6px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">Google Meet Link:</td>
        <td style="padding: 10px 0 6px 0;">
          <a href="${data.meetLink}" target="_blank" style="font-size: 14px; font-weight: bold; color: #60A5FA; text-decoration: underline; font-family: monospace;">
            ${data.meetLink}
          </a>
        </td>
      </tr>
      ` : ''}
    </table>`;
  }

  /**
   * Generates Subject line and HTML Body based on Template Type
   */
  public generateTemplate(payload: EmailDispatchPayload): { subject: string; html: string; preheader: string } {
    const data = payload.bookingData || {
      id: 'CCH-DEMO',
      studentName: 'Aspirant',
      studentEmail: 'student@example.com',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      serviceType: 'Defence & SSB Mentorship',
      ticketNumber: 'TKT-9921',
      meetLink: 'https://meet.google.com/xya-bcvd-pqr',
    };

    switch (payload.template) {
      // 1. Student: Appointment & Enquiry Confirmation
      case 'APPOINTMENT_CONFIRMATION': {
        const subject = `Appointment Request Received – CareerCounsellingHub`;
        const preheader = `Dear ${data.studentName}, thank you for contacting CareerCounsellingHub. We have received your enquiry/appointment request.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #F5D061; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
            Appointment Request Received
          </h2>
          <p style="font-size: 15px; line-height: 24px; color: #E2E8F0; margin: 0 0 16px 0;">
            Dear <strong>${data.studentName}</strong>,
          </p>
          <p style="font-size: 14px; line-height: 22px; color: #CBD5E1; margin: 0 0 16px 0;">
            Thank you for contacting <strong>CareerCounsellingHub</strong>.
          </p>
          <p style="font-size: 14px; line-height: 22px; color: #CBD5E1; margin: 0 0 16px 0;">
            We have successfully received your enquiry/appointment request. Our career counselling team will review your details and contact you shortly.
          </p>
          
          ${this.renderDetailsCard(data)}

          <div style="background-color: #07152B; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: bold; color: #F5D061; text-transform: uppercase; font-family: monospace; letter-spacing: 1px;">
              For immediate assistance:
            </p>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #E2E8F0;">
              <tr>
                <td style="padding: 6px 0; width: 35%; color: #94A3B8; font-family: monospace;">WhatsApp:</td>
                <td style="padding: 6px 0;">
                  <a href="https://wa.me/918528335708?text=Hello%20CareerCounsellingHub,%20I%20need%20career%20guidance." style="color: #25D366; font-weight: bold; text-decoration: none; font-family: monospace;">
                    +91 85283 35708
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; width: 35%; color: #94A3B8; font-family: monospace;">Email:</td>
                <td style="padding: 6px 0;">
                  <a href="mailto:${this.adminEmail}" style="color: #F5D061; font-weight: bold; text-decoration: underline; font-family: monospace;">
                    ${this.adminEmail}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; width: 35%; color: #94A3B8; font-family: monospace;">Website:</td>
                <td style="padding: 6px 0;">
                  <a href="${this.websiteUrl}" style="color: #60A5FA; text-decoration: underline; font-family: monospace;">
                    ${this.websiteUrl}
                  </a>
                </td>
              </tr>
            </table>
          </div>

          <p style="font-size: 14px; line-height: 22px; color: #CBD5E1; margin: 20px 0 6px 0;">
            Thank you for choosing <strong>CareerCounsellingHub</strong>.
          </p>
          <p style="font-size: 14px; line-height: 22px; color: #F5D061; font-weight: bold; margin: 0 0 24px 0;">
            Regards,<br />
            <span style="color: #FFFFFF; font-weight: normal;">CareerCounsellingHub Team</span>
          </p>

          <div style="text-align: center; margin: 28px 0 12px 0;">
            <a href="${this.websiteUrl}" class="btn-responsive" style="background: linear-gradient(135deg, #D4AF37 0%, #AA8010 100%); color: #071224; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);">
              Visit Career Counselling Hub
            </a>
          </div>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 2. Student: Appointment Approved (with Google Meet Link)
      case 'APPOINTMENT_APPROVED': {
        const subject = `🎉 Appointment Confirmed & Google Meet Link [${data.ticketNumber || data.id.substring(0, 8)}] | CareerCounsellingHub`;
        const preheader = `Your 1:1 session is confirmed for ${data.date} at ${data.time}. Click here to access your Google Meet link.`;
        const body = `
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="background-color: #064E3B; color: #34D399; font-size: 12px; font-weight: bold; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #059669;">
              ● Session Confirmed & Approved
            </span>
          </div>

          <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #34D399; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">
            Your Mentorship Slot is Locked In!
          </h2>
          <p style="font-size: 15px; line-height: 24px; color: #E2E8F0; margin: 0 0 16px 0;">
            Dear <strong>${data.studentName}</strong>,
          </p>
          <p style="font-size: 14px; line-height: 22px; color: #CBD5E1; margin: 0 0 16px 0;">
            We are pleased to inform you that your 1:1 Career Mentorship session has been officially approved by the Senior Career Guidance Panel.
          </p>

          ${this.renderDetailsCard(data)}

          <div style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid #10B981; padding: 20px; border-radius: 12px; text-align: center; margin: 28px 0;">
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #A7F3D0; font-weight: bold;">
              📹 Official 1:1 Google Meet Video Room:
            </p>
            <div style="margin-bottom: 16px;">
              <a href="${data.meetLink}" target="_blank" class="btn-responsive" style="background: linear-gradient(135deg, #10B981 0%, #047857 100%); color: #FFFFFF; font-weight: 900; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);">
                Join Google Meet Session
              </a>
            </div>
            <p style="margin: 0; font-size: 12px; color: #6EE7B7; font-family: monospace;">
              Direct URL: ${data.meetLink}
            </p>
          </div>

          <p style="font-size: 13px; color: #94A3B8; line-height: 20px;">
            📌 <em>Tip: Please join 5 minutes early with a notepad and any specific queries regarding courses, defence exams (NDA/CDS/AFCAT), or career trajectories.</em>
          </p>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 3. Student: Appointment Rescheduled
      case 'APPOINTMENT_RESCHEDULED': {
        const subject = `🔄 Appointment Rescheduled: New Slot Confirmed | CareerCounsellingHub`;
        const preheader = `Your counselling session has been moved to ${data.date} at ${data.time}.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #F59E0B; font-weight: 800; text-transform: uppercase;">
            Session Slot Rescheduled
          </h2>
          <p style="font-size: 15px; color: #E2E8F0;">Dear <strong>${data.studentName}</strong>,</p>
          <p style="font-size: 14px; color: #CBD5E1; line-height: 22px;">
            Your career counselling appointment has been updated to a new time slot. Please review your updated itinerary below:
          </p>

          ${this.renderDetailsCard(data)}

          <div style="text-align: center; margin: 28px 0;">
            <a href="${data.meetLink || this.websiteUrl}" class="btn-responsive" style="background: linear-gradient(135deg, #F59E0B 0%, #B45309 100%); color: #FFFFFF; font-weight: bold; font-size: 14px; text-transform: uppercase; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block;">
              View Updated Session Link
            </a>
          </div>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 4. Student: Appointment Cancelled
      case 'APPOINTMENT_CANCELLED': {
        const subject = `⚠️ Appointment Cancellation Notice [${data.ticketNumber || data.id.substring(0, 8)}] | CareerCounsellingHub`;
        const preheader = `Your counselling appointment for ${data.date} has been cancelled.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #EF4444; font-weight: 800; text-transform: uppercase;">
            Appointment Cancelled
          </h2>
          <p style="font-size: 15px; color: #E2E8F0;">Dear <strong>${data.studentName}</strong>,</p>
          <p style="font-size: 14px; color: #CBD5E1; line-height: 22px;">
            This email is to notify you that your career counselling booking [<strong>${data.ticketNumber || data.id.substring(0, 8)}</strong>] has been cancelled.
          </p>
          ${data.cancellationReason ? `
          <div style="background-color: rgba(239, 68, 68, 0.1); border-left: 4px solid #EF4444; padding: 12px 16px; margin: 16px 0;">
            <p style="margin: 0; font-size: 13px; color: #FCA5A5;"><strong>Reason:</strong> ${data.cancellationReason}</p>
          </div>
          ` : ''}
          <p style="font-size: 14px; color: #94A3B8;">
            You can easily book a new slot at any time that suits your convenience:
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${this.websiteUrl}" class="btn-responsive" style="background-color: #1E293B; border: 1px solid #D4AF37; color: #F5D061; font-weight: bold; font-size: 14px; text-transform: uppercase; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Book Another Slot
            </a>
          </div>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 5. Student: 24 Hours Reminder
      case 'REMINDER_24H': {
        const subject = `⏰ Reminder: Your Career Counselling Session is in 24 Hours | CareerCounsellingHub`;
        const preheader = `Hi ${data.studentName}, your session takes place tomorrow at ${data.time}.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #F5D061; font-weight: 800; text-transform: uppercase;">
            Session Tomorrow: 24-Hour Reminder
          </h2>
          <p style="font-size: 15px; color: #E2E8F0;">Dear <strong>${data.studentName}</strong>,</p>
          <p style="font-size: 14px; color: #CBD5E1; line-height: 22px;">
            This is a friendly reminder that your 1:1 Career Guidance session with our senior mentor is scheduled for tomorrow.
          </p>

          ${this.renderDetailsCard(data)}

          <div style="text-align: center; margin: 28px 0;">
            <a href="${data.meetLink}" class="btn-responsive" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF; font-weight: bold; font-size: 14px; text-transform: uppercase; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Access Google Meet Room
            </a>
          </div>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 6. Student: 1 Hour Reminder
      case 'REMINDER_1H': {
        const subject = `🚨 Starting in 1 Hour: 1:1 Counselling Session | CareerCounsellingHub`;
        const preheader = `Your session starts in 60 minutes! Click here to join your mentor on Google Meet.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #38BDF8; font-weight: 800; text-transform: uppercase;">
            Starting In 1 Hour!
          </h2>
          <p style="font-size: 15px; color: #E2E8F0;">Dear <strong>${data.studentName}</strong>,</p>
          <p style="font-size: 14px; color: #CBD5E1; line-height: 22px;">
            Your 1:1 counselling consultation begins in less than 60 minutes. Please find your joining link below:
          </p>

          <div style="background-color: #07152B; border: 2px solid #38BDF8; padding: 24px; border-radius: 12px; text-align: center; margin: 20px 0;">
            <div style="font-size: 14px; color: #BAE6FD; margin-bottom: 12px; font-weight: bold;">
              Time: ${data.time} IST • Date: ${data.date}
            </div>
            <a href="${data.meetLink}" target="_blank" class="btn-responsive" style="background: #0284C7; color: #FFFFFF; font-weight: 900; font-size: 15px; text-transform: uppercase; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Join Google Meet Now
            </a>
          </div>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 7. Student: Feedback Request
      case 'FEEDBACK_REQUEST': {
        const subject = `⭐ How was your career guidance session? | CareerCounsellingHub`;
        const preheader = `Dear ${data.studentName}, please take 1 minute to share your feedback on your counselling session.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #F5D061; font-weight: 800; text-transform: uppercase; text-align: center;">
            We Value Your Feedback
          </h2>
          <p style="font-size: 15px; color: #E2E8F0;">Dear <strong>${data.studentName}</strong>,</p>
          <p style="font-size: 14px; color: #CBD5E1; line-height: 22px;">
            Thank you for attending your 1:1 Career Counselling session with CareerCounsellingHub. We hope you received valuable clarity and actionable roadmaps.
          </p>
          <p style="font-size: 14px; color: #CBD5E1; line-height: 22px;">
            Could you take 60 seconds to rate your mentor and session?
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="${this.websiteUrl}#feedback" class="btn-responsive" style="background: linear-gradient(135deg, #D4AF37 0%, #AA8010 100%); color: #071224; font-weight: 900; font-size: 14px; text-transform: uppercase; padding: 14px 32px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Submit Quick Feedback
            </a>
          </div>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 8. Admin: New Enquiry / Booking Alert
      case 'ADMIN_NEW_BOOKING': {
        const subject = `New Student Enquiry Received`;
        const preheader = `New enquiry received from ${data.studentName} (${data.mobileNumber || data.studentEmail}) for ${data.careerInterest || 'Career Counselling'}.`;
        const submittedAt = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const city = data.city || data.state || 'Not specified';
        const courseClass = data.currentClass || data.stream || 'Not specified';
        const careerInterest = data.careerInterest || data.serviceType || 'General Career Counselling';
        const counsellingMode = data.counsellingMode || 'Online Video 1:1';
        const preferredDateTime = `${data.date} at ${data.time} (IST)`;
        const completeMessage = data.message || data.questions || data.notes || 'No custom message provided';

        const body = `
          <div style="background-color: #1E3A8A; color: #93C5FD; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; display: inline-block; margin-bottom: 12px; font-family: monospace;">
            ADMIN ENQUIRY ALERT
          </div>
          <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #F5D061; font-weight: 800; text-transform: uppercase;">
            New Student Enquiry Received
          </h2>
          <p style="font-size: 14px; color: #E2E8F0; margin-bottom: 20px;">
            A new enquiry / appointment booking has been submitted on <strong>CareerCounsellingHub</strong>. Full details are listed below:
          </p>

          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0; background-color: #07152B; border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 12px; padding: 20px;">
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; width: 40%; font-family: monospace; text-transform: uppercase;">• Student Name:</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: bold; color: #FFFFFF;">${data.studentName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">• Mobile Number:</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: bold; color: #25D366; font-family: monospace;">
                <a href="tel:${data.mobileNumber || ''}" style="color: #25D366; text-decoration: none;">${data.mobileNumber || 'Not provided'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">• Email:</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: bold; color: #F5D061;">
                <a href="mailto:${data.studentEmail}" style="color: #F5D061; text-decoration: underline;">${data.studentEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">• City:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #FFFFFF;">${city}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">• Course/Class:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #FFFFFF;">${courseClass}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">• Career Interest:</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: bold; color: #F5D061;">${careerInterest}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">• Preferred Counselling Mode:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #60A5FA;">${counsellingMode}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">• Preferred Date & Time:</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: bold; color: #FFFFFF;">📅 ${preferredDateTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase; vertical-align: top;">• Complete Message:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #E2E8F0; line-height: 20px;">${completeMessage}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">• Date & Time Submitted:</td>
              <td style="padding: 8px 0; font-size: 13px; color: #93C5FD; font-family: monospace;">${submittedAt}</td>
            </tr>
            ${data.ticketNumber ? `
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; font-family: monospace; text-transform: uppercase;">Reference Ticket:</td>
              <td style="padding: 8px 0; font-size: 13px; color: #F5D061; font-family: monospace; font-weight: bold;">${data.ticketNumber}</td>
            </tr>
            ` : ''}
          </table>

          <div style="text-align: center; margin: 28px 0 12px 0;">
            <a href="${this.websiteUrl}" class="btn-responsive" style="background-color: #D4AF37; color: #0B1E3B; font-weight: bold; font-size: 13px; text-transform: uppercase; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Open Admin Command Center
            </a>
          </div>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 9. Admin: Cancellation Alert
      case 'ADMIN_CANCELLATION': {
        const subject = `⚠️ [ADMIN ALERT] Booking Cancelled: ${data.studentName} [${data.ticketNumber || data.id.substring(0, 8)}]`;
        const preheader = `Aspirant ${data.studentName} cancelled their slot for ${data.date}.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #EF4444; font-weight: 800;">
            Booking Cancelled by Student / System
          </h2>
          ${this.renderDetailsCard(data)}
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 10. Admin: Reschedule Alert
      case 'ADMIN_RESCHEDULE': {
        const subject = `🔄 [ADMIN ALERT] Slot Rescheduled: ${data.studentName}`;
        const preheader = `Student ${data.studentName} has been moved to ${data.date} at ${data.time}.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #F59E0B; font-weight: 800;">
            Slot Reschedule Notification
          </h2>
          ${this.renderDetailsCard(data)}
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 11. Admin: Daily Summary
      case 'ADMIN_DAILY_SUMMARY': {
        const summary = payload.summaryData || {
          totalBookingsToday: 8,
          confirmedSessions: 6,
          pendingReviews: 2,
          bookingsList: [
            { name: 'Rohan Sharma', time: '10:00 AM', service: 'NDA / SSB Guidance', ticket: 'TKT-1041' },
            { name: 'Ananya Verma', time: '12:30 PM', service: 'ISRO / DRDO Pathways', ticket: 'TKT-1042' },
            { name: 'Kunal Patel', time: '04:00 PM', service: 'Engineering Career Matrix', ticket: 'TKT-1043' },
          ],
        };
        const subject = `📊 Daily Counselling Briefing: ${summary.confirmedSessions} Sessions Scheduled Today`;
        const preheader = `Today's briefing: ${summary.totalBookingsToday} bookings, ${summary.confirmedSessions} confirmed.`;
        const listHtml = (summary.bookingsList || [])
          .map(
            (b) => `
            <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
              <td style="padding: 10px 8px; font-size: 13px; font-weight: bold; color: #FFFFFF;">${b.name}</td>
              <td style="padding: 10px 8px; font-size: 12px; color: #F5D061; font-family: monospace;">${b.time}</td>
              <td style="padding: 10px 8px; font-size: 12px; color: #CBD5E1;">${b.service}</td>
              <td style="padding: 10px 8px; font-size: 11px; color: #94A3B8; font-family: monospace;">${b.ticket}</td>
            </tr>`
          )
          .join('');

        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #F5D061; font-weight: 800;">
            Today's Executive Booking Briefing
          </h2>
          <div style="display: flex; gap: 12px; margin: 20px 0;">
            <div style="flex: 1; background-color: #07152B; border: 1px solid rgba(212, 175, 55, 0.3); padding: 14px; border-radius: 8px; text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: #F5D061;">${summary.totalBookingsToday}</div>
              <div style="font-size: 11px; color: #94A3B8; text-transform: uppercase;">Total Today</div>
            </div>
            <div style="flex: 1; background-color: #07152B; border: 1px solid #10B981; padding: 14px; border-radius: 8px; text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: #34D399;">${summary.confirmedSessions}</div>
              <div style="font-size: 11px; color: #94A3B8; text-transform: uppercase;">Confirmed</div>
            </div>
            <div style="flex: 1; background-color: #07152B; border: 1px solid #F59E0B; padding: 14px; border-radius: 8px; text-align: center;">
              <div style="font-size: 24px; font-weight: 900; color: #FBBF24;">${summary.pendingReviews}</div>
              <div style="font-size: 11px; color: #94A3B8; text-transform: uppercase;">Pending</div>
            </div>
          </div>

          <h3 style="font-size: 14px; color: #E2E8F0; text-transform: uppercase; margin: 24px 0 12px 0; font-family: monospace;">
            Scheduled Roster:
          </h3>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #07152B; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
            <thead>
              <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.2); background-color: #040D1A;">
                <th style="padding: 10px 8px; text-align: left; font-size: 11px; color: #94A3B8; text-transform: uppercase;">Student</th>
                <th style="padding: 10px 8px; text-align: left; font-size: 11px; color: #94A3B8; text-transform: uppercase;">Time</th>
                <th style="padding: 10px 8px; text-align: left; font-size: 11px; color: #94A3B8; text-transform: uppercase;">Service</th>
                <th style="padding: 10px 8px; text-align: left; font-size: 11px; color: #94A3B8; text-transform: uppercase;">Ticket</th>
              </tr>
            </thead>
            <tbody>
              ${listHtml}
            </tbody>
          </table>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      // 12. Admin: Weekly Report
      case 'ADMIN_WEEKLY_REPORT': {
        const stats = payload.summaryData?.weeklyStats || {
          total: 42,
          attended: 39,
          satisfactionRate: '98.4%',
          topStream: 'Defence / NDA Aspirants',
        };
        const subject = `📈 CareerCounsellingHub Weekly Performance Report`;
        const preheader = `Weekly metrics: ${stats.total} sessions conducted, ${stats.satisfactionRate} satisfaction rate.`;
        const body = `
          <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #F5D061; font-weight: 800;">
            Weekly Platform Guidance Intelligence
          </h2>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #07152B; padding: 20px; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.3);">
            <tr>
              <td style="padding: 8px 0; color: #94A3B8;">Total Consultations:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #FFFFFF;">${stats.total}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94A3B8;">Completed Sessions:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #34D399;">${stats.attended}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94A3B8;">Satisfaction Rating:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #F5D061;">${stats.satisfactionRate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94A3B8;">Top Guidance Domain:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #60A5FA;">${stats.topStream}</td>
            </tr>
          </table>
        `;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }

      default: {
        const subject = `CareerCounsellingHub Notification`;
        const preheader = `Official update regarding your appointment.`;
        const body = `<p style="color: #FFFFFF;">${data.notes || 'Please visit the portal for details.'}</p>`;
        return { subject, preheader, html: this.wrapEmailHtml(subject, preheader, body) };
      }
    }
  }

  /**
   * Main dispatch method using Resend API with exponential retry
   */
  public async sendEmail(payload: EmailDispatchPayload): Promise<EmailDispatchResult> {
    const startTime = performance.now();
    const { subject, html } = this.generateTemplate(payload);
    const recipients = Array.isArray(payload.to) ? payload.to : [payload.to];
    const targetRecipient = recipients[0] || 'student@example.com';
    const bookingId = payload.bookingData?.id;

    logger.info('EMAIL', 'EMAIL_DISPATCH_START', `Initiating email dispatch [${payload.template}] to ${targetRecipient}`, {
      template: payload.template,
      recipient: targetRecipient,
      hasIcs: !!payload.icsAttachment,
    }, bookingId, targetRecipient);

    // If Resend API Key is configured, make real API call with retry
    if (this.resendClient) {
      const retryResult = await executeWithRetry(
        async (attempt) => {
          const attachments = payload.icsAttachment
            ? [
                {
                  filename: payload.icsAttachment.filename,
                  content: Buffer.from(payload.icsAttachment.content).toString('base64'),
                },
              ]
            : undefined;

          // Determine initial sender
          let sender = this.fromEmail;
          // If the user specified a gmail.com address as fromEmail, Resend requires verified domain or onboarding@resend.dev
          if (sender.toLowerCase().includes('@gmail.com') || sender.toLowerCase().includes('@yahoo.com')) {
            sender = 'Career Counselling Hub <onboarding@resend.dev>';
          }

          let response = await this.resendClient!.emails.send({
            from: sender,
            replyTo: this.adminEmail,
            to: recipients,
            subject: payload.customSubject || subject,
            html: html,
            attachments: attachments as any,
            headers: {
              'X-Entity-Ref-ID': bookingId || 'cch_booking',
            },
          });

          // If there is a domain verification error, fallback to onboarding@resend.dev
          if (response.error && (response.error.message.includes('domain') || response.error.message.includes('from'))) {
            response = await this.resendClient!.emails.send({
              from: 'Career Counselling Hub <onboarding@resend.dev>',
              replyTo: this.adminEmail,
              to: recipients,
              subject: payload.customSubject || subject,
              html: html,
              attachments: attachments as any,
              headers: {
                'X-Entity-Ref-ID': bookingId || 'cch_booking',
              },
            });
          }

          if (response.error) {
            throw new Error(`Resend API Error: ${response.error.message}`);
          }

          return response.data?.id || `resend_${Date.now()}`;
        },
        {
          maxRetries: 3,
          channel: 'EMAIL',
          operationName: `ResendEmail_${payload.template}`,
          bookingId,
        }
      );

      const duration = performance.now() - startTime;
      if (retryResult.success && retryResult.result) {
        logger.info('EMAIL', 'EMAIL_DELIVERED', `Email successfully sent via Resend API [ID: ${retryResult.result}]`, {
          resendId: retryResult.result,
          durationMs: duration,
        }, bookingId, targetRecipient);

        return {
          id: retryResult.result,
          status: 'SENT',
          recipient: targetRecipient,
          template: payload.template,
          subject: payload.customSubject || subject,
          timestamp: new Date().toISOString(),
        };
      } else {
        logger.error('EMAIL', 'EMAIL_FAILED', `Failed to send email via Resend API after ${retryResult.attempts} attempts`, retryResult.error, {
          template: payload.template,
        }, bookingId, targetRecipient);

        return {
          id: `fail_${Date.now()}`,
          status: 'FAILED',
          recipient: targetRecipient,
          template: payload.template,
          subject: payload.customSubject || subject,
          timestamp: new Date().toISOString(),
          error: retryResult.error?.message || 'Unknown Resend dispatch error',
        };
      }
    }

    // In Development / Preview sandbox when Resend API Key is not yet populated
    const duration = performance.now() - startTime;
    logger.info('EMAIL', 'EMAIL_SIMULATED', `Simulated Resend API dispatch for ${payload.template} to ${targetRecipient} (Configure RESEND_API_KEY for live delivery)`, {
      template: payload.template,
      durationMs: duration,
    }, bookingId, targetRecipient);

    return {
      id: `sim_resend_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      status: 'SIMULATED',
      recipient: targetRecipient,
      template: payload.template,
      subject: payload.customSubject || subject,
      timestamp: new Date().toISOString(),
    };
  }
}

export const emailService = new EmailService();
