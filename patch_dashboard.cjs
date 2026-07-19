const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

code = code.replace(/text-stone-900/g, 'text-primary');
code = code.replace(/text-stone-800/g, 'text-primary');
code = code.replace(/text-stone-700/g, 'text-[#F3E5AB]'); // Lighter gold
code = code.replace(/text-stone-600/g, 'text-[#E5C158]');
code = code.replace(/text-stone-500/g, 'text-[#F3E5AB]');
code = code.replace(/text-stone-400/g, 'text-[#F3E5AB]/70');
code = code.replace(/text-stone-300/g, 'text-[#F3E5AB]/50');

code = code.replace(/text-emerald-900/g, 'text-primary');
code = code.replace(/text-emerald-800/g, 'text-primary');
code = code.replace(/text-emerald-700/g, 'text-primary');
code = code.replace(/text-emerald-600/g, 'text-[#F3E5AB]');

fs.writeFileSync('src/components/Dashboard.tsx', code);
