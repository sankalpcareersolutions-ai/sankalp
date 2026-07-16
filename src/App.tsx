import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Mentorship from "./components/Mentorship";
import CareerLibrary from "./components/CareerLibrary";
import Courses from "./components/Courses";
import Placements from "./components/Placements";
import TestimonialsPage from "./components/TestimonialsPage";
import AboutAndAppointment from "./components/AboutAndAppointment";
import SovereignExams from "./components/SovereignExams";
import AdminPanel from "./components/AdminPanel";
import { Course, Mentor, Internship, UserStats, ExamAnnouncement } from "./types";
import { initialCourses, mentors, initialInternships } from "./data/portalData";
import { useLanguage } from "./contexts/LanguageContext";

const defaultAnnouncements: ExamAnnouncement[] = [
  {
    id: "ann-1",
    examCode: "UPSC-NDA",
    conductingBody: "UPSC",
    title: "UPSC NDA (I) 2026 Direct Recruiting Notification Released",
    content: "The official notification for NDA & NA Examination (I) 2026 is published. Online application portal opens today. Registration deadlines: 14 days from publication date.",
    date: "July 12, 2026",
    read: false,
  },
  {
    id: "ann-2",
    examCode: "ISRO-ICRB",
    conductingBody: "ISRO",
    title: "ISRO Scientist SC 2026 Recruitment Stage-1 Cutoff Marks",
    content: "ISRO Centralised Recruitment Board (ICRB) has released the Stage-1 written examination category-wise cutoff marks. Interview shortlists to be updated on official space portal by end of week.",
    date: "July 10, 2026",
    read: false,
  },
  {
    id: "ann-3",
    examCode: "MILITARY-NURSING",
    conductingBody: "Armed Forces Medical Services",
    title: "MNS BSC Nursing Application Stage-2 SSB Medicals List",
    content: "Selected candidates for Military Nursing Services 4-Year B.Sc Course are invited to review Stage-2 scheduling. Reporting venues allocated at CH(EC) Kolkata and AHR Delhi.",
    date: "July 08, 2026",
    read: true,
  }
];
import { Compass, Shield, Award, Users, BookOpen, GraduationCap, HeartHandshake, ShieldCheck, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "./assets/images/sankalp_epic_logo_1780997195913.png";

const metaTagsByTab: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Sankalp - India's Trusted Career Hub | Defence & General Careers",
    description: "Sankalp is India's premier career guidance platform for Class 9th students to graduates. Specializing in Defence & Strategic Careers, Engineering, Medical, Civil Services, and Research.",
    keywords: "Sankalp, career counselling, career guidance India, NDA prep, CDS exam, DRDO careers, ISRO, stream selection, Sankalp counselling",
  },
  "career-library": {
    title: "Sankalp - Comprehensive Career Library",
    description: "Explore 500+ in-depth Indian career profiles including eligibility, salaries, promotions, exams, and educational pathways with a focus on Strategic & Defence sectors.",
    keywords: "Sankalp, career options, careers after 12th, UPSC exams, law eligibility, medical stream, DRDO scientist pathway, career library",
  },
  exams: {
    title: "Sankalp - Sovereign Entrance Exams & Defence Calendar",
    description: "Get updated dates, notifications, previous year trends, and preparation strategies for NDA, CDS, AFCAT, CAPF, ISRO, BARC, and CSIR.",
    keywords: "Sankalp, defence calendar, exam dates, NDA 2026 notification, SSB interview calendar, UPSC notification, government recruitment",
  },
  dashboard: {
    title: "Sankalp - Cadet Hub - Your Career Dashboard",
    description: "Track your customized study plans, enrolled courses, mentorship bookings, and internship applications in your student center.",
    keywords: "Sankalp, cadet hub, student dashboard, study tracker, counselling progress, learning dashboard",
  },
  mentorship: {
    title: "Sankalp - Personalized Mentorship & SSB Guidance",
    description: "Connect 1-on-1 with retired Armed Forces veterans, senior scientific consultants, and industrial leaders for authentic guidance.",
    keywords: "Sankalp, defence mentor, SSB guidance, army veteran advice, career mentor India, scientific officer coach",
  },
  appointment: {
    title: "Sankalp - Book 1-on-1 Career Counselling Session",
    description: "Book an online or offline appointment with India's best career coaches for school students, graduates, and defence aspirants.",
    keywords: "Sankalp, counselling booking, career counsellor near me, psychometric test booking, online career guidance, educational counselling",
  },
  courses: {
    title: "Sankalp - SSB Masterclasses & Officer Courses",
    description: "Accelerate your path with our premier masterclasses covering Officer Like Qualities (OLQ), scientific reasoning, and core preparation strategies.",
    keywords: "Sankalp, ssb online course, OLQ training, cadet academy, exam preparation classes, officer training",
  },
  placements: {
    title: "Sankalp - Elite Internships & Strategic Placements",
    description: "Explore strategic internships and job roles in defence technologies, research labs, space startups, and top private sectors.",
    keywords: "Sankalp, defence startups, research internships, engineering placements, public sector undertakings, tech fellowships",
  },
  testimonials: {
    title: "Sankalp - Call of Honor - Inspiring Success Stories",
    description: "Read about our students who cleared NDA, CDS, DRDO, ISRO, and elite corporate selections after counselling at SANKALP.",
    keywords: "Sankalp, success stories, ssb selections, student testimonials, career counselling success, client reviews",
  },
  admin: {
    title: "Sankalp - Administration Command Control Panel",
    description: "Secure, credentialed access to manage student assessments, bookings, resources, and portal configurations.",
    keywords: "Sankalp, admin login, client records, administrative backend",
  },
};

export default function App() {
  const { t } = useLanguage();
  // Navigation Central Tab State
  const [currentTab, setCurrentTab] = useState<string>("home");

  // Shared Global Search State
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Courses and Internships States with LocalStorage Cache Persistency
  const [courses, setCourses] = useState<Course[]>(() => {
    const cached = localStorage.getItem("sankalp_courses");
    return cached ? JSON.parse(cached) : initialCourses;
  });

  const [internships, setInternships] = useState<Internship[]>(() => {
    const cached = localStorage.getItem("sankalp_internships");
    return cached ? JSON.parse(cached) : initialInternships;
  });

  const [bookedAppointments, setBookedAppointments] = useState<{ mentor: Mentor; slot: string; id: string }[]>(() => {
    const cached = localStorage.getItem("sankalp_appointments");
    return cached ? JSON.parse(cached) : [];
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const cached = localStorage.getItem("sankalp_stats");
    return cached
      ? JSON.parse(cached)
      : {
          targetSector: "Indian Defence Services",
          targetExam: "CDS Master Plan",
          examDate: "2026-11-25",
          overallProgress: 40,
          testsCompleted: 3,
          avgScore: 74,
          streak: 4,
        };
  });

  const [examAlerts, setExamAlerts] = useState<ExamAnnouncement[]>(() => {
    const cached = localStorage.getItem("sankalp_exam_alerts");
    return cached ? JSON.parse(cached) : defaultAnnouncements;
  });

  const [subscribedExams, setSubscribedExams] = useState<string[]>(() => {
    const cached = localStorage.getItem("sankalp_subscribed_exams");
    return cached ? JSON.parse(cached) : ["UPSC", "SCIENTIFIC", "UPSC-NDA", "ISRO-ICRB"];
  });

  const [subscribedEmail, setSubscribedEmail] = useState<string>(() => {
    const cached = localStorage.getItem("sankalp_subscribed_email");
    return cached ? JSON.parse(cached) : "cadet@sankalp.com";
  });

  // Persists updates to cache
  useEffect(() => {
    localStorage.setItem("sankalp_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("sankalp_internships", JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem("sankalp_appointments", JSON.stringify(bookedAppointments));
  }, [bookedAppointments]);

  useEffect(() => {
    localStorage.setItem("sankalp_stats", JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem("sankalp_exam_alerts", JSON.stringify(examAlerts));
  }, [examAlerts]);

  useEffect(() => {
    localStorage.setItem("sankalp_subscribed_exams", JSON.stringify(subscribedExams));
  }, [subscribedExams]);

  useEffect(() => {
    localStorage.setItem("sankalp_subscribed_email", JSON.stringify(subscribedEmail));
  }, [subscribedEmail]);

  // Derived filter helper selectors
  const enrolledCourses = courses.filter((c) => c.enrolled);
  const appliedJobs = internships.filter((i) => i.applied);

  // Recalculates total progress based on enrolled course metrics
  const recalculateProgress = (updatedCourses: Course[]) => {
    const enrolled = updatedCourses.filter((c) => c.enrolled);
    if (enrolled.length === 0) return 40; // baseline generic progress
    const sum = enrolled.reduce((acc, c) => acc + c.progress, 0);
    return Math.round(sum / enrolled.length);
  };

  // Callback Triggers
  const handleEnrollCourse = (courseId: string) => {
    const next = courses.map((c) => {
      if (c.id === courseId) {
        return { ...c, enrolled: true, progress: 5 }; // start with early progressive engagement!
      }
      return c;
    });
    setCourses(next);
    setUserStats((prev) => ({
      ...prev,
      overallProgress: recalculateProgress(next),
    }));
  };

  const handleBookBriefing = (mentor: Mentor, slot: string) => {
    const newBooking = {
      mentor,
      slot,
      id: `booking_${Date.now()}`,
    };
    setBookedAppointments((prev) => [...prev, newBooking]);
  };

  const handleApplyInternship = (id: string) => {
    setInternships((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, applied: true };
        }
        return item;
      })
    );
  };

  const handleUpdateUserStats = (updatedStats: Partial<UserStats>) => {
    setUserStats((prev) => ({
      ...prev,
      ...updatedStats,
    }));
  };

  const handleMarkCourseProgress = (courseId: string, delta: number) => {
    const next = courses.map((c) => {
      if (c.id === courseId) {
        const nextProgress = Math.min(Math.max(c.progress + delta, 0), 100);
        return { ...c, progress: nextProgress };
      }
      return c;
    });
    setCourses(next);
    setUserStats((prev) => ({
      ...prev,
      overallProgress: recalculateProgress(next),
    }));
  };

  const handleCancelAppointment = (id: string) => {
    setBookedAppointments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleSubscribe = (topic: string) => {
    setSubscribedExams((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  const handleSaveEmailSubscription = (email: string, categories: string[]) => {
    setSubscribedEmail(email);
    setSubscribedExams((prev) => {
      const filtered = prev.filter((t) => t !== "UPSC" && t !== "MNS" && t !== "SCIENTIFIC");
      return [...filtered, ...categories];
    });
  };

  const handleSaveAnnouncement = (newAnn: Omit<ExamAnnouncement, "id" | "date" | "read">) => {
    const freshAlert: ExamAnnouncement = {
      ...newAnn,
      id: "ann-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      read: false,
    };
    setExamAlerts((prev) => [freshAlert, ...prev]);
  };

  const handleMarkAlertRead = (id: string) => {
    setExamAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, read: true } : alert))
    );
  };

  const handleMarkAllAlertsRead = () => {
    setExamAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  };

  // Derived active unread count for navbar badge
  const relevantAlertsForBadge = examAlerts.filter((ann) => {
    return (
      subscribedExams.includes(ann.examCode) ||
      subscribedExams.includes(ann.conductingBody) ||
      (ann.conductingBody === "UPSC" && subscribedExams.includes("UPSC")) ||
      (ann.conductingBody === "ISRO" && subscribedExams.includes("SCIENTIFIC")) ||
      (ann.conductingBody === "DRDO" && subscribedExams.includes("SCIENTIFIC")) ||
      (ann.conductingBody === "BARC" && subscribedExams.includes("SCIENTIFIC")) ||
      (ann.conductingBody === "Armed Forces Medical Services" && subscribedExams.includes("MNS"))
    );
  });
  const unreadAlertsCount = relevantAlertsForBadge.filter((a) => !a.read).length;

  // Navigates and performs direct search filter binding
  const handleSearchSelection = (term: string) => {
    setSearchTerm(term);
  };

  const currentMeta = metaTagsByTab[currentTab] || metaTagsByTab.home;

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-navy-950 text-lightyellow-100 flex flex-col justify-between" id="app_scaffold_root">
        <Helmet>
          <title>{currentMeta.title}</title>
          <meta name="description" content={currentMeta.description} />
          <meta name="keywords" content={currentMeta.keywords} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://careercounsellinghub.com/${currentTab === 'home' ? '' : currentTab}`} />
        </Helmet>
      {/* Top Banner Warning or Notice Board */}
      <div className="bg-navy-900 text-gold-400 text-[12.5px] font-mono py-2 px-4 text-center border-b border-gold-500/25 flex items-center justify-center gap-2 shadow-md uppercase font-black" id="sovereign_announcement">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-gold-450 animate-pulse"></span>
        <span><b>SANKALP NATIONAL SECURITY DESK:</b> LIVE COUNSELING SESSIONS & DIRECT TRAINING ASSIGNMENTS ARE ACTIVE.</span>
      </div>

      {/* Main Navbar Assembly */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        enrolledCount={enrolledCourses.length}
        bookedCount={bookedAppointments.length}
        alertCount={unreadAlertsCount}
      />

      {/* Primary Dynamic Content Frame */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full relative" id="body_main_port">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentTab === "home" && (
              <Home
                onSearchSelection={handleSearchSelection}
                onTabChange={setCurrentTab}
              />
            )}
            {currentTab === "exams" && (
              <SovereignExams
                subscribedExams={subscribedExams}
                onToggleSubscribe={handleToggleSubscribe}
                subscribedEmail={subscribedEmail}
                onSaveEmailSubscription={handleSaveEmailSubscription}
                onSaveAnnouncement={handleSaveAnnouncement}
              />
            )}
            {currentTab === "dashboard" && (
              <Dashboard
                enrolledCourses={enrolledCourses}
                bookedAppointments={bookedAppointments}
                appliedJobs={appliedJobs}
                userStats={userStats}
                updateUserStats={handleUpdateUserStats}
                markCourseProgress={handleMarkCourseProgress}
                cancelAppointment={handleCancelAppointment}
                announcements={examAlerts}
                subscribedExams={subscribedExams}
                onMarkAlertRead={handleMarkAlertRead}
                onMarkAllAlertsRead={handleMarkAllAlertsRead}
              />
            )}
            {currentTab === "mentorship" && (
              <Mentorship
                onBookBriefing={handleBookBriefing}
                bookedAppointments={bookedAppointments}
              />
            )}
            {currentTab === "career-library" && (
              <CareerLibrary onBookCounselling={() => setCurrentTab("appointment")} />
            )}
            {currentTab === "appointment" && (
              <AboutAndAppointment />
            )}
            {currentTab === "courses" && (
              <Courses
                courses={courses}
                onEnrollCourse={handleEnrollCourse}
                enrolledCourses={enrolledCourses}
              />
            )}
            {currentTab === "placements" && (
              <Placements
                internships={internships}
                onApplyInternship={handleApplyInternship}
                appliedJobs={appliedJobs}
              />
            )}
            {currentTab === "testimonials" && (
              <TestimonialsPage
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
            {currentTab === "admin" && (
              <AdminPanel />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <footer className="bg-navy-900 border-t-4 border-gold-500 text-lightyellow-100 py-12 px-4 sm:px-6 lg:px-8 mt-12 shadow-2xl" id="unified_footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Intro Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Logo"
                className="w-12 h-12 object-contain rounded-xl border border-gold-400 p-0.5 shadow-md"
                referrerPolicy="no-referrer"
              />
              <span className="text-lightyellow-50 font-black text-xl uppercase tracking-widest font-sans leading-none">
                {t("navbar.brand")}
              </span>
            </div>
            <p className="text-sm text-lightyellow-100/90 font-medium leading-relaxed font-sans">
              {t("footer.brand_desc")}
            </p>
          </div>

          {/* Quick Core Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-extrabold tracking-wider uppercase text-gold-400">{t("footer.col1_title")}</h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <button id="foot_link_army" onClick={() => setCurrentTab("home")} className="hover:text-gold-400 transition hover:underline cursor-pointer text-lightyellow-100">
                  {t("footer.col1_1")}
                </button>
              </li>
              <li>
                <button id="foot_link_para" onClick={() => setCurrentTab("home")} className="hover:text-gold-400 transition hover:underline cursor-pointer text-lightyellow-100">
                  {t("footer.col1_2")}
                </button>
              </li>
              <li>
                <button id="foot_link_sciences" onClick={() => setCurrentTab("home")} className="hover:text-gold-400 transition hover:underline cursor-pointer text-lightyellow-100">
                  {t("footer.col1_3")}
                </button>
              </li>
              <li>
                <button id="foot_link_civilian" onClick={() => setCurrentTab("home")} className="hover:text-gold-400 transition hover:underline cursor-pointer text-lightyellow-100">
                  {t("footer.col1_4")}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-extrabold tracking-wider uppercase text-gold-400">{t("footer.col2_title")}</h4>
            <ul className="space-y-2 text-sm font-semibold text-lightyellow-200">
              <li>• {t("footer.col2_1")}</li>
              <li>• {t("footer.col2_2")}</li>
              <li>• {t("footer.col2_3")}</li>
              <li>• {t("footer.col2_4")}</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-extrabold tracking-wider uppercase text-gold-400">{t("footer.col3_title")}</h4>
            <ul className="space-y-2 text-sm font-bold text-lightyellow-105">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" /> {t("footer.contact_email")}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Row */}
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gold-600/30 flex flex-col md:flex-row justify-between items-center text-xs text-lightyellow-200/70 font-semibold gap-4" id="footer_copyright_banner">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setCurrentTab("admin")}
              className="text-gold-500 hover:text-gold-400 font-mono tracking-widest uppercase transition-colors mr-4"
            >
              {t("footer.admin_access")}
            </button>
            <span className="text-gold-400">{t("footer.cleared")}</span>
            <span className="text-gold-400">{t("footer.made_in_india")}</span>
          </div>
        </div>
      </footer>
    </div>
    </HelmetProvider>
  );
}
