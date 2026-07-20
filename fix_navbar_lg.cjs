const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

code = code.replace(
  /hidden xl:flex items-center gap-1.5 flex-nowrap justify-end flex-none mx-2/g,
  'hidden lg:flex items-center gap-1.5 flex-nowrap justify-end flex-none mx-2'
);
// Also for the dropdown arrow and icons, restore lg visibility
code = code.replace(
  /<Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary font-bold hidden xl:block" \/>/g,
  '<Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary font-bold hidden lg:block" />'
);
code = code.replace(
  /<MoreHorizontal className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary font-bold hidden xl:block" \/>/g,
  '<MoreHorizontal className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary font-bold hidden lg:block" />'
);

fs.writeFileSync('src/components/Navbar.tsx', code);
