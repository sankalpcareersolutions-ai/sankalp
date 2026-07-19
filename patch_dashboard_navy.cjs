const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// Replace all glass-card with a navy blue styled card
code = code.replace(/className="glass-card p-6 shadow-sm/g, 'className="bg-[#0B1F3A] border border-primary/30 rounded-2xl p-6 shadow-sm');
code = code.replace(/text-stone-800/g, 'text-primary'); // Gold
code = code.replace(/text-stone-700/g, 'text-white');
code = code.replace(/text-stone-600/g, 'text-white/80');
code = code.replace(/text-stone-500/g, 'text-white/70');

fs.writeFileSync('src/components/Dashboard.tsx', code);
