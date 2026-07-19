const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/<li className="flex items-center gap-2">\s*<\/li>/g, '');
fs.writeFileSync('src/App.tsx', content);
