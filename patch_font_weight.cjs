const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.match(/\.(tsx|jsx|ts|js)$/)) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // We want to add font-semibold to text-lightyellow-200 and text-gold-400
  // First for className="..."
  content = content.replace(/className=(["'])(.*?)(["'])/g, (match, p1, p2, p3) => {
    let classes = p2.split(/\s+/);
    if (classes.includes('text-lightyellow-200') || classes.includes('text-gold-400')) {
      if (!classes.includes('font-bold') && !classes.includes('font-semibold') && !classes.includes('font-extrabold') && !classes.includes('font-black')) {
        classes.push('font-semibold');
      }
    }
    return `className=${p1}${classes.join(' ')}${p3}`;
  });

  // Then for className={`...`}
  content = content.replace(/className=\{`([\s\S]*?)`\}/g, (match, p1) => {
    let modified = p1;
    if ((modified.includes('text-lightyellow-200') || modified.includes('text-gold-400')) && 
        !modified.includes('font-bold') && !modified.includes('font-semibold') && !modified.includes('font-extrabold') && !modified.includes('font-black')) {
       // Just append font-semibold before the closing backtick
       modified += ' font-semibold';
    }
    return `className={\`${modified}\`}`;
  });
  
  // Try one more catch-all for any text-gold-400 or text-lightyellow-200 that wasn't caught
  // Just inject font-semibold after it if it exists and doesn't already have a font weight.
  // Actually, the above should cover almost all cases in React components since we use standard formats.

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Patched', file);
  }
});
console.log('Done');
