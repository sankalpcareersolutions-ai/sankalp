const fs = require('fs');
let code = fs.readFileSync('src/components/SEODashboard.tsx', 'utf-8');

// Replace 12,450 with appointments.length
code = code.replace(/12,450/, '{appointments.length}');
code = code.replace(/Organic Traffic/, 'Total Leads');
code = code.replace(/Visitors this month/, 'Appointments Booked');

fs.writeFileSync('src/components/SEODashboard.tsx', code);
