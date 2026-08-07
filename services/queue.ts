/**
 * CareerCounsellingHub - Notification Queue & Orchestrator
 * Asynchronous job processor for reliable multi-channel transactional dispatches.
 */

import { logger } from './logger';
import { emailService, EmailTemplateType } from './email';
import { whatsAppService, WhatsAppMessageType } from './whatsapp';
import { storeService, StoredAppointment } from './store';

export interface QueueJob {
  id: string;
  bookingId: string;
  type: 'BOOKING_CREATED' | 'BOOKING_APPROVED' | 'BOOKING_RESCHEDULED' | 'BOOKING_CANCELLED' | 'REMINDER_24H' | 'REMINDER_1H' | 'FEEDBACK_REQUEST' | 'MANUAL_RESEND';
  data: StoredAppointment;
  extra?: {
    cancellationReason?: string;
    rescheduledFrom?: { date: string; time: string };
    customMessage?: string;
  };
  addedAt: string;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  retryCount: number;
}

export interface JobExecutionResult {
  emailStatus: 'PENDING' | 'SENT' | 'DELIVERED' | 'SIMULATED' | 'FAILED';
  whatsappStatus: 'PENDING' | 'SENT' | 'DELIVERED' | 'SIMULATED' | 'FAILED';
  lastEmailId?: string;
  lastWhatsAppId?: string;
  studentEmailResult?: any;
  studentWaResult?: any;
  adminEmailResult?: any;
  adminWaResult?: any;
  errors?: string[];
}

class NotificationQueueService {
  private queue: QueueJob[] = [];
  private isProcessing: boolean = false;

  public async processJobImmediate(
    type: QueueJob['type'],
    appointment: StoredAppointment,
    extra?: QueueJob['extra']
  ): Promise<{
    job: QueueJob;
    results: JobExecutionResult;
  }> {
    const job: QueueJob = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      bookingId: appointment.id,
      type,
      data: appointment,
      extra,
      addedAt: new Date().toISOString(),
      status: 'PROCESSING',
      retryCount: 0,
    };

    logger.info('SYSTEM', 'QUEUE_JOB_IMMEDIATE_START', `Executing immediate notification job ${job.id} [${type}] for ${appointment.name}`, {
      jobId: job.id,
      type,
      bookingId: appointment.id,
    }, appointment.id, appointment.email);

    const startTime = performance.now();
    try {
      const results = await this.executeJob(job, appointment);
      job.status = 'COMPLETED';
      const duration = performance.now() - startTime;
      logger.performance(`JOB_IMMEDIATE_${job.type}`, duration, { jobId: job.id, bookingId: job.bookingId });
      return { job, results };
    } catch (err: any) {
      job.status = 'FAILED';
      logger.error('SYSTEM', 'JOB_IMMEDIATE_FAILED', `Immediate job ${job.id} execution failed`, err, { jobId: job.id }, job.bookingId);
      return {
        job,
        results: {
          emailStatus: 'FAILED',
          whatsappStatus: 'FAILED',
          errors: [err.message || 'Job execution failed'],
        },
      };
    }
  }

  public addJob(
    type: QueueJob['type'],
    appointment: StoredAppointment,
    extra?: QueueJob['extra']
  ): QueueJob {
    const job: QueueJob = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      bookingId: appointment.id,
      type,
      data: appointment,
      extra,
      addedAt: new Date().toISOString(),
      status: 'QUEUED',
      retryCount: 0,
    };

    this.queue.push(job);
    logger.info('SYSTEM', 'QUEUE_JOB_ADDED', `Queued notification job ${job.id} [${type}] for ${appointment.name}`, {
      jobId: job.id,
      type,
      bookingId: appointment.id,
    }, appointment.id, appointment.email);

    // Trigger non-blocking asynchronous processor
    this.processQueue().catch((err) => {
      logger.error('SYSTEM', 'QUEUE_PROCESSOR_ERROR', 'Queue processor encountered an unexpected error', err);
    });

    return job;
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      if (!job) break;

      job.status = 'PROCESSING';
      const appt = storeService.getAppointmentById(job.bookingId) || job.data;
      const startTime = performance.now();

      try {
        await this.executeJob(job, appt);
        job.status = 'COMPLETED';
      } catch (err: any) {
        job.status = 'FAILED';
        logger.error('SYSTEM', 'JOB_EXECUTION_FAILED', `Job ${job.id} execution failed`, err, { jobId: job.id }, job.bookingId);
      }

      const duration = performance.now() - startTime;
      logger.performance(`JOB_${job.type}`, duration, { jobId: job.id, bookingId: job.bookingId });
    }

    this.isProcessing = false;
  }

  private async executeJob(job: QueueJob, appt: StoredAppointment): Promise<JobExecutionResult> {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_EMail || 'sankalpcareersolutions@gmail.com';
    const adminPhone = process.env.ADMIN_PHONE || process.env.META_WHATSAPP_PHONE || '+918528335708';

    const bookingPayload = {
      id: appt.id,
      ticketNumber: appt.ticketNumber,
      studentName: appt.name,
      studentEmail: appt.email,
      mobileNumber: appt.mobileNumber,
      city: appt.city || appt.state || 'Not specified',
      state: appt.state,
      currentClass: appt.currentClass || appt.stream || 'Not specified',
      careerInterest: appt.careerInterest || appt.counsellingType || 'General Career Counselling',
      counsellingMode: appt.counsellingType || 'Online Video 1:1',
      serviceType: appt.careerInterest || appt.counsellingType || 'General Career Mentorship',
      date: appt.preferredDate,
      time: appt.preferredTime,
      message: appt.questions || '',
      questions: appt.questions || '',
      submittedAt: appt.createdAt ? new Date(appt.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      meetLink: appt.meetLink,
      stream: appt.stream,
      schoolCollege: appt.schoolCollege,
      parentName: appt.parentName,
      parentContact: appt.parentContact,
      cancellationReason: job.extra?.cancellationReason,
      rescheduledFrom: job.extra?.rescheduledFrom,
    };

    const icsAttachment = appt.icsContent
      ? {
          filename: `CareerCounselling_${appt.ticketNumber}.ics`,
          content: appt.icsContent,
        }
      : undefined;

    switch (job.type) {
      // 1. New Booking Created
      case 'BOOKING_CREATED': {
        const [studentEmailRes, studentWaRes, adminEmailRes, adminWaRes] = await Promise.allSettled([
          // (a) Send Email to Student
          emailService.sendEmail({
            to: appt.email,
            template: 'APPOINTMENT_CONFIRMATION',
            bookingData: bookingPayload,
            icsAttachment,
          }),
          // (b) Send WhatsApp to Student
          whatsAppService.sendMessage({
            to: appt.mobileNumber,
            type: 'BOOKING_CONFIRMATION',
            bookingData: bookingPayload,
          }),
          // (c) Send Alert Email to Admin
          emailService.sendEmail({
            to: adminEmail,
            template: 'ADMIN_NEW_BOOKING',
            bookingData: bookingPayload,
          }),
          // (d) Send Alert WhatsApp to Admin
          whatsAppService.sendMessage({
            to: adminPhone,
            type: 'ADMIN_ALERT',
            bookingData: bookingPayload,
          }),
        ]);

        const emailResult = studentEmailRes.status === 'fulfilled' ? studentEmailRes.value : null;
        const waResult = studentWaRes.status === 'fulfilled' ? studentWaRes.value : null;
        const adminEmailResult = adminEmailRes.status === 'fulfilled' ? adminEmailRes.value : null;
        const adminWaResult = adminWaRes.status === 'fulfilled' ? adminWaRes.value : null;

        // Update Store Status
        storeService.updateAppointment(appt.id, {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          lastNotificationAt: new Date().toISOString(),
        });

        if (emailResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.email,
            channel: 'EMAIL',
            type: 'APPOINTMENT_CONFIRMATION',
            status: emailResult.status,
            details: `Subject: ${emailResult.subject}`,
          });
        }

        if (waResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.mobileNumber,
            channel: 'WHATSAPP',
            type: 'BOOKING_CONFIRMATION',
            status: waResult.status,
            details: `Msg: ${waResult.messageContent?.substring(0, 60) || 'Sent'}...`,
          });
        }

        return {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          studentEmailResult: emailResult,
          studentWaResult: waResult,
          adminEmailResult,
          adminWaResult,
        };
      }

      // 2. Booking Approved (With Google Meet Link)
      case 'BOOKING_APPROVED': {
        const [studentEmailRes, studentWaRes] = await Promise.allSettled([
          emailService.sendEmail({
            to: appt.email,
            template: 'APPOINTMENT_APPROVED',
            bookingData: bookingPayload,
            icsAttachment,
          }),
          whatsAppService.sendMessage({
            to: appt.mobileNumber,
            type: 'APPROVAL',
            bookingData: bookingPayload,
          }),
        ]);

        const emailResult = studentEmailRes.status === 'fulfilled' ? studentEmailRes.value : null;
        const waResult = studentWaRes.status === 'fulfilled' ? studentWaRes.value : null;

        storeService.updateAppointment(appt.id, {
          status: 'APPROVED',
          meetStatus: 'SHARED',
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastNotificationAt: new Date().toISOString(),
        });

        if (emailResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.email,
            channel: 'EMAIL',
            type: 'APPOINTMENT_APPROVED',
            status: emailResult.status,
            details: `Meet link shared: ${appt.meetLink}`,
          });
        }

        if (waResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.mobileNumber,
            channel: 'WHATSAPP',
            type: 'APPROVAL',
            status: waResult.status,
            details: `WhatsApp approval with Google Meet link`,
          });
        }

        return {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          studentEmailResult: emailResult,
          studentWaResult: waResult,
        };
      }

      // 3. Booking Rescheduled
      case 'BOOKING_RESCHEDULED': {
        const [studentEmailRes, studentWaRes, adminEmailRes] = await Promise.allSettled([
          emailService.sendEmail({
            to: appt.email,
            template: 'APPOINTMENT_RESCHEDULED',
            bookingData: bookingPayload,
            icsAttachment,
          }),
          whatsAppService.sendMessage({
            to: appt.mobileNumber,
            type: 'RESCHEDULE',
            bookingData: bookingPayload,
          }),
          emailService.sendEmail({
            to: adminEmail,
            template: 'ADMIN_RESCHEDULE',
            bookingData: bookingPayload,
          }),
        ]);

        const emailResult = studentEmailRes.status === 'fulfilled' ? studentEmailRes.value : null;
        const waResult = studentWaRes.status === 'fulfilled' ? studentWaRes.value : null;
        const adminEmailResult = adminEmailRes.status === 'fulfilled' ? adminEmailRes.value : null;

        storeService.updateAppointment(appt.id, {
          status: 'RESCHEDULED',
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastNotificationAt: new Date().toISOString(),
        });

        if (emailResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.email,
            channel: 'EMAIL',
            type: 'APPOINTMENT_RESCHEDULED',
            status: emailResult.status,
          });
        }

        return {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          studentEmailResult: emailResult,
          studentWaResult: waResult,
          adminEmailResult,
        };
      }

      // 4. Booking Cancelled
      case 'BOOKING_CANCELLED': {
        const [studentEmailRes, studentWaRes, adminEmailRes] = await Promise.allSettled([
          emailService.sendEmail({
            to: appt.email,
            template: 'APPOINTMENT_CANCELLED',
            bookingData: bookingPayload,
          }),
          whatsAppService.sendMessage({
            to: appt.mobileNumber,
            type: 'CANCELLATION',
            bookingData: bookingPayload,
          }),
          emailService.sendEmail({
            to: adminEmail,
            template: 'ADMIN_CANCELLATION',
            bookingData: bookingPayload,
          }),
        ]);

        const emailResult = studentEmailRes.status === 'fulfilled' ? studentEmailRes.value : null;
        const waResult = studentWaRes.status === 'fulfilled' ? studentWaRes.value : null;
        const adminEmailResult = adminEmailRes.status === 'fulfilled' ? adminEmailRes.value : null;

        storeService.updateAppointment(appt.id, {
          status: 'CANCELLED',
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastNotificationAt: new Date().toISOString(),
        });

        if (emailResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.email,
            channel: 'EMAIL',
            type: 'APPOINTMENT_CANCELLED',
            status: emailResult.status,
          });
        }

        return {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          studentEmailResult: emailResult,
          studentWaResult: waResult,
          adminEmailResult,
        };
      }

      // 5. 24 Hour Reminder
      case 'REMINDER_24H': {
        const [emailRes, waRes] = await Promise.allSettled([
          emailService.sendEmail({
            to: appt.email,
            template: 'REMINDER_24H',
            bookingData: bookingPayload,
            icsAttachment,
          }),
          whatsAppService.sendMessage({
            to: appt.mobileNumber,
            type: 'REMINDER_24H',
            bookingData: bookingPayload,
          }),
        ]);

        const emailResult = emailRes.status === 'fulfilled' ? emailRes.value : null;
        const waResult = waRes.status === 'fulfilled' ? waRes.value : null;

        if (emailResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.email,
            channel: 'EMAIL',
            type: 'REMINDER_24H',
            status: emailResult.status,
          });
        }

        if (waResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.mobileNumber,
            channel: 'WHATSAPP',
            type: 'REMINDER_24H',
            status: waResult.status,
          });
        }

        return {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          studentEmailResult: emailResult,
          studentWaResult: waResult,
        };
      }

      // 6. 1 Hour Reminder
      case 'REMINDER_1H': {
        const [emailRes, waRes] = await Promise.allSettled([
          emailService.sendEmail({
            to: appt.email,
            template: 'REMINDER_1H',
            bookingData: bookingPayload,
          }),
          whatsAppService.sendMessage({
            to: appt.mobileNumber,
            type: 'REMINDER_1H',
            bookingData: bookingPayload,
          }),
        ]);

        const emailResult = emailRes.status === 'fulfilled' ? emailRes.value : null;
        const waResult = waRes.status === 'fulfilled' ? waRes.value : null;

        if (emailResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.email,
            channel: 'EMAIL',
            type: 'REMINDER_1H',
            status: emailResult.status,
          });
        }

        if (waResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.mobileNumber,
            channel: 'WHATSAPP',
            type: 'REMINDER_1H',
            status: waResult.status,
          });
        }

        return {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          studentEmailResult: emailResult,
          studentWaResult: waResult,
        };
      }

      // 7. Feedback Request
      case 'FEEDBACK_REQUEST': {
        const [emailRes, waRes] = await Promise.allSettled([
          emailService.sendEmail({
            to: appt.email,
            template: 'FEEDBACK_REQUEST',
            bookingData: bookingPayload,
          }),
          whatsAppService.sendMessage({
            to: appt.mobileNumber,
            type: 'FEEDBACK_REQUEST',
            bookingData: bookingPayload,
          }),
        ]);

        const emailResult = emailRes.status === 'fulfilled' ? emailRes.value : null;
        const waResult = waRes.status === 'fulfilled' ? waRes.value : null;

        if (emailResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.email,
            channel: 'EMAIL',
            type: 'FEEDBACK_REQUEST',
            status: emailResult.status,
          });
        }

        return {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          studentEmailResult: emailResult,
          studentWaResult: waResult,
        };
      }

      // 8. Manual Resend
      case 'MANUAL_RESEND': {
        const [emailRes, waRes] = await Promise.allSettled([
          emailService.sendEmail({
            to: appt.email,
            template: appt.status === 'APPROVED' ? 'APPOINTMENT_APPROVED' : 'APPOINTMENT_CONFIRMATION',
            bookingData: bookingPayload,
            icsAttachment,
          }),
          whatsAppService.sendMessage({
            to: appt.mobileNumber,
            type: appt.status === 'APPROVED' ? 'APPROVAL' : 'BOOKING_CONFIRMATION',
            bookingData: bookingPayload,
          }),
        ]);

        const emailResult = emailRes.status === 'fulfilled' ? emailRes.value : null;
        const waResult = waRes.status === 'fulfilled' ? waRes.value : null;

        storeService.updateAppointment(appt.id, {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          retryCount: appt.retryCount + 1,
          lastNotificationAt: new Date().toISOString(),
        });

        if (emailResult) {
          storeService.logNotification({
            bookingId: appt.id,
            ticketNumber: appt.ticketNumber,
            recipient: appt.email,
            channel: 'EMAIL',
            type: 'MANUAL_RESEND',
            status: emailResult.status,
          });
        }

        return {
          emailStatus: emailResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          whatsappStatus: waResult?.status === 'FAILED' ? 'FAILED' : 'SENT',
          lastEmailId: emailResult?.id,
          lastWhatsAppId: waResult?.id,
          studentEmailResult: emailResult,
          studentWaResult: waResult,
        };
      }

      default: {
        return {
          emailStatus: 'SENT',
          whatsappStatus: 'SENT',
        };
      }
    }
  }
}

export const notificationQueue = new NotificationQueueService();
