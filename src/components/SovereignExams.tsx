import React, { useState, useEffect } from "react";
import { Shield, BookOpen, Clock, FileText, Compass, Award, HelpCircle, CheckCircle, GraduationCap, ChevronDown, Sparkles, Send, MapPin, Milestone, Target, UserCheck, Bell, BellOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ExamAnnouncement } from "../types";

interface ExamDetail {
  code: string;
  name: string;
  conductingBody: string;
  frequency: string;
  eligibility: string;
  stages: string[];
  syllabusOverview: string[];
  importantTimeline: string;
  isPopular: boolean;
  preparationAdvice: string;
}

interface SovereignExamsProps {
  subscribedExams?: string[];
  onToggleSubscribe?: (examCodeOrCategory: string) => void;
  subscribedEmail?: string;
  onSaveEmailSubscription?: (email: string, categories: string[]) => void;
  onSaveAnnouncement?: (announcement: Omit<ExamAnnouncement, "id" | "date" | "read">) => void;
  subscribedExamDates?: Record<string, string>;
  onSetExamDate?: (examCode: string, date: string) => void;
}

export default function SovereignExams({
  subscribedExams = [],
  onToggleSubscribe = () => {},
  subscribedEmail = "",
  onSaveEmailSubscription = () => {},
  onSaveAnnouncement = () => {},
  subscribedExamDates = {}, onSetExamDate = () => {}}: SovereignExamsProps) {
  const [activeCategory, setActiveCategory] = useState<"UPSC" | "MNS" | "SCIENTIFIC">("UPSC");
  const [expandedExamCode, setExpandedExamCode] = useState<string | null>(null);

  // Search state for specific exams
  const [examSearch, setExamSearch] = useState("");

  // Subscription Preferences & Email State
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [emailVal, setEmailVal] = useState(subscribedEmail);

  useEffect(() => {
    setEmailVal(subscribedEmail);
  }, [subscribedEmail]);

  // Simulation State for creating announcements
  const [simExamCode, setSimExamCode] = useState("UPSC-NDA");
  const [simConductingBody, setSimConductingBody] = useState("UPSC");
  const [simTitle, setSimTitle] = useState("");
  const [simContent, setSimContent] = useState("");
  const [simSuccess, setSimSuccess] = useState(false);


  const upscExams: ExamDetail[] = [
    {
      code: "UPSC-NDA",
      name: "National Defence Academy & Naval Academy (NDA & NA) Examination",
      conductingBody: "Union Public Service Commission (UPSC)",
      frequency: "Twice a Year (NDA I in April, NDA II in September)",
      eligibility: "12th Class Pass / Appearing (16.5 to 19.5 years). Physics & Mathematics mandatory for Navy & Air Force wings.",
      stages: ["Written Examination (Mathematics & General Ability Test - GAT)", "SSB Intelligence & Personality Interview (5 Days Program)", "Rigorous Medical Evaluation"],
      syllabusOverview: [
        "Mathematics (300 Marks): Algebra, Trigonometry, Matrices, Analytical Geometry, Calculus, Vector Algebra, Statistics & Probability",
        "General Ability Test (600 Marks): English Grammar & Vocabulary, Physics, Chemistry, General Science, Social Studies, Geography, and Current Affairs"
      ],
      importantTimeline: "Notifications typically issued in December and May.",
      isPopular: true,
      preparationAdvice: "Focus deeply on 11th and 12th CBSE Mathematics. Speed is key since you have 120 questions to solve in 150 minutes."
    },
    {
      code: "UPSC-CDS",
      name: "Combined Defence Services (CDS) Examination",
      conductingBody: "Union Public Service Commission (UPSC)",
      frequency: "Twice a Year (CDS I in February/March, CDS II in September)",
      eligibility: "Graduation. B.E/B.Tech mandatory for IAF & Navy. (Age limit: 19 to 24 years depending on Army, Navy, Air Force, or OTA).",
      stages: ["Written Exam (English, General Knowledge, Elementary Mathematics)", "SSB Personality Screening Test (Air Force / Navy / Army Academies)", "Medical Directorate Verification"],
      syllabusOverview: [
        "English: Reading comprehension, patch corrections, synonyms, basic grammar elements",
        "General Knowledge: Indian Polity, Sovereign History, Chemistry & Physics fundamentals, Defense Current Events",
        "Elementary Mathematics (Not needed for OTA): Arithmetic, Algebra, Geometry, Trigonometry, Mensuration"
      ],
      importantTimeline: "Notifications released in June and November.",
      isPopular: true,
      preparationAdvice: "Aspirants targeting OTA only need English and GK. Keep a razor-sharp track of current sovereign events over the past 9 months."
    },
    {
      code: "UPSC-CAPF",
      name: "Central Armed Police Forces (Assistant Commandants) Examination",
      conductingBody: "Union Public Service Commission (UPSC)",
      frequency: "Annual (Typically in August)",
      eligibility: "Bachelor's Degree in any discipline (Age limit: 20 to 25 years). Both males and females eligible.",
      stages: ["Paper I (General Ability & Intelligence - MCQs)", "Paper II (General Studies, Essay & Comprehension - Descriptive)", "Physical Efficiency Test (PET) & Medical Standards Test", "UPSC Interview / Personality Test"],
      syllabusOverview: [
        "General Ability & Intelligence: General Science, National/International Current Events, Indian Polity & Economy, Indian History",
        "General Studies (Descriptive): Essay writing on Indian Heritage, Security, human rights, and English comprehension/precis writing"
      ],
      importantTimeline: "Notification in April; Examination in August.",
      isPopular: false,
      preparationAdvice: "Cultivate excellent descriptive writing skills. Focus on internal security issues, border management, and cyber defense protocols."
    },
    {
      code: "AFCAT",
      name: "Air Force Common Admission Test (AFCAT)",
      conductingBody: "Indian Air Force (IAF)",
      frequency: "Twice a year (February and August)",
      eligibility: "Graduate with minimum 60% in Physics & Maths at 10+2 level, or B.E./B.Tech (Age limit: 20 to 24 for Flying; 20 to 26 for Ground Duty).",
      stages: ["AFCAT Online Examination", "Engineering Knowledge Test (EKT - Only for Technical Branch candidates)", "Air Force Selection Board (AFSB) Testing", "Medical Board Evaluation"],
      syllabusOverview: [
        "AFCAT Syllabus: Verbal Ability in English, Numerical Ability, Reasoning & Military Aptitude Test, General Awareness",
        "EKT Syllabus: Mechanical, Computer Science, or Electrical & Electronics Core Engineering Fundamentals"
      ],
      importantTimeline: "Notifications issued in June and December.",
      isPopular: true,
      preparationAdvice: "Practicing spatial reasoning and military aptitude questions. For Technical branches, focus on fundamental engineering principles."
    },
    {
      code: "ARMY-DIRECT",
      name: "Indian Army Direct Entries (Technical Graduate Course - TGC & SSC Tech)",
      conductingBody: "Directorate General of Recruiting, Indian Army",
      frequency: "Twice a year (TGC in Jan/Jul, SSC Tech in Apr/Oct)",
      eligibility: "B.E./B.Tech graduates or final year students in designated engineering fields. Age limits: 20 to 27 years for TGC and SSC Tech.",
      stages: ["Academic Cut-off Merit List Screening", "Two-Stage SSB Interview (5 Days testing program)", "Medical Board Examination"],
      syllabusOverview: [
        "No Written Academic Test: Selection is strictly based on the technical graduation cumulative percentage cut-off followed by direct comprehensive SSB psychometric screening."
      ],
      importantTimeline: "Applications typically open in May/June & Nov/Dec.",
      isPopular: false,
      preparationAdvice: "Maintain a high semester GPA. Prepare thoroughly for SSB psychology tasks (TAT, WAT, SRT) and situational command tasks."
    },
    {
      code: "NAVY-DIRECT",
      name: "Indian Navy Direct Executive & Technical Entry (including 10+2 B.Tech Entry)",
      conductingBody: "DMPR, Integrated Headquarters of MoD (Navy)",
      frequency: "Twice a year",
      eligibility: "For Direct Entry: B.E./B.Tech with minimum 60% marks. For 10+2 B.Tech Entry: Passed 12th with 70% in PCM and appeared in JEE Main.",
      stages: ["Shortlisting based on JEE Main Rank (for 10+2 B.Tech) or Graduation Marks", "SSB Interview (Stage I & II)", "Naval Medical Authority Evaluation"],
      syllabusOverview: [
        "No Written Test: Direct screening built upon standard engineering streams or high secondary JEE Main mathematical performance indices."
      ],
      importantTimeline: "Notifications published in June/July & November/December.",
      isPopular: false,
      preparationAdvice: "Gain stellar basic understanding of marine hydrodynamics, general technical trends, and demonstrate high levels of physical coordination."
    }
  ];

  const mnsExams: ExamDetail[] = [
    {
      code: "MILITARY-NURSING",
      name: "Military Nursing Services (MNS) B.Sc (Nursing) Entrance Exam",
      conductingBody: "Directorate General of Medical Services (Army)",
      frequency: "Annual",
      eligibility: "Female Citizens only. 10+2 passing marks in Physics, Chemistry, Biology and English with aggregate minimum 50%. (Age: 17 to 25 years). Must qualify NEET (UG) score first.",
      stages: ["Sovereign NEET (UG) Merit Listing", "MNS Computer Based Test (CBT) for Test of General Intelligence & English (ToGIGE)", "Psychological Assessment (PAT) & Panel Interview", "Medical Screening"],
      syllabusOverview: [
        "NEET (UG) Core: Physics, Chemistry, Biology (CBSE Class 11 and 12 levels)",
        "ToGIGE: Synonyms, Antonyms, Spotting Error, Idioms & Phrases, General Intelligence, Logical Reasoning, Current Scientific Achievements"
      ],
      importantTimeline: "Applications typically open following the release of NEET UG scores.",
      isPopular: true,
      preparationAdvice: "Focus primarily on performing exceptionally well in NEET (UG) as database listings are highly competitive, followed by active practice of general English grammar."
    },
    {
      code: "MNS-SSC",
      name: "Short Service Commission (SSC) Officer Entry in Military Nursing Services",
      conductingBody: "Integrated HQ of MoD (Army)",
      frequency: "Annual Recruitment",
      eligibility: "Female Candidates who are registered Nurse and Midwife (M.Sc/B.Sc Nursing / Post Basic B.Sc Nursing) from a recognized state university.",
      stages: ["Written Examination (Fully Computer-Based test)", "Physical & Medical Fitness Portfolio Verification", "SSB Style Interview by Board of Officers"],
      syllabusOverview: [
        "Nursing Knowledge (100 Marks): Medical Surgical Nursing, Midwifery and Obstetrical Nursing, Community Health Nursing, Mental Health Nursing, Child Health Nursing"
      ],
      importantTimeline: "Short notifications are published in leading national dailies and online portals in October/November.",
      isPopular: false,
      preparationAdvice: "Revise clinical-medical scenarios, pharmacological dosages, and nursing administration protocols. Panel interviews deeply test emotional resilience."
    }
  ];

  const scientificExams: ExamDetail[] = [
    {
      code: "DRDO-RAC",
      name: "DRDO Scientist 'B' Recruitment (via GATE & Direct Written Test)",
      conductingBody: "Recruitment & Assessment Centre (RAC), DRDO",
      frequency: "Annual (Typically after GATE results are announced)",
      eligibility: "First Class B.E./B.Tech in Engineering or Master's in Science (with valid GATE score inside the respective discipline). Special channels for IIT/IISc graduates without GATE.",
      stages: ["Preliminary screening through GATE Scores", "Direct Descriptive Written Examination (Technical Spec Sheets)", "Personal Interview (Technical + General Suitability)"],
      syllabusOverview: [
        "Descriptive Paper I & II: Comprehensive questions from Electronics, Computer Science, Mechanical or Physics (aligned with standard GATE/Engineering Services Exam syllabus)"
      ],
      importantTimeline: "Registration commences in May/June.",
      isPopular: true,
      preparationAdvice: "Since 2020, written tests are subjective. Focus on derivation capability, design numericals, and core military scientific applications (Radar, materials, RF systems)."
    },
    {
      code: "BARC-OCES",
      name: "BARC Scientific Officer (OCES/DGFS) Examination",
      conductingBody: "Bhabha Atomic Research Centre (BARC) Training Schools",
      frequency: "Annual (Online Exam in March/April)",
      eligibility: "B.E./B.Tech / M.Sc with minimum 60% aggregate. Selection either through online exam or qualifying GATE score.",
      stages: ["Online CBT of 2 Hours, OR GATE Score screening", "In-depth Technical interview at BARC Training School, Mumbai (extremely rigorous, lasting 60-90 minutes)"],
      syllabusOverview: [
        "Core Stream (Mechanical, Chemical, Metallurgy, Electrical, Electronics, Instrumentation, Computer Science, Nuclear Engineering) standard engineering syllabus. No general knowledge or aptitude asked."
      ],
      importantTimeline: "Applications open in January-February.",
      isPopular: true,
      preparationAdvice: "BARC interviews are legendary. They do not test what you don't know; they test the depth of what you claim to know. Solidify your understanding of basic physics, thermodynamics, and fluid/solid mechanics."
    },
    {
      code: "ISRO-ICRB",
      name: "ISRO Centralised Recruitment Board (ICRB) Scientist/Engineer 'SC'",
      conductingBody: "ISRO Centralised Recruitment Board",
      frequency: "Biennial / Annual",
      eligibility: "B.E./B.Tech or equivalent in Electronics, Mechanical, Computer Science fields with first class (minimum aggregate 65% marks or CGPA 6.84/10).",
      stages: ["Written Examination (Acro-Engineering & Space Telemetry topics)", "Personal Screening Interview"],
      syllabusOverview: [
        "Written Test: 80 Multiple Choice Questions focusing completely on technical specifications, circuit designs, orbital dynamics, mechanics, and computational logic"
      ],
      importantTimeline: "Post notifications appear intermittently based on live satellite payload operations.",
      isPopular: true,
      preparationAdvice: "Speed and accuracy are critical. Review standard rocket telemetry systems, heat transfer, electromagnetics, and signal processing."
    }
  ];

  const getActiveArray = () => {
    switch (activeCategory) {
      case "UPSC":
        return upscExams;
      case "MNS":
        return mnsExams;
      case "SCIENTIFIC":
        return scientificExams;
      default:
        return upscExams;
    }
  };

  const filteredExams = getActiveArray().filter(
    (ex) =>
      ex.name.toLowerCase().includes(examSearch.toLowerCase()) ||
      ex.code.toLowerCase().includes(examSearch.toLowerCase()) ||
      ex.conductingBody.toLowerCase().includes(examSearch.toLowerCase())
  );

  const toggleExam = (code: string) => {
    if (expandedExamCode === code) {
      setExpandedExamCode(null);
    } else {
      setExpandedExamCode(code);
    }
  };

  return (
    <div className="space-y-12" id="sovereign_exams_tab_root">
      
      {/* Sovereign Title & Banner Section with Noble Layout */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 p-8 rounded-3xl border border-gold-600/35 text-left text-lightyellow-101 shadow-2xl relative overflow-hidden" id="exams_header_banner">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1 bg-[#c5a059]/20 text-gold-400 border border-gold-500/25 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded">
            📜 National Recruitment & Entrance Registry
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-lightyellow-100 uppercase">
            Defence & Scientific Entrance Directory
          </h1>
          <p className="text-xs sm:text-sm text-lightyellow-200/80 leading-relaxed font-sans max-w-3xl">
            Sankalp offers a consolidated repository mapping the exact syllabus requirements, testing stages, physical criteria, and timeline frameworks for India's elite defense commissions, paramilitary commands, and high-security research divisions.
          </p>
        </div>
      </div>

      {/* Category Selection Tabs & Search Anchor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-navy-900 p-5 rounded-3xl border border-gold-600/20" id="exams_controls_panel">
        <div className="md:col-span-8 flex flex-wrap gap-2 justify-start">
          <button
            onClick={() => {
              setActiveCategory("UPSC");
              setExpandedExamCode(null);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-extrabold uppercase tracking-wide transition duration-150 cursor-pointer ${
              activeCategory === "UPSC"
                ? "bg-gold-450 text-navy-950 border border-gold-500 shadow-md"
                : "bg-navy-950 hover:bg-navy-800 text-lightyellow-200 border border-gold-600/15"
            }`}
          >
            🛡️ Defence & UPSC Entries
          </button>
          
          <button
            onClick={() => {
              setActiveCategory("MNS");
              setExpandedExamCode(null);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-extrabold uppercase tracking-wide transition duration-150 cursor-pointer ${
              activeCategory === "MNS"
                ? "bg-gold-450 text-navy-950 border border-gold-500 shadow-md"
                : "bg-navy-950 hover:bg-navy-800 text-lightyellow-200 border border-gold-600/15"
            }`}
          >
            🩺 Military Nursing (MNS)
          </button>
          
          <button
            onClick={() => {
              setActiveCategory("SCIENTIFIC");
              setExpandedExamCode(null);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-extrabold uppercase tracking-wide transition duration-150 cursor-pointer ${
              activeCategory === "SCIENTIFIC"
                ? "bg-gold-450 text-navy-950 border border-gold-500 shadow-md"
                : "bg-navy-950 hover:bg-navy-800 text-lightyellow-200 border border-gold-600/15"
            }`}
          >
            🚀 Scientific R&D (DRDO/BARC/ISRO)
          </button>
        </div>

        <div className="md:col-span-4 relative">
          <input
            type="text"
            placeholder="Search exam codes/names..."
            value={examSearch}
            onChange={(e) => setExamSearch(e.target.value)}
            className="w-full bg-navy-950 text-lightyellow-100 border border-gold-500/25 rounded-xl pl-3 pr-8 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold-450 placeholder-navy-300 font-medium"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 text-xs font-semibold">🔍</span>
        </div>
      </div>

      {/* Main Interactive Content Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Main Exam List Accordion */}
        <div className="lg:col-span-8 space-y-4">
          <div className="text-left py-1">
            <h3 className="text-lg font-black text-lightyellow-100 uppercase tracking-tight font-sans">
              Active National Exams Under {activeCategory === "UPSC" ? "UPSC & MoD Boards" : activeCategory === "MNS" ? "Armed Forces Medical Directorate" : "Scientific R&D Commission Panels"}
            </h3>
            <p className="text-xs text-lightyellow-200/60 font-mono">Click any exam card to inspect written phases, descriptive syllabus matrices, and timeline updates.</p>
          </div>

          <div className="space-y-4 text-left">
            {filteredExams.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-gold-500/20 rounded-3xl text-lightyellow-200/50 text-sm">
                No custom examination schemes found matching "{examSearch}". Broaden your keywords.
              </div>
            ) : (
              filteredExams.map((ex) => {
                const isExpanded = expandedExamCode === ex.code;
                
                return (
                  <div
                    key={ex.code}
                    className={`bg-navy-900 border transition-all duration-300 rounded-3xl overflow-hidden shadow-lg ${
                      isExpanded ? "border-gold-450 ring-2 ring-gold-500/10" : "border-gold-600/20 hover:border-gold-500/40"
                    }`}
                  >
                    {/* Header bar of the Accordion */}
                    <div
                      onClick={() => toggleExam(ex.code)}
                      className="p-5 md:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono tracking-wider font-extrabold bg-navy-950 text-gold-400 border border-gold-500/20 px-2.5 py-0.5 rounded">
                            {ex.code}
                          </span>
                          <span className="text-[9.5px] font-mono text-lightyellow-202/60">
                            {ex.conductingBody}
                          </span>
                          {ex.isPopular && (
                            <span className="inline-flex items-center gap-0.5 text-[8.5px] font-extrabold uppercase tracking-widest bg-primary text-[#0B1F3A] px-2 py-0.2 rounded-full">
                              🔥 Star Entry
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm md:text-base font-black text-lightyellow-101 uppercase tracking-tight">
                          {ex.name}
                        </h4>
                        <p className="text-[11.5px] font-mono text-gold-450 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold-450" /> Frequency: {ex.frequency}
                        </p>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleSubscribe(ex.code)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                            subscribedExams.includes(ex.code)
                              ? "bg-gold-450 text-navy-950 border-gold-500 hover:bg-gold-500"
                              : "bg-navy-950 text-gold-400 border-gold-600/25 hover:border-gold-400/50 hover:bg-navy-900"
                          }`}
                        >
                          <Bell className={`w-3 h-3 ${subscribedExams.includes(ex.code) ? "fill-navy-950 text-navy-950" : "text-gold-400"} font-semibold`} />
                          <span>{subscribedExams.includes(ex.code) ? "Subscribed" : "Get Alerts"}</span>
                        </button>
                        {subscribedExams.includes(ex.code) && (
                          <div className="flex flex-col ml-3">
                            <label className="text-[9px] text-lightyellow-200/50 mb-0.5">Exam Date</label>
                            <input
                              type="date"
                              value={subscribedExamDates[ex.code] || ""}
                              onChange={(e) => onSetExamDate(ex.code, e.target.value)}
                              className="bg-navy-950 border border-gold-600/30 text-lightyellow-100 text-[10px] px-1.5 py-1 rounded"
                            />
                          </div>
                        )}

                        <div 
                          onClick={() => toggleExam(ex.code)}
                          className="p-1.5 rounded-lg bg-navy-950 border border-gold-550/20 text-gold-400 hover:text-gold-300 transition-colors cursor-pointer font-semibold"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details Body */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="p-5 md:p-6 bg-navy-950 border-t border-gold-600/20 space-y-5">
                            
                            {/* Eligibility Gate */}
                            <div className="space-y-1.5 bg-navy-900 border border-gold-600/15 p-4 rounded-2xl">
                              <span className="text-[10px] font-mono font-extrabold text-gold-400 tracking-wider uppercase block">
                                ⚓ Standard Eligibility Criteria:
                              </span>
                              <p className="text-xs text-lightyellow-100 font-sans leading-relaxed font-semibold">
                                {ex.eligibility}
                              </p>
                            </div>

                            {/* Testing Stages */}
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono font-extrabold text-gold-400 tracking-wider uppercase block pb-1 border-b border-gold-600/15">
                                ⚔️ Testing Stages Sequence:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {ex.stages.map((stage, sIdx) => (
                                  <div key={sIdx} className="bg-navy-900/65 border border-gold-550/10 p-3 rounded-xl flex items-start gap-2">
                                    <span className="w-5 h-5 bg-navy-950 text-gold-400 font-mono font-bold text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                      {sIdx + 1}
                                    </span>
                                    <span className="text-[11px] text-lightyellow-200/90 font-sans font-medium leading-tight">
                                      {stage}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Syllabus & Marks Breakdown */}
                            <div className="space-y-2.5">
                              <span className="text-[10px] font-mono font-extrabold text-gold-400 tracking-wider uppercase block">
                                📘 Syllabus & Testing Parameters Blueprint:
                              </span>
                              <ul className="space-y-2 text-xs text-lightyellow-150 leading-relaxed font-sans">
                                {ex.syllabusOverview.map((item, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="text-gold-450">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Timeline Alert */}
                            <div className="flex items-center gap-2 bg-navy-900 p-3.5 rounded-xl border border-amber-600/20 text-xs">
                              <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded">
                                ALERT
                              </span>
                              <span className="text-lightyellow-200/90 font-mono">
                                <b>Notification Window:</b> {ex.importantTimeline}
                              </span>
                            </div>

                            {/* Preparation Secret */}
                            <div className="p-4 bg-gold-450/5 border border-gold-500/30 rounded-2xl space-y-1 text-left">
                              <div className="flex items-center gap-1.5 text-gold-400 font-semibold">
                                <Sparkles className="w-4 h-4 text-gold-450" />
                                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-gold-450">Founder's Strategic Briefing:</span>
                              </div>
                              <p className="text-[11.5px] text-lightyellow-200 leading-relaxed font-serif italic font-semibold">
                                "{ex.preparationAdvice}"
                              </p>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Scientific Internships, Fellowships, and Cadet Admissions */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Get Exam Alerts Card */}
          <div className="bg-navy-900 border border-gold-600/35 rounded-3xl p-6 shadow-xl space-y-4 animate-fade-in" id="get_exam_alerts_card">
            <div className="flex items-center gap-2 border-b border-gold-600/15 pb-3">
              <div className="p-1.5 rounded-lg bg-navy-950 border border-gold-550/20 text-gold-400 font-semibold">
                <Bell className="w-5 h-5 animate-bounce text-gold-400 font-semibold" />
              </div>
              <h3 className="text-sm font-black text-lightyellow-101 uppercase tracking-wider">
                Get Exam Alerts
              </h3>
            </div>
            
            <p className="text-xs text-lightyellow-200/70 leading-relaxed">
              Subscribe to real-time notification alerts. Be the first to know when national board notifications, application windows, or SSB schedules are announced.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const emailInput = form.elements.namedItem("email") as HTMLInputElement;
              
              const categories: string[] = [];
              if ((form.elements.namedItem("cat-upsc") as HTMLInputElement)?.checked) categories.push("UPSC");
              if ((form.elements.namedItem("cat-mns") as HTMLInputElement)?.checked) categories.push("MNS");
              if ((form.elements.namedItem("cat-sci") as HTMLInputElement)?.checked) categories.push("SCIENTIFIC");
              
              onSaveEmailSubscription(emailInput.value, categories);
              setSubscriptionSuccess(true);
              setTimeout(() => setSubscriptionSuccess(false), 3000);
            }} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono text-gold-400 mb-1 uppercase tracking-wider font-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  required
                  placeholder="cadet@sankalp.com"
                  className="w-full bg-navy-950 text-lightyellow-100 border border-gold-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gold-450 placeholder-navy-300 font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-gold-400 uppercase tracking-wider font-semibold">Alert Categories</label>
                
                <label className="flex items-center gap-2.5 text-xs text-lightyellow-200/90 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="cat-upsc"
                    checked={subscribedExams.includes("UPSC")}
                    onChange={() => onToggleSubscribe("UPSC")}
                    className="accent-gold-500 cursor-pointer rounded"
                  />
                  <span>🛡️ Defence & UPSC Board updates</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-lightyellow-200/90 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="cat-mns"
                    checked={subscribedExams.includes("MNS")}
                    onChange={() => onToggleSubscribe("MNS")}
                    className="accent-gold-500 cursor-pointer rounded"
                  />
                  <span>🩺 Military Nursing (MNS) alerts</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-lightyellow-200/90 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="cat-sci"
                    checked={subscribedExams.includes("SCIENTIFIC")}
                    onChange={() => onToggleSubscribe("SCIENTIFIC")}
                    className="accent-gold-500 cursor-pointer rounded"
                  />
                  <span>🚀 Scientific (ISRO, DRDO, BARC)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gold-450 hover:bg-gold-500 text-navy-950 font-black text-xs py-2.5 rounded-xl uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 font-sans"
              >
                {subscriptionSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Preferences Saved!
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Save Preferences
                  </>
                )}
              </button>
            </form>

            {subscribedExams.length > 0 && (
              <div className="pt-2 border-t border-gold-600/15">
                <span className="text-[9px] font-mono text-gold-400 block mb-1.5 uppercase tracking-wider font-semibold">Active Alert Topics:</span>
                <div className="flex flex-wrap gap-1.5">
                  {subscribedExams.map((sub) => (
                    <span key={sub} className="text-[9.5px] font-mono px-2 py-0.5 bg-navy-950 border border-gold-500/25 text-gold-400 rounded-full flex items-center gap-1 font-semibold">
                      🔔 {sub}
                      <button 
                        type="button"
                        onClick={() => onToggleSubscribe(sub)}
                        className="text-red-400 hover:text-red-300 font-bold ml-0.5 text-[9px] cursor-pointer"
                        title="Unsubscribe"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scientific R&D Internship & Fellowship Standards Card */}
          <div className="bg-navy-900 border border-gold-600/25 rounded-3xl p-6 shadow-xl space-y-5" id="scientific_internship_norms_card">
            <h3 className="text-md font-bold text-lightyellow-101 uppercase tracking-widest flex items-center gap-1.5 border-b border-gold-600/15 pb-3">
              <Target className="w-5 h-5 text-gold-400 font-semibold" />
              R&D INTERNSHIP RULES
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono bg-navy-950 text-gold-400 px-2 py-0.5 rounded tracking-widest uppercase font-extrabold">
                  DRDO FELLOWSHIPS
                </span>
                <p className="text-xs text-lightyellow-200/90 leading-relaxed font-sans font-semibold">
                  Offers JRF (Junior Research Fellowship) and RA (Research Associate) positions in active weapons systems laboratories, materials sciences clusters, and telemetry design arrays.
                </p>
                <p className="text-[10.5px] text-lightyellow-200/50 font-mono">
                  *GATE/NET qualifications are strictly checked. No backlog papers permitted.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono bg-navy-950 text-gold-400 px-2 py-0.5 rounded tracking-widest uppercase font-extrabold">
                  BARC OCES SCHEME
                </span>
                <p className="text-xs text-lightyellow-200/90 leading-relaxed font-sans font-semibold">
                  A premium 1-year training session at BARC training schools. Successful absorption ensures standard Scientist Officer 'C' placement within the Department of Atomic Energy (DAE).
                </p>
                <p className="text-[10.5px] text-lightyellow-200/50 font-mono">
                  *Requires absolute integrity and strict Level-3 Indian security clearance.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono bg-navy-950 text-gold-400 px-2 py-0.5 rounded tracking-widest uppercase font-extrabold">
                  ISRO SPACE INTERNSHIPS
                </span>
                <p className="text-xs text-lightyellow-200/90 leading-relaxed font-sans font-semibold">
                  Provides high-altitude aerodynamics research apprenticeships and payload validation traineeships to pre-final year engineering students directly via ICRB allocations.
                </p>
              </div>
            </div>

            <div className="bg-navy-950 border border-gold-600/20 p-4 rounded-2xl hover:border-gold-400/40 transition">
              <h4 className="text-xs font-black text-lightyellow-100 uppercase tracking-wide">Ready to Enlist in Internships?</h4>
              <p className="text-[11px] text-lightyellow-200/70 mt-1 mb-3">Check active research positions on our placements desk and submit your academic GPA transcripts early.</p>
              <div className="flex justify-start">
                <span className="text-[10px] font-mono font-bold bg-gold-450 text-navy-950 px-2.5 py-1 rounded">
                  AUTHENTIC CREDENTIAL GATEWAY ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Quick SSB/Interview Screening Metrics Check (Highly Beautiful Card) */}
          <div className="bg-navy-900 border border-gold-600/25 rounded-3xl p-6 shadow-xl space-y-4" id="ssb_psychology_benchmarks_card">
            <h3 className="text-xs font-black text-gold-400 uppercase tracking-widest flex items-center gap-1">
              ⚓ OFFICER LIKE QUALITIES (OLQ)
            </h3>
            <p className="text-[11.5px] text-lightyellow-100/90 leading-relaxed font-sans">
              SSB boards evaluate candidates across **15 Officer Like Qualities (OLQs)** structured into brain, heart, guts, and stamina matrices.
            </p>

            <div className="space-y-2 pt-1 font-sans">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-lightyellow-150 font-bold block">FACTOR 1: Intellectual Capacity & Tactics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-lightyellow-150 font-bold block">FACTOR 2: Social Adaptability & Synergy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-lightyellow-150 font-bold block">FACTOR 3: Dynamism & Executive Guts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-lightyellow-150 font-bold block">FACTOR 4: Physical Stamina & Courage</span>
              </div>
            </div>

            <div className="text-[11px] text-lightyellow-250/50 border-t border-gold-600/10 pt-3 leading-relaxed">
              *Prepare your psychology test profile (TAT, WAT, SRT) and command task routines perfectly inside SANKALP’s curated live courses.*
            </div>
          </div>

          {/* Announcement Creator Command Deck (Simulator) */}
          <div className="bg-navy-900 border border-gold-600/35 rounded-3xl p-6 shadow-xl space-y-4" id="announcement_creator_simulator">
            <h3 className="text-xs font-black text-gold-450 uppercase tracking-widest flex items-center gap-1.5 border-b border-gold-600/15 pb-3 font-sans">
              <Sparkles className="w-4 h-4 text-gold-450 animate-spin" style={{ animationDuration: "5s" }} />
              ALERT COMMAND DECK
            </h3>
            
            <p className="text-xs text-lightyellow-200/70 leading-relaxed font-sans">
              <b>Simulation Hub:</b> Post a new official national announcement. Subscribed students will immediately receive a new notification on their dashboards!
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              onSaveAnnouncement({
                examCode: simExamCode,
                conductingBody: simConductingBody,
                title: simTitle,
                content: simContent,
              });
              setSimTitle("");
              setSimContent("");
              setSimSuccess(true);
              setTimeout(() => setSimSuccess(false), 3000);
            }} className="space-y-3">
              <div>
                <label className="block text-[9px] font-mono text-gold-400 mb-1 uppercase tracking-wider font-semibold">Target Exam Update</label>
                <select
                  value={simExamCode}
                  onChange={(e) => {
                    setSimExamCode(e.target.value);
                    const val = e.target.value;
                    if (val.startsWith("UPSC") || val === "NDA" || val === "CDS" || val === "CAPF") {
                      setSimConductingBody("UPSC");
                    } else if (val.startsWith("MILITARY") || val === "MNS" || val === "MILITARY-NURSING") {
                      setSimConductingBody("Armed Forces Medical Services");
                    } else if (val.includes("ISRO")) {
                      setSimConductingBody("ISRO");
                    } else if (val.includes("DRDO")) {
                      setSimConductingBody("DRDO");
                    } else if (val.includes("BARC")) {
                      setSimConductingBody("BARC");
                    } else {
                      setSimConductingBody("National Exam Board");
                    }
                  }}
                  className="w-full bg-navy-950 text-lightyellow-101 border border-gold-500/25 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-gold-450 cursor-pointer font-sans"
                >
                  <option value="UPSC-NDA">NDA & NA Examination (UPSC-NDA)</option>
                  <option value="UPSC-CDS">Combined Defence Services (UPSC-CDS)</option>
                  <option value="UPSC-CAPF">Central Armed Police (UPSC-CAPF)</option>
                  <option value="AFCAT">Air Force Exam (AFCAT)</option>
                  <option value="MILITARY-NURSING">Military Nursing Services (MILITARY-NURSING)</option>
                  <option value="DRDO-RAC">DRDO Scientist 'B' (DRDO-RAC)</option>
                  <option value="BARC-OCES">BARC Scientific Officer (BARC-OCES)</option>
                  <option value="ISRO-ICRB">ISRO Scientist SC (ISRO-ICRB)</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-mono text-gold-400 mb-1 uppercase tracking-wider font-semibold">Announcement Title</label>
                <input
                  type="text"
                  required
                  value={simTitle}
                  onChange={(e) => setSimTitle(e.target.value)}
                  placeholder="e.g. 2026 Application Portal Open!"
                  className="w-full bg-navy-950 text-lightyellow-100 border border-gold-500/20 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold-450 placeholder-navy-300 font-sans"
                />
              </div>

              <div>
                <label className="block text-[9px] font-mono text-gold-400 mb-1 uppercase tracking-wider font-semibold">Content & Details</label>
                <textarea
                  required
                  rows={2}
                  value={simContent}
                  onChange={(e) => setSimContent(e.target.value)}
                  placeholder="e.g. Official notification is now out. Eligible cadets must submit documentation by end of this month."
                  className="w-full bg-navy-950 text-lightyellow-100 border border-gold-500/20 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold-450 placeholder-navy-300 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-stone-100 font-black text-xs py-2 rounded-xl uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 font-sans"
              >
                {simSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> Alert Fired Successfully!
                  </>
                ) : (
                  <>
                    <span>📢 Publish & Save Announcement</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
