const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

code = code.replace(
  /w-full bg-gray-100 text-gray-600 border border-gray-200 rounded-lg pl-9 pr-3 py-1\.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold-450 focus:border-transparent placeholder-gray-400 cursor-text/g,
  'w-full bg-white/10 text-white border border-primary/20 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-white/50 cursor-text'
);

code = code.replace(
  /text-gray-600 hover:text-gray-800 cursor-pointer/g,
  'text-white/70 hover:text-white cursor-pointer'
);

fs.writeFileSync('src/components/Navbar.tsx', code);
