import React, { useState, useEffect } from "react";
import { Course, Mentor, Internship, DailyTrivia, UserStats, ExamAnnouncement } from "../types";
import { dailyTriviaPool } from "../data/portalData";
import { CheckCircle, Award, Calendar, BookOpen, Clock, Activity, Zap, Star, Shield, ArrowRight, Save, Flame, Compass, RefreshCw, Bell, BellOff, Info, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../lib/supabase";
import jsPDF from "jspdf";

interface DashboardProps {
  enrolledCourses: Course[];
  bookedAppointments: { mentor: Mentor; slot: string; id: string }[];
  appliedJobs: Internship[];
  userStats: UserStats;
  updateUserStats: (stats: Partial<UserStats>) => void;
  markCourseProgress: (courseId: string, delta: number) => void;
  cancelAppointment: (id: string) => void;
  announcements?: ExamAnnouncement[];
  subscribedExams?: string[];
  onMarkAlertRead?: (id: string) => void;
  onMarkAllAlertsRead?: () => void;
}

export default function Dashboard({
  enrolledCourses,
  bookedAppointments,
  appliedJobs,
  userStats,
  updateUserStats,
  markCourseProgress,
  cancelAppointment,
  announcements = [],
  subscribedExams = [],
  onMarkAlertRead = () => {},
  onMarkAllAlertsRead = () => {},
}: DashboardProps) {
  // Sector Customizer States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [customSector, setCustomSector] = useState(userStats.targetSector);
  const [customExam, setCustomExam] = useState(userStats.targetExam);
  const [customDate, setCustomDate] = useState(userStats.examDate);

  // Only founder appointments for cadet desk
  const [founderAppointments, setFounderAppointments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('timestamp', { ascending: false });
          
        if (error) {
          // Graceful local cache fallback if Supabase table isn't created yet
          const cached = localStorage.getItem("sankalp_founder_appointments");
          if (cached) setFounderAppointments(JSON.parse(cached));
        } else if (data) {
          setFounderAppointments(data);
          localStorage.setItem("sankalp_founder_appointments", JSON.stringify(data));
        }
      } catch (err) {
        // Fallback silently during development/testing
        const cached = localStorage.getItem("sankalp_founder_appointments");
        if (cached) setFounderAppointments(JSON.parse(cached));
      }
    }
    
    fetchBookings();
  }, []);

  const handleCancelFounderAppt = async (id: string) => {
    const updated = founderAppointments.filter((b) => b.id !== id);
    setFounderAppointments(updated);
    
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
        
      if (error) {
        localStorage.setItem("sankalp_founder_appointments", JSON.stringify(updated));
      }
    } catch (err) {
      // Ignore delete issues during offline simulation
    }
  };

  // Daily Trivia Quiz States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hasTakenQuizToday, setHasTakenQuizToday] = useState(false);

  const currentTrivia = dailyTriviaPool[currentQuestionIndex];

  const handleSaveProfile = () => {
    updateUserStats({
      targetSector: customSector,
      targetExam: customExam,
      examDate: customDate,
    });
    setIsEditingProfile(false);
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentTrivia.correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIndex < dailyTriviaPool.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      setHasTakenQuizToday(true);
      updateUserStats({
        testsCompleted: userStats.testsCompleted + 1,
        avgScore: Math.round(((userStats.avgScore * userStats.testsCompleted) + ((quizScore / dailyTriviaPool.length) * 100)) / (userStats.testsCompleted + 1)),
        streak: userStats.streak + 1,
      });
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Preparation Category Ratings
  const prepCategories = [
    { name: "General Knowledge", value: 82, color: "bg-emerald-600" },
    { name: "Physical Conditioning", value: 65, color: "bg-yellow-600" },
    { name: "Technical Aptitude", value: 90, color: "bg-blue-600" },
    { name: "Psychological Preparedness", value: 70, color: "bg-purple-600" },
    { name: "Interview Posture", value: 55, color: "bg-amber-600" },
  ];

  // Filter announcements matching subscribed topics
  const relevantAlerts = announcements.filter((ann) => {
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

  const unreadAlertsCount = relevantAlerts.filter((a) => !a.read).length;

  const handleDownloadRoadmap = () => {
    const doc = new jsPDF();
    
    // Add background color
    doc.setFillColor(250, 248, 245);
    doc.rect(0, 0, 210, 297, "F");

    // Header section
    doc.setFillColor(2, 44, 34); // emerald-950
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SANKALP ACADEMY", 20, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(197, 160, 89); // gold accent
    doc.text("SOVEREIGN CAREER ROADMAP", 20, 30);

    // Objective Section
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Active Objective", 20, 55);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(`Sector: ${userStats.targetSector}`, 20, 65);
    doc.text(`Target Exam: ${userStats.targetExam}`, 20, 75);
    doc.text(`Evaluation Timeline: ${userStats.examDate}`, 20, 85);

    // Diagnostics Section
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Performance Metrics", 20, 105);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(`Day Streak: ${userStats.streak} Days`, 20, 115);
    doc.text(`Tests Completed: ${userStats.testsCompleted}`, 20, 125);
    doc.text(`Average Score: ${userStats.avgScore}%`, 20, 135);

    // Enrolled Courses
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Active Training Modules", 20, 155);

    let yOffset = 165;
    if (enrolledCourses.length === 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 100, 100);
      doc.text("No active training courses enrolled.", 20, yOffset);
    } else {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      enrolledCourses.forEach((c) => {
        doc.setTextColor(2, 64, 44);
        doc.text(`• ${c.title} (${c.progress}%)`, 20, yOffset);
        yOffset += 8;
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.text(`  Category: ${c.category} | Provider: ${c.provider}`, 20, yOffset);
        yOffset += 10;
        doc.setFontSize(11);
      });
    }

    // Save the PDF
    doc.save("Sankalp_Career_Roadmap.pdf");
  };

  return (
    <div className="space-y-8" id="dashboard_tab_root">
      {/* Dynamic Unread Alerts Headline Banner */}
      {unreadAlertsCount > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          id="dashboard_alerts_banner_headline"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center animate-pulse flex-shrink-0">
              <Bell className="w-5 h-5 fill-amber-700/20" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">Active Sovereign Alerts Dispensed</h4>
              <p className="text-xs text-amber-700">
                You have <span className="font-extrabold">{unreadAlertsCount} unread exam update{unreadAlertsCount > 1 ? 's' : ''}</span> matching your subscribed topics ({subscribedExams.join(", ")}).
              </p>
            </div>
          </div>
          <button
            onClick={onMarkAllAlertsRead}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-sans font-bold shadow-sm transition-all cursor-pointer flex-shrink-0"
          >
            Mark All as Read
          </button>
        </motion.div>
      )}

      {/* Target Ribbon */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6" id="dashboard_top_ribbon">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 text-stone-100 flex items-center justify-center font-mono font-bold text-lg shadow-inner">
              HQ
            </div>
            <div>
              <p className="text-xs font-mono text-emerald-700 tracking-wider uppercase font-semibold">Active Objective</p>
              {isEditingProfile ? (
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <select
                    id="edit_profile_sector"
                    className="bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-xs font-sans text-stone-800 focus:ring-1 focus:ring-emerald-800 cursor-pointer"
                    value={customSector}
                    onChange={(e) => setCustomSector(e.target.value)}
                  >
                    <option value="Indian Defence Services">Indian Defence Services</option>
                    <option value="Paramilitary Forces">Paramilitary Forces</option>
                    <option value="Scientific Establishments">Scientific Establishments</option>
                    <option value="Defence Civilian Services">Defence Civilian Services</option>
                  </select>
                  <input
                    id="edit_profile_exam"
                    type="text"
                    className="bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-xs font-sans text-stone-800 focus:ring-1 focus:ring-emerald-800"
                    placeholder="e.g. CDS 2026, ISRO Scientist"
                    value={customExam}
                    onChange={(e) => setCustomExam(e.target.value)}
                  />
                  <input
                    id="edit_profile_date"
                    type="date"
                    className="bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-xs font-sans text-stone-800 focus:ring-1 focus:ring-emerald-800"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                  />
                  <button
                    id="save_profile_button"
                    onClick={handleSaveProfile}
                    className="bg-emerald-800 hover:bg-emerald-950 text-white rounded px-3 py-1 text-xs font-sans font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-stone-900 leading-tight">
                    Targeting {userStats.targetExam}
                  </h2>
                  <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded font-mono font-medium">
                    {userStats.targetSector}
                  </span>
                  <button
                    id="edit_profile_trigger"
                    onClick={() => setIsEditingProfile(true)}
                    className="text-xs text-stone-500 underline hover:text-emerald-800 cursor-pointer"
                  >
                    Change Goal
                  </button>
                </div>
              )}
              <p className="text-xs font-sans text-stone-500 mt-0.5">
                Target Evaluation Timeline Set: <span className="font-semibold text-stone-700">{userStats.examDate}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Download Roadmap Button */}
            <button
              onClick={handleDownloadRoadmap}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm w-full sm:w-auto justify-center"
            >
              <Download className="w-4 h-4" /> Export Roadmap
            </button>
            
            {/* Quick Metrics */}
            <div className="flex gap-4">
              <div className="bg-stone-50/50 border border-stone-100 p-3 rounded-lg text-center min-w-[70px]">
                <div className="text-emerald-800 font-extrabold text-lg leading-none flex items-center justify-center gap-0.5">
                  <Flame className="w-4 h-4 fill-emerald-700 text-emerald-700" />
                  {userStats.streak}
                </div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mt-1">Day Streak</p>
              </div>
              <div className="bg-stone-50/50 border border-stone-100 p-3 rounded-lg text-center min-w-[70px]">
                <div className="text-teal-800 font-extrabold text-lg leading-none">
                  {userStats.testsCompleted}
                </div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mt-1">Tests Done</p>
              </div>
              <div className="bg-stone-50/50 border border-stone-100 p-3 rounded-lg text-center min-w-[70px]">
                <div className="text-amber-700 font-extrabold text-lg leading-none">
                  {userStats.avgScore}%
                </div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mt-1">Avg Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Progress & Mentor Sessions - Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Exam Alerts & Announcement Desk */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-6" id="dashboard_exam_alerts_desk">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-emerald-800" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-sm md:text-base">Exam Alerts & Announcements Desk</h3>
                  <p className="text-[11px] text-stone-400 font-sans">Direct updates mapped to your subscribed sectors & agencies</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {unreadAlertsCount > 0 && (
                  <span className="text-[10px] bg-amber-600 text-white font-black px-2.5 py-0.5 rounded-full animate-pulse uppercase tracking-wider font-mono">
                    {unreadAlertsCount} New
                  </span>
                )}
                <span className="text-xs bg-stone-100 text-stone-600 border border-stone-200 px-2.5 py-0.5 rounded-xl font-mono font-bold">
                  {relevantAlerts.length} Total Alerts
                </span>
              </div>
            </div>

            {relevantAlerts.length === 0 ? (
              <div className="text-center py-8 border border-stone-100 rounded-xl bg-stone-50/20 space-y-2">
                <BellOff className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs text-stone-500 font-sans font-semibold">No matching exam updates compiled yet.</p>
                <p className="text-[10.5px] text-stone-400 max-w-sm mx-auto leading-normal">
                  Sankalp alerts are targeted to your interests. Head over to the <b className="text-emerald-800 uppercase">Sovereign Exams</b> tab and subscribe to agencies like <b>UPSC</b>, <b>ISRO</b>, or specific exam codes to build your alerts feed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[11px] text-stone-400 border-b border-stone-100/50 pb-2">
                  <span>Filtered Alerts for: {subscribedExams.join(", ") || "None selected"}</span>
                  {unreadAlertsCount > 0 && (
                    <button 
                      onClick={onMarkAllAlertsRead}
                      className="text-emerald-800 hover:underline font-bold cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-stone-100 space-y-4">
                  {relevantAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`pt-3 flex flex-col md:flex-row justify-between items-start gap-4 transition-all ${
                        !alert.read ? "bg-emerald-50/15 border-l-2 border-emerald-600 pl-3 -ml-3 py-2 rounded-r-xl" : "opacity-80"
                      }`}
                      id={`alert_item_${alert.id}`}
                    >
                      <div className="space-y-1.5 flex-1 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-mono tracking-wider font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded">
                            📢 {alert.examCode}
                          </span>
                          <span className="text-[9px] font-mono bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded font-bold">
                            {alert.conductingBody}
                          </span>
                          <span className="text-[9.5px] font-mono text-stone-400">
                            Released: {alert.date}
                          </span>
                        </div>
                        <h4 className="text-xs font-extrabold text-stone-900 uppercase">
                          {alert.title}
                        </h4>
                        <p className="text-[11.5px] text-stone-500 leading-relaxed font-sans font-medium">
                          {alert.content}
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex items-center self-end md:self-center">
                        {alert.read ? (
                          <span className="text-[10px] text-stone-400 font-mono font-bold flex items-center gap-1 bg-stone-50 border border-stone-100 px-2 py-1 rounded">
                            <CheckCircle className="w-3.5 h-3.5 text-stone-400" /> Acknowledged
                          </span>
                        ) : (
                          <button
                            onClick={() => onMarkAlertRead(alert.id)}
                            className="px-3 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Courses */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="text-emerald-800 w-5 h-5 animate-pulse" />
                <h3 className="font-bold text-stone-800 text-sm md:text-base">Command Training Courses</h3>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                {enrolledCourses.length} Enrolled
              </span>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="space-y-5">
                {enrolledCourses.map((c) => (
                  <div id={`dash_course_${c.id}`} key={c.id} className="p-4 rounded-xl border border-stone-100 hover:border-emerald-800/20 bg-stone-50/30 transition-all space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-stone-800">{c.title}</h4>
                        <p className="text-[10px] text-stone-400 font-mono mt-0.5">{c.provider}</p>
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-100/50">
                        {c.category}
                      </span>
                    </div>

                    {/* Progress Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-stone-500">
                        <span>Syllabus Completion</span>
                        <span className="font-bold text-stone-700">{c.progress}%</span>
                      </div>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden flex items-center">
                        <div
                          className="bg-emerald-800 h-full rounded-full transition-all duration-300"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Simulation Controllers */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <button
                          id={`progress_down_${c.id}`}
                          disabled={c.progress <= 0}
                          onClick={() => markCourseProgress(c.id, -10)}
                          className="px-2 py-0.5 border border-stone-200 rounded text-[10px] text-stone-600 hover:bg-stone-100 disabled:opacity-40 cursor-pointer"
                        >
                          -10%
                        </button>
                        <button
                          id={`progress_up_${c.id}`}
                          disabled={c.progress >= 100}
                          onClick={() => markCourseProgress(c.id, 10)}
                          className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-[10px] text-emerald-800 hover:bg-emerald-100 disabled:opacity-40 cursor-pointer"
                        >
                          +10%
                        </button>
                      </div>
                      {c.progress >= 100 ? (
                        <span className="text-[10px] font-mono font-semibold text-emerald-800 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 fill-emerald-800 text-stone-100" /> Objective Cleared
                        </span>
                      ) : (
                        <p className="text-[10px] text-stone-400 italic">Simulate course lessons progress</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border border-stone-100 rounded-xl bg-stone-50/20">
                <p className="text-xs text-stone-500 font-sans">No training courses selected yet.</p>
                <p className="text-[10px] text-stone-400 mt-1">Head over to the training academy catalog to enroll.</p>
              </div>
            )}
          </div>

          {/* 50-Session Cadet Syllabus Tracker */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <Compass className="text-emerald-800 w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                <h3 className="font-bold text-stone-800 text-sm md:text-base">SSB 50-Session Tactical Progress</h3>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 rounded-full font-mono font-bold">
                50 Modules Total
              </span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed font-sans mt-1">
              Your preparation trajectory consists of 50 targeted briefs structured directly under the advice of our Navy Veteran founder. Track the critical phases below:
            </p>

            {/* Grid of 4 Phases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Phase I */}
              <div className="p-4 rounded-xl border border-stone-100 hover:border-emerald-800/20 bg-stone-50/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-black">PHASE I</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">15 SESSIONS</span>
                </div>
                <h4 className="text-xs font-extrabold text-stone-800">SSB Psychological Alignment</h4>
                <ul className="text-[11px] text-stone-500 space-y-1.5 list-disc pl-4 leading-normal">
                  <li>TAT Story Projection & Themes (Sessions 1-3)</li>
                  <li>WAT Instinct Reaction Mapping (Sessions 4-6)</li>
                  <li>SRT Tactical Solution Logic (Sessions 7-10)</li>
                  <li>SDT Calibration & Self Description (Sessions 11-15)</li>
                </ul>
              </div>

              {/* Phase II */}
              <div className="p-4 rounded-xl border border-stone-100 hover:border-emerald-800/20 bg-stone-50/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase font-black">PHASE II</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">15 SESSIONS</span>
                </div>
                <h4 className="text-xs font-extrabold text-stone-800">Officer-Like Qualities (OLQ)</h4>
                <ul className="text-[11px] text-stone-500 space-y-1.5 list-disc pl-4 leading-normal">
                  <li>Effective Intelligence & Reasoning (Sessions 16-19)</li>
                  <li>Group Planning Trials & Social Synergy (Sessions 20-23)</li>
                  <li>Decision Speed & Crisis Confidence (Sessions 24-27)</li>
                  <li>Personal Initiative & Courageous Resolve (Sessions 28-30)</li>
                </ul>
              </div>

              {/* Phase III */}
              <div className="p-4 rounded-xl border border-stone-100 hover:border-emerald-800/20 bg-stone-50/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-850 uppercase font-black">PHASE III</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-850 bg-emerald-50 px-1.5 py-0.5 rounded">10 SESSIONS</span>
                </div>
                <h4 className="text-xs font-extrabold text-stone-800">Weaponry, Space, Navigation & Marine</h4>
                <ul className="text-[11px] text-stone-500 space-y-1.5 list-disc pl-4 leading-normal">
                  <li>Naval Hull Hydrodynamics & Machinery (Sessions 31-33)</li>
                  <li>Aerospace Propulsion & Rocket Telemetry (Sessions 34-36)</li>
                  <li>BARC/DRDO Scientific Armament Entry (Sessions 37-40)</li>
                </ul>
              </div>

              {/* Phase IV */}
              <div className="p-4 rounded-xl border border-stone-100 hover:border-emerald-800/20 bg-stone-50/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-black">PHASE IV</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">10 SESSIONS</span>
                </div>
                <h4 className="text-xs font-extrabold text-stone-800">Board Interview & Pilot Drills (CPSS)</h4>
                <ul className="text-[11px] text-stone-500 space-y-1.5 list-disc pl-4 leading-normal">
                  <li>Executive Demeanor & Panel Simulations (Sessions 41-45)</li>
                  <li>Paper-II Essay Writing & Geopolitics (Sessions 46-48)</li>
                  <li>CPSS Spatial Instinct Diagnostics (Sessions 49-50)</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Booked Appointments Desk with Founder Only */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-emerald-800 w-5 h-5" />
                <h3 className="font-bold text-stone-800 text-sm md:text-base">Cadet Hub Briefings Desk</h3>
              </div>
            </div>

            {/* Displaying active founder appointments */}
            {founderAppointments.length > 0 ? (
              <div className="space-y-4">
                {founderAppointments.map((appt) => (
                  <div
                    id={`founder_appt_item_${appt.id}`}
                    key={appt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border border-stone-100 p-4 rounded-xl bg-stone-50/30 gap-4"
                  >
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-9 h-9 rounded-full bg-emerald-105 border border-emerald-200 flex items-center justify-center font-bold text-xs text-emerald-800 flex-shrink-0">
                        ⚓
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-800">
                          Sankalp Founder & Lead Counselor
                        </h4>
                        <p className="text-[10px] text-stone-500">
                          Nominee: <span className="font-semibold text-stone-700">{appt.name}</span> • Ticket: <span className="font-mono text-emerald-800 font-bold">{appt.ticket_number}</span>
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-mono text-emerald-850 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          Topic: {appt.focus_area}
                        </span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2">
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-mono text-stone-700 font-bold">{appt.slot_date}</p>
                        <p className="text-[10.5px] font-mono text-stone-605 font-bold">{appt.slot_time}</p>
                      </div>
                      <button
                        id={`cancel_founder_appt_${appt.id}`}
                        onClick={() => handleCancelFounderAppt(appt.id)}
                        className="px-2.5 py-1 text-[10px] text-red-700 hover:text-white border border-red-200 hover:border-transparent hover:bg-red-800 rounded transition cursor-pointer"
                      >
                        Cancel Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border border-stone-105 rounded-xl bg-stone-50/20">
                <p className="text-xs text-stone-500 font-sans">No active founder consultations booked.</p>
                <p className="text-[10px] text-stone-400 mt-1">Book an appointment on the Founder tab to consult on custom careers guideline.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column - Preparation Analytics & Interactive Daily Trivia */}
        <div className="space-y-8">
          {/* Preparation Diagnostics Bar Chart */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-stone-800 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700 animate-pulse" /> Diagnostic Metric Map
            </h3>
            <p className="text-[11px] text-stone-400 leading-normal">
              Based on your academy courses and diagnostic mini-tests, here is your preparation rating density.
            </p>

            <div className="space-y-3.5 pt-2">
              {prepCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-sans">
                    <span className="text-stone-600 font-medium">{cat.name}</span>
                    <span className="font-bold text-stone-700">{cat.value}%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${cat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[10px] text-stone-400 italic">
              *Minimum SSB recommend target suggests maintaining above 75% on all diagnostic vectors.
            </div>
          </div>

          {/* Interactive National Security Trivia */}
          <div className="bg-emerald-950 text-stone-100 rounded-2xl p-6 border border-emerald-800/30 shadow-md relative overflow-hidden space-y-4">
            <div className="absolute right-0 top-0 opacity-5 bg-[linear-gradient(to_right,#ffffff11_1px,transparent_1px),linear-gradient(to_bottom,#ffffff11_1px,transparent_1px)] bg-[size:20px_20px] w-1/3 h-full"></div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.1 fill-[#c5a059]/20" /> Daily Security Quiz
              </span>
              <span className="text-[10px] font-mono bg-emerald-800 text-stone-100 px-2 py-0.5 rounded">
                Streak: +{userStats.streak}d
              </span>
            </div>

            {hasTakenQuizToday && !quizFinished ? (
              <div className="space-y-3 py-2 text-center">
                <Award className="w-12 h-12 text-[#c5a059] mx-auto animate-bounce" />
                <h4 className="text-xs font-bold">Today's Briefing Assessment Cleared!</h4>
                <p className="text-[11px] text-stone-300 leading-normal">
                  Excellent work! Reviewing daily challenges builds core mental recall needed for racing formats.
                </p>
                <button
                  id="requiz_button"
                  onClick={handleResetQuiz}
                  className="px-3 py-1.5 bg-emerald-800 text-stone-100 rounded text-xs hover:bg-emerald-700 cursor-pointer inline-flex items-center gap-1 transition"
                >
                  <RefreshCw className="w-3 h-3" /> Re-Take Diagnostic
                </button>
              </div>
            ) : quizFinished ? (
              <div className="space-y-3 py-2 text-center" id="quiz_result_section">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-bold font-sans">Diagnostic Finished!</h4>
                <p className="text-[11px] text-[#c5a059] font-mono font-bold">
                  Score: {quizScore} / {dailyTriviaPool.length} ({Math.round((quizScore/dailyTriviaPool.length)*100)}%)
                </p>
                <p className="text-[10px] text-stone-300 leading-relaxed max-w-xs mx-auto">
                  Statistics updated! Overall average score has adjusted based on today's technical trial.
                </p>
                <div className="flex justify-center gap-2 pt-1">
                  <button
                    id="restart_quiz_button"
                    onClick={handleResetQuiz}
                    className="px-2.5 py-1.5 border border-emerald-800 text-stone-200 rounded text-[10px] hover:bg-emerald-900 cursor-pointer"
                  >
                    Try Again
                  </button>
                  <button
                    id="dismiss_quiz"
                    onClick={() => setHasTakenQuizToday(true)}
                    className="px-2.5 py-1.5 bg-emerald-800 text-stone-100 rounded text-[10px] hover:bg-emerald-700 cursor-pointer font-bold"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4" id="quiz_questions_section">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-[#c5a059]">
                    Question {currentQuestionIndex + 1} of {dailyTriviaPool.length}
                  </p>
                  <h4 className="text-xs font-bold leading-relaxed text-stone-100">
                    {currentTrivia.question}
                  </h4>
                </div>

                <div className="space-y-2">
                  {currentTrivia.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    let optionStyle = "border-stone-700 hover:bg-emerald-900/40 text-stone-200";

                    if (isAnswerSubmitted) {
                      if (oIdx === currentTrivia.correctAnswer) {
                        optionStyle = "bg-emerald-800/80 border-emerald-500 text-white font-semibold";
                      } else if (isSelected) {
                        optionStyle = "bg-red-950/40 border-red-800 text-stone-300";
                      } else {
                        optionStyle = "opacity-40 border-stone-800 text-stone-400";
                      }
                    } else if (isSelected) {
                      optionStyle = "bg-emerald-900 border-[#c5a059] text-white";
                    }

                    return (
                      <button
                        id={`trivia_option_${currentQuestionIndex}_${oIdx}`}
                        key={oIdx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleOptionSelect(oIdx)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs font-sans transition-colors cursor-pointer flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && oIdx === currentTrivia.correctAnswer && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswerSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-900/30 border border-emerald-800/50 rounded-lg text-[10px] text-stone-300 leading-normal"
                  >
                    <span className="font-bold text-[#c5a059] block mb-0.5">Assessment Explanation:</span>
                    {currentTrivia.explanation}
                  </motion.div>
                )}

                <div className="flex justify-end pt-1">
                  {!isAnswerSubmitted ? (
                    <button
                      id="submit_answer_button"
                      disabled={selectedOption === null}
                      onClick={handleSubmitAnswer}
                      className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white rounded text-xs font-sans font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      Lock In Answer <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      id="next_answer_button"
                      onClick={handleNextQuizQuestion}
                      className="px-4 py-1.5 bg-[#c5a059] hover:bg-[#b08b47] text-stone-900 rounded text-xs font-sans font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      {currentQuestionIndex === dailyTriviaPool.length - 1 ? "Finish Series" : "Next Question"} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
