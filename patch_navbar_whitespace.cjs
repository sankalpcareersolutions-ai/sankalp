const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

content = content.replace(
  'className="text-primary font-poppins font-bold text-lg md:text-2xl tracking-tight leading-none"',
  'className="text-primary font-poppins font-bold text-base sm:text-lg md:text-xl xl:text-2xl tracking-tight leading-none whitespace-nowrap"'
);

// also hide subtitle on very small screens to avoid overflow
content = content.replace(
  'className="text-[11px] font-sans font-medium text-secondary uppercase tracking-widest mt-1"',
  'className="text-[9px] sm:text-[10px] md:text-[11px] font-sans font-medium text-secondary uppercase tracking-widest mt-1 hidden sm:block whitespace-nowrap"'
);

fs.writeFileSync('src/components/Navbar.tsx', content);
