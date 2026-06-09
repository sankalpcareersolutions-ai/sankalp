import React, { useState } from "react";
import { Compass, Shield, Award, Users, BookOpen, GraduationCap, Search, Atom, Target, AlertCircle, ArrowRight, HeartHandshake, Eye, Rocket, Crosshair } from "lucide-react";
import { motion } from "motion/react";

// Import generated premium assets
import flagsImg from "../assets/images/armed_forces_flags_1780997129787.png";
import combatAssetsImg from "../assets/images/army_tank_1780997176988.png";
import droneImg from "../assets/images/fighter_jet_drone_1780997160368.png";

interface HomeProps {
  onSearchSelection: (term: string) => void;
  onTabChange: (tab: string) => void;
}

export default function Home({ onSearchSelection, onTabChange }: HomeProps) {
  // Sector mapping state for the interactive "Career Sector Matcher Tool"
  const [userEducation, setUserEducation] = useState<string>("general_grad");
  const [userCategory, setUserCategory] = useState<string>("combat");
  const [isCalculated, setIsCalculated] = useState<boolean>(true);
  const [matchResult, setMatchResult] = useState<{
    stream: string;
    exams: string[];
    description: string;
  } | null>({
    stream: "Combat Officer Commissions",
    exams: ["Combined Defence Services (CDS) Exam", "NCC Special Entry Scheme"],
    description: "Enlist in the prestigious Indian Military Academy or Officers Training Academy (OTA) Chennai. Leading platoons on tactical boundaries."
  });

  // Degrees
  const degrees = [
    { value: "tenth_twelfth", label: "Class 10th / 12th Aspirant" },
    { value: "engineering", label: "Engineering Graduate (B.E. / B.Tech)" },
    { value: "sciences", label: "Science Graduate (B.Sc / M.Sc / Ph.D)" },
    { value: "general_grad", label: "General Graduate (B.A. / B.Com / B.B.A)" },
  ];

  // Interest Categories
  const interests = [
    { value: "combat", label: "Active Front-line Combat & Field Leadership" },
    { value: "engineering_rnd", label: "R&D and Space-Tech Systems Engineering" },
    { value: "internal_security", label: "Internal Security & Border Management" },
    { value: "civilian_admin", label: "Military Engineering Construction & Supply Logistics" },
  ];

  const handleMatchCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEducation || !userCategory) return;

    let stream = "";
    let exams: string[] = [];
    let description = "";

    if (userEducation === "tenth_twelfth") {
      if (userCategory === "combat") {
        stream = "Indian Armed Forces (Soldier/Officer Entries)";
        exams = ["NDA (National Defence Academy)", "Army 10+2 Technical Entry Scheme (TES)", "Navy B.Tech Entry Schema"];
        description = "You can target elite direct entry schemes as an officer cadet immediately after school. Focus on NDA written preparation and SSB spatial reasoning.";
      } else {
        stream = "Paramilitary Services & Constabulary Entries";
        exams = ["SSC GD Constable", "BSF/CRPF Radio Operator (RO/RMO) Exams"];
        description = "Excellent scope to enter paramilitary forces. Great stability and chance to serve on India’s critical regional borders.";
      }
    } else if (userEducation === "engineering") {
      if (userCategory === "engineering_rnd") {
        stream = "Scientific Establishments & Labs (DRDO / ISRO)";
        exams = ["DRDO RAC Scientist 'B' screening exam", "ISRO Centralised Recruitment Board (ICRB)", "BARC OCES/DGFS Scientific Officer Scheme"];
        description = "As an engineer interested in advanced research, you can directly contribute to missile systems, launch vehicles, and defense material projects.";
      } else if (userCategory === "combat") {
        stream = "Armed Forces Engineering Branches";
        exams = ["CDS (Combined Defence Services)", "AFCAT (Air Force Common Admission Test)", "TGC (Technical Graduate Course)", "Navy UES (University Entry Scheme)"];
        description = "You qualify for both direct technical entries (no written test, immediate SSB call) and standard written tests with higher priority for engineering streams.";
      } else {
        stream = "Civilian Defence Services & Border Administration";
        exams = ["Military Engineering Services (MES) Assistant Director", "UPSC CAPF (AC) Technical Officers", "Directorate General of Quality Assurance (DGQA)"];
        description = "Work inside cantonments and weapons factories managing core military civilian supply lines, quality testing, and construction blueprints.";
      }
    } else if (userEducation === "sciences") {
      if (userCategory === "engineering_rnd" || userCategory === "civilian_admin") {
        stream = "Atomic & Chemical Research Wings (BARC)";
        exams = ["BARC OCES Chemical/Acoustic Physics selection", "DRDO CEPTAM Senior Technical Assistant (STA-B)", "ISRO Project Assistant Recruitment"];
        description = "Ideal matches for science post-graduates. High-fidelity laboratory assignments mapping nuclear radiation containment, optics, and solid state devices.";
      } else {
        stream = "Specialized Para-Police Intelligence Operations";
        exams = ["UPSC CAPF Assistant Commandant", "SSC CPO Sub-Inspector", "Intelligence Bureau (IB) ACIO Selection"];
        description = "Utilize your deep scientific analytics mindset in counter-terrorism systems, telecom wings, and border security communication lines.";
      }
    } else {
      // general graduate
      if (userCategory === "combat") {
        stream = "Combat Officer Commissions";
        exams = ["Combined Defence Services (CDS) Exam", "NCC Special Entry Scheme"];
        description = "Enlist in the prestigious Indian Military Academy or Officers Training Academy (OTA) Chennai. Leading platoons on tactical boundaries.";
      } else {
        stream = "Internal Security & Civil Administration";
        exams = ["UPSC CAPF Assistant Commandant", "SSC CPO Sub-Inspector CISF/BSF", "IDES (Indian Defence Estates Service) Group A"];
        description = "High administrative authority profiles heading paramilitary platoons, airport safety grids, or managing military cantonment land affairs.";
      }
    }

    setMatchResult({ stream, exams, description });
    setIsCalculated(true);
  };

  const handleQuickTopicSearch = (topic: string) => {
    onSearchSelection(topic);
    onTabChange("testimonials");
  };

  return (
    <div className="space-y-12" id="home_tab_root">
      
      {/* Patriotic Banner & National Flags Row */}
      <div className="relative rounded-3xl overflow-hidden border border-gold-600/30 shadow-2xl" id="flags_national_display">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={flagsImg}
            alt="National Tricolour and Armed Forces Flags assembly"
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/40 to-[#050a18]/45"></div>
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-12 sm:right-12 space-y-2">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-lightyellow-100 border border-gold-400/40 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded">
              🇮🇳 Sovereign Pride & Duty
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-lightyellow-100 uppercase tracking-tight font-sans drop-shadow-md">
              One Nation • One Sankalp
            </h2>
            <p className="text-xs sm:text-sm text-lightyellow-100/90 max-w-2xl font-medium font-sans leading-relaxed drop-shadow">
              We stand united under the Indian National Tricolour, aligned with the supreme valor codes of the Tri-Services—Indian Army, Navy, and Air Force.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 border border-gold-600/30 overflow-hidden shadow-2xl py-16 px-6 md:px-12 text-center" id="hero_section">
        {/* Camouflage design accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute right-0 bottom-0 bg-gold-500/10 w-96 h-96 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-lightyellow-200 bg-gold-500/15 border border-gold-400/40 uppercase shadow-inner">
            <Shield className="w-4 h-4 text-gold-400 fill-gold-500/10" /> National Security Careers Consolidated Engine
          </span>

          <h1 className="text-5xl md:text-7xl font-black font-sans text-white tracking-widest leading-tight uppercase drop-shadow-lg">
            Sankalp
          </h1>
          <p className="text-base md:text-xl font-mono text-gold-400 font-black tracking-widest uppercase max-w-2xl mx-auto drop-shadow-md">
            Bridge the Gap to India's Sovereign Sectors
          </p>

          <p className="max-w-2xl mx-auto text-lightyellow-200/80 text-xs md:text-sm leading-relaxed font-sans">
            A unified career counseling platform providing personalized mentorship guidelines, scientific courses,
            and internship placement boards specifically designed for the Indian Armed Forces, Paramilitary divisions,
            civilian contractors, and legendary research organizations like DRDO, BARC, and ISRO.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              id="hero_btn_dashboard"
              onClick={() => onTabChange("dashboard")}
              className="px-6 py-3 bg-gold-450 hover:bg-gold-500 border border-gold-500 text-navy-950 text-xs md:text-sm font-sans font-bold rounded-xl transition duration-200 shadow-md hover:shadow-xl cursor-pointer"
            >
              Access Command Center Dashboard
            </button>
            <button
              id="hero_btn_mentors"
              onClick={() => onTabChange("mentorship")}
              className="px-6 py-3 bg-transparent hover:bg-gold-500/10 border border-gold-400 text-gold-400 text-xs md:text-sm font-sans font-bold rounded-xl transition cursor-pointer"
            >
              Meet the Founder
            </button>
          </div>
        </div>
      </section>

      {/* Combat Power & Tactical Asset Display Row (Warships, Aircraft, Tanks) */}
      <section className="bg-navy-900 border border-gold-600/25 rounded-3xl overflow-hidden p-6 md:p-8 space-y-6" id="combat_power_display_row">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase bg-gold-500/10 text-gold-400 border border-gold-500/20 px-3 py-1 rounded">
              ⚔️ Tri-Services Integrated Arsenal
            </span>
            <h2 className="text-xl md:text-3xl font-bold font-sans text-lightyellow-100 tracking-tight leading-tight uppercase">
              Dominating Land, Air, & Deep Seas
            </h2>
            <p className="text-xs md:text-sm text-lightyellow-100/80 leading-relaxed font-sans">
              Indian Sovereignty relies on heavy engineering prowess. From testing **Main Battle Arjun Tanks** on desert tracks,
              to commanding **Stealth Weaponized Guided-Missile Destroyers** in deep tactical waters, and steering high-maneuver **Supersonic Fighter Interceptors** in territorial airspace. 
            </p>
            <p className="text-xs text-gold-400/80 font-mono leading-relaxed">
              *Master the fundamental aerodynamics, nuclear metallurgy, and naval architecture governing these assets inside our curated courses.*
            </p>
            <div className="pt-2">
              <button
                onClick={() => onTabChange("courses")}
                className="px-4 py-2 bg-navy-800 text-lightyellow-200 hover:text-lightyellow-100 border border-gold-500/30 text-xs font-sans font-bold rounded-lg transition hover:bg-navy-750 flex items-center gap-1 cursor-pointer"
              >
                Explore Structural Blueprints & Courses <ArrowRight className="w-3.5 h-3.5 text-gold-450" />
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-gold-500/20 shadow-lg">
            <img
              src={combatAssetsImg}
              alt="Indian warship, supersonic fighter aircraft, and combat tank collage"
              className="w-full h-64 lg:h-72 object-cover hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-4">
              <span className="text-[10px] font-mono text-stone-300 uppercase tracking-widest bg-navy-950/95 px-2 py-0.5 rounded border border-gold-500/25">Combat Assets Composite</span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary National Security Sectors Mapped */}
      <section className="space-y-6" id="mapped_sectors_section">
        <div className="text-center space-y-1">
          <p className="text-[10px] font-mono tracking-widest uppercase text-gold-400 font-bold">Comprehensive Scopes</p>
          <h2 className="text-xl md:text-2xl font-extrabold text-lightyellow-100 font-sans uppercase">The Four Pillars Of National Sovereignty</h2>
          <p className="text-xs text-lightyellow-200/80 max-w-lg mx-auto">Sankalp is specialized in guidance mapping across these critical domains.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-navy-900 p-6 rounded-xl border border-gold-500/20 hover:border-gold-500/40 transition shadow-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/30 text-gold-400 flex items-center justify-center font-bold text-lg">
              ⚔️
            </div>
            <h3 className="font-bold text-lightyellow-100 text-sm font-sans uppercase tracking-tight">1. Defence Services</h3>
            <p className="text-xs text-lightyellow-200/70 leading-relaxed">
              Commissions inside the Indian Army, Indian Navy, & Indian Air Force. Prep for NDA, CDS, TGC, AFCAT, INET & live SSB personality interviews.
            </p>
          </div>

          <div className="bg-navy-900 p-6 rounded-xl border border-gold-500/20 hover:border-gold-500/40 transition shadow-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/30 text-gold-400 flex items-center justify-center font-bold text-lg">
              🎖️
            </div>
            <h3 className="font-bold text-lightyellow-100 text-sm font-sans uppercase tracking-tight">2. Paramilitary Forces</h3>
            <p className="text-xs text-lightyellow-200/70 leading-relaxed">
              Border Guarding and Internal Security operations: BSF, CRPF, CISF, ITBP, SSB & Assam Rifles. UPSC CAPF and SSC CPO screening rules.
            </p>
          </div>

          <div className="bg-navy-900 p-6 rounded-xl border border-gold-500/20 hover:border-gold-500/40 transition shadow-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/30 text-gold-400 flex items-center justify-center font-bold text-lg">
              📡
            </div>
            <h3 className="font-bold text-lightyellow-100 text-sm font-sans uppercase tracking-tight">3. Scientific R&D</h3>
            <p className="text-xs text-lightyellow-200/70 leading-relaxed">
              Elite scientific laboratories pushing boundary technologies. Targeted prep guidelines for DRDO RAC, ISRO ICRB, and academic BARC OCES.
            </p>
          </div>

          <div className="bg-navy-900 p-6 rounded-xl border border-gold-500/20 hover:border-gold-500/40 transition shadow-md space-y-3">
            <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/30 text-gold-400 flex items-center justify-center font-bold text-lg">
              ⚙️
            </div>
            <h3 className="font-bold text-lightyellow-100 text-sm font-sans uppercase tracking-tight">4. Defence Civilian</h3>
            <p className="text-xs text-lightyellow-200/70 leading-relaxed">
              Crucial logistic networks: Military Engineer Services (MES), Ordnance factories, IDES land admins & Directorate of Quality Assurance (DGQA).
            </p>
          </div>
        </div>
      </section>

      {/* Futuristic Border surveillance drone row */}
      <section className="relative rounded-3xl overflow-hidden border border-gold-600/35 shadow-xl" id="drones_technology_banner">
        <div className="h-56 sm:h-64 w-full relative">
          <img
            src={droneImg}
            alt="Advanced stealth military drone over dynamic border borders"
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/60 to-transparent"></div>
          
          <div className="absolute top-0 bottom-0 left-6 sm:left-12 flex flex-col justify-center space-y-2 max-w-xl z-10 text-left">
            <span className="inline-flex items-center gap-1 bg-[#c5a059]/25 text-lightyellow-100 border border-gold-400/40 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-mono max-w-max">
              🚀 Cutting Edge Technology
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-lightyellow-150 uppercase font-sans leading-none">
              Stealth UAV & Border Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-lightyellow-100/90 leading-snug">
              Modern defense requires persistent eyes-in-the-sky. Our scientific modules prepare you for military electronics, radio modulation, and radar target echoes required inside BARC, DRDO, and ISRO divisions.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Counselling: "My Career Matcher" */}
      <section className="bg-navy-900 rounded-3xl p-6 md:p-8 border border-gold-600/25 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" id="career_matcher_tool">
        <div className="space-y-4">
          <span className="text-[10px] font-mono bg-navy-800 text-lightyellow-200 border border-gold-500/25 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
            Interactive Diagnostics
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-lightyellow-100 tracking-tight leading-tight uppercase font-sans">
            Consult Your Security Entrance Trajectory
          </h2>
          <p className="text-xs md:text-sm text-lightyellow-200/80 leading-relaxed font-sans">
            Unsure of which exams match your academic field or core interests? Select your credentials below, and
            allow SANKALP’s evaluation engine to highlight exactly which defense pathways, eligibility windows,
            and preparation tactics fit your current background.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-gold-450 w-5 h-5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-lightyellow-100 font-sans uppercase">Any Qualification</h4>
                <p className="text-[10px] text-lightyellow-100/60 font-mono">NDA up to PG/PhD levels</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Atom className="text-gold-450 w-5 h-5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-lightyellow-100 font-sans uppercase">Niche Specialists</h4>
                <p className="text-[10px] text-lightyellow-100/60 font-mono">Engineering, physics, telecom</p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Selector Box */}
        <div className="bg-navy-950 rounded-xl border border-gold-600/20 p-6 shadow-inner">
          <form onSubmit={handleMatchCareer} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-lightyellow-200 flex items-center gap-1 font-sans">
                🎓 1. What is your Education/Aspirations Level?
              </label>
              <select
                id="matcher_education"
                required
                className="w-full bg-navy-900 border border-gold-500/20 rounded-lg p-2.5 text-xs font-sans text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450 focus:border-transparent"
                value={userEducation}
                onChange={(e) => {
                  setUserEducation(e.target.value);
                  setIsCalculated(false);
                }}
              >
                <option value="">-- Choose qualification status --</option>
                {degrees.map((d) => (
                  <option key={d.value} value={d.value} className="bg-navy-950 text-lightyellow-100">
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-lightyellow-200 flex items-center gap-1 font-sans">
                ⚡ 2. Select Your Core Objective:
              </label>
              <select
                id="matcher_interest"
                required
                className="w-full bg-navy-900 border border-gold-500/20 rounded-lg p-2.5 text-xs font-sans text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450 focus:border-transparent"
                value={userCategory}
                onChange={(e) => {
                  setUserCategory(e.target.value);
                  setIsCalculated(false);
                }}
              >
                <option value="">-- Choose primary goal --</option>
                {interests.map((i) => (
                  <option key={i.value} value={i.value} className="bg-navy-950 text-lightyellow-100">
                    {i.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="matcher_calculate_btn"
              type="submit"
              className="w-full py-2.5 bg-gold-450 hover:bg-gold-500 text-navy-950 font-sans font-bold text-xs rounded-lg transition shadow-md hover:shadow-xl cursor-pointer"
            >
              Analyze Career Mappings
            </button>
          </form>

          {/* Results Output */}
          {isCalculated && matchResult && (
            <motion.div
              id="matcher_output_block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-5 border-t border-gold-600/20 space-y-3"
            >
              <div className="bg-navy-900 border border-gold-500/30 text-lightyellow-100 p-3 rounded-lg space-y-1 shadow-inner">
                <span className="text-[9px] font-mono uppercase tracking-wider text-gold-400 font-bold block">
                  Recommended Stream
                </span>
                <h4 className="text-xs font-extrabold leading-tight text-lightyellow-200 uppercase tracking-tight">
                  {matchResult.stream}
                </h4>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-lightyellow-200/60 tracking-wider uppercase block">Target Admissions / Exams</span>
                <div className="flex flex-wrap gap-1">
                  {matchResult.exams.map((ex, exIdx) => (
                    <span
                      key={exIdx}
                      className="text-[9.5px] bg-navy-900 text-lightyellow-250 border border-gold-500/15 px-2.5 py-1 rounded font-semibold font-sans text-stone-200"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-lightyellow-200/80 leading-relaxed font-sans">
                {matchResult.description}
              </p>

              <div className="pt-2">
                <button
                  id="matcher_dashboard_redirect"
                  onClick={() => onTabChange("dashboard")}
                  className="text-xs text-gold-400 hover:text-gold-300 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                >
                  Configure study plan in student dashboard <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Banner Row */}
      <section className="bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-3xl p-8 border border-gold-600/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden" id="explore_testimonials_row">
        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-bold font-sans tracking-tight text-lightyellow-100 uppercase">Our Aspirants Have Served Across The Nation</h3>
          <p className="text-xs text-lightyellow-100/70">Discover insights, preparation routines, and recommendations from index 1 to 50.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              id="chip_drdo"
              onClick={() => handleQuickTopicSearch("DRDO")}
              className="px-2.5 py-1 text-[10.5px] font-mono border border-gold-650/20 bg-navy-900 rounded hover:border-gold-500 text-lightyellow-200 hover:text-lightyellow-100 cursor-pointer"
            >
              DRDO (Scientific Assistants)
            </button>
            <button
              id="chip_isro"
              onClick={() => handleQuickTopicSearch("ISRO")}
              className="px-2.5 py-1 text-[10.5px] font-mono border border-gold-650/20 bg-navy-900 rounded hover:border-gold-500 text-lightyellow-200 hover:text-lightyellow-100 cursor-pointer"
            >
              ISRO (Astro Propulsion)
            </button>
            <button
              id="chip_shb"
              onClick={() => handleQuickTopicSearch("SSB")}
              className="px-2.5 py-1 text-[10.5px] font-mono border border-gold-650/20 bg-navy-900 rounded hover:border-gold-500 text-lightyellow-200 hover:text-lightyellow-100 cursor-pointer"
            >
              SSB Recommendation (Army/Navy/AirForce)
            </button>
            <button
              id="chip_capf"
              onClick={() => handleQuickTopicSearch("CAPF")}
              className="px-2.5 py-1 text-[10.5px] font-mono border border-gold-650/20 bg-navy-900 rounded hover:border-gold-500 text-lightyellow-200 hover:text-lightyellow-100 cursor-pointer"
            >
              UPSC CAPF (Paramilitary Commandants)
            </button>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            id="explore_all_testimonials_btn"
            onClick={() => onTabChange("testimonials")}
            className="px-5 py-2.5 bg-gold-450 hover:bg-gold-500 text-navy-950 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            Read All 50 Testimonials <ArrowRight className="w-4 h-4 text-navy-950" />
          </button>
        </div>
      </section>
    </div>
  );
}
