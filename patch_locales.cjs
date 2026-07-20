const fs = require('fs');
let en = fs.readFileSync('src/locales/en.ts', 'utf-8');
let hi = fs.readFileSync('src/locales/hi.ts', 'utf-8');

en = en.replace(/nav_testimonials: ".*?",/, 'nav_testimonials: "Reviews & Feedback",');
hi = hi.replace(/nav_testimonials: ".*?",/, 'nav_testimonials: "समीक्षा और प्रतिक्रिया",');

fs.writeFileSync('src/locales/en.ts', en);
fs.writeFileSync('src/locales/hi.ts', hi);
