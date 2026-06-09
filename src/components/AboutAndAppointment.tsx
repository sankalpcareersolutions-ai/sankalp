import React, { useState, useEffect } from "react";
import { Anchor, Award, BookOpen, Calendar, CheckCircle, Clock, GraduationCap, Mail, Phone, Shield, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import founderPortraitImg from "../assets/images/naval_veteran_founder_portrait_1779626852788.png";

export interface FounderAppointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  slotDate: string;
  slotTime: string;
  focusArea: string;
  ticketNumber: string;
  timestamp: string;
}

export default function AboutAndAppointment() {
  // Booking Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("0500hrs - 0530hrs (Morning)");
  const [focusArea, setFocusArea] = useState("SSB Psychology & Personal Interview Coaching");
  const [bookingSuccess, setBookingSuccess] = useState<FounderAppointment | null>(null);

  // Load bookings from localStorage
  const [bookings, setBookings] = useState<FounderAppointment[]>(() => {
    const cached = localStorage.getItem("sankalp_founder_appointments");
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    localStorage.setItem("sankalp_founder_appointments", JSON.stringify(bookings));
  }, [bookings]);

  const timeSlots = [
    "0500hrs - 0530hrs (Morning)",
    "0530hrs - 0600hrs (Morning)",
    "1730hrs - 1800hrs (Evening)",
    "2100hrs - 2130hrs (Evening)",
    "2130hrs - 2200hrs (Evening)"
  ];

  const focusAreas = [
    "SSB Psychology & Personal Interview Coaching",
    "Naval Architecture & Marine Engineering Careers Guidelines",
    "Post-Graduate Defense Trajectory Mapping",
    "UPSC CAPF & Paramilitary Command Assessment",
    "DRDO / ISRO Professional Scientist Entry Portfolio"
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !slotDate || !slotTime) return;

    const ticketNumber = `SLK-NAVY-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: FounderAppointment = {
      id: `founder_appt_${Date.now()}`,
      name,
      email,
      phone,
      slotDate,
      slotTime,
      focusArea,
      ticketNumber,
      timestamp: new Date().toLocaleDateString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setBookings((prev) => [newBooking, ...prev]);
    setBookingSuccess(newBooking);

    // Reset simple form inputs
    setName("");
    setEmail("");
    setPhone("");
    setSlotDate("");
  };

  const handleCancel = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-12" id="founder_appointment_tab_root">
      
      {/* Dynamic Upper Hero Card */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 p-8 rounded-3xl border border-gold-600/30 text-lightyellow-100 shadow-2xl relative overflow-hidden" id="founder_header_card">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-400 border border-gold-550/35 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded">
            ⚓ Commander's Flagship Desk
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-lightyellow-100 uppercase">
            Sankalp Premium Counsel & Mentorship
          </h1>
          <p className="text-xs sm:text-sm text-lightyellow-200/90 leading-relaxed font-sans max-w-2xl">
            Acquire elite diagnostic alignment directly under the guidance of our venerable founder. Benefit from 20+ years of sovereign operational expertise in maritime metallurgy, marine structural mechanics, and modern psychological screening techniques.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: About the Founder (Special Styling + Bold & Attractive Fonts) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          
          {/* Main Visual Profile */}
          <div className="bg-navy-900 border border-gold-600/25 rounded-3xl overflow-hidden shadow-xl" id="founder_profile_visual_card">
            <div className="relative h-64 sm:h-72 w-full bg-navy-955">
              <img
                src={founderPortraitImg}
                alt="Naval Veteran Founder of Sankalp"
                className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.95]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-5">
                <span className="text-[10px] font-mono tracking-widest text-[#050a18] uppercase bg-gold-400 font-bold px-2 py-0.5 rounded border border-gold-500 shadow-md">
                  VETERAN PORTRAIT
                </span>
              </div>
            </div>

            <div className="p-6 space-y-5 text-left">
              <div>
                <h3 className="text-xl font-black tracking-tight text-lightyellow-100 uppercase font-sans flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-gold-450 flex-shrink-0" />
                  Sankalp Founder Profile
                </h3>
                <p className="text-xs font-mono text-gold-400 font-bold uppercase tracking-wider">
                  Indian Navy Veteran • Lead Counselor
                </p>
              </div>

              {/* Navy credentials summary */}
              <div className="p-4 bg-navy-950 border border-gold-550/20 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-lightyellow-100 uppercase tracking-tight">Active Patriotic Veterancy</h4>
                  <p className="text-[11.5px] text-lightyellow-200/80 leading-normal">
                    Distinguished carrier record as an <span className="text-gold-400 font-extrabold uppercase">Indian Navy Veteran</span> with <span className="text-gold-400 font-extrabold uppercase">more than 20 years of active operational experience</span> in the Indian Defence Sector, marine architecture, and high-intensity mentoring commissions.
                  </p>
                </div>
              </div>

              {/* Bold Academic Qualifications Section */}
              <div className="space-y-3.5 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gold-450 flex items-center gap-1.5 border-b border-gold-600/20 pb-2">
                  <GraduationCap className="w-4 h-4 text-gold-400" />
                  ACADEMIC ACCOLADES
                </h4>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="text-emerald-500 font-bold pt-0.5">•</span>
                    <div>
                      <p className="text-sm font-sans font-black text-lightyellow-100 leading-snug">
                        POST GRADUATE
                      </p>
                      <p className="text-[10.5px] font-mono text-lightyellow-202/60">Advanced Strategic Sector Operations</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-emerald-500 font-bold pt-0.5">•</span>
                    <div>
                      <span className="text-sm font-sans font-black text-lightyellow-100 leading-snug bg-gold-450/10 px-1 rounded border border-gold-400/20">
                        PGDBA (HR)
                      </span>
                      <span className="text-xs font-sans text-lightyellow-100 font-semibold pl-1.5">
                        from <span className="text-gold-400 font-extrabold">Symbiosis Pune</span>
                      </span>
                      <p className="text-[10.5px] font-mono text-lightyellow-201/60">Human Resource Management & Psychological Psychometrics</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-emerald-500 font-bold pt-0.5">•</span>
                    <div>
                      <p className="text-sm font-sans font-black text-lightyellow-100 leading-snug">
                        DIPLOMA IN NAVAL ARCHITECTURE
                      </p>
                      <span className="text-xs font-sans text-lightyellow-100 font-medium">
                        specialized in <span className="font-extrabold text-lightyellow-200">Marine Engineering</span> from <span className="text-gold-400 font-extrabold uppercase tracking-wide">ANDHRA University</span>
                      </span>
                      <p className="text-[10.5px] font-mono text-lightyellow-201/60">Naval Hull Hydrodynamics & Combat Ship Machinery Systems</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Philosophy */}
              <div className="border-t border-gold-600/10 pt-4 text-[11px] text-lightyellow-200/50 leading-relaxed font-sans italic">
                "Our single absolute mission is ensuring every energetic Indian aspirant is equipped with the physical, intellectual, and psychological caliber demanded by the nation's command centers."
              </div>

            </div>
          </div>

        </div>

        {/* Right Hand: Interactive Booking Engine Form & Ticket Showcase */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Appointment Form Card */}
          <div className="bg-navy-900 border border-gold-600/25 rounded-3xl p-6 md:p-8 shadow-xl text-left" id="active_appointment_scheduler">
            <div className="flex items-center gap-2 mb-4 border-b border-gold-600/15 pb-4">
              <Award className="w-5 h-5 text-gold-400" />
              <div>
                <h3 className="text-lg font-bold text-lightyellow-100 tracking-tight uppercase font-sans">
                  Reserve Personalized Cadet Consultation
                </h3>
                <p className="text-xs text-lightyellow-200/60 font-mono">Select secure slots directly with the Chief of Academics</p>
              </div>
            </div>

            <form onSubmit={handleBook} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-lightyellow-200 block uppercase tracking-wider font-sans">
                    💂 Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter cadet name..."
                    className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450 placeholder-navy-300 font-medium"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-lightyellow-200 block uppercase tracking-wider font-sans">
                    📧 Email & Communication Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="cadet@sankalp.in"
                    className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450 placeholder-navy-300 font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-lightyellow-200 block uppercase tracking-wider font-sans">
                    📞 Cadet Contact Link (Mobile/Whatsapp)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450 placeholder-navy-300 font-medium"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-lightyellow-200 block uppercase tracking-wider font-sans">
                    📅 Desired Briefing Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450 placeholder-navy-300 font-medium font-mono"
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-lightyellow-200 block uppercase tracking-wider font-sans">
                  ⏱️ Select Active Strategic Time Slot
                </label>
                <select
                  className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time} className="bg-navy-950 text-lightyellow-100 font-sans">
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-lightyellow-200 block uppercase tracking-wider font-sans">
                  🎯 Focus Core Guidance Topic
                </label>
                <select
                  className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                >
                  {focusAreas.map((area) => (
                    <option key={area} value={area} className="bg-navy-950 text-lightyellow-100 font-sans">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gold-450 hover:bg-gold-500 text-navy-950 font-sans font-extrabold text-xs uppercase tracking-widest rounded-xl transition duration-200 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                ⚓ Issue Commander's Appointment Ticket
              </button>
            </form>
          </div>

          {/* Booking Success Ticket Showcase Overlay or Segment */}
          <AnimatePresence>
            {bookingSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gradient-to-br from-[#0c1d3c] to-[#040c1d] border-2 border-gold-450 rounded-3xl p-6 relative overflow-hidden shadow-2xl text-left"
                id="booking_success_receipt"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <button
                  onClick={() => setBookingSuccess(null)}
                  className="absolute right-4 top-4 hover:bg-navy-800 p-1.5 rounded-full text-lightyellow-200 transition cursor-pointer"
                >
                  ✕
                </button>

                <div className="flex items-center gap-3 border-b-2 border-dashed border-gold-600/30 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wide">Commander Briefing Confirmed</h4>
                    <p className="text-[10px] text-lightyellow-200/70 font-mono">Official Secure Gateway Entry Permit Activated</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[9.5px] font-mono text-gold-400 tracking-wider uppercase block">Cadet Nominee:</span>
                    <span className="font-bold text-lightyellow-100">{bookingSuccess.name}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono text-gold-400 tracking-wider uppercase block">Gate Pass ticket:</span>
                    <span className="font-extrabold text-lightyellow-100 text-sm font-mono tracking-wider">{bookingSuccess.ticketNumber}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono text-gold-400 tracking-wider uppercase block">Confirmed Date:</span>
                    <span className="font-bold text-lightyellow-100">{bookingSuccess.slotDate}</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono text-gold-400 tracking-wider uppercase block">Allocated Time Block:</span>
                    <span className="font-bold text-lightyellow-100 text-[11px] leading-snug block">{bookingSuccess.slotTime}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[9.5px] font-mono text-gold-400 tracking-wider uppercase block">Custom Focus Core:</span>
                    <span className="font-bold text-lightyellow-100 text-xs">{bookingSuccess.focusArea}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gold-600/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-[9.5px] font-mono text-lightyellow-250/55">
                    *A confirmation briefing passcode has been relayed to {bookingSuccess.email}. Keep your telemetry active.
                  </span>
                  <span className="text-[10.5px] font-mono font-bold bg-gold-450 text-navy-950 px-2.5 py-1 rounded">
                    PASS DECLARED OUTSTANDING
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List of Your Booked Appointments with the Founder */}
          <div className="bg-navy-900 border border-gold-600/20 rounded-3xl p-6 text-left" id="booked_founder_appointments_list">
            <h4 className="text-sm font-bold text-lightyellow-100 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-gold-400" />
              Your Confirmed Founder Consultations ({bookings.length})
            </h4>

            {bookings.length === 0 ? (
              <div className="border border-dashed border-gold-600/20 rounded-2xl p-8 text-center text-lightyellow-200/50 text-xs">
                No custom veteran appointments booked yet. Please complete the scheduler sequence above to issue your first slot permit.
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 bg-navy-950 border border-gold-550/15 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gold-400/40 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-lightyellow-100">{booking.name}</span>
                        <span className="text-[9px] font-mono bg-navy-800 text-gold-400 px-2 py-0.5 rounded tracking-widest border border-gold-500/20">{booking.ticketNumber}</span>
                      </div>
                      <p className="text-[10.5px] font-mono text-lightyellow-200/60 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-gold-400" />
                        {booking.slotDate} • {booking.slotTime}
                      </p>
                      <p className="text-[11px] text-lightyellow-200/80 font-sans font-medium">Topic: {booking.focusArea}</p>
                    </div>

                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="px-3 py-1.5 text-[10px] bg-red-950 hover:bg-red-900 text-red-300 font-mono font-bold uppercase tracking-wider rounded-lg transition border border-red-800/30 cursor-pointer text-left sm:text-center mt-2 sm:mt-0"
                    >
                      Cancel Slot
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
