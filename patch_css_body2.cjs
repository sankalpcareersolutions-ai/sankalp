const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

css = css.replace(
  /body\s*\{\s*background-color:\s*var\(--color-bg-main\);/,
  'body {\n  background-color: var(--color-bg-main);\n  background-image: radial-gradient(circle at 100% 0%, rgba(11, 60, 111, 0.05) 0%, transparent 25%), radial-gradient(circle at 0% 100%, rgba(244, 180, 0, 0.05) 0%, transparent 25%);\n  background-attachment: fixed;'
);

css = css.replace(
  /\.glass-card\s*\{/,
  '.glass-card {\n  transition: all 0.3s ease;\n  border-radius: 16px;\n  border: 1px solid rgba(11, 60, 111, 0.05);\n  box-shadow: 0 10px 30px -10px rgba(11, 60, 111, 0.05);'
);

fs.writeFileSync('src/index.css', css);
