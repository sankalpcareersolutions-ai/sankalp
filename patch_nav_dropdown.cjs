const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// The dropdown container background might have been matched differently because it was "bg-white/10" wait...
code = code.replace(
  /bg-white\/10 border border-primary\/20 rounded-lg shadow-xl py-2 z-50 animate-fade-in flex flex-col/g,
  'bg-[#0B1F3A] border border-primary/20 rounded-lg shadow-xl py-2 z-50 animate-fade-in flex flex-col'
);

code = code.replace(
  /bg-gray-100 text-primary font-semibold border-l-2 border-gray-200/g,
  'bg-white/10 text-primary font-semibold border-l-2 border-primary'
);
code = code.replace(
  /text-gray-600 hover:bg-gray-100\/50 hover:text-primary border-l-2 border-transparent/g,
  'text-white/70 hover:bg-white/10 hover:text-primary border-l-2 border-transparent'
);

fs.writeFileSync('src/components/Navbar.tsx', code);
