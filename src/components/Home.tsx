import React, { useState } from "react";
import { Search, Compass, Shield, Award, Users, BookOpen, GraduationCap, Target, AlertCircle, ArrowRight, HeartHandshake, Eye, Rocket, Crosshair, ChevronRight, HelpCircle, Newspaper, Cpu, Landmark, Gavel, Atom } from "lucide-react";
import { motion } from "motion/react";

import flagsImg from "../assets/images/armed_forces_flags_1780997129787.png";
import combatAssetsImg from "../assets/images/army_tank_1780997176988.png";
import droneImg from "../assets/images/fighter_jet_drone_1780997160368.png";
import { useLanguage } from "../contexts/LanguageContext";

interface HomeProps {
  onSearchSelection: (term: string) => void;
  onTabChange: (tab: string) => void;
}

export default function Home({ onSearchSelection, onTabChange }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();
  
  const faqs = [
    { q: "What is Sankalp?", a: "India's most trusted platform for career guidance, focusing heavily on Defence & Strategic Careers alongside all major professions." },
    { q: "When should a student start career counselling?", a: "We recommend starting from Class 9th to build a strong foundation and choose the right streams." },
    { q: "Do you provide guidance for NDA & CDS?", a: "Yes, our flagship category is Defence Careers, covering NDA, CDS, AFCAT, and SSB Interview prep." },
    { q: "Can graduates use this platform?", a: "Absolutely. We guide graduates towards opportunities in DRDO, ISRO, UPSC, and Corporate sectors." }
  ];

  return (
    <div className="space-y-16" id="home_tab_root">
      
      {/* 1. Hero Section with Search Bar */}
      <section className="relative rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 border border-gold-600/30 overflow-hidden shadow-2xl py-20 px-6 md:px-12 text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute right-0 bottom-0 bg-gold-500/10 w-96 h-96 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-lightyellow-200 bg-gold-500/15 border border-gold-400/40 uppercase shadow-inner">
            <Shield className="w-4 h-4 text-gold-400 fill-gold-500/10" /> {t("home.hero_badge")}
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-sans text-white tracking-tight leading-tight uppercase drop-shadow-lg">
            {t("home.hero_title1")} <span className="text-gold-400">{t("home.hero_title2")}</span>
          </h1>
          <p className="text-base md:text-xl text-lightyellow-200/90 font-sans max-w-3xl mx-auto drop-shadow-md">
            {t("home.hero_subtitle")}
          </p>

          <div className="max-w-2xl mx-auto relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search careers, colleges, exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-950/80 border-2 border-gold-500/40 rounded-full py-4 pl-14 pr-32 text-lightyellow-100 focus:outline-none focus:border-gold-400 shadow-2xl text-lg backdrop-blur-sm"
            />
            <button 
              onClick={() => {
                onSearchSelection(searchQuery);
                onTabChange("career-library");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold-450 hover:bg-gold-500 text-navy-950 font-bold px-6 py-2 rounded-full transition cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      
      {/* Project Sankalp Vision */}
      <section className="bg-navy-900 border border-gold-600/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Vision Statement Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-lightyellow-100 uppercase font-sans tracking-tight">
              {t("home.vision_title")}
            </h2>
            <p className="text-base md:text-lg text-lightyellow-200/90 leading-relaxed max-w-3xl mx-auto font-medium">
              {t("home.vision_intro")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Our Vision */}
            <div className="space-y-4 bg-navy-950/50 p-6 rounded-2xl border border-gold-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-lightyellow-100 uppercase tracking-widest">{t("home.our_vision_title")}</h3>
              </div>
              <p className="text-sm text-lightyellow-200/80 leading-relaxed font-sans">
                {t("home.our_vision_desc")}
              </p>
            </div>

            {/* Our Mission */}
            <div className="space-y-4 bg-navy-950/50 p-6 rounded-2xl border border-gold-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-lightyellow-100 uppercase tracking-widest">{t("home.our_mission_title")}</h3>
              </div>
              <ul className="text-sm text-lightyellow-200/80 leading-relaxed font-sans space-y-2 list-disc list-inside">
                <li>{t("home.our_mission_item1")}</li>
                <li>{t("home.our_mission_item2")}</li>
                <li>{t("home.our_mission_item3")}</li>
                <li>{t("home.our_mission_item4")}</li>
                <li>{t("home.our_mission_item5")}</li>
                <li>{t("home.our_mission_item6")}</li>
              </ul>
            </div>
          </div>

          {/* Motto and Tagline */}
          <div className="text-center space-y-6 pt-6 border-t border-gold-500/20">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-gold-400 uppercase mb-2">{t("home.motto_title")}</h4>
              <p className="text-xl md:text-2xl font-black text-lightyellow-100 italic">
                {t("home.motto_text")}
              </p>
            </div>
            <div className="bg-gold-500/10 rounded-xl py-3 px-6 inline-block border border-gold-500/30">
              <p className="text-sm md:text-base font-bold text-gold-400 uppercase tracking-wide">
                {t("home.tagline_text")}
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. Explore Career Library (Categories) */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-black text-lightyellow-100 font-sans uppercase">Explore Career Library</h2>
          <p className="text-sm text-lightyellow-200/80">Discover in-depth information about 500+ career paths.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { n: 'Engineering', i: <Cpu /> },
            { n: 'Medical', i: <HeartHandshake /> },
            { n: 'Defence', i: <Shield /> },
            { n: 'Civil Services', i: <Landmark /> },
            { n: 'Law', i: <Gavel /> },
            { n: 'Research', i: <Atom /> }
          ].map(cat => (
            <div key={cat.n} onClick={() => onTabChange("career-library")} className="bg-navy-900 border border-gold-500/20 rounded-2xl p-6 text-center hover:border-gold-400 cursor-pointer transition hover:-translate-y-1 shadow-lg group">
              <div className="w-12 h-12 mx-auto bg-navy-950 rounded-full flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 transition-transform">
                {cat.i}
              </div>
              <h3 className="text-sm font-bold text-lightyellow-100 uppercase tracking-tight">{cat.n}</h3>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={() => onTabChange("career-library")} className="text-gold-400 hover:text-gold-300 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 mx-auto cursor-pointer">
            View All Careers <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. Defence Careers (Featured Flagship) */}
      <section className="bg-navy-900 border border-gold-600/30 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
            <span className="text-[10px] font-mono tracking-widest uppercase bg-gold-500/10 text-gold-400 border border-gold-500/20 px-3 py-1 rounded inline-block w-max">
              ⭐ Flagship Category
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-sans text-lightyellow-100 uppercase leading-tight">
              Defence & Strategic Careers
            </h2>
            <p className="text-sm text-lightyellow-200/80 leading-relaxed font-sans">
              Dedicated portal for Military Careers (NDA, CDS, AFCAT), Research Organisations (DRDO, ISRO, BARC), and Paramilitary forces. Get SSB Interview guidance, physical standards, and exam calendars.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <ul className="space-y-2 text-sm font-bold text-lightyellow-100">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-400" /> NDA / CDS / AFCAT</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-400" /> Indian Army / Navy / IAF</li>
              </ul>
              <ul className="space-y-2 text-sm font-bold text-lightyellow-100">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-400" /> DRDO / ISRO / BARC</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold-400" /> CAPF Assistant Commandant</li>
              </ul>
            </div>
            <button onClick={() => onTabChange("career-library")} className="mt-4 w-max px-6 py-3 bg-navy-800 text-lightyellow-100 hover:text-white border border-gold-500/40 font-bold text-xs uppercase tracking-widest rounded-xl transition hover:bg-navy-750 cursor-pointer flex items-center gap-2">
              Explore Defence Portal <ChevronRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>
          <div className="relative h-64 lg:h-auto">
            <img src={flagsImg} alt="Indian Flags" className="absolute inset-0 w-full h-full object-cover filter brightness-75" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 4. Book Career Counselling & Assessment */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-gold-900/40 to-navy-900 border border-gold-500/30 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gold-450 text-navy-950 flex items-center justify-center">
              <Target className="w-6 h-6 font-bold" />
            </div>
            <h3 className="text-2xl font-black text-lightyellow-100 uppercase">Career Assessment Test</h3>
            <p className="text-sm text-lightyellow-200/80">Not sure which path to choose? Take our AI-powered psychometric and aptitude test to discover careers that match your personality and skills.</p>
          </div>
          <button className="mt-8 px-6 py-3 bg-gold-450 hover:bg-gold-500 text-navy-950 font-bold text-sm uppercase tracking-widest rounded-xl transition cursor-pointer">
            Start Free Assessment
          </button>
        </div>

        <div className="bg-navy-900 border border-gold-500/20 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-navy-800 border border-gold-500/40 text-gold-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-lightyellow-100 uppercase">Book 1-on-1 Counselling</h3>
            <p className="text-sm text-lightyellow-200/80">Connect with industry experts, veterans, and career psychologists to map out your exact educational and professional trajectory.</p>
          </div>
          <button onClick={() => onTabChange("appointment")} className="mt-8 px-6 py-3 bg-navy-800 border-2 border-gold-500 hover:bg-navy-750 text-lightyellow-100 font-bold text-sm uppercase tracking-widest rounded-xl transition cursor-pointer">
            Schedule Appointment
          </button>
        </div>
      </section>

      {/* 5. Latest News & Entrance Exams */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-gold-600/30 pb-4">
          <div>
            <h2 className="text-2xl font-black text-lightyellow-100 font-sans uppercase">News & Exam Updates</h2>
            <p className="text-xs text-lightyellow-200/60 font-mono mt-1">Live recruitment notifications</p>
          </div>
          <button className="text-xs text-gold-400 font-bold uppercase hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { date: '15 Jul 2026', title: 'UPSC NDA II 2026 Notification Released', tag: 'Exam Alert' },
            { date: '12 Jul 2026', title: 'JEE Main 2027 Registration Dates Announced', tag: 'Engineering' },
            { date: '10 Jul 2026', title: 'ISRO Scientist Recruitment - Apply Now', tag: 'Research' }
          ].map((news, i) => (
            <div key={i} className="bg-navy-950 border border-gold-500/10 rounded-2xl p-5 hover:border-gold-500/40 transition group cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono text-gold-400 border border-gold-500/20 px-2 py-0.5 rounded">{news.tag}</span>
                <span className="text-[10px] text-lightyellow-200/50">{news.date}</span>
              </div>
              <h4 className="text-sm font-bold text-lightyellow-100 group-hover:text-gold-400 transition">{news.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Success Stories & Testimonials */}
      <section className="bg-navy-900 rounded-3xl p-8 border border-gold-600/20 relative overflow-hidden text-center">
        <h2 className="text-2xl md:text-3xl font-black text-lightyellow-100 font-sans uppercase mb-8">Student Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Rahul S.", to: "NDA Khadakwasla", text: "The counselling helped me clear my SSB interview in the first attempt!" },
            { name: "Priya M.", to: "IIT Delhi", text: "I was confused between medical and engineering. The assessment test gave me clarity." },
            { name: "Arjun K.", to: "DRDO Scientist", text: "The personalized mentorship mapped out my exact PG path to enter DRDO." }
          ].map((t, i) => (
            <div key={i} className="bg-navy-950 p-6 rounded-2xl border border-gold-500/10">
              <p className="text-sm text-lightyellow-200/80 italic mb-4">"{t.text}"</p>
              <h4 className="text-sm font-bold text-lightyellow-100">{t.name}</h4>
              <p className="text-[10px] text-gold-400 font-mono uppercase tracking-widest">{t.to}</p>
            </div>
          ))}
        </div>
        <button onClick={() => onTabChange("testimonials")} className="mt-8 px-6 py-2 bg-transparent border border-gold-500 text-gold-400 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold-500/10 transition cursor-pointer">
          Read More Stories
        </button>
      </section>

      {/* 7. FAQ */}
      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl md:text-3xl font-black text-center text-lightyellow-100 font-sans uppercase">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-navy-900 border border-gold-500/20 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-lightyellow-100 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
                {faq.q}
              </h4>
              <p className="text-sm text-lightyellow-200/70 mt-2 pl-8">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

const CheckCircle = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)
