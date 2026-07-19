const fs = require('fs');
let content = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

content = content.replace(
  'category: \'School Entrances\'',
  'category: \'School Entrances\''
);

content = content.replace(
  'const categories = ["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services", "School Entrances"];',
  'const categories = ["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services", "School Entrances (Class 5th-9th)"];'
);

content = content.replace(
  /category: 'School Entrances'/g,
  "category: 'School Entrances (Class 5th-9th)'"
);

fs.writeFileSync('src/components/CareerLibrary.tsx', content);
