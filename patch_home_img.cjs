const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

// Add import if not present
if (!content.includes('import girlStudentsImg from')) {
  content = content.replace(
    "import React from 'react';",
    "import React from 'react';\nimport girlStudentsImg from '../assets/images/girl_students_1_1784450559085.jpg';"
  );
}

// Replace image source
content = content.replace(
  '<img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"',
  '<img src={girlStudentsImg} referrerPolicy="no-referrer"'
);

fs.writeFileSync('src/components/Home.tsx', content);
