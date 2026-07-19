const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// Replace remaining stray text colors
code = code.replace(/text-amber-700/g, 'text-[#D4AF37]');
code = code.replace(/text-amber-900/g, 'text-[#D4AF37]');
code = code.replace(/text-emerald-400/g, 'text-[#D4AF37]');
code = code.replace(/text-teal-800/g, 'text-[#D4AF37]');
code = code.replace(/text-red-700/g, 'text-[#D4AF37]');
code = code.replace(/text-[#c5a059]/g, 'text-[#D4AF37]');
code = code.replace(/text-[#F3E5AB]/g, 'text-[#F3E5AB]');

// Let's ensure the glass cards and their inner divs have appropriate navy backgrounds
code = code.replace(/bg-white\/5\/30/g, 'bg-[#0B1F3A]/50 border-primary/20');
code = code.replace(/bg-white\/5\/20/g, 'bg-[#0B1F3A]/50 border-primary/20');
code = code.replace(/bg-white\/5\/50/g, 'bg-[#0B1F3A]/80 border-primary/30');

// Fix alert banner background
code = code.replace(/bg-amber-50 border border-amber-200/g, 'bg-[#0B1F3A] border border-[#D4AF37]');

// Ensure quiz background is explicitly navy blue
code = code.replace(/bg-emerald-950/g, 'bg-[#0B1F3A]');
code = code.replace(/bg-emerald-900\/30/g, 'bg-primary/10');
code = code.replace(/bg-emerald-900/g, 'bg-[#0B1F3A]');
code = code.replace(/bg-emerald-700/g, 'bg-primary/20');
code = code.replace(/bg-emerald-600/g, 'bg-primary/30');

// Ensure hover states don't turn things dark or green
code = code.replace(/hover:bg-emerald-900\/40/g, 'hover:bg-primary/10');
code = code.replace(/hover:bg-emerald-800\/20/g, 'hover:border-primary/50');
code = code.replace(/hover:bg-emerald-950/g, 'hover:bg-primary/20');
code = code.replace(/hover:bg-emerald-900/g, 'hover:bg-primary/30');
code = code.replace(/hover:bg-emerald-700/g, 'hover:bg-primary/40');
code = code.replace(/hover:bg-emerald-600/g, 'hover:bg-primary/50');
code = code.replace(/hover:bg-amber-700/g, 'hover:bg-[#B8860B]');

code = code.replace(/bg-amber-600/g, 'bg-primary');
code = code.replace(/bg-amber-500\/10/g, 'bg-primary/10');

// "last section background also in navy blue colour fonts in golden yellow colour."
// I already set `bg-[#0B1F3A] text-[#D4AF37]` for the Daily Security Quiz in previous patch. Let's make sure it is exactly that.
// But the user might be referring to the overall page background?
// The body background is `radial-gradient(circle at top right, #132D52 0%, #0B1F3A 60%)`. That is Navy Blue.

fs.writeFileSync('src/components/Dashboard.tsx', code);
