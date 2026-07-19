const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// The Daily Security Quiz section
code = code.replace(/text-white/g, 'text-primary');
code = code.replace(/text-\[#F3E5AB\]\/50/g, 'text-primary/70');
code = code.replace(/text-\[#F3E5AB\]\/70/g, 'text-primary/70');
code = code.replace(/text-\[#F3E5AB\]/g, 'text-primary');

// Revert button text colors back to dark if they have a gold background
code = code.replace(/bg-primary\/20 border border-primary\/30 text-primary/g, 'bg-primary/20 border border-primary/30 text-[#F3E5AB]');

fs.writeFileSync('src/components/Dashboard.tsx', code);
