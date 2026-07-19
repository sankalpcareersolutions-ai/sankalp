const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

code = code.replace(/text-\[\#D4AF37\]enter/g, 'text-center');

fs.writeFileSync('src/components/Dashboard.tsx', code);
