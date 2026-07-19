const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

content = content.replace(
  '<div className="flex-1 relative z-10">',
  '<div className="flex-1 relative z-10 text-center md:text-left flex flex-col items-center md:items-start">'
);

fs.writeFileSync('src/components/Home.tsx', content);
