const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  /<button\s*onClick=\{\(\) => setCurrentTab\("admin"\)\}\s*className="text-white\/40 hover:text-white font-mono tracking-widest uppercase transition-colors mr-4"\s*>\s*Admin Access\s*<\/button>/,
  \`<button 
              onClick={() => setCurrentTab("admin")}
              className="text-white/40 hover:text-white font-mono tracking-widest uppercase transition-colors mr-4"
            >
              Admin Access
            </button>
            <button 
              onClick={() => setCurrentTab("admin")}
              className="text-gold-400/60 hover:text-gold-400 font-mono tracking-widest uppercase transition-colors mr-4 flex items-center gap-1"
            >
              SEO Engine
            </button>\`
);

fs.writeFileSync('src/App.tsx', code);
