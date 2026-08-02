import React, { useState } from 'react';
import { BookOpen, FileText, Download, Calendar, Activity, ChevronRight, Newspaper, PlayCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function StudyMaterial() {
  const handleDownload = (bookTitle) => {
    const element = document.createElement('a');
    const file = new Blob(["This is a sample document for " + bookTitle], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = bookTitle.replace(/\s+/g, '_') + '.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const [activeTab, setActiveTab] = useState<'quizzes' | 'news' | 'schedules' | 'ebooks'>('quizzes');

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-[36px] font-poppins font-extrabold text-white mb-4">Study Material Hub</h1>
        <p className="text-white/80 max-w-2xl mx-auto">Access our comprehensive library of study materials, take quizzes, stay updated with news, and download e-books.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {[
          { id: 'quizzes', label: 'Daily Quizzes', icon: Activity },
          { id: 'news', label: 'News & Updates', icon: Newspaper, PlayCircle, Clock },
          { id: 'schedules', label: 'Exam Calendar 2026', icon: Calendar },
          { id: 'ebooks', label: 'E-Books (Download)', icon: Download }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-poppins font-semibold transition-all ${
              activeTab === tab.id 
                ? 'bg-primary text-[#0B192C]' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card p-8 min-h-[400px]">
        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">Daily Quiz for Each Exam</h2>
                <p className="text-sm text-white/70">Test your knowledge with daily updated questions tailored for your specific exam.</p>
              </div>
              <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase animate-pulse">
                Live Today
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'NDA / NA Daily Mock', category: 'Defence', questions: 30, difficulty: 'Hard', active: true },
              { title: 'CDS Current Affairs', category: 'Defence', questions: 20, difficulty: 'Medium', active: true },
              { title: 'Sainik School (Class 6) Math & Reasoning', category: 'Entrance', questions: 25, difficulty: 'Easy', active: true },
              { title: 'AFCAT Reasoning Test', category: 'Defence', questions: 40, difficulty: 'Medium', active: true },
              { title: 'RIMC English Grammar', category: 'Entrance', questions: 15, difficulty: 'Hard', active: true },
              { title: 'MNS General Science', category: 'Nursing', questions: 20, difficulty: 'Medium', active: true },
            ].map((quiz, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[12px] flex flex-col justify-between hover:border-primary/50 transition-all cursor-pointer group">
                <div className="mb-4">
                  <span className="text-[10px] bg-white/10 text-white/90 px-2 py-1 rounded-full font-bold uppercase tracking-widest">{quiz.category}</span>
                  <h3 className="font-poppins font-bold text-lg text-white mt-3 group-hover:text-primary transition-colors">{quiz.title}</h3>
                  <p className="text-sm text-white/70 mt-1">{quiz.questions} Questions • {quiz.difficulty}</p>
                </div>
                <button className="btn-secondary w-full py-2.5 text-sm font-bold flex items-center justify-center gap-2">
                  <PlayCircle className="w-4 h-4" /> Start Daily Quiz
                </button>
              </div>
            ))}
            </div>
          </div>
        )}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Latest Educational News</h2>
            {[
              { title: 'New Exam Pattern Announced for 2026', date: 'July 15, 2026', category: 'Announcement' },
              { title: 'Top Military Colleges Release Admission Guidelines', date: 'July 10, 2026', category: 'Admissions' },
              { title: 'Scholarship Test Dates Extended', date: 'July 05, 2026', category: 'Scholarships' }
            ].map((news, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[12px] hover:border-primary/50 transition-colors cursor-pointer">
                <span className="text-[10px] bg-primary text-[#0B192C] px-2 py-1 rounded-full font-bold">{news.category}</span>
                <h3 className="font-poppins font-bold text-lg text-white mt-3">{news.title}</h3>
                <p className="text-sm text-white/50 mt-1">{news.date}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">Real-Time Monthly Exam Calendar 2026</h2>
                <p className="text-sm text-white/70">Stay updated with the latest official exam notifications and dates.</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                <Clock className="w-3 h-3" /> Auto-Synced
              </span>
            </div>
            
            <div className="overflow-x-auto bg-white/5 rounded-[12px] border border-white/10 p-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-white/90 text-xs uppercase tracking-widest font-mono">
                    <th className="p-4 font-bold rounded-tl-[8px]">Exam Name</th>
                    <th className="p-4 font-bold">Month / Date</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold rounded-tr-[8px]">Action</th>
                  </tr>
                </thead>
                <tbody className="text-white text-sm">
                  {[
                    { name: 'NDA (I) 2026', date: 'April 19, 2026', status: 'Upcoming', type: 'UPSC' },
                    { name: 'CDS (I) 2026', date: 'April 19, 2026', status: 'Upcoming', type: 'UPSC' },
                    { name: 'Sainik School Entrance (AISSEE)', date: 'January 11, 2026', status: 'Result Awaited', type: 'NTA' },
                    { name: 'AFCAT (1) 2026', date: 'February 20-22, 2026', status: 'Completed', type: 'IAF' },
                    { name: 'Rashtriya Military Schools (RMS)', date: 'December 20, 2026', status: 'Notification Pending', type: 'RMS' },
                    { name: 'RIMC Entrance Exam', date: 'June 2, 2026', status: 'Admit Card Soon', type: 'RIMC' },
                    { name: 'NDA (II) 2026', date: 'September 6, 2026', status: 'Upcoming', type: 'UPSC' },
                    { name: 'CDS (II) 2026', date: 'September 6, 2026', status: 'Upcoming', type: 'UPSC' }
                  ].map((exam, i) => (
                    <tr key={i} className="border-b border-white/10 hover:bg-white/10 transition-colors last:border-0">
                      <td className="p-4">
                        <div className="font-bold">{exam.name}</div>
                        <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">{exam.type}</div>
                      </td>
                      <td className="p-4 text-primary font-bold">{exam.date}</td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider border ${
                          exam.status.includes('Upcoming') || exam.status.includes('Soon') ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          exam.status.includes('Completed') ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-xs text-white bg-white/10 px-3 py-1.5 rounded hover:bg-primary hover:text-[#0B192C] transition-colors font-bold">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 'ebooks' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Sainik School Prep Guide Vol 1', size: '12 MB', format: 'PDF' },
              { title: 'General Science Masterclass', size: '8 MB', format: 'PDF' },
              { title: 'Math Formulas Cheat Sheet', size: '2 MB', format: 'PDF' },
              { title: 'English Grammar Workbooks', size: '15 MB', format: 'PDF' },
              { title: 'Previous Year Papers (2020-2025)', size: '25 MB', format: 'ZIP' }
            ].map((book, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[12px] flex flex-col hover:border-primary/50 transition-colors">
                <FileText className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-poppins font-bold text-lg text-white flex-1">{book.title}</h3>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-white/50">{book.format} • {book.size}</span>
                  <button onClick={() => handleDownload(book.title)} className="flex items-center gap-1 text-sm text-primary hover:text-white transition-colors cursor-pointer">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
