const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

// Remove solid backgrounds from sections
content = content.replace(/bg-bg-section/g, 'bg-transparent');
content = content.replace(/bg-gray-50/g, 'bg-transparent');
content = content.replace(/border-t border-gray-100/g, 'border-t border-white/20');

// Features section cards (were glass-card before, let's make sure they are)
// "glass-card p-8 rounded-[16px]" is already used in features? Wait.
content = content.replace(
  /className="bg-white p-6 rounded-\[16px\] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer"/g,
  'className="glass-card p-6 flex flex-col items-center justify-center text-center cursor-pointer"'
);

// Testimonials section (has bg-white overriding glass-card)
content = content.replace(/className="glass-card p-8 rounded-\[16px\] flex flex-col bg-white"/g, 'className="glass-card p-8 flex flex-col"');
content = content.replace(/className="glass-card p-8 rounded-\[16px\]"/g, 'className="glass-card p-8"'); // Just in case

// Fix text colors inside the CTA section (which is bg-primary, maybe we can keep it but change it a bit)
// Wait, CTA has bg-primary, so it's a blue card on a blue gradient. Let's make it a glass card but more distinct, or keep it as is.
content = content.replace(
  /className="bg-primary rounded-\[16px\] p-8 lg:p-12 text-white flex flex-col md:flex-row items-center gap-12 shadow-xl relative overflow-hidden"/g,
  'className="glass-card bg-white/20 border border-white/40 rounded-[16px] p-8 lg:p-12 text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"'
);

// In that CTA, there's text-primary on a button, which is fine since the button is bg-secondary/white.
content = content.replace(/text-white/g, 'text-white'); // keep

// Update text-primary to text-white in headings if it's on the main gradient background.
// Wait, text-primary is Royal Blue. If the background is Royal Blue to Sky Blue, Royal Blue text will be invisible or very hard to read!
// "Ensure excellent readability with high contrast and generous spacing."
// If body background is the gradient, we should make main text white, and text inside glass-cards dark (which is handled by .glass-card css).
