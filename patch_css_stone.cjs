const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

const additions = `
  /* Stone scale invert */
  .text-stone-900 { color: #FFFFFF !important; }
  .text-stone-800 { color: #F8FAFC !important; }
  .text-stone-700 { color: #F1F5F9 !important; }
  .text-stone-600 { color: #E2E8F0 !important; }
  .text-stone-500 { color: #CBD5E1 !important; }
  .text-stone-400 { color: #94A3B8 !important; }
  .text-stone-300 { color: #475569 !important; }

  /* Emerald -> Gold/White for visibility */
  .text-emerald-900 { color: #F3E5AB !important; }
  .text-emerald-800 { color: #D4AF37 !important; }
  .text-emerald-700 { color: #D4AF37 !important; }
  .text-emerald-600 { color: #D4AF37 !important; }
  
  /* Background overrides for Stone */
  .bg-stone-50 { background-color: rgba(255, 255, 255, 0.03) !important; }
  .bg-stone-100 { background-color: rgba(255, 255, 255, 0.06) !important; }
  .bg-stone-200 { background-color: rgba(255, 255, 255, 0.1) !important; }
  
  .border-stone-100 { border-color: rgba(212, 175, 55, 0.1) !important; }
  .border-stone-200 { border-color: rgba(212, 175, 55, 0.25) !important; }
  .border-stone-300 { border-color: rgba(212, 175, 55, 0.4) !important; }
`;

css = css.replace('.text-slate-500 { color: #CBD5E1 !important; }', '.text-slate-500 { color: #CBD5E1 !important; }\n' + additions);

fs.writeFileSync('src/index.css', css);
