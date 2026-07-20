const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

code = code.replace(
  /<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">/,
  '<div className="w-full mx-auto px-2 sm:px-4 lg:px-8">'
);

// also let's make the nav items flex-1 instead of lg:flex-none to allow more space, or maybe just flex-1 is good.
// "hidden md:flex items-center gap-1.5 flex-wrap justify-end flex-1 lg:flex-none"
code = code.replace(
  /hidden md:flex items-center gap-1.5 flex-wrap justify-end flex-1 lg:flex-none/,
  'hidden xl:flex items-center gap-1.5 flex-wrap justify-center flex-1 mx-4' // changed to xl:flex so it collapses to burger earlier
);
code = code.replace(
  /hidden md:flex items-center gap-1.5 flex-wrap justify-end flex-1 lg:flex-none/,
  'hidden xl:flex items-center gap-1.5 flex-wrap justify-center flex-1 mx-4' 
); // fallback if it was changed
// wait, the previous code was `hidden md:flex ...`
// actually maybe `hidden lg:flex` because we want it on desktop but maybe not overlapping.
// Let's just do w-full and keep it `hidden lg:flex ... justify-end flex-1`
code = code.replace(
  /hidden md:flex items-center gap-1\.5 flex-wrap justify-end flex-1 lg:flex-none/,
  'hidden lg:flex items-center gap-1.5 flex-nowrap justify-end flex-1 mx-2'
);
fs.writeFileSync('src/components/Navbar.tsx', code);
