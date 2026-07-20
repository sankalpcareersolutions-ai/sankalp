import React, { useState, useEffect } from "react";
import { Award, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../lib/supabase";

export interface CareerCounselingAppointment {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  dob: string;
  gender: string;
  state: string;
  city: string;
  
  currentClass: string;
  schoolCollege: string;
  board: string;
  percentage: string;
  stream: string;
  graduationDetails: string;

  careerInterest: string;
  defenceAspirant: string;
  preferredDefenceExam: string;
  preferredOrg: string;
  counsellingType: string;
  preferredLanguage: string;
  preferredDate: string;
  preferredTime: string;

  parentName: string;
  parentContact: string;

  questions: string;

  ticket_number: string;
  timestamp: string;
}

export default function AboutAndAppointment() {
  const [formData, setFormData] = useState<Partial<CareerCounselingAppointment>>({
    defenceAspirant: 'No',
    counsellingType: 'Online',
    preferredLanguage: 'English'
  });
  
  const [bookingSuccess, setBookingSuccess] = useState<CareerCounselingAppointment | null>(null);
  const [bookings, setBookings] = useState<CareerCounselingAppointment[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem("sankalp_career_appointments");
    if (cached) setBookings(JSON.parse(cached));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const ticketNumber = `CCH-APT-${Math.floor(100000 + Math.random() * 900000)}`;
    const googleMeetLink = 'https://meet.google.com/xya-bcvd-pqr'; // Simulated fixed Meet link for 1:1 counselling
    
    const newBooking: CareerCounselingAppointment = {
      id: `booking_${Date.now()}`,
      ...formData as any,
      ticket_number: ticketNumber,
      timestamp: new Date().toISOString()
    };
    
    setBookings((prev) => [newBooking, ...prev]);
    setBookingSuccess(newBooking);
    localStorage.setItem("sankalp_career_appointments", JSON.stringify([newBooking, ...bookings]));
    
    // Simulate sending email to admin
    console.log(`Sending email to admin (sankalpcareersolutions@gmail.com) for booking ${ticketNumber}`);
    // Simulate sending email to user
    console.log(`Sending confirmation email to ${formData.email} with Meet Link: ${googleMeetLink}`);
    // Simulate sending SMS to user
    console.log(`Sending SMS notification to ${formData.phone}`);
    
    alert(`Appointment Booked Successfully!\n\nA notification has been sent to your email (${formData.email}) and mobile number (${formData.phone}).\nAn alert has also been sent to admin (sankalpcareersolutions@gmail.com).\n\nGoogle Meet Link for 1:1 Session: ${googleMeetLink}`);

    setFormData({
      defenceAspirant: 'No',
      counsellingType: 'Online',
      preferredLanguage: 'English'
    });
  };


  const handleCancel = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("sankalp_career_appointments", JSON.stringify(updated));
  };

  return (
    <div className="space-y-12" id="appointment_tab_root">
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 p-8 rounded-3xl border border-gold-600/30 text-lightyellow-100 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-400 border border-gold-550/35 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded">
            Book Career Counselling
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-lightyellow-100 uppercase">
            Reserve Your Consultation
          </h1>
          <p className="text-xs sm:text-sm text-lightyellow-200/90 leading-relaxed font-sans max-w-2xl">
            Get personalized career guidance from expert counselors. Fill out the comprehensive assessment form to help us understand your background and goals better before the session.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-navy-900 border border-gold-600/25 rounded-3xl p-6 md:p-8 shadow-xl text-left">
            <h3 className="text-lg font-bold text-lightyellow-100 tracking-tight uppercase font-sans mb-6 border-b border-gold-600/15 pb-4">
              Student Appointment Booking Form
            </h3>

            <form onSubmit={handleBook} className="space-y-8">
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest font-mono">1. Student Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Full Name *</label>
                    <input type="text" name="name" required value={formData.name || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Mobile Number *</label>
                    <input type="tel" name="mobileNumber" required value={formData.mobileNumber || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Email *</label>
                    <input type="email" name="email" required value={formData.email || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Date of Birth *</label>
                    <input type="date" name="dob" required value={formData.dob || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Gender</label>
                    <select name="gender" value={formData.gender || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">State</label>
                    <input type="text" name="state" value={formData.state || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">District/City</label>
                    <input type="text" name="city" value={formData.city || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest font-mono">2. Academic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Current Class/Year *</label>
                    <input type="text" name="currentClass" required value={formData.currentClass || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">School/College</label>
                    <input type="text" name="schoolCollege" value={formData.schoolCollege || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Board / University</label>
                    <input type="text" name="board" value={formData.board || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Percentage / CGPA</label>
                    <input type="text" name="percentage" value={formData.percentage || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Stream (e.g. PCM, Commerce)</label>
                    <input type="text" name="stream" value={formData.stream || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Graduation Details (if applicable)</label>
                    <input type="text" name="graduationDetails" value={formData.graduationDetails || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest font-mono">3. Career Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">General Career Interest *</label>
                    <input type="text" name="careerInterest" required placeholder="e.g. Engineering, Law, Civil Services" value={formData.careerInterest || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Are you a Defence Aspirant?</label>
                    <select name="defenceAspirant" value={formData.defenceAspirant || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  
                  {formData.defenceAspirant === 'Yes' && (
                    <>
                      <div>
                        <label className="text-xs font-bold text-lightyellow-200 block mb-1">Preferred Defence Exam</label>
                        <select name="preferredDefenceExam" value={formData.preferredDefenceExam || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450">
                          <option value="">Select Exam</option>
                          <option value="NDA">NDA</option>
                          <option value="CDS">CDS</option>
                          <option value="AFCAT">AFCAT</option>
                          <option value="CAPF">CAPF</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-lightyellow-200 block mb-1">Preferred Organisation</label>
                        <select name="preferredOrg" value={formData.preferredOrg || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450">
                          <option value="">Select Org</option>
                          <option value="DRDO">DRDO</option>
                          <option value="ISRO">ISRO</option>
                          <option value="BARC">BARC</option>
                          <option value="Armed Forces">Armed Forces</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Preferred Counselling Type</label>
                    <select name="counsellingType" value={formData.counsellingType || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450">
                      <option value="Online">Online Session</option>
                      <option value="Offline">Offline Branch Session</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Preferred Language</label>
                    <select name="preferredLanguage" value={formData.preferredLanguage || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450">
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Preferred Date *</label>
                    <input type="date" name="preferredDate" required min={new Date().toISOString().split("T")[0]} value={formData.preferredDate || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Preferred Time *</label>
                    <select name="preferredTime" required value={formData.preferredTime || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450">
                      <option value="">Select Time</option>
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                      <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest font-mono">4. Parent / Guardian Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Parent/Guardian Name</label>
                    <input type="text" name="parentName" value={formData.parentName || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-lightyellow-200 block mb-1">Parent Contact Number</label>
                    <input type="tel" name="parentContact" value={formData.parentContact || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest font-mono">5. Additional Details</h4>
                <div>
                  <label className="text-xs font-bold text-lightyellow-200 block mb-1">Questions or Specific Requirements</label>
                  <textarea name="questions" rows={3} value={formData.questions || ''} onChange={handleChange} className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-3 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-450"></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-lightyellow-200 block mb-1">Upload Marksheet (Optional)</label>
                  <input type="file" className="w-full bg-navy-950 border border-gold-500/20 rounded-xl p-2 text-xs text-lightyellow-100" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gold-400 uppercase tracking-widest font-mono">6. Consent</h4>
                <div className="space-y-2">
                  <label className="flex items-start gap-2">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-xs text-lightyellow-200 font-semibold">I agree to the Privacy Policy and Terms & Conditions.</span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-xs text-lightyellow-200 font-semibold">I consent to receive communication from Sankalp regarding my appointment and career resources.</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-navy-900 border-2 border-gold-500 hover:bg-navy-800 text-lightyellow-100 font-sans font-black text-base md:text-lg uppercase tracking-widest rounded-xl transition duration-200 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
              >
                BOOK APPOINTMENT
              </button>
            </form>
          </div>

          <AnimatePresence>
            {bookingSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-6 text-emerald-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-emerald-400">Appointment Confirmed!</h4>
                    <p className="text-sm mt-1">Your Booking ID: <span className="font-mono font-bold text-white">{bookingSuccess.ticket_number}</span></p>
                    <p className="text-xs mt-2 text-emerald-200">A confirmation has been sent to your Email & Mobile, and to Admin (sankalpcareersolutions@gmail.com).</p><p className="text-sm mt-3 font-semibold">1:1 Google Meet Link:</p><a href="https://meet.google.com/xya-bcvd-pqr" target="_blank" rel="noreferrer" className="text-blue-400 underline font-mono text-sm">https://meet.google.com/xya-bcvd-pqr</a>
                  </div>
                  <button onClick={() => setBookingSuccess(null)} className="text-emerald-400 hover:text-white cursor-pointer">✕</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-navy-900 border border-gold-600/20 rounded-3xl p-6 text-left">
            <h4 className="text-sm font-bold text-lightyellow-100 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-gold-400 font-semibold" />
              Your Appointments
            </h4>
            
            {bookings.length === 0 ? (
              <div className="border border-dashed border-gold-600/20 rounded-2xl p-8 text-center text-lightyellow-200/50 text-xs">
                No appointments booked yet.
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-4 bg-navy-950 border border-gold-550/15 rounded-2xl flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-lightyellow-100">{booking.name}</span>
                      <span className="text-[9px] font-mono bg-navy-800 text-gold-400 px-2 py-0.5 rounded tracking-widest border border-gold-500/20 font-semibold">{booking.ticket_number}</span>
                    </div>
                    <p className="text-[10.5px] font-mono text-lightyellow-200/60 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-gold-400 font-semibold" />
                      {booking.preferredDate} • {booking.preferredTime}
                    </p>
                    <p className="text-[11px] text-lightyellow-200/80 font-sans font-medium">Interest: {booking.careerInterest}</p>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="w-full mt-2 px-3 py-1.5 text-[10px] bg-red-950 hover:bg-red-900 text-red-300 font-mono font-bold uppercase tracking-wider rounded-lg transition border border-red-800/30 cursor-pointer text-center"
                    >
                      Cancel
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
