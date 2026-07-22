const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

code = code.replace(/\{appt\.phone\}/g, "{appt.mobileNumber || appt.phone}");

fs.writeFileSync('src/components/Dashboard.tsx', code);
