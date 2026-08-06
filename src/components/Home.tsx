import React from 'react';
import girlStudentsImg from '../assets/images/girl_students_1_1784450559085.jpg';
import aayuAvatar from '../assets/images/aayu_girl_avatar_1786025045279.jpg';
import { testimonials } from '../data/testimonials';
import { Search, Compass, Target, Shield, BookOpen, Clock, Users, ArrowRight, CheckCircle, ChevronRight, MessageCircle, Phone, Mail, Globe, Sparkles, Bot, Zap } from 'lucide-react';

interface HomeProps {
  onSearchSelection?: (item: any) => void;
  onTabChange?: (tab: string) => void;
}

export default function Home({ onSearchSelection, onTabChange = () => {} }: HomeProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <title>Career Counselling Hub | Discover • Decide • Achieve</title>
      <meta name="description" content="Empowering students to make informed career decisions through expert counselling, defence career guidance, and a comprehensive career library." />
      
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-7 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-secondary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-secondary" /> India's Leading Career & Defence Guidance Platform
          </div>

          <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[54px] font-poppins font-extrabold leading-tight text-white drop-shadow-sm">
            Shape Your Future with
            <span className="text-secondary block mt-1.5 lg:mt-2">Career Counselling Hub</span>
          </h1>
          <p className="text-[17px] sm:text-[18px] text-white/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Career Counselling • Defence Guidance • 500+ Career Library • Entrance Exam Trackers • Psychometric Assessments
          </p>

          {/* Primary & Interactive Actions - Inline Tabs */}
          <div className="flex flex-wrap items-center gap-3.5 justify-center lg:justify-start pt-2">
            {/* Ask Aayu AI Tab */}
            <button 
              id="hero_btn_ask_aayu"
              onClick={() => onTabChange('aayu')} 
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-navy-950 font-poppins font-bold px-5 sm:px-6 py-3.5 text-base rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-amber-300"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-navy-950/40 shadow-sm shrink-0 bg-navy-900">
                <img src={aayuAvatar} alt="Aayu AI" className="w-full h-full object-cover" />
              </div>
              <span className="tracking-tight">Ask Aayu AI Guide</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-700 animate-ping"></span>
            </button>

            {/* WhatsApp Chat Tab */}
            <a 
              id="hero_btn_whatsapp"
              href="https://wa.me/918528335708?text=Hello%20CareerCounsellingHub,%20I%20need%20career%20guidance."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-navy-950 font-poppins font-bold px-5 sm:px-6 py-3.5 text-base rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400"
            >
              <MessageCircle className="w-5 h-5 text-navy-950 fill-navy-950/20" />
              <span className="tracking-tight">WhatsApp Counselling</span>
            </a>

            {/* Book Free Consultation */}
            <button 
              id="hero_btn_appointment"
              onClick={() => onTabChange('appointment')} 
              className="btn-primary px-5 sm:px-6 py-3.5 text-base"
            >
              Book 1:1 Consultation
            </button>

            {/* Explore Career Library */}
            <button 
              id="hero_btn_library"
              onClick={() => onTabChange('career-library')} 
              className="btn-secondary px-5 sm:px-6 py-3.5 text-base"
            >
              Career Library
            </button>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
            {['Expert Counsellors', 'Personalized Roadmaps', 'Psychometric Tests', 'Defence Specialist'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-[14px] font-medium text-text-muted">
                <CheckCircle className="w-4 h-4 text-accent" />
                {badge}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="relative rounded-[20px] overflow-hidden shadow-2xl aspect-4/3 bg-slate-200 border-2 border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay"></div>
            <img src={girlStudentsImg} referrerPolicy="no-referrer" alt="Students" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Aayu AI Spotlight Banner - Engaging Student Virtual Assistant Card */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-4">
        <div className="bg-gradient-to-r from-[#0B1F3A] via-[#071224] to-[#0B1F3A] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          {/* Avatar Thumbnail + Student Pitch */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 flex-1 text-center sm:text-left relative z-10">
            {/* Small Attractive 3D Virtual Assistant Avatar */}
            <div className="relative shrink-0 group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-600 shadow-xl shadow-amber-400/20 transform group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-navy-950">
                  <img 
                    src={aayuAvatar} 
                    alt="Aayu Virtual Assistant" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border-2 border-navy-950 flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> 24x7 Online
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Aayu • AI Student Career Mentor
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-poppins font-black text-white leading-tight">
                Confused About Streams, Exams, or Colleges? <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                  Ask Aayu — Your 24/7 Smart Career Guide
                </span>
              </h2>

              <p className="text-sm sm:text-base text-white/80 max-w-xl">
                Get instant, customized answers for 10th/12th stream selection, NDA/SSB testing preparation, JEE vs NEET roadmaps, cutoffs, and top college admissions.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                {["10th/12th Streams", "NDA & SSB Tips", "JEE vs NEET Roadmaps", "CUET Cutoffs", "Direct WhatsApp Help"].map((pill, i) => (
                  <span key={i} className="text-xs bg-white/10 border border-white/15 px-3 py-1 rounded-lg text-white/90 font-medium">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Inline Action Buttons for Aayu & WhatsApp */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 relative z-10 w-full sm:w-auto shrink-0">
            <button
              id="spotlight_btn_chat_aayu"
              onClick={() => onTabChange('aayu')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-navy-950 font-poppins font-extrabold text-base rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Bot className="w-5 h-5 text-navy-950" />
              <span>Chat with Aayu AI</span>
              <ArrowRight className="w-4 h-4 text-navy-950" />
            </button>

            <a
              id="spotlight_btn_whatsapp"
              href="https://wa.me/918528335708?text=Hello%20CareerCounsellingHub,%20I%20need%20career%20guidance."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-navy-950 font-poppins font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-navy-950" />
              <span>WhatsApp +91 85283 35708</span>
            </a>

            <button
              id="spotlight_btn_appointment"
              onClick={() => onTabChange('appointment')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-poppins font-semibold text-xs rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book 1:1 Expert Career Mentorship</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-bg-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-[38px] font-poppins font-extrabold text-white mb-4 drop-shadow-sm leading-tight">Why Choose Career Counselling Hub</h2>
            <p className="text-[18px] text-white/90 max-w-3xl mx-auto">We provide comprehensive support for students and professionals to navigate their career paths with confidence.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Compass, title: 'Unbiased Guidance', desc: 'Objective career advice tailored to your strengths and aspirations.' },
              { icon: Target, title: 'Scientific Assessments', desc: 'Psychometric tests to discover your true potential and aptitude.' },
              { icon: Users, title: 'Expert Counsellors', desc: 'Certified professionals with years of industry experience.' }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-[16px] text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-[24px] font-poppins font-bold text-text-main mb-3">{feature.title}</h3>
                <p className="text-text-muted text-[15px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defence Career Guidance (Featured) */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B1F3A] border border-primary/30 rounded-[16px] p-8 lg:p-12 text-white flex flex-col md:flex-row items-center gap-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="flex-1 relative z-10 text-center md:text-left flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-secondary" />
                <h2 className="text-[38px] font-poppins font-extrabold leading-tight">Defence Career Guidance</h2>
              </div>
              <p className="text-lg text-white/80 mb-8 max-w-xl opacity-90">
                Specialized mentoring for NDA, CDS, AFCAT, and CAPF. Get insights into SSB interviews, physical requirements, and exam strategies from veterans.
              </p>
              <button onClick={() => onTabChange('exams')} className="bg-primary text-[#0B1F3A] font-poppins font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-primary transition-colors flex items-center gap-2">
                View Defence Exams <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full relative z-10 hidden md:block">
               <div className="grid grid-cols-2 gap-4">
                  {['NDA', 'CDS', 'AFCAT', 'CAPF'].map(exam => (
                    <div key={exam} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[16px] text-center">
                       <h4 className="font-poppins font-bold text-xl">{exam}</h4>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Features Row */}
      <section className="w-full bg-bg-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Career of the Day', icon: Compass },
              { title: 'Search Careers', icon: Search },
              { title: 'Career Roadmaps', icon: Target },
              { title: 'Salary Calculator', icon: BookOpen }
            ].map((tool, i) => (
              <div key={i} className="bg-white p-6 rounded-[16px] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer">
                <tool.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-poppins font-semibold text-[15px]">{tool.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-[38px] font-poppins font-extrabold text-white mb-4 drop-shadow-sm leading-tight">50+ Student Success Stories</h2>
            <p className="text-[18px] text-white/90 max-w-3xl mx-auto">Discover how our expert counselling has helped students crack various entrance exams and achieve their dream careers.</p>
          </div>
          
          {/* Scrollable container for 50 testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[800px] overflow-y-auto p-4 custom-scrollbar">
            {testimonials.slice(0, 35).map((t, i) => (
              <div key={i} className="glass-card p-8 rounded-[16px] flex flex-col bg-white">
                <div className="flex text-secondary mb-4">
                  {[...Array(t.rating)].map((_, s) => <span key={s}>★</span>)}
                </div>
                <p className="text-text-muted italic mb-6 flex-1 text-sm line-clamp-4 hover:line-clamp-none transition-all">"{t.content}"</p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold font-poppins shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-primary text-sm line-clamp-1">{t.name}</h4>
                    <p className="text-[12px] text-secondary font-semibold">{t.achievement}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">{t.subSector}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => onTabChange('testimonials')} className="btn-primary px-8 py-4 text-lg">
              View All Testimonials & Filters
            </button>
          </div>
        </div>
      </section>

      {/* Premium Contact & Immediate Assistance Section */}
      <section className="w-full bg-[#071224] py-20 border-t border-primary/20 text-white" id="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Direct Counselling Desk
            </div>
            <h2 className="text-[28px] md:text-[38px] font-poppins font-extrabold text-white mb-4 drop-shadow-sm">
              Contact & Immediate Assistance
            </h2>
            <p className="text-[17px] text-white/80 max-w-2xl mx-auto">
              Have questions about higher education, stream selection, or defence career preparation? Reach out to our senior counsellors directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WhatsApp Card */}
            <div className="bg-[#0B1F3A] border border-emerald-500/30 hover:border-emerald-500/60 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-white mb-2">WhatsApp Assistance</h3>
              <p className="text-sm text-white/70 mb-4">Instant response for admission & exam guidance</p>
              <a 
                href="https://wa.me/918528335708?text=Hello%20CareerCounsellingHub,%20I%20need%20career%20guidance."
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-mono font-bold text-[#25D366] hover:underline mb-6 block"
              >
                +91 85283 35708
              </a>
              <a
                href="https://wa.me/918528335708?text=Hello%20CareerCounsellingHub,%20I%20need%20career%20guidance."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-navy-950 font-poppins font-bold text-sm rounded-xl transition shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-[#0B1F3A] border border-secondary/30 hover:border-secondary/60 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 border border-secondary/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-white mb-2">Email Desk</h3>
              <p className="text-sm text-white/70 mb-4">Detailed enquiry review & official communications</p>
              <a 
                href="mailto:sankalpcareersolutions@gmail.com"
                className="text-sm sm:text-base font-mono font-semibold text-secondary hover:underline mb-6 break-all block"
              >
                sankalpcareersolutions@gmail.com
              </a>
              <a
                href="mailto:sankalpcareersolutions@gmail.com"
                className="mt-auto w-full py-3 px-4 bg-secondary hover:bg-secondary/90 text-navy-950 font-poppins font-bold text-sm rounded-xl transition shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> Send Email Enquiry
              </a>
            </div>

            {/* Official Website & Booking */}
            <div className="bg-[#0B1F3A] border border-blue-500/30 hover:border-blue-500/60 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-white mb-2">Official Portal</h3>
              <p className="text-sm text-white/70 mb-4">Discover careers & reserve 1:1 video consultation</p>
              <a 
                href="https://www.careercounsellinghub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-blue-300 hover:underline mb-6 block"
              >
                www.careercounsellinghub.com
              </a>
              <button
                onClick={() => onTabChange('appointment')}
                className="mt-auto w-full py-3 px-4 bg-gradient-to-r from-secondary to-amber-500 hover:from-amber-400 hover:to-secondary text-navy-950 font-poppins font-bold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Book 1:1 Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
