/**
 * CareerCounsellingHub - Meta WhatsApp Cloud API Service
 * Official Meta Graph API integration for high-deliverability WhatsApp transactional messaging.
 */

import { logger } from './logger';
import { executeWithRetry } from './retry';

export type WhatsAppMessageType =
  | 'BOOKING_CONFIRMATION'
  | 'REMINDER_24H'
  | 'REMINDER_1H'
  | 'APPROVAL'
  | 'CANCELLATION'
  | 'RESCHEDULE'
  | 'GOOGLE_MEET_LINK'
  | 'FEEDBACK_REQUEST'
  | 'ADMIN_ALERT';

export interface WhatsAppDispatchPayload {
  to: string; // Phone number in international format, e.g., "+919876543210" or "919876543210"
  type: WhatsAppMessageType;
  bookingData: {
    id: string;
    ticketNumber?: string;
    studentName: string;
    studentEmail?: string;
    mobileNumber?: string;
    date: string;
    time: string;
    serviceType?: string;
    careerInterest?: string;
    meetLink?: string;
    cancellationReason?: string;
    rescheduledFrom?: { date: string; time: string };
  };
  customMessage?: string;
}

export interface WhatsAppDispatchResult {
  id: string;
  status: 'SENT' | 'SIMULATED' | 'FAILED';
  recipient: string;
  type: WhatsAppMessageType;
  timestamp: string;
  error?: string;
  messageContent: string;
}

export class WhatsAppService {
  private metaToken: string;
  private phoneNumberId: string;
  private apiVersion: string = 'v21.0';
  private adminPhone: string;
  private websiteUrl: string;

  constructor() {
    this.metaToken = process.env.META_WHATSAPP_TOKEN || '';
    this.phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID || process.env.META_WHATSAPP_PHONE || '';
    this.adminPhone = process.env.ADMIN_PHONE || process.env.META_WHATSAPP_PHONE || '+918528335708';
    this.websiteUrl = process.env.WEBSITE_URL || 'https://www.careercounsellinghub.com';
  }

  /**
   * Sanitizes phone number to standard E.164 digits format (e.g. 919876543210)
   */
  public sanitizePhoneNumber(phone: string): string {
    let clean = (phone || '').replace(/\D/g, '');
    if (clean.length === 10) {
      // Default to India country code 91 if 10 digits provided
      clean = '91' + clean;
    }
    return clean;
  }

  /**
   * Formats clean, high-impact conversational WhatsApp messages
   */
  public formatMessage(payload: WhatsAppDispatchPayload): string {
    const data = payload.bookingData;
    const ticket = data.ticketNumber || data.id.substring(0, 8).toUpperCase();
    const service = data.careerInterest || data.serviceType || 'General Career Mentorship';

    switch (payload.type) {
      case 'BOOKING_CONFIRMATION':
        return `🎓 *CAREER COUNSELLING HUB* - Booking Request Received\n\n` +
          `Dear *${data.studentName}*,\n` +
          `Your 1:1 career mentorship appointment has been registered.\n\n` +
          `📋 *Booking Ref:* ${ticket}\n` +
          `📅 *Date:* ${data.date}\n` +
          `⏰ *Time:* ${data.time} (IST)\n` +
          `🎯 *Focus Area:* ${service}\n\n` +
          `ℹ️ *Next Step:* Our Senior Mentor is reviewing your slot. Once approved, you will receive your *Google Meet 1:1 Link* right here on WhatsApp.\n\n` +
          `Explore Career Roadmaps: ${this.websiteUrl}`;

      case 'APPROVAL':
        return `🎉 *APPOINTMENT CONFIRMED & APPROVED!*\n\n` +
          `Dear *${data.studentName}*,\n` +
          `Great news! Your 1:1 Career Guidance session with our Senior Mentor is confirmed.\n\n` +
          `📋 *Ticket ID:* ${ticket}\n` +
          `📅 *Date:* ${data.date}\n` +
          `⏰ *Time:* ${data.time} (IST)\n` +
          `🎯 *Stream:* ${service}\n\n` +
          `📹 *Your 1:1 Google Meet Link:*\n${data.meetLink || 'Will be shared 15m prior'}\n\n` +
          `💡 *Instructions:* Please join 5 mins before time in a quiet environment. Keep your academic marksheets and career questions ready.`;

      case 'REMINDER_24H':
        return `⏰ *24-HOUR REMINDER: Counselling Session Tomorrow*\n\n` +
          `Hi *${data.studentName}*,\n` +
          `This is a reminder that your 1:1 Career Guidance Consultation is scheduled for tomorrow:\n\n` +
          `📅 *Date:* ${data.date}\n` +
          `⏰ *Time:* ${data.time} (IST)\n` +
          `📹 *Google Meet:* ${data.meetLink || 'Active at slot time'}\n\n` +
          `We look forward to guiding your higher education and defence career roadmap!`;

      case 'REMINDER_1H':
        return `🚨 *STARTING IN 1 HOUR!*\n\n` +
          `Hi *${data.studentName}*,\n` +
          `Your 1:1 Career Guidance session with our Senior Mentor starts in *60 minutes* (${data.time}).\n\n` +
          `👉 *Click to Join Google Meet:*\n${data.meetLink}\n\n` +
          `See you inside the session!`;

      case 'RESCHEDULE':
        return `🔄 *SESSION RESCHEDULED: New Slot Confirmed*\n\n` +
          `Dear *${data.studentName}*,\n` +
          `Your counselling appointment [${ticket}] has been rescheduled to:\n\n` +
          `📅 *New Date:* ${data.date}\n` +
          `⏰ *New Time:* ${data.time} (IST)\n` +
          `📹 *Google Meet Link:* ${data.meetLink || 'Same meeting room'}\n\n` +
          `Need help? Reply directly to this WhatsApp number.`;

      case 'CANCELLATION':
        return `⚠️ *APPOINTMENT CANCELLED*\n\n` +
          `Dear *${data.studentName}*,\n` +
          `Your booking [${ticket}] for ${data.date} has been cancelled.\n` +
          (data.cancellationReason ? `Reason: ${data.cancellationReason}\n\n` : '\n') +
          `To pick a new convenient slot, visit: ${this.websiteUrl}`;

      case 'GOOGLE_MEET_LINK':
        return `📹 *YOUR 1:1 GOOGLE MEET SESSION LINK*\n\n` +
          `Dear *${data.studentName}*,\n` +
          `Here is your verified Google Meet link for your consultation on *${data.date} at ${data.time}*:\n\n` +
          `🔗 ${data.meetLink}\n\n` +
          `Please tap the link to join directly from your phone or laptop.`;

      case 'FEEDBACK_REQUEST':
        return `⭐ *HOW WAS YOUR COUNSELLING SESSION?*\n\n` +
          `Hi *${data.studentName}*,\n` +
          `We hope your 1:1 career session with CareerCounsellingHub gave you clear direction for your goals!\n\n` +
          `Please take 30 seconds to rate your experience:\n` +
          `⭐ Rate Here: ${this.websiteUrl}#feedback\n\n` +
          `Thank you for trusting CareerCounsellingHub!`;

      case 'ADMIN_ALERT':
        return `🔔 *ADMIN ALERT - New Booking on Portal*\n\n` +
          `Student: *${data.studentName}*\n` +
          `Slot: *${data.date} at ${data.time}*\n` +
          `Focus: ${service}\n` +
          `Contact: ${data.mobileNumber || 'N/A'} | ${data.studentEmail || 'N/A'}\n` +
          `Ticket: ${ticket}\n` +
          `Portal: ${this.websiteUrl}`;

      default:
        return payload.customMessage || `Update from CareerCounsellingHub for booking ${ticket}`;
    }
  }

  /**
   * Main dispatch method using Meta WhatsApp Cloud API with exponential retry
   */
  public async sendMessage(payload: WhatsAppDispatchPayload): Promise<WhatsAppDispatchResult> {
    const startTime = performance.now();
    const sanitizedTo = this.sanitizePhoneNumber(payload.to);
    const messageBody = this.formatMessage(payload);
    const bookingId = payload.bookingData.id;

    logger.info('WHATSAPP', 'WHATSAPP_DISPATCH_START', `Initiating WhatsApp message [${payload.type}] to ${sanitizedTo}`, {
      type: payload.type,
      recipient: sanitizedTo,
    }, bookingId, sanitizedTo);

    // If Meta WhatsApp Cloud API credentials are valid
    if (this.metaToken && this.phoneNumberId && !this.metaToken.includes('placeholder')) {
      const retryResult = await executeWithRetry(
        async (attempt) => {
          const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;
          const bodyPayload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: sanitizedTo,
            type: 'text',
            text: {
              preview_url: true,
              body: messageBody,
            },
          };

          const res = await fetch(url, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.metaToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyPayload),
          });

          const data = await res.json();
          if (!res.ok || data.error) {
            throw new Error(`Meta WhatsApp Cloud API Error (${res.status}): ${JSON.stringify(data.error || data)}`);
          }

          const messageId = data?.messages?.[0]?.id || `wa_${Date.now()}`;
          return messageId;
        },
        {
          maxRetries: 3,
          channel: 'WHATSAPP',
          operationName: `WhatsApp_${payload.type}`,
          bookingId,
        }
      );

      const duration = performance.now() - startTime;
      if (retryResult.success && retryResult.result) {
        logger.info('WHATSAPP', 'WHATSAPP_DELIVERED', `WhatsApp message successfully dispatched via Meta Cloud API [ID: ${retryResult.result}]`, {
          waMessageId: retryResult.result,
          durationMs: duration,
        }, bookingId, sanitizedTo);

        return {
          id: retryResult.result,
          status: 'SENT',
          recipient: sanitizedTo,
          type: payload.type,
          timestamp: new Date().toISOString(),
          messageContent: messageBody,
        };
      } else {
        logger.error('WHATSAPP', 'WHATSAPP_FAILED', `Failed to send WhatsApp via Meta API after ${retryResult.attempts} attempts`, retryResult.error, {
          type: payload.type,
        }, bookingId, sanitizedTo);

        return {
          id: `fail_wa_${Date.now()}`,
          status: 'FAILED',
          recipient: sanitizedTo,
          type: payload.type,
          timestamp: new Date().toISOString(),
          error: retryResult.error?.message || 'Meta Cloud API dispatch error',
          messageContent: messageBody,
        };
      }
    }

    // In Development / Preview sandbox when Meta credentials are not yet populated
    const duration = performance.now() - startTime;
    logger.info('WHATSAPP', 'WHATSAPP_SIMULATED', `Simulated WhatsApp dispatch for ${payload.type} to ${sanitizedTo} (Configure META_WHATSAPP_TOKEN & META_WHATSAPP_PHONE_NUMBER_ID for live delivery)`, {
      type: payload.type,
      durationMs: duration,
    }, bookingId, sanitizedTo);

    return {
      id: `sim_wa_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      status: 'SIMULATED',
      recipient: sanitizedTo,
      type: payload.type,
      timestamp: new Date().toISOString(),
      messageContent: messageBody,
    };
  }
}

export const whatsAppService = new WhatsAppService();
