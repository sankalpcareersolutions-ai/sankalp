import React from 'react';
import girlStudentsImg from '../assets/images/girl_students_1_1784450559085.jpg';
import { testimonials } from '../data/testimonials';
import { Helmet } from 'react-helmet-async';
import { Search, Compass, Target, Shield, BookOpen, Clock, Users, ArrowRight, CheckCircle, ChevronRight, MessageCircle } from 'lucide-react';

interface HomeProps {
  onSearchSelection?: (item: any) => void;
  onTabChange?: (tab: string) => void;
}

export default function Home({ onSearchSelection, onTabChange = () => {} }: HomeProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <Helmet>
        <title>Career Counselling Hub | Discover • Decide • Achieve</title>
        <meta name="description" content="Empowering students to make informed career decisions through expert counselling, defence career guidance, and a comprehensive career library." />
      </Helmet>

      {/* AI Career Assistant Chat Widget */}
      <div className="fixed bottom-24 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer group">
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary text-sm font-poppins font-bold px-3 py-1 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">AI Career Assistant</span>
      </div>
      
      {/* Hero Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-[36px] lg:text-[48px] xl:text-[56px] font-poppins font-extrabold leading-tight text-white drop-shadow-sm">
            Shape Your Future with
            <span className="text-secondary block mt-2 lg:mt-3">Career Counselling Hub</span>
          </h1>
          <p className="text-[18px] text-white/90 max-w-2xl mx-auto lg:mx-0">
            Career Counselling | Defence Guidance | Career Library | Entrance Exam Guidance | Career Assessment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={() => onTabChange('appointment')} className="btn-primary px-8 py-4 text-lg">
              Book Free Consultation
            </button>
            <button onClick={() => onTabChange('career-library')} className="btn-secondary px-8 py-4 text-lg">
              Explore Career Library
            </button>
          </div>
          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            {['Expert Guidance', 'Personalized Roadmaps', 'Career Assessment', 'Defence Career Specialist'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-[15px] font-medium text-text-muted">
                <CheckCircle className="w-5 h-5 text-accent" />
                {badge}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="relative rounded-[16px] overflow-hidden shadow-2xl aspect-4/3 bg-slate-200">
            {/* Placeholder for the image of smiling Indian students */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent mix-blend-overlay"></div>
            <img src={girlStudentsImg} referrerPolicy="no-referrer" alt="Students" className="w-full h-full object-cover" />
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
            {testimonials.slice(0, 50).map((t, i) => (
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

    </div>
  );
}
