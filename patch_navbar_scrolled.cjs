const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// The main nav bar background string:
// ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-white/50 py-0 text-primary" : "bg-white/10 backdrop-blur-md border-b border-white/20 py-2 text-white"}

code = code.replace(
  /"bg-white\/95 backdrop-blur-md shadow-md border-b border-white\/50 py-0 text-primary"/g,
  '"bg-[#0B1F3A]/95 backdrop-blur-md shadow-md border-b border-primary/20 py-0 text-white"'
);

// We also have "bg-[#0B1F3A]/90 backdrop-blur-md border-b border-white/10" which we applied in a previous patch? Let's check what's actually there.

fs.writeFileSync('src/components/Navbar.tsx', code);
