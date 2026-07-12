import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Shield, Lock, Calendar, Clock, User, Mail, Phone, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { FounderAppointment } from "./AboutAndAppointment";

export default function AdminPanel() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState("");

  const [appointments, setAppointments] = useState<FounderAppointment[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchAppointments();
    }
  }, [session]);

  const fetchAppointments = async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        // Fallback to local storage if table doesn't exist yet
        const cached = localStorage.getItem("sankalp_founder_appointments");
        if (cached) setAppointments(JSON.parse(cached));
      } else if (data) {
        setAppointments(data as FounderAppointment[]);
      }
    } catch (error: any) {
      const cached = localStorage.getItem("sankalp_founder_appointments");
      if (cached) setAppointments(JSON.parse(cached));
    } finally {
      setLoadingData(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Check your email for the confirmation link.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gold-400">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-900 p-8 rounded-2xl border border-gold-500/20 max-w-md w-full shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-navy-950 p-4 rounded-full border border-gold-500/30">
              <Shield className="w-8 h-8 text-gold-400" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center text-lightyellow-100 mb-6 uppercase tracking-wider font-sans">
            Secure Admin Access
          </h2>
          
          {authError && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 text-red-200 text-sm rounded-lg text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gold-400 mb-1 uppercase tracking-wider">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-lg py-2.5 pl-10 pr-4 text-lightyellow-100 placeholder-lightyellow-100/30 focus:outline-none focus:border-gold-400 font-sans"
                  placeholder="admin@sankalp.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-gold-400 mb-1 uppercase tracking-wider">Passcode</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-lg py-2.5 pl-10 pr-4 text-lightyellow-100 placeholder-lightyellow-100/30 focus:outline-none focus:border-gold-400 font-sans"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-3 rounded-lg transition-colors uppercase tracking-wider mt-6 font-sans"
            >
              {isSignUp ? "Register Admin" : "Authenticate"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-gold-400 hover:text-lightyellow-100 transition-colors uppercase tracking-wider font-mono border-b border-gold-400/30 hover:border-lightyellow-100"
            >
              {isSignUp ? "Already have access? Login" : "Need access? Sign Up"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-navy-900 p-6 rounded-2xl border border-gold-500/20">
        <div>
          <h1 className="text-2xl font-black text-lightyellow-100 uppercase tracking-widest flex items-center gap-3">
            <Shield className="text-gold-400 w-8 h-8" />
            Central Command Panel
          </h1>
          <p className="text-gold-400/80 font-mono text-sm mt-1 uppercase tracking-wider">
            Admin: {session.user.email}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 bg-navy-800 hover:bg-red-900/50 border border-gold-500/30 hover:border-red-500/50 text-gold-400 hover:text-red-200 rounded-lg transition-all text-sm font-bold uppercase tracking-wider font-mono"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      <div className="bg-navy-900/50 border border-gold-500/20 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-lightyellow-100 font-sans">Counseling Appointments</h2>
          <button 
            onClick={fetchAppointments}
            className="text-gold-400 hover:text-lightyellow-100 text-sm font-mono uppercase tracking-wider border border-gold-400/30 px-3 py-1 rounded"
          >
            Refresh Data
          </button>
        </div>
        
        {loadingData ? (
          <div className="text-center py-12 text-gold-400 font-mono animate-pulse">Loading secure data...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12 bg-navy-950/50 rounded-xl border border-navy-800">
            <p className="text-lightyellow-100/50 font-mono">No appointments found in the database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold-500/20">
                  <th className="p-4 text-xs font-mono text-gold-400 uppercase tracking-wider">Nominee Details</th>
                  <th className="p-4 text-xs font-mono text-gold-400 uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-xs font-mono text-gold-400 uppercase tracking-wider">Schedule</th>
                  <th className="p-4 text-xs font-mono text-gold-400 uppercase tracking-wider">Focus Area</th>
                  <th className="p-4 text-xs font-mono text-gold-400 uppercase tracking-wider">Ticket / Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/10">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-navy-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy-950 border border-gold-500/30 flex items-center justify-center">
                          <User className="w-4 h-4 text-gold-400" />
                        </div>
                        <span className="font-bold text-lightyellow-100 text-sm">{appt.name}</span>
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-lightyellow-100/80">
                        <Mail className="w-3 h-3 text-gold-400" /> {appt.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-lightyellow-100/80">
                        <Phone className="w-3 h-3 text-gold-400" /> {appt.phone}
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-lightyellow-100/90 font-bold">
                        <Calendar className="w-3 h-3 text-gold-400" /> {appt.slot_date}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-gold-400/80">
                        <Clock className="w-3 h-3" /> {appt.slot_time}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 bg-navy-950 border border-gold-500/20 text-gold-400 text-[10px] uppercase tracking-wider rounded font-mono">
                        {appt.focus_area}
                      </span>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="text-xs font-mono font-bold text-emerald-400">{appt.ticket_number}</div>
                      <div className="text-[10px] text-lightyellow-100/40">
                        Booked: {new Date(appt.timestamp).toLocaleDateString()}
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
  );
}
