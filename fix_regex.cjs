const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

code = code.replace(/text-\[#c5a059\]/g, 'text-[#D4AF37]');
code = code.replace(/fill-\[#c5a059\]\/20/g, 'fill-primary/20');
code = code.replace(/bg-\[#c5a059\]/g, 'bg-primary');
code = code.replace(/border-\[#c5a059\]/g, 'border-primary');

// Let's also ensure the daily trivia question text is white or yellow
code = code.replace(/text-white/g, 'text-[#FFFFFF]');

fs.writeFileSync('src/components/Dashboard.tsx', code);
