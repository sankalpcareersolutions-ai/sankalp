/**
 * CareerCounsellingHub - Google Calendar Service
 * Generates RFC 5545 standard .ics iCalendar files, invites student and admin,
 * and builds direct one-click Google Calendar web synchronization links.
 */

import { logger } from './logger';

export interface CalendarEventPayload {
  bookingId: string;
  studentName: string;
  studentEmail: string;
  adminEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM" or "14:00" or "04:30 PM"
  serviceType: string;
  meetLink: string;
  notes?: string;
  durationMinutes?: number;
}

export interface CalendarEventResult {
  icsContent: string;
  googleCalendarUrl: string;
  eventUid: string;
  startTimeIso: string;
  endTimeIso: string;
}

export class GoogleCalendarService {
  private companyName = 'CareerCounsellingHub';
  private defaultOrganizerEmail = process.env.ADMIN_EMAIL || 'sankalpcareersolutions@gmail.com';

  /**
   * Helper to parse user date ("YYYY-MM-DD") and time string ("10:00 AM", "02:30 PM", "14:00")
   * into a proper start and end Date object in Asia/Kolkata (IST, UTC+5:30)
   */
  public parseSlotToDates(dateStr: string, timeStr: string, durationMinutes: number = 45): { startDate: Date; endDate: Date } {
    let hours = 10;
    let minutes = 0;

    const timeClean = (timeStr || '').trim().toUpperCase();
    const match12 = timeClean.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)?/i);

    if (match12) {
      let h = parseInt(match12[1], 10);
      const m = match12[2] ? parseInt(match12[2], 10) : 0;
      const meridiem = match12[3];

      if (meridiem === 'PM' && h < 12) h += 12;
      if (meridiem === 'AM' && h === 12) h = 0;
      hours = h;
      minutes = m;
    }

    // Default or parsed date
    const [year, month, day] = (dateStr || '').split('-').map(num => parseInt(num, 10));
    const now = new Date();
    const validYear = year && !isNaN(year) ? year : now.getFullYear();
    const validMonth = month && !isNaN(month) ? month - 1 : now.getMonth();
    const validDay = day && !isNaN(day) ? day : now.getDate();

    const startDate = new Date(Date.UTC(validYear, validMonth, validDay, hours - 5, minutes - 30)); // adjust to UTC from IST (+5:30)
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    return { startDate, endDate };
  }

  /**
   * Formats a Date into standard UTC iCal format: YYYYMMDDTHHMMSSZ
   */
  private formatIcsDate(d: Date): string {
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  /**
   * Creates an RFC 5545 compliant .ics calendar file payload with alarms and attendees
   */
  public createCalendarEvent(payload: CalendarEventPayload): CalendarEventResult {
    const startTime = performance.now();
    const { startDate, endDate } = this.parseSlotToDates(payload.date, payload.time, payload.durationMinutes || 45);
    const uid = `counselling_${payload.bookingId}_${Date.now()}@careercounsellinghub.com`;
    const startIcs = this.formatIcsDate(startDate);
    const endIcs = this.formatIcsDate(endDate);
    const nowIcs = this.formatIcsDate(new Date());

    const title = `1:1 Career Counselling: ${payload.studentName} | CareerCounsellingHub`;
    const description = `1:1 Career Guidance & Mentorship Session\\n\\n` +
      `Student: ${payload.studentName} (${payload.studentEmail})\\n` +
      `Service: ${payload.serviceType}\\n` +
      `Booking ID: ${payload.bookingId}\\n` +
      `Google Meet Link: ${payload.meetLink}\\n\\n` +
      `Join on time via Google Meet: ${payload.meetLink}\\n` +
      `CareerCounsellingHub - India's Premier Career Guidance Platform`;

    // Standard RFC 5545 .ics representation with reminders
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CareerCounsellingHub//Counselling Scheduler//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${nowIcs}`,
      `DTSTART:${startIcs}`,
      `DTEND:${endIcs}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${payload.meetLink}`,
      `STATUS:CONFIRMED`,
      `ORGANIZER;CN="${this.companyName}":mailto:${this.defaultOrganizerEmail}`,
      `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${payload.studentName}:mailto:${payload.studentEmail}`,
      `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="Admin Team":mailto:${payload.adminEmail || this.defaultOrganizerEmail}`,
      // 24 Hour Reminder Alarm
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Career Counselling Session in 24 Hours',
      'END:VALARM',
      // 1 Hour Reminder Alarm
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Career Counselling Session in 1 Hour - Prepare your questions',
      'END:VALARM',
      // 15 Min Reminder Alarm
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:AUDIO',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    const icsContent = icsLines.join('\r\n');

    // Direct Google Calendar Add Event Web URL
    const gCalParams = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${startIcs}/${endIcs}`,
      details: description.replace(/\\n/g, '\n'),
      location: payload.meetLink,
      add: `${payload.studentEmail},${payload.adminEmail || this.defaultOrganizerEmail}`,
    });
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?${gCalParams.toString()}`;

    const duration = performance.now() - startTime;
    logger.info('CALENDAR', 'CALENDAR_EVENT_CREATED', `Created calendar event and ICS for booking ${payload.bookingId}`, {
      uid,
      date: payload.date,
      time: payload.time,
      meetLink: payload.meetLink,
    }, payload.bookingId, payload.studentEmail);
    logger.performance('CREATE_CALENDAR_EVENT', duration, { bookingId: payload.bookingId });

    return {
      icsContent,
      googleCalendarUrl,
      eventUid: uid,
      startTimeIso: startDate.toISOString(),
      endTimeIso: endDate.toISOString(),
    };
  }
}

export const googleCalendarService = new GoogleCalendarService();
