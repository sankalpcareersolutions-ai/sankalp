const fs = require('fs');
let code = fs.readFileSync('src/components/Courses.tsx', 'utf-8');

code = code.replace(/\{isEnrolled \? \([\s\S]*?\) : \([\s\S]*?\)\}/g, '');

fs.writeFileSync('src/components/Courses.tsx', code);
