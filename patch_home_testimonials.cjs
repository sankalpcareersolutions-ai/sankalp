const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

// We need to add the import for testimonials if it doesn't exist
if (!content.includes('import { testimonials }')) {
  content = content.replace(
    "import React from 'react';",
    "import React from 'react';\nimport { testimonials } from '../data/testimonials';"
  );
}

// Replace the testimonials section
const testSectionStart = content.indexOf('{/* Testimonials */}');
const testSectionEnd = content.indexOf('</section>', testSectionStart) + '</section>'.length;

const newTestSection = `{/* Testimonials */}
      <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[38px] font-poppins font-extrabold text-primary mb-4">50+ Student Success Stories</h2>
            <p className="text-[18px] text-text-muted max-w-3xl mx-auto">Discover how our expert counselling has helped students crack various entrance exams and achieve their dream careers.</p>
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
      </section>`;

content = content.substring(0, testSectionStart) + newTestSection + content.substring(testSectionEnd);

fs.writeFileSync('src/components/Home.tsx', content);
