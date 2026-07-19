const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

// Center hero text on mobile, left on desktop
content = content.replace(
  '<div className="flex-1 space-y-8">',
  '<div className="flex-1 space-y-8 text-center lg:text-left">'
);

// Center buttons in hero on mobile
content = content.replace(
  '<div className="flex flex-col sm:flex-row gap-4">',
  '<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">'
);

// Center badges in hero on mobile
content = content.replace(
  '<div className="flex flex-wrap gap-4 pt-4">',
  '<div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">'
);

fs.writeFileSync('src/components/Home.tsx', content);
