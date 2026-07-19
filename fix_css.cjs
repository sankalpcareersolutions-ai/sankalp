const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Replace the buggy \n with actual newlines
css = css.replace(/\\n/g, '\n');

fs.writeFileSync('src/index.css', css);
