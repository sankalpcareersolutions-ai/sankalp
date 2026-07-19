const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

code = code.replace(/text-navy-950/g, 'text-[#0B1F3A]');
code = code.replace(/bg-secondary/g, 'bg-primary');

fs.writeFileSync('src/components/Navbar.tsx', code);
