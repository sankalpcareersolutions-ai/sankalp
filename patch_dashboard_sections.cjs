const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// Replace glass-card on Preparation Diagnostics
code = code.replace(
  /<div className="glass-card p-6 shadow-sm space-y-5">/g,
  '<div className="bg-[#0B1F3A] rounded-2xl p-6 shadow-sm border border-primary/30 space-y-5 text-primary">'
);

// We also need to change text color inside Preparation Diagnostics
// text-stone-100 -> text-primary
code = code.replace(/text-stone-100/g, 'text-primary');
code = code.replace(/text-stone-200/g, 'text-primary');

// Replace bg-emerald-950 on Daily Security Quiz
code = code.replace(
  /bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-800\/30/g,
  'bg-[#0B1F3A] text-[#D4AF37] rounded-2xl p-6 border border-[#D4AF37]/30'
);

// Increase font sizes in Cadet Hub
code = code.replace(/text-\[10px\]/g, 'text-xs');
code = code.replace(/text-\[10\.5px\]/g, 'text-xs');
code = code.replace(/text-\[9px\]/g, 'text-[10px]');
code = code.replace(/text-xs/g, 'text-sm');
code = code.replace(/text-sm md:text-base/g, 'text-base md:text-lg');
code = code.replace(/text-xs font-bold text-primary/g, 'text-base font-bold text-primary');

fs.writeFileSync('src/components/Dashboard.tsx', code);
