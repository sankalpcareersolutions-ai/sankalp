const fs = require('fs');
let code = fs.readFileSync('src/components/SEODashboard.tsx', 'utf-8');

code = code.replace(/height: \\\`/g, "height: `");
code = code.replace(/%\\\`/g, "%`");
code = code.replace(/className=\{\\\`/g, "className={`");

fs.writeFileSync('src/components/SEODashboard.tsx', code);
