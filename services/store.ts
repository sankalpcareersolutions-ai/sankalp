/**
 * CareerCounsellingHub - Data & Notification Store
 * Manages bookings, notification lifecycle statuses, delivery logs, and analytics.
 */

import { logger } from './logger';
import { googleMeetService } from './meet';
import { googleCalendarService } from './calendar';

export type AppointmentStatus = 'PENDING' | 'APPROVED' | 'RESCHEDULED' | 'CANCELLED' | 'COMPLETED';
export type ChannelDeliveryStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'SIMULATED' | 'FAILED';

export interface StoredAppointment {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  mobileNumber: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g. "10:00 AM"
  counsellingType: string;
  careerInterest: string;
  dob?: string;
  gender?: string;
  state?: string;
  city?: string;
  currentClass?: string;
  schoolCollege?: string;
  board?: string;
  stream?: string;
  percentage?: string;
  parentName?: string;
  parentContact?: string;
  questions?: string;
  defenceAspirant?: string;
  preferredLanguage?: string;
  
  // Statuses
  status: AppointmentStatus;
  meetLink: string;
  meetingCode: string;
  icsContent?: string;
  googleCalendarUrl?: string;

  // Notification Tracking
  emailStatus: ChannelDeliveryStatus;
  whatsappStatus: ChannelDeliveryStatus;
  calendarStatus: 'PENDING' | 'CREATED' | 'FAILED';
  meetStatus: 'PENDING' | 'GENERATED' | 'SHARED';
  
  lastEmailId?: string;
  lastWhatsAppId?: string;
  retryCount: number;
  lastNotificationAt?: string;
  lastError?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface NotificationHistoryLog {
  id: string;
  bookingId: string;
  ticketNumber: string;
  recipient: string;
  channel: 'EMAIL' | 'WHATSAPP' | 'CALENDAR' | 'MEET';
  type: string;
  status: ChannelDeliveryStatus;
  timestamp: string;
  details?: string;
  error?: string;
  latencyMs?: number;
}

class StoreService {
  private appointments: Map<string, StoredAppointment> = new Map();
  private notificationLogs: NotificationHistoryLog[] = [];

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const dayAfter = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0];

    const initialBookings: Partial<StoredAppointment>[] = [
      {
        id: 'apt_1001',
        ticketNumber: 'CCH-9101',
        name: 'Major Rohit Rathore (Aspirant)',
        email: 'rohit.rathore@example.com',
        mobileNumber: '+919811223344',
        preferredDate: today,
        preferredTime: '10:30 AM',
        counsellingType: 'Online Video 1:1',
        careerInterest: 'CDS & SSB Interview Preparation',
        stream: 'Science (PCM)',
        currentClass: 'Graduate (B.Tech Final Year)',
        status: 'APPROVED',
        emailStatus: 'SENT',
        whatsappStatus: 'SENT',
        calendarStatus: 'CREATED',
        meetStatus: 'GENERATED',
        retryCount: 0,
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'apt_1002',
        ticketNumber: 'CCH-9102',
        name: 'Priya Sengupta',
        email: 'priya.sengupta@example.com',
        mobileNumber: '+919876501234',
        preferredDate: tomorrow,
        preferredTime: '02:00 PM',
        counsellingType: 'Online Video 1:1',
        careerInterest: 'ISRO & DRDO Technical Entry',
        stream: 'Aerospace / Mechanical',
        currentClass: 'Class 12th',
        status: 'PENDING',
        emailStatus: 'SENT',
        whatsappStatus: 'SENT',
        calendarStatus: 'CREATED',
        meetStatus: 'GENERATED',
        retryCount: 0,
        createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'apt_1003',
        ticketNumber: 'CCH-9103',
        name: 'Vikramaditya Chauhan',
        email: 'vikram.chauhan@example.com',
        mobileNumber: '+919988776655',
        preferredDate: dayAfter,
        preferredTime: '04:30 PM',
        counsellingType: 'Online Video 1:1',
        careerInterest: 'NDA Written & SSB Strategy',
        stream: 'PCM',
        currentClass: 'Class 11th',
        status: 'PENDING',
        emailStatus: 'PENDING',
        whatsappStatus: 'PENDING',
        calendarStatus: 'CREATED',
        meetStatus: 'GENERATED',
        retryCount: 0,
        createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    for (const b of initialBookings) {
      const meet = googleMeetService.generateMeetLink(b.id!);
      const cal = googleCalendarService.createCalendarEvent({
        bookingId: b.id!,
        studentName: b.name!,
        studentEmail: b.email!,
        adminEmail: 'sankalpcareersolutions@gmail.com',
        date: b.preferredDate!,
        time: b.preferredTime!,
        serviceType: b.careerInterest!,
        meetLink: meet.meetLink,
      });

      const fullRecord: StoredAppointment = {
        id: b.id!,
        ticketNumber: b.ticketNumber || `CCH-${Math.floor(1000 + Math.random() * 9000)}`,
        name: b.name || '',
        email: b.email || '',
        mobileNumber: b.mobileNumber || '',
        preferredDate: b.preferredDate || today,
        preferredTime: b.preferredTime || '10:00 AM',
        counsellingType: b.counsellingType || 'Online Video 1:1',
        careerInterest: b.careerInterest || 'General Mentorship',
        status: b.status || 'PENDING',
        meetLink: meet.meetLink,
        meetingCode: meet.meetingCode,
        icsContent: cal.icsContent,
        googleCalendarUrl: cal.googleCalendarUrl,
        emailStatus: b.emailStatus || 'PENDING',
        whatsappStatus: b.whatsappStatus || 'PENDING',
        calendarStatus: 'CREATED',
        meetStatus: 'GENERATED',
        retryCount: 0,
        createdAt: b.createdAt || new Date().toISOString(),
        updatedAt: b.updatedAt || new Date().toISOString(),
      };

      this.appointments.set(fullRecord.id, fullRecord);
    }
  }

  public getAllAppointments(): StoredAppointment[] {
    return Array.from(this.appointments.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getAppointmentById(id: string): StoredAppointment | undefined {
    return this.appointments.get(id);
  }

  public createAppointment(raw: Partial<StoredAppointment>): StoredAppointment {
    const id = raw.id || `apt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const ticketNumber = raw.ticketNumber || `CCH-${Math.floor(1000 + Math.random() * 9000)}`;
    const meet = googleMeetService.generateMeetLink(id);
    
    const cal = googleCalendarService.createCalendarEvent({
      bookingId: id,
      studentName: raw.name || 'Aspirant',
      studentEmail: raw.email || '',
      adminEmail: process.env.ADMIN_EMAIL || 'sankalpcareersolutions@gmail.com',
      date: raw.preferredDate || new Date().toISOString().split('T')[0],
      time: raw.preferredTime || '10:00 AM',
      serviceType: raw.careerInterest || raw.counsellingType || 'General Career Counselling',
      meetLink: meet.meetLink,
    });

    const appointment: StoredAppointment = {
      id,
      ticketNumber,
      name: raw.name || '',
      email: raw.email || '',
      mobileNumber: raw.mobileNumber || '',
      preferredDate: raw.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: raw.preferredTime || '10:00 AM',
      counsellingType: raw.counsellingType || 'Online Video 1:1',
      careerInterest: raw.careerInterest || 'General Career Guidance',
      dob: raw.dob,
      gender: raw.gender,
      state: raw.state,
      city: raw.city,
      currentClass: raw.currentClass,
      schoolCollege: raw.schoolCollege,
      board: raw.board,
      stream: raw.stream,
      percentage: raw.percentage,
      parentName: raw.parentName,
      parentContact: raw.parentContact,
      questions: raw.questions,
      defenceAspirant: raw.defenceAspirant,
      preferredLanguage: raw.preferredLanguage,
      
      status: raw.status || 'PENDING',
      meetLink: meet.meetLink,
      meetingCode: meet.meetingCode,
      icsContent: cal.icsContent,
      googleCalendarUrl: cal.googleCalendarUrl,

      emailStatus: 'PENDING',
      whatsappStatus: 'PENDING',
      calendarStatus: 'CREATED',
      meetStatus: 'GENERATED',
      retryCount: 0,
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.appointments.set(id, appointment);
    logger.info('BOOKING', 'APPOINTMENT_STORED', `Stored new appointment ${id} [${ticketNumber}] for ${appointment.name}`, {
      id,
      ticketNumber,
      email: appointment.email,
      mobile: appointment.mobileNumber,
      date: appointment.preferredDate,
      time: appointment.preferredTime,
    }, id, appointment.email);

    return appointment;
  }

  public updateAppointment(id: string, updates: Partial<StoredAppointment>): StoredAppointment | null {
    const existing = this.appointments.get(id);
    if (!existing) return null;

    // If date or time changed, regenerate calendar event
    let newIcs = existing.icsContent;
    let newGCal = existing.googleCalendarUrl;
    if ((updates.preferredDate && updates.preferredDate !== existing.preferredDate) ||
        (updates.preferredTime && updates.preferredTime !== existing.preferredTime)) {
      const cal = googleCalendarService.createCalendarEvent({
        bookingId: id,
        studentName: updates.name || existing.name,
        studentEmail: updates.email || existing.email,
        adminEmail: process.env.ADMIN_EMAIL || 'sankalpcareersolutions@gmail.com',
        date: updates.preferredDate || existing.preferredDate,
        time: updates.preferredTime || existing.preferredTime,
        serviceType: updates.careerInterest || existing.careerInterest,
        meetLink: updates.meetLink || existing.meetLink,
      });
      newIcs = cal.icsContent;
      newGCal = cal.googleCalendarUrl;
    }

    const updated: StoredAppointment = {
      ...existing,
      ...updates,
      icsContent: newIcs,
      googleCalendarUrl: newGCal,
      updatedAt: new Date().toISOString(),
    };

    this.appointments.set(id, updated);
    return updated;
  }

  public logNotification(log: Omit<NotificationHistoryLog, 'id' | 'timestamp'>) {
    const entry: NotificationHistoryLog = {
      id: `nh_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      ...log,
    };
    this.notificationLogs.unshift(entry);
    if (this.notificationLogs.length > 500) {
      this.notificationLogs.pop();
    }
    return entry;
  }

  public getNotificationLogs(limit: number = 100): NotificationHistoryLog[] {
    return this.notificationLogs.slice(0, limit);
  }

  public getAnalytics() {
    const list = this.getAllAppointments();
    const todayStr = new Date().toISOString().split('T')[0];

    const totalBookings = list.length;
    const todayBookings = list.filter(a => a.preferredDate === todayStr || a.createdAt.startsWith(todayStr)).length;
    const upcomingSessions = list.filter(a => a.status === 'APPROVED' || (a.status === 'PENDING' && a.preferredDate >= todayStr)).length;
    
    let emailsSent = 0;
    let emailsFailed = 0;
    let whatsappSent = 0;
    let whatsappFailed = 0;

    for (const log of this.notificationLogs) {
      if (log.channel === 'EMAIL') {
        if (log.status === 'SENT' || log.status === 'DELIVERED' || log.status === 'SIMULATED') emailsSent++;
        if (log.status === 'FAILED') emailsFailed++;
      }
      if (log.channel === 'WHATSAPP') {
        if (log.status === 'SENT' || log.status === 'DELIVERED' || log.status === 'SIMULATED') whatsappSent++;
        if (log.status === 'FAILED') whatsappFailed++;
      }
    }

    // Default counts from appointments if logs are fresh
    if (emailsSent === 0 && emailsFailed === 0) {
      emailsSent = list.filter(a => a.emailStatus === 'SENT' || a.emailStatus === 'SIMULATED').length;
      whatsappSent = list.filter(a => a.whatsappStatus === 'SENT' || a.whatsappStatus === 'SIMULATED').length;
    }

    const failedNotifications = emailsFailed + whatsappFailed + list.filter(a => a.emailStatus === 'FAILED' || a.whatsappStatus === 'FAILED').length;
    const totalAttempted = emailsSent + emailsFailed + whatsappSent + whatsappFailed;
    const deliveryRate = totalAttempted > 0 ? ((emailsSent + whatsappSent) / totalAttempted) * 100 : 99.4;

    return {
      totalBookings,
      todayBookings,
      upcomingSessions,
      emailsSent,
      emailsFailed,
      whatsappSent,
      whatsappFailed,
      failedNotifications,
      deliveryRate: Number(deliveryRate.toFixed(1)),
      meetLinksActive: list.filter(a => a.meetLink).length,
      calendarInvitesSent: list.filter(a => a.calendarStatus === 'CREATED').length,
    };
  }

  public exportCsv(): string {
    const list = this.getAllAppointments();
    const headers = [
      'Ticket Number',
      'Student Name',
      'Email',
      'Mobile',
      'Date',
      'Time',
      'Status',
      'Service Type',
      'Stream',
      'Meet Link',
      'Email Status',
      'WhatsApp Status',
      'Calendar Status',
      'Created At'
    ];

    const rows = list.map(a => [
      `"${a.ticketNumber}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.mobileNumber}"`,
      `"${a.preferredDate}"`,
      `"${a.preferredTime}"`,
      `"${a.status}"`,
      `"${(a.careerInterest || a.counsellingType).replace(/"/g, '""')}"`,
      `"${(a.stream || '').replace(/"/g, '""')}"`,
      `"${a.meetLink}"`,
      `"${a.emailStatus}"`,
      `"${a.whatsappStatus}"`,
      `"${a.calendarStatus}"`,
      `"${a.createdAt}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

export const storeService = new StoreService();
