const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');

code = code.replace(/<SEODashboard \/>/, '<SEODashboard appointments={appointments} />');

fs.writeFileSync('src/components/AdminPanel.tsx', code);
