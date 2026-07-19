const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Replace everything from "@layer utilities" onwards
const startLayer = css.indexOf('@layer utilities {');
if (startLayer !== -1) {
  css = css.substring(0, startLayer);
}

// Make sure headings are gold
css = css.replace(/h1, h2, h3, h4, h5, h6 \{\s*color: #FFFFFF;\s*\}/g, '');
css = css.replace(/h1, h2, h3, h4, h5, h6 \{\s*font-family: var\(--font-poppins\);\s*color: #FFFFFF;\s*\}/g, `h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-poppins);
}
h1, h2, h3 {
  color: #D4AF37;
}
h4, h5, h6 {
  color: #FFFFFF;
}`);

css += `@layer utilities {
  /* Text color overrides for Dark Mode */
  .text-white { color: #FFFFFF !important; }
  .text-white\\/90 { color: rgba(255, 255, 255, 0.9) !important; }
  .text-white\\/80 { color: rgba(255, 255, 255, 0.8) !important; }
  .text-white\\/70 { color: rgba(255, 255, 255, 0.7) !important; }
  
  /* Invert gray scale for dark theme readability */
  .text-gray-900 { color: #FFFFFF !important; }
  .text-gray-800 { color: #F8FAFC !important; }
  .text-gray-700 { color: #F1F5F9 !important; }
  .text-gray-600 { color: #E2E8F0 !important; }
  .text-gray-500 { color: #CBD5E1 !important; }
  .text-gray-400 { color: #94A3B8 !important; }
  .text-gray-300 { color: #475569 !important; }
  
  .text-slate-900 { color: #FFFFFF !important; }
  .text-slate-800 { color: #F8FAFC !important; }
  .text-slate-700 { color: #F1F5F9 !important; }
  .text-slate-600 { color: #E2E8F0 !important; }
  .text-slate-500 { color: #CBD5E1 !important; }
  
  .text-primary { color: #D4AF37 !important; }
  
  .hover\\:text-primary:hover { color: #F3E5AB !important; }
  .hover\\:text-gray-800:hover { color: #FFFFFF !important; }
  .hover\\:text-gray-900:hover { color: #FFFFFF !important; }
  
  /* Background overrides */
  .bg-white { background-color: rgba(11, 31, 58, 0.8) !important; }
  .bg-gray-50 { background-color: rgba(255, 255, 255, 0.03) !important; }
  .bg-gray-100 { background-color: rgba(255, 255, 255, 0.06) !important; }
  .bg-gray-200 { background-color: rgba(255, 255, 255, 0.1) !important; }
  
  /* Border overrides */
  .border-gray-100 { border-color: rgba(212, 175, 55, 0.1) !important; }
  .border-gray-200 { border-color: rgba(212, 175, 55, 0.25) !important; }
  .border-gray-300 { border-color: rgba(212, 175, 55, 0.4) !important; }
}

input, textarea, select {
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: #FFFFFF !important;
  border-color: rgba(212, 175, 55, 0.3) !important;
}

input:focus, textarea:focus, select:focus {
  border-color: #D4AF37 !important;
  box-shadow: 0 0 0 1px #D4AF37 !important;
  outline: none !important;
}

input::placeholder, textarea::placeholder {
  color: rgba(255, 255, 255, 0.5) !important;
}
`;

fs.writeFileSync('src/index.css', css);
