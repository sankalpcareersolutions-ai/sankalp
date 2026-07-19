const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// Language switcher
code = code.replace(/bg-gray-100 border border-gray-200 rounded-lg p-0\.5/g, 'bg-white/10 border border-primary/20 rounded-lg p-0.5');
code = code.replace(/text-gray-600 hover:text-primary/g, 'text-white/70 hover:text-primary');

// Mobile Menu container
code = code.replace(/border-t border-gray-200 bg-gray-100/g, 'border-t border-primary/20 bg-[#0B1F3A]');

// Mobile Search bar
code = code.replace(/bg-white border border-gray-200/g, 'bg-white/10 border border-primary/20');
code = code.replace(/text-gray-600 focus:outline-none focus:ring-1 focus:ring-gold-400/g, 'text-white focus:outline-none focus:ring-1 focus:ring-primary placeholder-white/50');

// Dropdown (More menu)
// Look for bg-white border border-gray-100 shadow-xl
code = code.replace(/bg-white border border-gray-100 shadow-xl/g, 'bg-[#0B1F3A] border border-primary/20 shadow-xl');
code = code.replace(/hover:bg-gray-50 text-gray-700/g, 'hover:bg-white/10 text-white');

fs.writeFileSync('src/components/Navbar.tsx', code);
