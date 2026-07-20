const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

// Remove the detailed career view image hero
code = code.replace(
  /<div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 relative border border-gold-500\/20 shadow-\[0_0_20px_rgba\(212,175,55,0\.15\)\] group">[\s\S]*?\\n\s*<div className="flex items-start gap-4 mb-8 border-b border-gold-500\/20 pb-6">/,
  '<div className="flex items-start gap-4 mb-8 border-b border-gold-500/20 pb-6">'
);

// Remove the getCareerImage function
code = code.replace(
  /\s*const getCareerImage = \(category: string\) => \{[\s\S]*?\}\;\n/,
  ''
);

// Revert the grid cards
const originalCardRegex = /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">[\s\S]*?(?=\{\s*filteredCareers\.length === 0)/;

const newCardCode = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCareers.map((career) => (
              <div 
                key={career.id} 
                className="bg-navy-900 border border-gold-600/20 rounded-2xl p-6 hover:border-gold-500/60 transition shadow-lg group cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedCareer(career.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-navy-950 rounded-xl border border-gold-500/20 group-hover:scale-110 transition-transform">
                    {career.icon}
                  </div>
                  <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider bg-navy-950 px-2 py-1 rounded border border-gold-500/20 font-semibold">
                    {career.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-lightyellow-100 tracking-tight leading-tight mb-2">
                  {career.title}
                </h3>
                <p className="text-xs text-lightyellow-200/70 mb-4 flex-grow">
                  {career.shortDesc}
                </p>
                <div className="mt-auto space-y-2 border-t border-gold-500/10 pt-4">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-lightyellow-200/50">Qualification:</span>
                    <span className="text-gold-400 font-bold text-right">{career.qualification}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-lightyellow-200/50">Stream:</span>
                    <span className="text-lightyellow-100 font-bold text-right">{career.stream}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          `;

code = code.replace(originalCardRegex, newCardCode);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
