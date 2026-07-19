const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

code = code.replace(/text-stone-200/g, 'text-white');
code = code.replace(/text-stone-100/g, 'text-white');
code = code.replace(/text-stone-605/g, 'text-[#E5C158]');
code = code.replace(/text-emerald-850/g, 'text-primary');

// Let's also check background colors to ensure contrast
code = code.replace(/bg-stone-50/g, 'bg-white/5');
code = code.replace(/bg-stone-100/g, 'bg-white/10');
code = code.replace(/bg-emerald-50/g, 'bg-primary/10');
code = code.replace(/bg-emerald-100/g, 'bg-primary/20');
code = code.replace(/bg-emerald-800/g, 'bg-primary/20 border border-primary/30');
code = code.replace(/bg-emerald-105/g, 'bg-primary/10 border border-primary/20');

// Replace any bg-white that is supposed to be the card background with glass-card if it's not already
// But Dashboard uses 'bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm'
code = code.replace(/bg-white rounded-2xl border border-stone-200\/80/g, 'glass-card');
code = code.replace(/bg-white rounded-2xl border border-stone-100/g, 'glass-card');

fs.writeFileSync('src/components/Dashboard.tsx', code);
