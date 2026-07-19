const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// The nav element
content = content.replace(
  /className=\{`sticky top-0 z-50 transition-all duration-300 \$\{isScrolled \? "bg-white\/95 backdrop-blur-md shadow-md border-b border-gray-100 py-0" : "bg-white\/50 backdrop-blur-sm py-2"}`\}/g,
  'className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-white/20 py-0" : "bg-transparent py-2"}`}'
);

// We need to make sure the text color is white when NOT scrolled and primary when scrolled?
// The logo text is `text-primary`. That's hard to read on a blue background if not scrolled.
// Let's change the logo text to be dynamic based on scroll, OR we just use a white glass-effect for the navbar always.
// Actually, `bg-white/20 backdrop-blur-md` always might look better. Let's do that!

content = content.replace(
  /className=\{`sticky top-0 z-50 transition-all duration-300 \$\{isScrolled \? "bg-white\/95 backdrop-blur-md shadow-md border-b border-white\/20 py-0" : "bg-transparent py-2"}`\}/g,
  'className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-white/50 py-0 text-primary" : "bg-white/10 backdrop-blur-md border-b border-white/20 py-2 text-white"}`}'
);

fs.writeFileSync('src/components/Navbar.tsx', content);
