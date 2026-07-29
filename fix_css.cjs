const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf-8');

const themeAddition = `
  --color-gold-300: #F3E5AB;
  --color-gold-400: #D4AF37;
  --color-gold-450: #CBA228;
  --color-gold-500: #B8860B;
  --color-navy-800: #132D52;
  --color-navy-900: #0B1F3A;
  --color-navy-950: #051024;
  --color-lightyellow-100: #FFF9E6;
  --color-lightyellow-200: #FFF3C4;
`;

code = code.replace(/@theme \{/, '@theme {' + themeAddition);

fs.writeFileSync('src/index.css', code);
