const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// Increase text sizes for better visibility in Cadet Hub (Dashboard)
// Replace text-[10px] with text-xs
code = code.replace(/text-\[10px\]/g, 'text-xs');
// Replace text-[10.5px] with text-xs
code = code.replace(/text-\[10\.5px\]/g, 'text-xs');
// Replace text-[9px] with text-[10px]
code = code.replace(/text-\[9px\]/g, 'text-[10px]');
// Replace text-xs with text-sm for specific elements
// Let's just do a blanket replacement of small sizes on headers
code = code.replace(/<h3 className="font-bold text-primary text-sm md:text-base">/g, '<h3 className="font-bold text-primary text-lg md:text-xl">');
code = code.replace(/<h2 className="text-lg font-bold/g, '<h2 className="text-xl font-bold');

// Daily Security quiz background
// Currently: <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-800/30 shadow-md relative overflow-hidden space-y-4">
code = code.replace(/bg-emerald-950 text-white rounded-2xl/g, 'bg-[#0B1F3A] text-primary rounded-2xl');
code = code.replace(/border-emerald-800\/30/g, 'border-primary/30');

// "last section background also in navy blue colour fonts in golden yellow colour."
// Preparation Diagnostics Bar Chart
// It is currently inside: <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm flex flex-col justify-between" id="dashboard_prep_chart">
// Wait, is it? Let's check what ID or classes it has.
