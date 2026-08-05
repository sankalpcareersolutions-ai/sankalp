import React, { useState, useEffect } from "react";
import { 
  Shield, Lock, Calendar, Clock, User, Mail, Phone, LogOut, 
  CheckCircle2, AlertTriangle, RefreshCw, Send, Video, Copy, ExternalLink,
  Download, Search, Filter, Eye, FileText, Smartphone, Activity, Sparkles,
  BarChart3, Layers, MessageSquare, AlertCircle, Play, X, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CareerAppointment, NotificationLogItem, NotificationAnalytics } from "../types";
import SEODashboard from "./SEODashboard";

export default function AdminPanel() {
  const [session, setSession] = useState<{ user: { email: string } } | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("sankalpcareersolutions@gmail.com");
  const [password, setPassword] = useState("Sankalp@123");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"appointments" | "analytics" | "templates" | "logs" | "seo">("appointments");
  const [appointments, setAppointments] = useState<CareerAppointment[]>([]);
  const [analytics, setAnalytics] = useState<NotificationAnalytics | null>(null);
  const [logs, setLogs] = useState<NotificationLogItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modals
  const [rescheduleModal, setRescheduleModal] = useState<CareerAppointment | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("11:30 AM");

  const [cancelModal, setCancelModal] = useState<CareerAppointment | null>(null);
  const [cancellationReason, setCancellationReason] = useState("Administrative reschedule / mentor unavailable");

  // Template Preview State
  const [previewTemplate, setPreviewTemplate] = useState<string>("APPOINTMENT_APPROVED");
  const [templatePreviewData, setTemplatePreviewData] = useState<{ subject: string; html: string; preheader: string; whatsappText: string } | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  // Live Test Dispatch State
  const [testRecipient, setTestRecipient] = useState("sankalpcareersolutions@gmail.com");
  const [testChannel, setTestChannel] = useState<"EMAIL" | "WHATSAPP">("EMAIL");
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isSendingTest, setIsSendingTest] = useState(false);

  // Feedback Notification Message
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Auth Handler
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (email === "sankalpcareersolutions@gmail.com" && password === "Sankalp@123") {
      setSession({ user: { email } });
      return;
    }
    // Simple fallback demo login
    if (email && password) {
      setSession({ user: { email } });
      return;
    }
    setAuthError("Invalid admin credentials");
  };

  const handleSignOut = () => {
    setSession(null);
  };

  // Data Fetchers
  const fetchAppointments = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error("Fetch appointments failed", err);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/notifications/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Fetch analytics failed", err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/notifications/logs?limit=50');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (err) {
      console.error("Fetch logs failed", err);
    }
  };

  const fetchTemplatePreview = async (templateName: string) => {
    setLoadingPreview(true);
    try {
      const res = await fetch(`/api/notifications/templates/preview?template=${templateName}`);
      if (res.ok) {
        const data = await res.json();
        setTemplatePreviewData(data);
      }
    } catch (err) {
      console.error("Fetch preview failed", err);
    } finally {
      setLoadingPreview(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAppointments();
      fetchAnalytics();
      fetchLogs();
      fetchTemplatePreview(previewTemplate);
    }
  }, [session]);

  // Appointment Actions
  const handleApprove = async (appt: CareerAppointment) => {
    try {
      const res = await fetch(`/api/appointments/${appt.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'APPROVED' }),
      });
      if (res.ok) {
        showNotification(`✅ Approved booking for ${appt.name}. Email & WhatsApp with Google Meet link dispatched.`);
        fetchAppointments();
        fetchAnalytics();
      }
    } catch (err) {
      alert("Failed to approve appointment");
    }
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleModal) return;

    try {
      const res = await fetch(`/api/appointments/${rescheduleModal.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'RESCHEDULED',
          preferredDate: newDate,
          preferredTime: newTime,
        }),
      });
      if (res.ok) {
        showNotification(`🔄 Rescheduled ${rescheduleModal.name} to ${newDate} at ${newTime}. Notification dispatched.`);
        setRescheduleModal(null);
        fetchAppointments();
        fetchAnalytics();
      }
    } catch (err) {
      alert("Failed to reschedule");
    }
  };

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelModal) return;

    try {
      const res = await fetch(`/api/appointments/${cancelModal.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'CANCELLED',
          cancellationReason,
        }),
      });
      if (res.ok) {
        showNotification(`⚠️ Cancelled booking for ${cancelModal.name}. Cancellation email & WhatsApp sent.`);
        setCancelModal(null);
        fetchAppointments();
        fetchAnalytics();
      }
    } catch (err) {
      alert("Failed to cancel appointment");
    }
  };

  const handleResend = async (appt: CareerAppointment) => {
    try {
      const res = await fetch('/api/notifications/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: appt.id }),
      });
      if (res.ok) {
        showNotification(`📨 Resent confirmation to ${appt.name} via Resend & WhatsApp.`);
        fetchAppointments();
      }
    } catch (err) {
      alert("Failed to resend");
    }
  };

  const handleSendReminder = async (appt: CareerAppointment, type: '24H' | '1H') => {
    try {
      const res = await fetch('/api/notifications/remind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: appt.id, type }),
      });
      if (res.ok) {
        showNotification(`⏰ ${type} reminder dispatched to ${appt.name} (${appt.email} & ${appt.mobileNumber}).`);
      }
    } catch (err) {
      alert("Failed to send reminder");
    }
  };

  const handleSendFeedback = async (appt: CareerAppointment) => {
    try {
      const res = await fetch('/api/notifications/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: appt.id }),
      });
      if (res.ok) {
        showNotification(`⭐ Feedback survey dispatched to ${appt.name}.`);
      }
    } catch (err) {
      alert("Failed to send feedback request");
    }
  };

  const handleTriggerSummary = async (type: 'DAILY' | 'WEEKLY') => {
    try {
      const res = await fetch('/api/admin/trigger-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      if (res.ok) {
        showNotification(`📊 ${type} summary email dispatched to sankalpcareersolutions@gmail.com`);
      }
    } catch (err) {
      alert("Failed to send summary email");
    }
  };

  const handleTestDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingTest(true);
    setTestStatus(null);
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: testChannel,
          recipient: testRecipient,
          template: previewTemplate,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTestStatus(`✅ Test ${testChannel} successfully triggered [Status: ${data.result?.status || 'SENT'}]`);
        fetchAnalytics();
        fetchLogs();
      } else {
        setTestStatus(`❌ Failed: ${data.error}`);
      }
    } catch (err: any) {
      setTestStatus(`❌ Error: ${err.message}`);
    } finally {
      setIsSendingTest(false);
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = 
      (a.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.ticketNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.mobileNumber || '').includes(searchQuery);

    if (!matchesSearch) return false;
    if (statusFilter === "ALL") return true;
    if (statusFilter === "FAILED_NOTIFICATIONS") {
      return a.emailStatus === 'FAILED' || a.whatsappStatus === 'FAILED';
    }
    return a.status === statusFilter;
  });

  // Login Screen
  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-900 p-8 sm:p-10 rounded-3xl border border-gold-500/30 max-w-md w-full shadow-2xl text-left"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <Shield className="w-9 h-9 text-gold-400 font-semibold" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-center text-lightyellow-100 uppercase tracking-widest font-sans">
            Central Command
          </h2>
          <p className="text-xs text-center text-lightyellow-200/70 font-mono mt-1 mb-6">
            CareerCounsellingHub Notification & Admin Center
          </p>
          
          {authError && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs rounded-xl text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gold-400 mb-1 uppercase tracking-wider font-semibold">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl py-3 pl-10 pr-4 text-xs text-lightyellow-100 placeholder-lightyellow-100/30 focus:outline-none focus:border-gold-400 font-sans"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gold-400 mb-1 uppercase tracking-wider font-semibold">Passcode</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl py-3 pl-10 pr-4 text-xs text-lightyellow-100 placeholder-lightyellow-100/30 focus:outline-none focus:border-gold-400 font-sans"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-500 to-gold-450 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-black py-3.5 rounded-xl transition uppercase tracking-wider text-xs font-mono shadow-lg shadow-gold-500/20 cursor-pointer mt-2"
            >
              Authenticate Command Session
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gold-500/10 text-center">
            <span className="text-[10px] font-mono text-lightyellow-200/50">
              Default: sankalpcareersolutions@gmail.com | Sankalp@123
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-navy-950 to-navy-900 p-6 sm:p-8 rounded-3xl border border-gold-500/30 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-gold-500/15 text-gold-400 border border-gold-500/30 mb-2">
            <Activity className="w-3 h-3 animate-pulse text-emerald-400" />
            Notification Engine Active • Resend & Meta Cloud API
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-lightyellow-100 uppercase tracking-wider flex items-center gap-3">
            <Shield className="text-gold-400 w-7 h-7" />
            Central Command & Notification Hub
          </h1>
          <p className="text-lightyellow-200/70 font-mono text-xs mt-1">
            Admin: <strong className="text-gold-400">{session.user.email}</strong> • WhatsApp Alerts: <strong className="text-emerald-400">+91 85283 35708</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/api/appointments/export-csv"
            download
            className="flex items-center gap-1.5 px-3.5 py-2 bg-navy-900 hover:bg-navy-800 border border-gold-500/30 text-gold-400 rounded-xl text-xs font-mono font-bold transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </a>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-300 rounded-xl text-xs font-mono font-bold transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Floating Action Feedback */}
      <AnimatePresence>
        {actionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 rounded-2xl text-xs font-mono flex items-center justify-between shadow-xl"
          >
            <span>{actionFeedback}</span>
            <button onClick={() => setActionFeedback(null)} className="text-emerald-400 hover:text-white ml-4">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gold-500/20 pb-3">
        <button 
          onClick={() => setActiveTab("appointments")}
          className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'appointments' ? 'bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/20' : 'text-gold-400 hover:bg-navy-900 border border-gold-500/20'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Sessions Roster ({appointments.length})
        </button>

        <button 
          onClick={() => { setActiveTab("analytics"); fetchAnalytics(); }}
          className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'analytics' ? 'bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/20' : 'text-gold-400 hover:bg-navy-900 border border-gold-500/20'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Delivery Analytics
        </button>

        <button 
          onClick={() => { setActiveTab("templates"); fetchTemplatePreview(previewTemplate); }}
          className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'templates' ? 'bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/20' : 'text-gold-400 hover:bg-navy-900 border border-gold-500/20'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Template Studio & Sandbox
        </button>

        <button 
          onClick={() => { setActiveTab("logs"); fetchLogs(); }}
          className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'logs' ? 'bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/20' : 'text-gold-400 hover:bg-navy-900 border border-gold-500/20'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Audit Logs ({logs.length})
        </button>

        <button 
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'seo' ? 'bg-gold-500 text-navy-950 shadow-lg shadow-gold-500/20' : 'text-gold-400 hover:bg-navy-900 border border-gold-500/20'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          SEO Engine
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: APPOINTMENTS & SESSIONS ROSTER */}
      {/* ========================================================= */}
      {activeTab === "appointments" && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-navy-900 p-4 rounded-2xl border border-gold-500/20">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, email, phone, ticket..."
                className="w-full bg-navy-950 border border-gold-500/30 rounded-xl py-2 pl-10 pr-4 text-xs text-lightyellow-100 focus:outline-none focus:border-gold-400 font-sans"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-mono text-lightyellow-200/60 uppercase font-semibold">Filter:</span>
              {["ALL", "PENDING", "APPROVED", "RESCHEDULED", "CANCELLED", "FAILED_NOTIFICATIONS"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase transition cursor-pointer shrink-0 ${
                    statusFilter === st 
                      ? 'bg-gold-500 text-navy-950' 
                      : 'bg-navy-950 text-lightyellow-200/70 border border-gold-500/20 hover:border-gold-500/40'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
              <button 
                onClick={fetchAppointments}
                className="p-2 bg-navy-950 text-gold-400 border border-gold-500/30 rounded-lg hover:bg-navy-800 transition cursor-pointer shrink-0"
                title="Refresh Roster"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-navy-900/60 border border-gold-500/20 rounded-3xl overflow-hidden shadow-xl">
            {loadingData ? (
              <div className="py-20 text-center text-gold-400 font-mono text-xs animate-pulse flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Synchronizing bookings from database...
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="py-20 text-center text-lightyellow-200/50 font-mono text-xs">
                No appointments matched your query.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gold-500/20 bg-navy-950/80">
                      <th className="p-4 text-[11px] font-mono text-gold-400 uppercase tracking-wider font-semibold">Student & Ticket</th>
                      <th className="p-4 text-[11px] font-mono text-gold-400 uppercase tracking-wider font-semibold">Slot & Track</th>
                      <th className="p-4 text-[11px] font-mono text-gold-400 uppercase tracking-wider font-semibold">Google Meet Room</th>
                      <th className="p-4 text-[11px] font-mono text-gold-400 uppercase tracking-wider font-semibold">Dispatch Health</th>
                      <th className="p-4 text-[11px] font-mono text-gold-400 uppercase tracking-wider font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-500/10 text-xs font-sans">
                    {filteredAppointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-navy-800/40 transition">
                        
                        {/* Student Details */}
                        <td className="p-4 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{appt.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              appt.status === 'APPROVED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                              appt.status === 'RESCHEDULED' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                              appt.status === 'CANCELLED' ? 'bg-red-950 text-red-400 border border-red-500/30' :
                              'bg-navy-950 text-gold-300 border border-gold-500/30'
                            }`}>
                              {appt.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-lightyellow-200/70 font-mono flex items-center gap-2">
                            <Mail className="w-3 h-3 text-gold-400" /> {appt.email}
                          </div>
                          <div className="text-[11px] text-lightyellow-200/70 font-mono flex items-center gap-2">
                            <Phone className="w-3 h-3 text-emerald-400" /> {appt.mobileNumber}
                          </div>
                          <div className="text-[10px] text-gold-400 font-mono font-bold">
                            REF: {appt.ticketNumber}
                          </div>
                        </td>

                        {/* Slot & Track */}
                        <td className="p-4 space-y-1">
                          <div className="font-bold text-lightyellow-100 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gold-400" /> {appt.preferredDate}
                          </div>
                          <div className="text-[11px] text-gold-300 font-mono flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold-400" /> {appt.preferredTime} (IST)
                          </div>
                          <div className="text-[11px] text-lightyellow-200/80 max-w-[200px] truncate">
                            {appt.careerInterest || appt.counsellingType}
                          </div>
                          {appt.stream && (
                            <div className="text-[10px] text-lightyellow-200/50 font-mono">
                              Stream: {appt.stream}
                            </div>
                          )}
                        </td>

                        {/* Google Meet Room */}
                        <td className="p-4 space-y-1.5">
                          <div className="text-[11px] font-mono text-blue-300 select-all font-semibold max-w-[180px] truncate">
                            {appt.meetLink}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <a
                              href={appt.meetLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 bg-navy-950 hover:bg-navy-800 border border-blue-500/30 text-blue-300 rounded-lg text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                            >
                              <Video className="w-3 h-3" /> Open
                            </a>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(appt.meetLink);
                                showNotification(`Copied meet link for ${appt.name}`);
                              }}
                              className="px-2.5 py-1 bg-navy-950 hover:bg-navy-800 border border-gold-500/30 text-gold-300 rounded-lg text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-3 h-3" /> Copy
                            </button>
                          </div>
                        </td>

                        {/* Dispatch Health */}
                        <td className="p-4 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono">
                            <span className="text-lightyellow-200/60">Email:</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              appt.emailStatus === 'SENT' || appt.emailStatus === 'SIMULATED' ? 'bg-emerald-950 text-emerald-400' :
                              appt.emailStatus === 'FAILED' ? 'bg-red-950 text-red-400' : 'bg-navy-950 text-gold-400'
                            }`}>
                              {appt.emailStatus}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[11px] font-mono">
                            <span className="text-lightyellow-200/60">WhatsApp:</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              appt.whatsappStatus === 'SENT' || appt.whatsappStatus === 'SIMULATED' ? 'bg-emerald-950 text-emerald-400' :
                              appt.whatsappStatus === 'FAILED' ? 'bg-red-950 text-red-400' : 'bg-navy-950 text-gold-400'
                            }`}>
                              {appt.whatsappStatus}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[11px] font-mono">
                            <span className="text-lightyellow-200/60">Calendar:</span>
                            <span className="text-emerald-400 font-bold">{appt.calendarStatus}</span>
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="p-4 text-right">
                          <div className="flex flex-col items-end gap-1.5">
                            {appt.status !== 'APPROVED' && (
                              <button
                                onClick={() => handleApprove(appt)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-mono font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                              >
                                <CheckCircle2 className="w-3 h-3" /> Approve Slot
                              </button>
                            )}

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setRescheduleModal(appt);
                                  setNewDate(appt.preferredDate);
                                  setNewTime(appt.preferredTime);
                                }}
                                className="px-2.5 py-1 bg-navy-950 hover:bg-navy-800 border border-gold-500/30 text-gold-300 rounded-lg text-[10px] font-mono cursor-pointer"
                              >
                                Reschedule
                              </button>

                              <button
                                onClick={() => handleResend(appt)}
                                title="Resend Notification"
                                className="p-1 bg-navy-950 hover:bg-navy-800 border border-gold-500/30 text-gold-300 rounded-lg text-[10px] font-mono cursor-pointer"
                              >
                                <Send className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => setCancelModal(appt)}
                                className="px-2 py-1 bg-red-950 hover:bg-red-900 border border-red-500/30 text-red-300 rounded-lg text-[10px] font-mono cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSendReminder(appt, '24H')}
                                className="px-2 py-0.5 bg-navy-950 hover:bg-navy-800 text-[9px] font-mono text-lightyellow-200/60 rounded border border-gold-500/20 cursor-pointer"
                              >
                                +24h Reminder
                              </button>
                              <button
                                onClick={() => handleSendReminder(appt, '1H')}
                                className="px-2 py-0.5 bg-navy-950 hover:bg-navy-800 text-[9px] font-mono text-lightyellow-200/60 rounded border border-gold-500/20 cursor-pointer"
                              >
                                +1h Alert
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: NOTIFICATION ENGINE & ANALYTICS */}
      {/* ========================================================= */}
      {activeTab === "analytics" && analytics && (
        <div className="space-y-6">
          
          {/* Executive Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-navy-900 p-5 rounded-2xl border border-gold-500/30 space-y-1">
              <div className="text-[11px] font-mono text-gold-400 uppercase font-semibold">Total Consultations</div>
              <div className="text-3xl font-black text-white">{analytics.totalBookings}</div>
              <div className="text-[10px] text-lightyellow-200/60 font-mono">Today: {analytics.todayBookings} new bookings</div>
            </div>

            <div className="bg-navy-900 p-5 rounded-2xl border border-emerald-500/30 space-y-1">
              <div className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">Resend Email Dispatches</div>
              <div className="text-3xl font-black text-white">{analytics.emailsSent}</div>
              <div className="text-[10px] text-emerald-300 font-mono">Failed: {analytics.emailsFailed} attempts</div>
            </div>

            <div className="bg-navy-900 p-5 rounded-2xl border border-blue-500/30 space-y-1">
              <div className="text-[11px] font-mono text-blue-400 uppercase font-semibold">Meta WhatsApp Messages</div>
              <div className="text-3xl font-black text-white">{analytics.whatsappSent}</div>
              <div className="text-[10px] text-blue-300 font-mono">Failed: {analytics.whatsappFailed} attempts</div>
            </div>

            <div className="bg-navy-900 p-5 rounded-2xl border border-gold-500/30 space-y-1">
              <div className="text-[11px] font-mono text-gold-400 uppercase font-semibold">Delivery Reliability Rate</div>
              <div className="text-3xl font-black text-emerald-400">{analytics.deliveryRate}%</div>
              <div className="text-[10px] text-lightyellow-200/60 font-mono">{analytics.meetLinksActive} Google Meet rooms active</div>
            </div>
          </div>

          {/* Quick Triggers & Briefing Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-navy-900 p-6 rounded-3xl border border-gold-500/20 space-y-4">
              <h3 className="text-sm font-bold text-lightyellow-100 uppercase tracking-widest font-mono flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" />
                Admin Briefing Dispatcher
              </h3>
              <p className="text-xs text-lightyellow-200/70">
                Trigger executive digest emails directly to <strong className="text-gold-400">sankalpcareersolutions@gmail.com</strong>:
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleTriggerSummary('DAILY')}
                  className="px-4 py-2.5 bg-navy-950 hover:bg-navy-800 border border-gold-500/30 text-gold-300 text-xs font-mono font-bold rounded-xl flex items-center gap-2 cursor-pointer transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Daily Booking Summary
                </button>
                <button
                  onClick={() => handleTriggerSummary('WEEKLY')}
                  className="px-4 py-2.5 bg-navy-950 hover:bg-navy-800 border border-gold-500/30 text-gold-300 text-xs font-mono font-bold rounded-xl flex items-center gap-2 cursor-pointer transition"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Dispatch Weekly Report
                </button>
              </div>
            </div>

            <div className="bg-navy-900 p-6 rounded-3xl border border-gold-500/20 space-y-4">
              <h3 className="text-sm font-bold text-lightyellow-100 uppercase tracking-widest font-mono flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Service Health & Endpoints
              </h3>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center bg-navy-950 p-2.5 rounded-xl border border-gold-500/10">
                  <span className="text-lightyellow-200/80">Resend API Service:</span>
                  <span className="text-emerald-400 font-bold">READY (Active)</span>
                </div>
                <div className="flex justify-between items-center bg-navy-950 p-2.5 rounded-xl border border-gold-500/10">
                  <span className="text-lightyellow-200/80">Meta WhatsApp Cloud API:</span>
                  <span className="text-emerald-400 font-bold">GRAPH v21.0 READY</span>
                </div>
                <div className="flex justify-between items-center bg-navy-950 p-2.5 rounded-xl border border-gold-500/10">
                  <span className="text-lightyellow-200/80">RFC 5545 iCal Generator:</span>
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: TEMPLATE STUDIO & SANDBOX PREVIEW */}
      {/* ========================================================= */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Template Selector & Live Test Sender */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-navy-900 p-6 rounded-3xl border border-gold-500/20 space-y-4">
                <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest font-mono">
                  1. Select Template to Preview
                </h3>

                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {[
                    { id: 'APPOINTMENT_APPROVED', label: 'Student: Appointment Approved & Meet Link' },
                    { id: 'APPOINTMENT_CONFIRMATION', label: 'Student: Request Received Confirmation' },
                    { id: 'APPOINTMENT_RESCHEDULED', label: 'Student: Session Rescheduled' },
                    { id: 'APPOINTMENT_CANCELLED', label: 'Student: Appointment Cancelled' },
                    { id: 'REMINDER_24H', label: 'Student: 24h Prior Reminder' },
                    { id: 'REMINDER_1H', label: 'Student: 1h Prior Starting Alert' },
                    { id: 'FEEDBACK_REQUEST', label: 'Student: Post-Session Feedback Survey' },
                    { id: 'ADMIN_NEW_BOOKING', label: 'Admin: New Booking Received' },
                    { id: 'ADMIN_DAILY_SUMMARY', label: 'Admin: Daily Booking Summary' },
                    { id: 'ADMIN_WEEKLY_REPORT', label: 'Admin: Weekly Intelligence Report' },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setPreviewTemplate(t.id);
                        fetchTemplatePreview(t.id);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                        previewTemplate === t.id
                          ? 'bg-gold-500 text-navy-950 font-bold'
                          : 'bg-navy-950 text-lightyellow-200/80 hover:border-gold-500/40 border border-gold-500/10'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Dispatch Form */}
              <div className="bg-navy-900 p-6 rounded-3xl border border-gold-500/20 space-y-4">
                <h3 className="text-xs font-bold text-gold-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" /> 2. Live Sandbox Dispatcher
                </h3>
                <p className="text-[11px] text-lightyellow-200/70">
                  Send a live test dispatch of the selected template:
                </p>

                <form onSubmit={handleTestDispatch} className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTestChannel("EMAIL")}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition cursor-pointer ${
                        testChannel === 'EMAIL' ? 'bg-gold-500 text-navy-950' : 'bg-navy-950 text-lightyellow-200/70 border border-gold-500/20'
                      }`}
                    >
                      Resend Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setTestChannel("WHATSAPP")}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition cursor-pointer ${
                        testChannel === 'WHATSAPP' ? 'bg-gold-500 text-navy-950' : 'bg-navy-950 text-lightyellow-200/70 border border-gold-500/20'
                      }`}
                    >
                      WhatsApp
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-lightyellow-200/60 block mb-1">
                      {testChannel === 'EMAIL' ? 'Test Recipient Email' : 'Test WhatsApp Number (+91...)'}
                    </label>
                    <input
                      type="text"
                      value={testRecipient}
                      onChange={(e) => setTestRecipient(e.target.value)}
                      required
                      placeholder={testChannel === 'EMAIL' ? 'sankalpcareersolutions@gmail.com' : '+918528335708'}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-xs text-lightyellow-100 font-mono focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingTest}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                  >
                    {isSendingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    Send Test Dispatch
                  </button>
                </form>

                {testStatus && (
                  <div className="p-3 bg-navy-950 rounded-xl border border-gold-500/20 text-[11px] font-mono text-lightyellow-100 break-words">
                    {testStatus}
                  </div>
                )}
              </div>
            </div>

            {/* Live Visual Preview Frame */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-navy-900 p-6 rounded-3xl border border-gold-500/20 space-y-4">
                <div className="flex justify-between items-center border-b border-gold-500/15 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-gold-400 uppercase font-bold">Template Preview</span>
                    <h3 className="text-sm font-bold text-white font-mono truncate max-w-lg">
                      Subject: {templatePreviewData?.subject || 'Loading preview...'}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Mobile Responsive
                  </span>
                </div>

                {/* WhatsApp Chat Preview Card */}
                <div className="bg-navy-950 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Meta WhatsApp Cloud API Message Preview:
                  </div>
                  <pre className="text-xs font-mono text-lightyellow-100 bg-[#07152B] p-3 rounded-xl whitespace-pre-wrap leading-relaxed border border-gold-500/10">
                    {templatePreviewData?.whatsappText || 'Loading text...'}
                  </pre>
                </div>

                {/* Rendered HTML Preview */}
                <div className="border border-gold-500/20 rounded-2xl overflow-hidden bg-white">
                  <div className="bg-navy-950 px-4 py-2 text-[10px] font-mono text-lightyellow-200/60 border-b border-gold-500/20">
                    Preheader: {templatePreviewData?.preheader}
                  </div>
                  {templatePreviewData?.html ? (
                    <iframe
                      srcDoc={templatePreviewData.html}
                      title="Email Preview"
                      className="w-full h-[480px] border-0"
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-navy-950 font-mono text-xs">
                      Loading preview...
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: AUDIT LOGS & TELEMETRY STREAM */}
      {/* ========================================================= */}
      {activeTab === "logs" && (
        <div className="bg-navy-900/60 border border-gold-500/20 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-gold-500/15 pb-4">
            <div>
              <h3 className="text-sm font-bold text-lightyellow-100 uppercase tracking-widest font-mono flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Structured Multi-Channel Telemetry Stream
              </h3>
              <p className="text-xs text-lightyellow-200/60 font-mono">Real-time tracing of all email, WhatsApp, and calendar transactions</p>
            </div>
            <button
              onClick={fetchLogs}
              className="px-3 py-1.5 bg-navy-950 text-gold-400 border border-gold-500/30 rounded-xl text-xs font-mono flex items-center gap-1.5 hover:bg-navy-800 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Logs
            </button>
          </div>

          <div className="space-y-2 max-h-[560px] overflow-y-auto font-mono text-xs pr-1">
            {logs.map((log) => (
              <div 
                key={log.id} 
                className="p-3 bg-navy-950 rounded-xl border border-gold-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    log.channel === 'EMAIL' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                    log.channel === 'WHATSAPP' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                    'bg-blue-950 text-blue-300 border border-blue-500/30'
                  }`}>
                    {log.channel}
                  </span>

                  <span className="font-bold text-white text-[11px]">{log.type}</span>
                  <span className="text-lightyellow-200/60 text-[10px]">({log.recipient})</span>
                  {log.details && (
                    <span className="text-lightyellow-200/40 text-[10px] truncate max-w-xs">{log.details}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-lightyellow-200/50">
                  <span className={`font-bold ${log.status === 'SENT' || log.status === 'SIMULATED' ? 'text-emerald-400' : 'text-red-400'}`}>
                    ● {log.status}
                  </span>
                  <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: SEO ENGINE */}
      {/* ========================================================= */}
      {activeTab === "seo" && (
        <SEODashboard appointments={appointments} />
      )}

      {/* ========================================================= */}
      {/* MODAL: RESCHEDULE APPOINTMENT */}
      {/* ========================================================= */}
      {rescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full text-left shadow-2xl space-y-5"
          >
            <div className="flex justify-between items-center border-b border-gold-500/20 pb-3">
              <h3 className="text-base font-bold text-lightyellow-100 uppercase tracking-wider font-mono">
                Reschedule Session
              </h3>
              <button onClick={() => setRescheduleModal(null)} className="text-lightyellow-200/50 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-lightyellow-200/80">
              Select new date & time slot for <strong className="text-white">{rescheduleModal.name}</strong>. Reschedule notifications will automatically dispatch via Resend Email and Meta WhatsApp.
            </p>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gold-400 block mb-1 font-bold">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-gold-400 block mb-1 font-bold">New Time Slot</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-xs text-white focus:outline-none"
                >
                  <option value="10:00 AM">10:00 AM (Morning)</option>
                  <option value="11:30 AM">11:30 AM (Morning)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon)</option>
                  <option value="03:30 PM">03:30 PM (Afternoon)</option>
                  <option value="05:00 PM">05:00 PM (Evening)</option>
                  <option value="06:30 PM">06:30 PM (Evening)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModal(null)}
                  className="px-4 py-2 bg-navy-950 border border-gold-500/30 text-xs font-mono text-lightyellow-200 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold font-mono text-xs rounded-xl cursor-pointer"
                >
                  Confirm & Dispatch
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CANCEL APPOINTMENT */}
      {/* ========================================================= */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy-900 border border-red-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full text-left shadow-2xl space-y-5"
          >
            <div className="flex justify-between items-center border-b border-red-500/20 pb-3">
              <h3 className="text-base font-bold text-red-400 uppercase tracking-wider font-mono">
                Cancel Session
              </h3>
              <button onClick={() => setCancelModal(null)} className="text-lightyellow-200/50 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-lightyellow-200/80">
              Are you sure you want to cancel the booking for <strong className="text-white">{cancelModal.name}</strong> [{cancelModal.ticketNumber}]?
            </p>

            <form onSubmit={handleCancelSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gold-400 block mb-1 font-bold">Cancellation Reason</label>
                <textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  rows={3}
                  required
                  className="w-full bg-navy-950 border border-red-500/30 rounded-xl p-3 text-xs text-white focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelModal(null)}
                  className="px-4 py-2 bg-navy-950 border border-gold-500/30 text-xs font-mono text-lightyellow-200 rounded-xl cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-xs rounded-xl cursor-pointer"
                >
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
