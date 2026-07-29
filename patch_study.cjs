const fs = require('fs');
let code = fs.readFileSync('src/components/StudyMaterial.tsx', 'utf-8');

const quizzesOld = /{activeTab === 'quizzes' && \([\s\S]*?(?={activeTab === 'news')/m;
const quizzesNew = `{activeTab === 'quizzes' && (
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
        `;

const schedulesOld = /{activeTab === 'schedules' && \([\s\S]*?(?={activeTab === 'ebooks')/m;
const schedulesNew = `{activeTab === 'schedules' && (
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
                        <span className={\`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider border \${
                          exam.status.includes('Upcoming') || exam.status.includes('Soon') ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          exam.status.includes('Completed') ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }\`}>
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
        `;

code = code.replace(quizzesOld, quizzesNew);
code = code.replace(schedulesOld, schedulesNew);

if (!code.includes('PlayCircle')) {
  code = code.replace(/import {([^}]+)} from "lucide-react";/, 'import { $1, PlayCircle, Clock } from "lucide-react";');
}

fs.writeFileSync('src/components/StudyMaterial.tsx', code);
