const fs = require('fs');
let content = fs.readFileSync('src/data/hindiRoadmaps.ts', 'utf-8');

content = content.replace(
  /category: "स्कूल प्रवेश \(School Entrances\)"/g,
  'category: "स्कूल प्रवेश (School Entrances - Class 5th-9th)"'
);

fs.writeFileSync('src/data/hindiRoadmaps.ts', content);
