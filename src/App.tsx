import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Mentorship from "./components/Mentorship";
import Courses from "./components/Courses";
import Placements from "./components/Placements";
import TestimonialsPage from "./components/TestimonialsPage";
import AboutAndAppointment from "./components/AboutAndAppointment";
import SovereignExams from "./components/SovereignExams";
import AdminPanel from "./components/AdminPanel";
import { Course, Mentor, Internship, UserStats } from "./types";
import { initialCourses, mentors, initialInternships } from "./data/portalData";
import { Compass, Shield, Award, Users, BookOpen, GraduationCap, HeartHandshake, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "./assets/images/sankalp_epic_logo_1780997195913.png";

export default function App() {
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

  // Navigates and performs direct search filter binding
  const handleSearchSelection = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-lightyellow-100 flex flex-col justify-between" id="app_scaffold_root">
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
              <SovereignExams />
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
              />
            )}
            {currentTab === "mentorship" && (
              <Mentorship
                onBookBriefing={handleBookBriefing}
                bookedAppointments={bookedAppointments}
              />
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
                alt="Sankalp Crest Logo"
                className="w-12 h-12 object-contain rounded-xl border border-gold-400 p-0.5 shadow-md"
                referrerPolicy="no-referrer"
              />
              <span className="text-lightyellow-50 font-black text-xl uppercase tracking-widest font-sans">
                SANKALP
              </span>
            </div>
            <p className="text-sm text-lightyellow-100/90 font-medium leading-relaxed font-sans">
              Consolidated platform specialized in career guidelines, direct cadet simulations,
              and placement resources bridging outstanding Indian aspirants with national security wings.
            </p>
          </div>

          {/* Quick Core Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-extrabold tracking-wider uppercase text-gold-400">Objective Sectors</h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <button id="foot_link_army" onClick={() => setCurrentTab("home")} className="hover:text-gold-400 transition hover:underline cursor-pointer text-lightyellow-100">
                  Defence Services (Army / Air Force / Navy)
                </button>
              </li>
              <li>
                <button id="foot_link_para" onClick={() => setCurrentTab("home")} className="hover:text-gold-400 transition hover:underline cursor-pointer text-lightyellow-100">
                  Paramilitary Guards (BSF / CRPF / ITBP)
                </button>
              </li>
              <li>
                <button id="foot_link_sciences" onClick={() => setCurrentTab("home")} className="hover:text-gold-400 transition hover:underline cursor-pointer text-lightyellow-100">
                  Scientific Establishments (DRDO / ISRO / BARC)
                </button>
              </li>
              <li>
                <button id="foot_link_civilian" onClick={() => setCurrentTab("home")} className="hover:text-gold-400 transition hover:underline cursor-pointer text-lightyellow-100">
                  Civilian Engineers (MES / IDES / DGQA)
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-extrabold tracking-wider uppercase text-gold-400">Honor Codes</h4>
            <ul className="space-y-2 text-sm font-semibold text-lightyellow-200">
              <li>• Sovereign Integrity Pledge</li>
              <li>• Security Clearance Mandates</li>
              <li>• Cadet Merit-First Guidelines</li>
              <li>• 15 Officer-Like Qualities (OLQ)</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-extrabold tracking-wider uppercase text-gold-400">Administration</h4>
            <ul className="space-y-2 text-sm font-bold text-lightyellow-105">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" /> sankalpcareersolutions@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400" /> Toll Free Cadet Line: 1800-SSB-SRVC
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" /> National Defense Cluster HQ, New Delhi
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Row */}
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gold-600/30 flex flex-col md:flex-row justify-between items-center text-xs text-lightyellow-200/70 font-semibold gap-4" id="footer_copyright_banner">
          <p>© {new Date().getFullYear()} SANKALP Career Solutions. Under collaborative advisory of retired Indian Armed Forces Veterans & DRDO and ISRO Scientific Consultants.</p>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setCurrentTab("admin")}
              className="text-gold-500 hover:text-gold-400 font-mono tracking-widest uppercase transition-colors mr-4"
            >
              Admin Access
            </button>
            <span className="text-gold-400">Sovereign Security Cleared</span>
            <span className="text-gold-400">Made for India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
