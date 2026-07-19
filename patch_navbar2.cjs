const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// Replace navy-* and lightyellow-* classes with light theme equivalents
content = content.replace(/bg-navy-950/g, 'bg-gray-100');
content = content.replace(/bg-navy-900/g, 'bg-white');
content = content.replace(/bg-navy-800/g, 'bg-gray-100');
content = content.replace(/text-lightyellow-100/g, 'text-gray-600');
content = content.replace(/text-lightyellow-101/g, 'text-gray-600');
content = content.replace(/text-lightyellow-200/g, 'text-gray-800');
content = content.replace(/text-white/g, 'text-primary');
content = content.replace(/hover:text-white/g, 'hover:text-primary');
content = content.replace(/border-gold-[0-9]+\/[0-9]+/g, 'border-gray-200');
content = content.replace(/border-gold-[0-9]+/g, 'border-gray-200');
content = content.replace(/text-gold-400/g, 'text-secondary');
content = content.replace(/text-gold-450/g, 'text-secondary');
content = content.replace(/bg-gold-500/g, 'bg-secondary');
content = content.replace(/placeholder-navy-300/g, 'placeholder-gray-400');

// Fix specific active state for desktop nav items
content = content.replace(
  'isActive\\n                      ? "bg-gray-100 text-primary shadow-md border-2 border-gray-200"\\n                      : "hover:bg-gray-100/60 text-gray-600 hover:text-primary"',
  'isActive ? "bg-primary/5 text-primary shadow-sm border border-primary/20" : "hover:bg-gray-50 text-gray-600 hover:text-primary"'
);

// Fix dropdown menu
content = content.replace(
  'dropdownOpen ? "bg-gray-100/60 text-primary" : ""',
  'dropdownOpen ? "bg-gray-50 text-primary" : ""'
);

// Dropdown item active state
content = content.replace(
  'isActive\\n                            ? "bg-gray-100 text-secondary font-semibold border-l-2 border-gray-200"\\n                            : "text-gray-600 hover:bg-gray-100/50 hover:text-primary border-l-2 border-transparent"',
  'isActive ? "bg-primary/5 text-primary font-semibold border-l-2 border-primary" : "text-gray-600 hover:bg-gray-50 hover:text-primary border-l-2 border-transparent"'
);

// Language toggle buttons
content = content.replace(
  /language === 'en' \? 'bg-secondary text-gray-100' : 'text-gray-600 hover:text-primary'/g,
  "language === 'en' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary hover:bg-gray-200'"
);

content = content.replace(
  /language === 'hi' \? 'bg-secondary text-gray-100' : 'text-gray-600 hover:text-primary'/g,
  "language === 'hi' ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary hover:bg-gray-200'"
);

fs.writeFileSync('src/components/Navbar.tsx', content);
console.log('Patched Navbar styles');
