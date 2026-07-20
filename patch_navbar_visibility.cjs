const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

code = code.replace(/hidden xl:flex items-center gap-1.5 flex-wrap justify-center flex-1 mx-4/g, 'hidden lg:flex items-center gap-1.5 flex-nowrap justify-end flex-1 mx-2');
code = code.replace(/<div className="md:hidden flex items-center">/g, '<div className="lg:hidden flex items-center">');
code = code.replace(/<div className="md:hidden border-t border-primary\/20/g, '<div className="lg:hidden border-t border-primary/20');
code = code.replace(/<Icon className="w-3\.5 h-3\.5 lg:w-4 lg:h-4 text-primary font-bold hidden xl:block" \/>/g, '<Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary font-bold hidden lg:block" />');
code = code.replace(/<MoreHorizontal className="w-3\.5 h-3\.5 lg:w-4 lg:h-4 text-primary font-bold hidden xl:block" \/>/g, '<MoreHorizontal className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary font-bold hidden lg:block" />');

// reduce nav item font sizes if overlapping
code = code.replace(
  /className={\`px-2 lg:px-3 py-1.5 rounded-lg text-\[11px\] lg:text-\[13px\]/g,
  'className={`px-1.5 lg:px-2 py-1.5 rounded-lg text-[11px] lg:text-xs'
);

// We need to check if search overlaps. The search was:
// <div className="hidden lg:flex items-center relative max-w-[200px] flex-none mr-4">
// This is fine.

fs.writeFileSync('src/components/Navbar.tsx', code);
