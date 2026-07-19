const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// The "Next Question" button
code = code.replace(/bg-primary hover:bg-\[\#b08b47\] text-primary/g, 'bg-primary hover:bg-[#b08b47] text-[#0B1F3A]');
code = code.replace(/bg-\[\#c5a059\] hover:bg-\[\#b08b47\] text-primary/g, 'bg-primary hover:bg-[#b08b47] text-[#0B1F3A]');

fs.writeFileSync('src/components/Dashboard.tsx', code);
