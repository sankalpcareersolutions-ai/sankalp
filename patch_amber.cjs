const fs = require('fs');
let code = fs.readFileSync('src/components/SovereignExams.tsx', 'utf-8');
code = code.replace(/bg-amber-600 text-white/g, 'bg-primary text-[#0B1F3A]');
fs.writeFileSync('src/components/SovereignExams.tsx', code);
