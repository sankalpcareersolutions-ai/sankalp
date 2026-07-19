const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace footer background
code = code.replace(/<footer className="bg-primary-dark/g, '<footer className="bg-[#0B1F3A] border-t border-primary/30');

// Replace gray text with white/80
code = code.replace(/text-gray-300/g, 'text-white/80');
code = code.replace(/text-gray-400/g, 'text-white/60');
code = code.replace(/text-gray-500/g, 'text-white/40');
code = code.replace(/border-gray-700/g, 'border-primary/20');

// Make the text slightly bigger
code = code.replace(/<h4 className="text-xs font-poppins/g, '<h4 className="text-sm font-poppins');

// Ensure secondary is visible (it is #D4AF37)
// text-secondary is fine.
// Replace text-white with text-white or text-primary where needed.
// Wait, "fonts size golden yellow or white which gives a professional look."
// Quick Links, Legal, Contact Us headers are text-secondary (gold).
// The links are text-white/80. This is good.

fs.writeFileSync('src/App.tsx', code);
