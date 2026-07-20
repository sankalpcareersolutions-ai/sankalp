const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

code = code.replace(
  /text-\[13px\] sm:text-lg md:text-xl xl:text-2xl/g,
  'text-[13px] sm:text-[15px] lg:text-base xl:text-lg'
);
code = code.replace(
  /gap-2 sm:gap-4 cursor-pointer/g,
  'gap-2 cursor-pointer flex-shrink-0'
);

// We should also make sure the search hook has min-width or doesn't push the nav items.
// We moved the search bar next to the language switcher earlier.
// Wait, is "Overview" overlapping? Let's check the container.
fs.writeFileSync('src/components/Navbar.tsx', code);
