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
