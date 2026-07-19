import React, { useState } from "react";
import { Mentor } from "../types";
import { mentors } from "../data/portalData";
import { Compass, Shield, Award, Users, Star, Video, Calendar, Clock, AlertCircle, Sparkles, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MentorshipProps {
  onBookBriefing: (mentor: Mentor, slot: string) => void;
  bookedAppointments: { mentor: Mentor; slot: string; id: string }[];
}

export default function Mentorship({ onBookBriefing, bookedAppointments }: MentorshipProps) {
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<Mentor | null>(null);
  const [chosenSlot, setChosenSlot] = useState<string>("");
  const [successBookingMessage, setSuccessBookingMessage] = useState<string>("");
  const [activePhase, setActivePhase] = useState<number>(1);

  const phasesData = [
    {
      id: 1,
      title: "Phase I: SSB Psych (15 Sessions)",
      tagline: "Unlocking subconscious thinking vectors",
      sessions: [
        "Sessions 1 - 3: TAT (Thematic Apperception Test) Story Projections & Theme Cleansing",
        "Sessions 4 - 6: WAT (Word Association Test) Immediate Reaction Profiling",
        "Sessions 7 - 10: SRT (Situation Reaction Test) Tactical Logic & Solution Architecture",
        "Sessions 11 - 15: SDT (Self Description Test) Personal Calibration & Blindspot Evaluation"
      ]
    },
    {
      id: 2,
      title: "Phase II: OLQ Grooming (15 Sessions)",
      tagline: "Cultivating 15 Officer-Like Qualities",
      sessions: [
        "Sessions 16 - 19: Effective Intelligence, Reasoning Ability & Expressive Force",
        "Sessions 20 - 23: Group Planning Trials, Social Synergy & Team Cooperation",
        "Sessions 24 - 27: Speed of Decision, Self-Confidence & Crisis Command Mastery",
        "Sessions 28 - 30: Personal Initiative, Influence, and Courageous Resolve"
      ]
    },
    {
      id: 3,
      title: "Phase III: Tech & Marine (10 Sessions)",
      tagline: "Domain-intensive weapon & ship telemetry",
      sessions: [
        "Sessions 31 - 33: Hydrodynamics, Hull Machinery Design & Naval Architecture Calculations",
        "Sessions 34 - 36: Aerospace Propulsion Systems & High-Assurance Rocket Telemetry",
        "Sessions 37 - 40: BARC/DRDO Scientific Research Frameworks & Armament Formulations"
      ]
    },
    {
      id: 4,
      title: "Phase IV: Board & CPSS (10 Sessions)",
      tagline: "Polishing interview posture & Pilot diagnostics",
      sessions: [
        "Sessions 41 - 45: Executive Demeanor, Body Language & Retired General Interview Simulations",
        "Sessions 46 - 48: General Studies Paper-II Essay Corrections & National Geopolitics Analysis",
        "Sessions 49 - 50: CPSS (Computerized Pilot Selection System) Spatial Instinct Diagnostics"
      ]
    }
  ];

  const handleOpenBookingModal = (mentor: Mentor) => {
    setSelectedMentorForBooking(mentor);
    // Prefer the first available slot as default if available
    const openSlots = mentor.availableSlots.filter(
      (slot) => !bookedAppointments.some((appt) => appt.mentor.id === mentor.id && appt.slot === slot)
    );
    setChosenSlot(openSlots[0] || "");
    setSuccessBookingMessage("");
  };

  const handleConfirmBooking = () => {
    if (!selectedMentorForBooking || !chosenSlot) return;

    onBookBriefing(selectedMentorForBooking, chosenSlot);
    setSuccessBookingMessage(
      `Briefing scheduled successfully with ${selectedMentorForBooking.name} for ${chosenSlot}. Keep your camera active!`
    );

    setTimeout(() => {
      setSelectedMentorForBooking(null);
      setChosenSlot("");
      setSuccessBookingMessage("");
    }, 2800);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="mentorship_tab_root">
      
      {/* Sovereign Banner matching our gorgeous navy/gold aesthetic */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 p-8 rounded-3xl border border-gold-600/35 text-left text-lightyellow-101 shadow-2xl relative overflow-hidden" id="mentorship_hdr_banner">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1 bg-[#c5a059]/20 text-gold-400 border border-gold-500/25 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded">
            🎗️ Founder's Strategic Consulting Deck
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-lightyellow-100 uppercase">
            Personalized Veteran Counsel
          </h1>
          <p className="text-xs sm:text-sm text-lightyellow-200/80 leading-relaxed font-sans max-w-2xl">
            Acquire elite diagnostic alignment, custom SSB psychological assessments, marine hydrodynamic guidance,
            and personal career grooming session directly under the guidance of SANKALP's venerable founder.
          </p>
        </div>
      </div>

      {/* Main Container - Responsive 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4" id="mentorship_focused_container">
        
        {/* Left Column: Founder Mentorship Profile Card (8 of 12 columns on desktop) */}
        <div className="lg:col-span-7">
          {mentors.map((mentor) => {
            const openSlots = mentor.availableSlots.filter(
              (slot) => !bookedAppointments.some((appt) => appt.mentor.id === mentor.id && appt.slot === slot)
            );

            return (
              <motion.div
                id={`mentor_block_${mentor.id}`}
                key={mentor.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-navy-900 border border-gold-600/25 rounded-3xl p-6 sm:p-8 w-full shadow-2xl relative overflow-hidden group text-left space-y-6"
              >
                {/* Force/Organization Watermark */}
                <div className="absolute right-6 top-6 opacity-5 pointer-events-none text-4xl font-bold font-mono text-gold-400">
                  {mentor.organization}
                </div>

                {/* Header profile info */}
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between pb-6 border-b border-gold-600/20">
                  <div className="flex items-center gap-4">
                    {/* Decorative Avatar with Naval Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gold-450/10 border border-gold-450 flex items-center justify-center shadow-xl flex-shrink-0 text-gold-400 font-semibold">
                      <ShieldCheck className="w-9 h-9" />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight font-sans">
                        {mentor.name}
                      </h3>
                      <p className="text-xs font-mono text-gold-400 font-extrabold uppercase tracking-widest mt-0.5">
                        {mentor.rankRole}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[10px] font-bold font-mono bg-navy-950 text-gold-400 border border-gold-500/20 px-2.5 py-0.5 rounded">
                          {mentor.experience}
                        </span>
                        <span className="text-[10px] font-bold font-mono bg-[#c5a059]/10 text-gold-400 border border-gold-550/20 px-2.5 py-0.5 rounded">
                          {mentor.organization}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-gold-450/10 text-gold-400 border border-gold-500/20 px-3 py-1.5 rounded-xl font-bold text-xs uppercase font-mono">
                    <Star className="w-4 h-4 fill-gold-450/20" /> {mentor.rating.toFixed(1)} Ratings
                  </div>
                </div>

                {/* Bio & Details Box */}
                <div className="space-y-4 pt-2 text-sm leading-relaxed">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-extrabold text-gold-400 tracking-wider uppercase block">
                      ⚓ Executive Bio:
                    </span>
                    <p className="text-lightyellow-101/95 font-sans leading-relaxed text-sm">
                      {mentor.bio}
                    </p>
                  </div>

                  <div className="bg-navy-950/75 border border-gold-600/15 p-4 rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gold-405 tracking-wider uppercase block">
                      ⚡ Core Counseling Specializations:
                    </span>
                    <p className="text-xs text-lightyellow-200/90 font-semibold font-sans leading-normal">
                      {mentor.specialty}
                    </p>
                  </div>
                </div>

                {/* Action and status indicators */}
                <div className="mt-8 pt-6 border-t border-gold-600/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-[10px] font-mono text-lightyellow-200/50 uppercase tracking-widest">Consulting Availability</p>
                    <p className="text-sm font-black text-white font-sans mt-0.5">
                      {openSlots.length > 0 ? `🟢 ${openSlots.length} Active Slots Open` : `🔴 Fully Booked`}
                    </p>
                  </div>

                  <button
                    id={`book_briefing_trigger_${mentor.id}`}
                    disabled={openSlots.length === 0}
                    onClick={() => handleOpenBookingModal(mentor)}
                    className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-sans font-black uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 shadow-lg cursor-pointer ${
                      openSlots.length > 0
                        ? "bg-gold-450 hover:bg-gold-500 text-navy-950 border border-gold-500 font-black hover:scale-[1.02]"
                        : "bg-navy-250 text-navy-400 border border-gold-500/10 cursor-not-allowed"
                    }`}
                  >
                    <Video className="w-4 h-4" /> Reserve Private Briefing
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: 50 Sessions Comprehensive Curriculum Desk (5 of 12 columns on desktop) */}
        <div className="lg:col-span-5 bg-navy-900 border border-gold-600/25 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-left space-y-6" id="mentorship_sessions_panel_card">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="border-b border-gold-600/20 pb-4">
            <span className="inline-flex items-center gap-1 bg-[#c5a059]/10 text-gold-400 border border-gold-500/15 text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded mb-2">
              🏆 Master Curriculum
            </span>
            <h3 className="text-lg font-black text-white uppercase tracking-tight font-sans">
              SSB 50-Session Strategic Framework
            </h3>
            <p className="text-xs text-lightyellow-200/70 leading-relaxed mt-1 font-sans">
              Interactive syllabus map detailing the 50 key briefing blocks structured perfectly by the Founder to groom your Officer-Like Qualities.
            </p>
          </div>

          {/* Phase Selectors */}
          <div className="grid grid-cols-4 gap-1.5" id="mentorship_phase_tabs">
            {phasesData.map((phase) => (
              <button
                key={phase.id}
                id={`mentorship_phase_tab_btn_${phase.id}`}
                onClick={() => setActivePhase(phase.id)}
                className={`py-2 text-[10px] font-mono font-extrabold uppercase rounded-lg border text-center transition tracking-tighter cursor-pointer ${
                  activePhase === phase.id
                    ? "bg-gold-450 text-navy-950 border-gold-400 font-bold"
                    : "bg-navy-950 border-gold-600/15 hover:border-gold-500/40 text-lightyellow-200/80"
                }`}
              >
                Ph {phase.id}
              </button>
            ))}
          </div>

          {/* Sessions Display */}
          <div className="space-y-4" id="mentorship_phase_sessions_details">
            {phasesData.map((phase) => {
              if (phase.id !== activePhase) return null;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wide">
                      {phase.title}
                    </h4>
                    <p className="text-[11px] font-mono text-lightyellow-200/50 mt-0.5">
                      Focus: {phase.tagline}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {phase.sessions.map((session, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 bg-navy-955 border border-gold-500/10 rounded-xl relative hover:border-gold-500/20 transition-all text-xs text-lightyellow-101 space-y-1 block leading-relaxed"
                      >
                        <span className="block font-sans font-bold text-lightyellow-100">
                          {session.split(":")[0]}:
                        </span>
                        <span className="block font-sans text-lightyellow-200/80 mt-0.5 leading-normal">
                          {session.split(":")[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-navy-955 border border-gold-500/10 p-3.5 rounded-xl text-[10.5px] text-lightyellow-200/60 leading-relaxed font-sans mt-2">
            💡 <b>Cadet Note:</b> Completing all 50 sessions unlocks the <b>Vessel Commander's Leadership Certificate</b> and qualifies you for active placements.
          </div>
        </div>

      </div>

      {/* Styled Modals using Framer Motion logic with Navy & Gold theme */}
      <AnimatePresence>
        {selectedMentorForBooking && (
          <div className="fixed inset-0 bg-navy-950/80 flex items-center justify-center p-4 z-50 backdrop-blur-md" id="booking_modal_container">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-navy-900 border border-gold-500/40 shadow-2xl rounded-3xl p-6 md:p-8 max-w-md w-full relative space-y-6 text-left text-lightyellow-101"
            >
              {/* Close Button */}
              <button
                id="close_booking_modal_btn"
                onClick={() => setSelectedMentorForBooking(null)}
                className="absolute right-4 top-4 text-gold-400 hover:text-white transition duration-150 cursor-pointer p-1 font-semibold"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-extrabold text-gold-400 uppercase tracking-widest bg-gold-450/10 border border-gold-500/20 px-2.5 py-1 rounded">
                  Private Session Setup
                </span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  Briefing Slot Selector
                </h3>
                <p className="text-xs text-lightyellow-200/70 leading-relaxed font-sans">
                  Reserve a personalized cadet counseling and psychological diagnostic slot with <b>{selectedMentorForBooking.name}</b>.
                </p>
              </div>

              {successBookingMessage ? (
                <div className="p-6 bg-gold-450/5 border border-gold-500/40 text-lightyellow-100 text-xs rounded-2xl font-sans text-center flex flex-col items-center gap-3 animate-pulse">
                  <Sparkles className="w-10 h-10 text-gold-450 fill-gold-450/20" />
                  <p className="font-extrabold text-sm uppercase text-gold-400">{successBookingMessage}</p>
                  <p className="text-[10.5px] text-lightyellow-200/60 italic">Please monitor your cadet portal panel for active links.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Available Slots Select */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-lightyellow-200 block uppercase tracking-wider">
                      Select Available Timing Window (IST Mapped):
                    </label>
                    <div className="grid grid-cols-1 gap-2 max-h-52 overflow-y-auto pr-1">
                      {selectedMentorForBooking.availableSlots.map((slot) => {
                        const isAlreadyBooked = bookedAppointments.some(
                          (appt) => appt.mentor.id === selectedMentorForBooking.id && appt.slot === slot
                        );

                        return (
                          <button
                            id={`select_slot_btn_${slot.replace(/\s+/g, '_')}`}
                            key={slot}
                            disabled={isAlreadyBooked}
                            onClick={() => setChosenSlot(slot)}
                            className={`text-left p-3 rounded-xl border text-xs font-bold transition cursor-pointer flex justify-between items-center ${
                              isAlreadyBooked
                                ? "bg-navy-950/50 border-gold-600/10 text-navy-400/50 cursor-not-allowed uppercase text-[9.5px]"
                                : chosenSlot === slot
                                ? "bg-gold-450 text-navy-950 border-2 border-gold-500"
                                : "bg-navy-950 border-gold-500/20 hover:border-gold-400/50 text-lightyellow-100"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Clock className={`w-3.5 h-3.5 ${chosenSlot === slot ? "text-navy-950" : "text-gold-400"} font-semibold`} /> {slot}
                            </span>
                            {isAlreadyBooked ? (
                              <span className="text-[9px] bg-navy-900 border border-gold-600/10 text-navy-300 px-1.5 py-0.5 rounded font-mono font-medium">
                                Booked
                              </span>
                            ) : chosenSlot === slot ? (
                              <span className="text-[9px] bg-navy-950 text-gold-400 px-2 py-0.5 rounded-md font-mono font-black uppercase">
                                Selected
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-navy-950 border border-gold-500/15 p-4 rounded-2xl text-[11px] text-lightyellow-200/70 leading-normal flex gap-2">
                    <AlertCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5 animate-bounce font-semibold" />
                    <span>
                      <b>Advisory Notice:</b> Make sure to attend the platform at least 5 minutes prior to scheduling. Private sessions cannot be fast-tracked or re-scheduled.
                    </span>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      id="modal_cancel_booking"
                      onClick={() => setSelectedMentorForBooking(null)}
                      className="flex-1 py-3 text-xs font-sans font-extrabold border-2 border-gold-500/20 text-lightyellow-200 rounded-xl hover:bg-navy-950/85 transition cursor-pointer"
                    >
                      Dismiss
                    </button>
                    <button
                      id="modal_confirm_booking"
                      disabled={!chosenSlot}
                      onClick={handleConfirmBooking}
                      className="flex-1 py-3 text-xs font-sans font-black bg-gold-450 hover:bg-gold-550 text-navy-950 border border-gold-450 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition hover:scale-102 cursor-pointer uppercase tracking-wider"
                    >
                      Confirm Briefing
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
