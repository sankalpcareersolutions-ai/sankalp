const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// Change language switcher to vertical
code = code.replace(
  /<div className="flex items-center bg-white\/10 border border-primary\/20 rounded-lg p-0.5">/,
  '<div className="flex flex-col bg-white/10 border border-primary/20 rounded-lg p-0.5">'
);

// Reduce font size of brand on mobile to prevent overlap
code = code.replace(
  /text-base sm:text-lg md:text-xl xl:text-2xl/g,
  'text-[13px] sm:text-lg md:text-xl xl:text-2xl'
);
code = code.replace(
  /gap-4 cursor-pointer/g,
  'gap-2 sm:gap-4 cursor-pointer'
);
code = code.replace(
  /w-12 h-12 object-contain rounded-xl border-2/g,
  'w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-xl border-2'
);

fs.writeFileSync('src/components/Navbar.tsx', code);
