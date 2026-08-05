export interface Course {
  id: string;
  title: string;
  provider: string;
  category: "Defence Services" | "Paramilitary" | "Scientific / R&D" | "Civilian Jobs";
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  description: string;
  syllabus: string[];
  enrolled: boolean;
  progress: number; // percentage
  lessons: number;
  studentsCount: number;
}

export interface Mentor {
  id: string;
  name: string;
  rankRole: string; // e.g. "Brigadier (Retd.)", "Scientist G (DRDO)"
  experience: string; // e.g. "32 Years"
  specialty: string; // e.g. "SSB Interview Board - Psychologist", "Rocket Navigation"
  organization: "Indian Army" | "Indian Navy" | "Indian Air Force" | "DRDO" | "BARC" | "ISRO" | "Paramilitary";
  bio: string;
  rating: number;
  availableSlots: string[]; // e.g. ["Mon, 4:00 PM", "Wed, 11:00 AM"]
}

export interface Internship {
  id: string;
  title: string;
  organization: "DRDO" | "BARC" | "ISRO" | "Border Security Force" | "CRPF" | "Cantonment Boards" | "DGQA";
  type: "Internship" | "Fellowship" | "Placement Trainee";
  location: string;
  stipend: string;
  deadline: string;
  eligibility: string;
  description: string;
  keySkills: string[];
  applied?: boolean;
}

export interface DailyTrivia {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserStats {
  targetSector: string;
  examDate: string;
  targetExam: string;
  overallProgress: number; // e.g., 45
  testsCompleted: number;
  avgScore: number; // e.g., 78
  streak: number; // e.g., 7 days
}

export interface ExamAnnouncement {
  id: string;
  examCode: string; // e.g. "UPSC-NDA", "ISRO-ICRB", or conducting body like "UPSC", "ISRO"
  conductingBody: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
}

export type AppointmentStatus = 'PENDING' | 'APPROVED' | 'RESCHEDULED' | 'CANCELLED' | 'COMPLETED';
export type ChannelDeliveryStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'SIMULATED' | 'FAILED';

export interface CareerAppointment {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  mobileNumber: string;
  preferredDate: string;
  preferredTime: string;
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
  
  status: AppointmentStatus;
  meetLink: string;
  meetingCode: string;
  icsContent?: string;
  googleCalendarUrl?: string;

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

export interface NotificationLogItem {
  id: string;
  bookingId: string;
  ticketNumber: string;
  recipient: string;
  channel: 'EMAIL' | 'WHATSAPP' | 'CALENDAR' | 'MEET' | 'SYSTEM';
  type: string;
  status: ChannelDeliveryStatus;
  timestamp: string;
  details?: string;
  error?: string;
  latencyMs?: number;
}

export interface NotificationAnalytics {
  totalBookings: number;
  todayBookings: number;
  upcomingSessions: number;
  emailsSent: number;
  emailsFailed: number;
  whatsappSent: number;
  whatsappFailed: number;
  failedNotifications: number;
  deliveryRate: number;
  meetLinksActive: number;
  calendarInvitesSent: number;
}

