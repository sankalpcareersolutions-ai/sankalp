import React, { useState, useMemo } from "react";
import { testimonials, Testimonial } from "../data/testimonials";
import { Search, Compass, BadgeCheck, ShieldAlert, Star, Filter, MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TestimonialsPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function TestimonialsPage({ searchTerm, setSearchTerm }: TestimonialsPageProps) {
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState({ name: "", email: "", rating: 5, content: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowFeedbackForm(false);
      setSubmitSuccess(false);
      setFeedback({ name: "", email: "", rating: 5, content: "" });
    }, 3000);
  };

  const sectors = ["All", "Defence Services", "Paramilitary", "Scientific / R&D", "Defence Civilian"];

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subSector.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector = selectedSector === "All" || t.sector === selectedSector;

      return matchesSearch && matchesSector;
    });
  }, [searchTerm, selectedSector]);

  return (
    <div className="space-y-8" id="testimonials_page_root">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#2d3a2e] to-emerald-950 text-white rounded-2xl p-8 border border-emerald-800/40 relative overflow-hidden shadow-xl" id="testimonials_banner">
        <div className="absolute right-0 top-0 opacity-10 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:40px_40px] w-1/2 h-full"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#c5a059] uppercase bg-[#c5a059]/10 px-3 py-1 rounded-full border border-[#c5a059]/30">
            50+ Hall of Fame Stories
          </span>
          <h1 className="text-3xl font-bold font-sans tracking-tight md:text-4xl text-stone-100">
            Verified Success Stories
          </h1>
          <p className="text-stone-300 font-sans text-sm md:text-base leading-relaxed">
            Discover how SANKALP aspirants successfully cracked CDS, SSB boards, ISRO examinations,
            DRDO RAC technical boards, BARC scientific screening, and paramilitary recruitments.
          </p>
          <div className="pt-4">
             <button 
               onClick={() => setShowFeedbackForm(!showFeedbackForm)}
               className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d5b069] text-emerald-950 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
             >
               <MessageSquare className="w-4 h-4" /> 
               Share Your Experience & Feedback
             </button>
          </div>
        </div>
      </div>

      {/* Feedback Form Section */}
      <AnimatePresence>
        {showFeedbackForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-sm relative">
              <h3 className="text-xl font-bold text-stone-800 mb-2">Submit Your Review</h3>
              <p className="text-stone-500 text-sm mb-6">Your feedback helps us improve our guidance programs.</p>
              
              {submitSuccess ? (
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg flex items-center gap-3 border border-emerald-200">
                   <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                   </div>
                   <div>
                     <p className="font-bold text-sm">Thank you for your feedback!</p>
                     <p className="text-xs opacity-90">Your review has been submitted successfully and is pending approval.</p>
                   </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={feedback.name}
                        onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={feedback.email}
                        onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none"
                        placeholder="Your email (kept private)"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          type="button" 
                          key={star} 
                          onClick={() => setFeedback({...feedback, rating: star})}
                          className="p-1 focus:outline-none cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${feedback.rating >= star ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Your Review / Feedback</label>
                    <textarea 
                      required
                      value={feedback.content}
                      onChange={(e) => setFeedback({...feedback, content: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none resize-none"
                      placeholder="Tell us about your experience..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setShowFeedbackForm(false)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-bold cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer shadow-sm"
                    >
                      <Send className="w-4 h-4" /> Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Search Bar */}
      <div className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4" id="testimonials_filter_bar">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input
            id="testimonial_local_search"
            type="text"
            placeholder="Search testimonials by name, exam, or lab..."
            className="w-full pl-10 pr-4 py-2 text-stone-700 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent cursor-text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sector Tabs */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono text-stone-500 flex items-center gap-1 mr-2 md:block hidden">
            <Filter className="w-3.5 h-3.5" /> Sector:
          </span>
          {sectors.map((sec) => (
            <button
              id={`sector_tab_${sec.replace(/\s+/g, '_')}`}
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition cursor-pointer ${
                selectedSector === sec
                  ? "bg-emerald-800 text-stone-100 border border-emerald-700 shadow-sm"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-600 border border-transparent"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2" id="testimonials_results_header">
        <p className="text-xs font-mono text-stone-500">
          Showing <span className="font-bold text-emerald-800">{filteredTestimonials.length}</span> of 50 success stories
        </p>
        {selectedSector !== "All" && (
          <button
            id="clear_testimonial_filter"
            onClick={() => setSelectedSector("All")}
            className="text-xs font-sans font-medium text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Testimonials Grid */}
      {filteredTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="testimonials_grid">
          {filteredTestimonials.slice(0, 35).map((t, idx) => {
            const isDRDO_ISRO = t.subSector === "DRDO" || t.subSector === "ISRO" || t.subSector === "BARC";
            const isArmy_Navy = t.subSector === "Indian Army" || t.subSector === "Indian Navy" || t.subSector === "Indian Air Force";

            return (
              <motion.div
                id={`testimonial_card_${t.id}`}
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.5) }}
                className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-emerald-800/40 hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                {/* Visual side accent */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    isArmy_Navy
                      ? "bg-olive-700 bg-gradient-to-b from-yellow-600 to-emerald-800"
                      : isDRDO_ISRO
                      ? "bg-blue-600"
                      : "bg-emerald-600"
                  }`}
                />

                <div className="space-y-4">
                  {/* Rating Stars and Subsector Tag */}
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-stone-100 text-stone-600 border border-stone-200">
                      {t.subSector}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < t.rating ? "text-amber-500 fill-amber-500" : "text-stone-250"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Recommendation/Aptitude Text */}
                  <blockquote className="text-stone-600 text-xs font-sans leading-relaxed italic">
                    "{t.content}"
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-start gap-3">
                  {/* Avatar Circle with Olive/Stone design */}
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs border border-emerald-200/50 flex-shrink-0">
                    {t.name
                      .split(" ")
                      .filter((n) => !n.includes("Lt.") && !n.includes("Dr.") && !n.includes("Asst."))
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2) || "S"}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-stone-800 group-hover:text-emerald-800 transition-colors">
                      {t.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 leading-tight">
                      {t.role}
                    </p>
                    <p className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block">
                      {t.achievement}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-stone-50 rounded-2xl py-12 text-center border-2 border-dashed border-stone-200" id="testimonials_empty">
          <ShieldAlert className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-700">No matching success stories found</h3>
          <p className="text-stone-500 text-xs mt-1">Try resetting your search query or choosing another defense sector.</p>
          <button
            id="reset_testimonials"
            onClick={() => {
              setSearchTerm("");
              setSelectedSector("All");
            }}
            className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-sans font-medium hover:bg-emerald-900 cursor-pointer"
          >
            Show All 50 Testimonials
          </button>
        </div>
      )}
    </div>
  );
}
