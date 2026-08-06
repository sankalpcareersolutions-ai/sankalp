import React, { useState, useEffect } from "react";
import { 
  Award, Calendar, Clock, Video, CheckCircle2, ShieldCheck, Mail, Phone,
  Copy, ExternalLink, Download, Sparkles, AlertCircle, RefreshCw, User, GraduationCap, Compass, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CareerAppointment } from "../types";

export default function AboutAndAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    dob: '',
    gender: 'Male',
    state: '',
    city: '',
    currentClass: 'Class 12th',
    schoolCollege: '',
    board: 'CBSE',
    percentage: '',
    stream: 'Science (PCM)',
    careerInterest: 'Defence Services (NDA / CDS / AFCAT / SSB)',
    defenceAspirant: 'Yes',
    preferredDefenceExam: 'NDA',
    preferredOrg: 'Armed Forces',
    counsellingType: 'Online Video 1:1',
    preferredLanguage: 'English & Hindi (Bilingual)',
    preferredDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    preferredTime: '10:00 AM',
    parentName: '',
    parentContact: '',
    questions: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<CareerAppointment | null>(null);
  const [bookings, setBookings] = useState<CareerAppointment[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const availableSlots = [
    { label: "10:00 AM", period: "Morning", badge: "Fastest Response" },
    { label: "11:30 AM", period: "Morning", badge: "Popular" },
    { label: "02:00 PM", period: "Afternoon", badge: "Available" },
    { label: "03:30 PM", period: "Afternoon", badge: "Available" },
    { label: "05:00 PM", period: "Evening", badge: "Popular" },
    { label: "06:30 PM", period: "Evening", badge: "Available" },
  ];

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobileNumber) {
      alert("Please fill in your Full Name, Mobile Number, and Email Address.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      
      if (result.success && result.data) {
        setBookings(prev => [result.data, ...prev]);
        setBookingSuccess(result.data);
        // Reset form
        setFormData({
          name: '',
          mobileNumber: '',
          email: '',
          dob: '',
          gender: 'Male',
          state: '',
          city: '',
          currentClass: 'Class 12th',
          schoolCollege: '',
          board: 'CBSE',
          percentage: '',
          stream: 'Science (PCM)',
          careerInterest: 'Defence Services (NDA / CDS / AFCAT / SSB)',
          defenceAspirant: 'Yes',
          preferredDefenceExam: 'NDA',
          preferredOrg: 'Armed Forces',
          counsellingType: 'Online Video 1:1',
          preferredLanguage: 'English & Hindi (Bilingual)',
          preferredDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          preferredTime: '10:00 AM',
          parentName: '',
          parentContact: '',
          questions: '',
        });
      } else {
        alert(result.error || 'Failed to book appointment.');
      }
    } catch(err) {
      console.error(err);
      alert('Error connecting to the appointment server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyMeet = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadIcs = (appt: CareerAppointment) => {
    if (!appt.icsContent) return;
    const blob = new Blob([appt.icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `CareerCounselling_${appt.ticketNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10" id="appointment_tab_root">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 p-6 sm:p-10 rounded-3xl border border-gold-600/30 text-lightyellow-100 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/40 text-gold-400 text-xs font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            1:1 Sovereign Career & Defence Guidance
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-lightyellow-100 uppercase">
            Book 1:1 Career Counselling & Mentorship
          </h1>
          <p className="text-xs sm:text-sm text-lightyellow-200/90 leading-relaxed font-sans max-w-2xl">
            Book an exclusive 45-minute strategic consultation with Senior Defence Officers, DRDO/ISRO Scientists, and Academic Counsellors. Instant notification dispatch via Email, SMS, and Google Calendar.
          </p>

          {/* Guarantee Badges */}
          <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-mono text-lightyellow-200/80">
            <span className="flex items-center gap-1.5 bg-navy-950/80 px-3 py-1.5 rounded-lg border border-gold-500/20">
              <Mail className="w-3.5 h-3.5 text-gold-400" /> Instant Email Confirmation
            </span>
            <span className="flex items-center gap-1.5 bg-navy-950/80 px-3 py-1.5 rounded-lg border border-gold-500/20">
              <Video className="w-3.5 h-3.5 text-blue-400" /> Unique 1:1 Google Meet Room
            </span>
            <span className="flex items-center gap-1.5 bg-navy-950/80 px-3 py-1.5 rounded-lg border border-gold-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Personalized Roadmap & Report
            </span>
          </div>
        </div>
      </div>

      {/* Success Modal / Banner */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-navy-900 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-emerald-500/20 pb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Booking Confirmed & Dispatched
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mt-1">
                    Appointment Successfully Locked In!
                  </h3>
                  <p className="text-xs text-lightyellow-200/80 font-mono mt-0.5">
                    Ticket Reference: <span className="text-gold-400 font-bold font-mono text-sm">{bookingSuccess.ticketNumber}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setBookingSuccess(null)}
                className="text-xs text-lightyellow-200/50 hover:text-white px-3 py-1.5 rounded-lg bg-navy-950 border border-gold-500/20 hover:border-gold-500/50 transition cursor-pointer"
              >
                Close View
              </button>
            </div>

            {/* Grid of Key Session Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-navy-950 p-4 rounded-2xl border border-gold-500/20 space-y-1">
                <div className="text-[11px] uppercase font-mono text-lightyellow-200/60">Aspirant Name</div>
                <div className="text-sm font-bold text-white">{bookingSuccess.name}</div>
                <div className="text-[11px] text-lightyellow-200/70 font-mono">{bookingSuccess.email}</div>
              </div>
              <div className="bg-navy-950 p-4 rounded-2xl border border-gold-500/20 space-y-1">
                <div className="text-[11px] uppercase font-mono text-lightyellow-200/60">Slot Itinerary</div>
                <div className="text-sm font-bold text-gold-400">📅 {bookingSuccess.preferredDate}</div>
                <div className="text-[11px] text-lightyellow-200/70 font-mono">⏰ {bookingSuccess.preferredTime} (IST)</div>
              </div>
              <div className="bg-navy-950 p-4 rounded-2xl border border-gold-500/20 space-y-1">
                <div className="text-[11px] uppercase font-mono text-lightyellow-200/60">Guidance Track</div>
                <div className="text-sm font-bold text-white truncate">{bookingSuccess.careerInterest || bookingSuccess.counsellingType}</div>
                <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 1:1 Senior Mentor Assigned
                </div>
              </div>
            </div>

            {/* Google Meet & Calendar Actions */}
            <div className="bg-navy-950/90 border border-emerald-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-emerald-400" />
                    Dedicated Google Meet Video Room:
                  </div>
                  <div className="text-sm font-mono text-blue-300 font-semibold mt-0.5 select-all">
                    {bookingSuccess.meetLink}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyMeet(bookingSuccess.meetLink)}
                    className="px-3.5 py-2 bg-navy-900 hover:bg-navy-800 border border-gold-500/30 text-xs font-mono text-lightyellow-100 rounded-xl flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Copy className="w-3.5 h-3.5 text-gold-400" />
                    {copiedLink ? "Copied!" : "Copy Link"}
                  </button>
                  <a
                    href={bookingSuccess.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/50 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Join Room
                  </a>
                </div>
              </div>

              {/* Sync to Google Calendar & ICS */}
              <div className="pt-3 border-t border-emerald-500/15 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-lightyellow-200/70 font-sans">
                  📩 Confirmation email and session itinerary sent to <strong className="text-white">{bookingSuccess.email}</strong> and Admin desk (<strong className="text-gold-400">sankalpcareersolutions@gmail.com</strong>).
                </p>
                <div className="flex items-center gap-2">
                  {bookingSuccess.googleCalendarUrl && (
                    <a
                      href={bookingSuccess.googleCalendarUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-navy-900 hover:bg-navy-800 border border-gold-500/30 text-[11px] font-mono text-gold-300 rounded-lg flex items-center gap-1.5 cursor-pointer transition"
                    >
                      <Calendar className="w-3 h-3 text-gold-400" />
                      Add to Google Calendar
                    </a>
                  )}
                  {bookingSuccess.icsContent && (
                    <button
                      onClick={() => handleDownloadIcs(bookingSuccess)}
                      className="px-3.5 py-1.5 bg-navy-900 hover:bg-navy-800 border border-gold-500/30 text-[11px] font-mono text-lightyellow-200 rounded-lg flex items-center gap-1.5 cursor-pointer transition"
                    >
                      <Download className="w-3 h-3 text-lightyellow-200" />
                      Download .ICS
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid: Restored Unified Form + Live Sessions Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column - Restored Comprehensive Single-Screen Layout */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-navy-900 border border-gold-600/25 rounded-3xl p-6 md:p-8 shadow-xl text-left">
            
            <div className="border-b border-gold-600/15 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-lightyellow-100 tracking-tight uppercase font-sans flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold-400" />
                  Appointment Booking Form
                </h2>
                <p className="text-xs text-lightyellow-200/70 mt-1">
                  Fill in your details below to schedule your 1:1 career consultation session
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono">
                <Sparkles className="w-3 h-3 text-gold-400" />
                45-Min Session
              </div>
            </div>

            <form onSubmit={handleBook} className="space-y-8">
              
              {/* SECTION 1: Aspirant Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 border-b border-gold-500/10 pb-2">
                  <User className="w-4 h-4 text-gold-400" />
                  1. Aspirant Personal & Contact Details
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">
                      Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="e.g. Rohan Sharma" 
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">
                      Mobile / Contact Number <span className="text-gold-400">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="mobileNumber" 
                      placeholder="e.g. +91 9876543210" 
                      required 
                      value={formData.mobileNumber} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                    <span className="text-[10px] text-lightyellow-200/50 mt-1 block">SMS notifications & verification updates</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">
                      Email Address <span className="text-gold-400">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="e.g. rohan.sharma@example.com" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                    <span className="text-[10px] text-lightyellow-200/50 mt-1 block">Detailed confirmation + Google Meet invite sent here</span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Date of Birth</label>
                    <input 
                      type="date" 
                      name="dob" 
                      value={formData.dob} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Gender</label>
                    <select 
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">State / UT</label>
                    <input 
                      type="text" 
                      name="state" 
                      placeholder="e.g. Maharashtra, Uttar Pradesh, Delhi" 
                      value={formData.state} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">City / Town</label>
                    <input 
                      type="text" 
                      name="city" 
                      placeholder="e.g. Mumbai, Lucknow, Pune, Dehradun" 
                      value={formData.city} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Preferred Language</label>
                    <select 
                      name="preferredLanguage" 
                      value={formData.preferredLanguage} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"
                    >
                      <option value="English & Hindi (Bilingual)">English & Hindi (Bilingual)</option>
                      <option value="English Only">English Only</option>
                      <option value="Hindi Only">Hindi Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Academic Background */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 border-b border-gold-500/10 pb-2">
                  <GraduationCap className="w-4 h-4 text-gold-400" />
                  2. Academic & Education Background
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Current Class / Education Level</label>
                    <select 
                      name="currentClass" 
                      value={formData.currentClass} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"
                    >
                      <option value="Class 9th / 10th">Class 9th / 10th</option>
                      <option value="Class 11th">Class 11th</option>
                      <option value="Class 12th">Class 12th</option>
                      <option value="Undergraduate (B.Tech / B.Sc / B.Com / BA)">Undergraduate (B.Tech / B.Sc / B.Com / BA)</option>
                      <option value="Graduate / Job Seeker">Graduate / Job Seeker</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">School / College / University Name</label>
                    <input 
                      type="text" 
                      name="schoolCollege" 
                      placeholder="e.g. Kendriya Vidyalaya / Army Public School / Delhi University" 
                      value={formData.schoolCollege} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Academic Stream</label>
                    <input 
                      type="text" 
                      name="stream" 
                      placeholder="e.g. Science (PCM), Science (PCB), Commerce, Humanities" 
                      value={formData.stream} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Board / University Affiliation</label>
                    <input 
                      type="text" 
                      name="board" 
                      placeholder="e.g. CBSE, ICSE, State Board" 
                      value={formData.board} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Parent / Guardian Name</label>
                    <input 
                      type="text" 
                      name="parentName" 
                      placeholder="e.g. Ramesh Sharma" 
                      value={formData.parentName} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Parent Contact Number</label>
                    <input 
                      type="tel" 
                      name="parentContact" 
                      placeholder="e.g. +91 9812345678" 
                      value={formData.parentContact} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Guidance Focus & Slot Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 border-b border-gold-500/10 pb-2">
                  <Compass className="w-4 h-4 text-gold-400" />
                  3. Guidance Focus & Consultation Slot
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">
                      Select Guidance Topic / Career Interest <span className="text-gold-400">*</span>
                    </label>
                    <select 
                      name="careerInterest" 
                      value={formData.careerInterest} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"
                    >
                      <option value="Defence Services (NDA / CDS / AFCAT / SSB)">Defence Services (NDA / CDS / AFCAT / SSB Mentorship)</option>
                      <option value="Paramilitary & Police Forces (CAPF / BSF / CRPF)">Paramilitary & Police Forces (CAPF / BSF / CRPF)</option>
                      <option value="Scientific & R&D (DRDO / ISRO / BARC / TIFR)">Scientific & R&D (DRDO / ISRO / BARC / TIFR)</option>
                      <option value="Engineering & Tech (IIT / NIT / BITS / Coding)">Engineering & Tech (IIT / NIT / BITS / Coding)</option>
                      <option value="Medicine, Law & Civil Services (NEET / CLAT / UPSC)">Medicine, Law & Civil Services (NEET / CLAT / UPSC)</option>
                      <option value="Global Higher Studies & Scholarships">Global Higher Studies & Scholarships</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-lightyellow-200 block mb-1">
                        Preferred Date <span className="text-gold-400">*</span>
                      </label>
                      <input 
                        type="date" 
                        name="preferredDate" 
                        required 
                        min={new Date().toISOString().split("T")[0]} 
                        value={formData.preferredDate} 
                        onChange={handleChange} 
                        className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" 
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-lightyellow-200 block mb-1">
                        Consultation Mode
                      </label>
                      <select 
                        name="counsellingType" 
                        value={formData.counsellingType} 
                        onChange={handleChange} 
                        className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"
                      >
                        <option value="Online Video 1:1 (Google Meet)">Online Video 1:1 (Google Meet)</option>
                        <option value="Direct Telephonic Consultation">Direct Telephonic Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Visual Slot Grid */}
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-2">
                      Select Preferred Time Slot (IST) <span className="text-gold-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {availableSlots.map(slot => (
                        <button
                          type="button"
                          key={slot.label}
                          onClick={() => setFormData({ ...formData, preferredTime: slot.label })}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer relative overflow-hidden ${
                            formData.preferredTime === slot.label
                              ? 'bg-gold-500/20 border-gold-500 text-gold-300 ring-1 ring-gold-500'
                              : 'bg-navy-950 border-gold-500/20 text-lightyellow-200/80 hover:border-gold-500/50'
                          }`}
                        >
                          <div className="text-xs font-bold font-mono">{slot.label}</div>
                          <div className="text-[10px] text-lightyellow-200/50 mt-0.5">{slot.period} • {slot.badge}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">
                      Specific Questions or Goals You Wish to Discuss
                    </label>
                    <textarea 
                      name="questions" 
                      rows={3} 
                      placeholder="e.g., Which entry is best after 12th PCM for Air Force? How to prepare for SSB psychological tests and stream selection?" 
                      value={formData.questions} 
                      onChange={handleChange} 
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Anti-spam honeypot */}
              <input type="text" name="hp" defaultValue="" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="p-4 bg-navy-950/80 rounded-xl border border-gold-500/20 space-y-2">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11.5px] text-lightyellow-200/80 leading-relaxed">
                    By submitting, you will immediately receive an official email confirmation with your unique booking reference and Google Meet room details. Admin (<strong>sankalpcareersolutions@gmail.com</strong>) is notified automatically.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 via-gold-450 to-gold-550 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-black text-sm uppercase tracking-wider rounded-xl transition shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Locking In Appointment...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm & Book 1:1 Appointment
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Live Appointments Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-navy-900 border border-gold-600/20 rounded-3xl p-6 text-left space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-gold-600/15 pb-3">
              <h4 className="text-sm font-bold text-lightyellow-100 uppercase tracking-widest flex items-center gap-2 font-mono">
                <Calendar className="w-4 h-4 text-gold-400" />
                Active Sessions
              </h4>
              <button 
                onClick={fetchBookings} 
                className="text-lightyellow-200/50 hover:text-gold-400 transition cursor-pointer"
                title="Refresh Bookings"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {bookings.length === 0 ? (
              <div className="border border-dashed border-gold-600/20 rounded-2xl p-8 text-center text-lightyellow-200/50 text-xs">
                No active bookings yet. Complete the form to reserve a slot.
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
                {bookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="p-4 bg-navy-950 border border-gold-550/20 rounded-2xl flex flex-col gap-2.5 hover:border-gold-500/40 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-lightyellow-100 block">{booking.name}</span>
                        <span className="text-[10px] text-lightyellow-200/60 font-mono">{booking.email}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-gold-500/15 text-gold-400 px-2 py-0.5 rounded tracking-wider border border-gold-500/30 font-bold">
                        {booking.ticketNumber || booking.id.substring(0, 8).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold-300">
                      <Clock className="w-3 h-3 text-gold-400" />
                      {booking.preferredDate} • {booking.preferredTime}
                    </div>

                    <div className="text-[11px] text-lightyellow-200/80 font-sans truncate">
                      {booking.careerInterest || booking.counsellingType}
                    </div>

                    {booking.meetLink && (
                      <div className="pt-2 border-t border-gold-500/15 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <Video className="w-3 h-3" /> Meet Ready
                        </span>
                        <a
                          href={booking.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-navy-900 hover:bg-navy-800 text-[10px] font-mono text-blue-300 border border-blue-500/30 rounded-lg flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> Open
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Immediate Support Card */}
          <div className="bg-navy-900 border border-gold-600/20 rounded-3xl p-6 text-left space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-lightyellow-100 uppercase tracking-widest flex items-center gap-2 font-mono border-b border-gold-600/15 pb-3">
              <Phone className="w-4 h-4 text-gold-400" />
              Immediate Assistance
            </h4>
            <p className="text-xs text-lightyellow-200/70 leading-relaxed font-sans">
              Need urgent help choosing a slot or prefer direct discussion with our senior counselling desk?
            </p>
            <div className="space-y-3 pt-1">
              <a
                href="tel:+918528335708"
                className="w-full py-2.5 px-3.5 bg-navy-950 hover:bg-navy-850 border border-gold-500/30 text-lightyellow-200 font-mono text-xs rounded-xl flex items-center justify-between transition group cursor-pointer"
              >
                <span className="flex items-center gap-2 font-sans font-semibold">
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                  Direct Phone Desk
                </span>
                <span className="font-mono text-[11px] text-secondary group-hover:underline">+91 85283 35708</span>
              </a>

              <a
                href="mailto:sankalpcareersolutions@gmail.com"
                className="w-full py-2.5 px-3.5 bg-navy-950 hover:bg-navy-850 border border-gold-500/30 text-lightyellow-200 font-mono text-xs rounded-xl flex items-center justify-between transition group cursor-pointer"
              >
                <span className="flex items-center gap-2 font-sans font-semibold">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  Email Desk
                </span>
                <span className="text-[10px] text-gold-300 font-mono truncate max-w-[150px]">sankalpcareersolutions@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
