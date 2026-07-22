const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');

code = code.replace(/\{appt\.phone\}/g, "{appt.mobileNumber || appt.phone}");

fs.writeFileSync('src/components/AdminPanel.tsx', code);
