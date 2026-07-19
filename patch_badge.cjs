const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

code = code.replace(/bg-amber-600 text-\[9px\] font-black text-primary/g, 'bg-primary text-[9px] font-black text-[#0B1F3A]');
code = code.replace(/bg-amber-600 text-\[9px\] font-bold text-primary/g, 'bg-primary text-[9px] font-bold text-[#0B1F3A]');

fs.writeFileSync('src/components/Navbar.tsx', code);
