const fs = require('fs');
let code = fs.readFileSync('src/components/AboutAndAppointment.tsx', 'utf-8');

// I will just remove the duplicated block starting at line 96 up to 105.
const lines = code.split('\n');
const fixedLines = lines.filter((_, idx) => !(idx >= 95 && idx <= 104));
code = fixedLines.join('\n');

fs.writeFileSync('src/components/AboutAndAppointment.tsx', code);
