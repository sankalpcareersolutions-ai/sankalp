const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

const originalCardRegex = /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">[\s\S]*?(?=\{\s*filteredCareers\.length === 0)/;

const newCardCode = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCareers.map((career) => (
              <div 
                key={career.id} 
                className="bg-navy-900 border border-gold-600/20 rounded-2xl overflow-hidden hover:border-gold-500/60 transition shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.15)] group cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedCareer(career.id)}
              >
                <div className="h-36 w-full relative overflow-hidden border-b border-gold-500/20">
                  <img 
                    src={getCareerImage(career.category)} 
                    alt={career.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                     <div className="p-1.5 bg-navy-950/80 backdrop-blur rounded-lg border border-gold-500/30 text-gold-400">
                       {career.icon}
                     </div>
                     <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest bg-navy-950/80 backdrop-blur px-2 py-1 rounded border border-gold-500/30 font-bold shadow-sm">
                        {career.category}
                     </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col h-full">
                  <h3 className="text-lg font-black text-lightyellow-100 tracking-tight leading-tight mb-2 group-hover:text-gold-400 transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-xs text-lightyellow-200/70 mb-4 flex-grow leading-relaxed">
                    {career.shortDesc}
                  </p>
                  <div className="mt-auto space-y-2.5 border-t border-gold-500/10 pt-4">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-lightyellow-200/50 uppercase tracking-wider font-semibold">Qualification</span>
                      <span className="text-gold-400 font-bold text-right bg-gold-500/10 px-2 py-0.5 rounded">{career.qualification}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-lightyellow-200/50 uppercase tracking-wider font-semibold">Stream</span>
                      <span className="text-lightyellow-100 font-bold text-right">{career.stream}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          `;

code = code.replace(originalCardRegex, newCardCode);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
