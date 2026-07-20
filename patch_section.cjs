const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

const anchor = `          {filteredCareers.length === 0 && (
            <div className="text-center py-12 text-lightyellow-200/50">
              No careers found matching your criteria. Try adjusting your search.
            </div>
          )}
        </>`;

const newSection = `          {filteredCareers.length === 0 && (
            <div className="text-center py-12 text-lightyellow-200/50">
              No careers found matching your criteria. Try adjusting your search.
            </div>
          )}

          {/* Downloadable Resources Section */}
          <div className="mt-16 bg-navy-900 border border-gold-600/20 rounded-3xl p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <Download className="w-64 h-64 text-gold-500" />
             </div>
             
             <div className="relative z-10">
               <h3 className="text-2xl md:text-3xl font-black text-lightyellow-100 uppercase tracking-tight mb-2">
                 Downloadable Resources
               </h3>
               <p className="text-sm text-lightyellow-200/70 max-w-2xl mb-8">
                 Access high-quality PDF templates designed to help you prepare effectively. Get structured study schedules and tactical physical fitness plans.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Study Schedule Template */}
                 <div className="bg-navy-950 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/60 transition group cursor-pointer" onClick={handleDownloadStudySchedule}>
                   <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 bg-gold-500/10 rounded-xl text-gold-400 group-hover:scale-110 transition-transform">
                       <BookOpen className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="text-lg font-bold text-lightyellow-100">Study Schedule Template</h4>
                       <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">PDF Planner</span>
                     </div>
                   </div>
                   <p className="text-xs text-lightyellow-200/70 mb-6">
                     A customizable weekly study planner focusing on time management, subject allocation, and revision cycles for competitive exams.
                   </p>
                   <button 
                     className="w-full flex items-center justify-center gap-2 bg-navy-900 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all"
                   >
                     <Download className="w-4 h-4" /> Download PDF
                   </button>
                 </div>

                 {/* Physical Fitness Plan */}
                 <div className="bg-navy-950 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/60 transition group cursor-pointer" onClick={handleDownloadFitnessPlan}>
                   <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 bg-gold-500/10 rounded-xl text-gold-400 group-hover:scale-110 transition-transform">
                       <Target className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="text-lg font-bold text-lightyellow-100">Physical Fitness Plan</h4>
                       <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">PDF Guide</span>
                     </div>
                   </div>
                   <p className="text-xs text-lightyellow-200/70 mb-6">
                     A tactical fitness routine tailored for Defence and Police services, covering endurance, strength training, and dietary guidelines.
                   </p>
                   <button 
                     className="w-full flex items-center justify-center gap-2 bg-navy-900 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all"
                   >
                     <Download className="w-4 h-4" /> Download PDF
                   </button>
                 </div>
               </div>
             </div>
          </div>
        </>`;

code = code.replace(anchor, newSection);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
