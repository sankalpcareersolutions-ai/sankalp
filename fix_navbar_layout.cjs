const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// The main flex container is: <div className="flex items-center justify-between h-16">
code = code.replace(
  /<div className="flex items-center justify-between h-16">/,
  '<div className="flex items-center justify-between h-16 gap-4">'
);

// Add mr-auto to logo to force it to the left
code = code.replace(
  /onClick={\(\) => handleNavClick\("home"\)}/,
  'onClick={() => handleNavClick("home")} style={{ marginRight: "auto" }}'
);

// We should also make sure the desktop nav items don't take `flex-1` so they stick to the right
code = code.replace(
  /hidden lg:flex items-center gap-1.5 flex-nowrap justify-end flex-1 mx-2/,
  'hidden xl:flex items-center gap-1.5 flex-nowrap justify-end flex-none mx-2' // use xl:flex to prevent overlap on smaller desktop screens
);

// Also remove `flex-1` from search if it has it, it has `flex-none` already.

fs.writeFileSync('src/components/Navbar.tsx', code);
