const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

// The main h1
content = content.replace(
  /font-poppins font-extrabold leading-tight text-primary/g,
  'font-poppins font-extrabold leading-tight text-white drop-shadow-sm'
);

// The sub-headings that are directly on the background
content = content.replace(
  /font-poppins font-extrabold text-primary mb-4/g,
  'font-poppins font-extrabold text-white mb-4 drop-shadow-sm'
);

// The text-secondary in the main H1 span can be white too, or maybe keep it a contrasting color, or yellow?
// Royal Blue to Sky Blue gradient: secondary is Orange. Orange on blue looks nice, so we can keep text-secondary for the span.

// P tags with text-text-muted directly on background should be text-white/90
content = content.replace(
  /<p className="text-\[18px\] text-text-muted max-w-2xl mx-auto lg:mx-0">/g,
  '<p className="text-[18px] text-white/90 max-w-2xl mx-auto lg:mx-0">'
);
content = content.replace(
  /<p className="text-\[18px\] text-text-muted max-w-3xl mx-auto">/g,
  '<p className="text-[18px] text-white/90 max-w-3xl mx-auto">'
);

// The "Explore Career Library" button has `text-primary border-2 border-primary hover:bg-primary/5`
// We should make it a proper secondary button with `btn-secondary`
content = content.replace(
  /className="px-8 py-4 text-lg font-poppins font-semibold text-primary border-2 border-primary rounded-full hover:bg-primary\/5 transition-colors"/g,
  'className="btn-secondary px-8 py-4 text-lg"'
);

// The CTA section heading and text is inside a glass-card now, but it's set to text-white. We can keep it text-white or text-primary.
// Let's leave it as text-white if it's bg-white/20

fs.writeFileSync('src/components/Home.tsx', content);
