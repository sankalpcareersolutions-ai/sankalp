import React, { useState } from 'react';
import { BookOpen, FileText, Download, Calendar, Activity, ChevronRight, Newspaper } from 'lucide-react';
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
          { id: 'quizzes', label: 'Quizzes Data', icon: Activity },
          { id: 'news', label: 'News & Updates', icon: Newspaper },
          { id: 'schedules', label: 'Exam Schedules', icon: Calendar },
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
            <h2 className="text-2xl font-bold text-primary mb-6">Latest Quizzes</h2>
            {[
              { title: 'Sainik School Entrance - Math Practice', questions: 25, difficulty: 'Medium' },
              { title: 'General Knowledge & Current Affairs', questions: 50, difficulty: 'Hard' },
              { title: 'Class 9th English Grammar Test', questions: 20, difficulty: 'Easy' }
            ].map((quiz, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[12px] flex flex-col md:flex-row justify-between items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white">{quiz.title}</h3>
                  <p className="text-sm text-white/70">{quiz.questions} Questions • {quiz.difficulty}</p>
                </div>
                <button className="btn-secondary px-6 py-2 text-sm">Start Quiz</button>
              </div>
            ))}
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
            <h2 className="text-2xl font-bold text-primary mb-6">Upcoming Exam Schedules</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20 text-white/70 text-sm font-poppins">
                    <th className="p-4 font-semibold">Exam Name</th>
                    <th className="p-4 font-semibold">Eligibility</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {[
                    { name: 'Sainik School Entrance (AISSEE)', el: 'Class 5th, 8th', date: 'Jan 2027' },
                    { name: 'Rashtriya Military Schools (RMS)', el: 'Class 5th, 8th', date: 'Dec 2026' },
                    { name: 'RIMC Entrance', el: 'Class 7th', date: 'Dec 2026' }
                  ].map((exam, i) => (
                    <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4 font-bold">{exam.name}</td>
                      <td className="p-4 text-white/80">{exam.el}</td>
                      <td className="p-4 text-primary font-semibold">{exam.date}</td>
                      <td className="p-4"><button className="text-sm text-white underline hover:text-primary">View Details</button></td>
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
