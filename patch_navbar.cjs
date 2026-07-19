const fs = require('fs');

let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// Mobile active state
code = code.replace(/bg-gray-100 text-gray-800 border border-gray-200/g, 'bg-white/10 text-primary border border-primary/30');
// Mobile inactive state
code = code.replace(/hover:bg-gray-100\/50 text-gray-600/g, 'hover:bg-white/5 text-white/70');

// Desktop active state
code = code.replace(/bg-gray-100 text-primary shadow-md border-2 border-gray-200/g, 'bg-white/10 text-primary shadow-md border border-primary/30');
// Desktop inactive state
code = code.replace(/hover:bg-gray-100\/60 text-gray-600 hover:text-primary/g, 'hover:bg-white/5 text-white/70 hover:text-primary');

// Search bar
code = code.replace(/bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-secondary/g, 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:ring-primary focus:border-primary');
code = code.replace(/text-gray-400/g, 'text-white/40');

// Mobile menu background
code = code.replace(/bg-white border-t border-gray-100 shadow-lg/g, 'bg-[#0B1F3A] border-t border-white/10 shadow-lg');

// Header background
code = code.replace(/bg-white\/90 backdrop-blur-md/g, 'bg-[#0B1F3A]/90 backdrop-blur-md border-b border-white/10');

// Icons
code = code.replace(/text-secondary/g, 'text-primary');

fs.writeFileSync('src/components/Navbar.tsx', code);
