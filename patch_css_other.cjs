const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

const additions2 = `
  /* Zinc scale invert */
  .text-zinc-900 { color: #FFFFFF !important; }
  .text-zinc-800 { color: #F8FAFC !important; }
  .text-zinc-700 { color: #F1F5F9 !important; }
  .text-zinc-600 { color: #E2E8F0 !important; }
  .text-zinc-500 { color: #CBD5E1 !important; }

  /* Neutral scale invert */
  .text-neutral-900 { color: #FFFFFF !important; }
  .text-neutral-800 { color: #F8FAFC !important; }
  .text-neutral-700 { color: #F1F5F9 !important; }
  .text-neutral-600 { color: #E2E8F0 !important; }
  .text-neutral-500 { color: #CBD5E1 !important; }

  /* Amber -> Gold/White for visibility */
  .text-amber-900 { color: #F3E5AB !important; }
  .text-amber-800 { color: #D4AF37 !important; }
  .text-amber-700 { color: #D4AF37 !important; }
  .text-amber-600 { color: #D4AF37 !important; }
  
  .bg-amber-50 { background-color: rgba(255, 255, 255, 0.03) !important; }
`;

css = css.replace('.text-slate-500 { color: #CBD5E1 !important; }', '.text-slate-500 { color: #CBD5E1 !important; }\n' + additions2);

fs.writeFileSync('src/index.css', css);
