const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

css = css.replace('--color-text-main: #FFFFFF;', '--color-text-main: #FDE68A;');
css = css.replace('--color-text-muted: rgba(255, 255, 255, 0.85);', '--color-text-muted: rgba(253, 230, 138, 0.85);');

css += `
/* Golden Typography & Dark UI Overrides */
@layer utilities {
  .text-white { color: #FDE68A !important; }
  .text-white\\/90 { color: rgba(253, 230, 138, 0.9) !important; }
  .text-white\\/80 { color: rgba(253, 230, 138, 0.8) !important; }
  .text-white\\/70 { color: rgba(253, 230, 138, 0.7) !important; }
  .text-white\\/60 { color: rgba(253, 230, 138, 0.6) !important; }
  .text-white\\/50 { color: rgba(253, 230, 138, 0.5) !important; }
  .text-white\\/40 { color: rgba(253, 230, 138, 0.4) !important; }
  
  .text-gray-100 { color: #FEF3C7 !important; }
  .text-gray-200 { color: #FDE68A !important; }
  .text-gray-300 { color: rgba(253, 230, 138, 0.9) !important; }
  .text-gray-400 { color: rgba(253, 230, 138, 0.75) !important; }
  .text-gray-500 { color: rgba(253, 230, 138, 0.6) !important; }
  .text-gray-600 { color: rgba(253, 230, 138, 0.65) !important; }
  .text-gray-700 { color: rgba(253, 230, 138, 0.7) !important; }
  .text-gray-800 { color: rgba(253, 230, 138, 0.8) !important; }
  .text-gray-900 { color: rgba(253, 230, 138, 0.9) !important; }
  
  .text-slate-100 { color: #FEF3C7 !important; }
  .text-slate-200 { color: #FDE68A !important; }
  .text-slate-300 { color: rgba(253, 230, 138, 0.9) !important; }
  .text-slate-400 { color: rgba(253, 230, 138, 0.75) !important; }
  .text-slate-500 { color: rgba(253, 230, 138, 0.6) !important; }
  .text-slate-600 { color: rgba(253, 230, 138, 0.6) !important; }
  .text-slate-700 { color: rgba(253, 230, 138, 0.7) !important; }
  .text-slate-800 { color: rgba(253, 230, 138, 0.8) !important; }
  .text-slate-900 { color: rgba(253, 230, 138, 0.9) !important; }

  /* Override original primary text color (blue) with Gold */
  .text-primary { color: #FBBF24 !important; }
  
  .hover\\:text-white:hover { color: #FEF3C7 !important; }
  .hover\\:text-primary:hover { color: #FCD34D !important; }
  
  .bg-white { background-color: rgba(15, 23, 42, 0.6) !important; }
  .bg-white\\/50 { background-color: rgba(15, 23, 42, 0.4) !important; }
  .bg-white\\/80 { background-color: rgba(15, 23, 42, 0.7) !important; }
  .bg-gray-50 { background-color: rgba(15, 23, 42, 0.5) !important; }
  .bg-gray-100 { background-color: rgba(15, 23, 42, 0.6) !important; }
  .bg-gray-200 { background-color: rgba(15, 23, 42, 0.7) !important; }
  
  .border-gray-100 { border-color: rgba(251, 191, 36, 0.1) !important; }
  .border-gray-200 { border-color: rgba(251, 191, 36, 0.2) !important; }
  .border-gray-300 { border-color: rgba(251, 191, 36, 0.3) !important; }
}

h1, h2, h3, h4, h5, h6 {
  color: #FBBF24 !important;
}

.glass-card {
  color: #FDE68A !important;
}

.btn-primary {
  color: #0F172A !important;
}

.btn-secondary {
  color: #FBBF24 !important;
  border-color: #FBBF24 !important;
}
.btn-secondary:hover {
  background: rgba(251, 191, 36, 0.1) !important;
}

input, textarea, select {
  background-color: rgba(15, 23, 42, 0.7) !important;
  color: #FDE68A !important;
  border-color: rgba(251, 191, 36, 0.3) !important;
}

input::placeholder, textarea::placeholder {
  color: rgba(253, 230, 138, 0.4) !important;
}
`;

fs.writeFileSync('src/index.css', css);
