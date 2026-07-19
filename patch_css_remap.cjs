const fs = require('fs');

const css = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@400;600;800&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-poppins: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-primary: #0B3C6F;
  --color-primary-light: #16569c;
  --color-primary-dark: #072a4e;
  
  --color-secondary: #F4B400;
  --color-secondary-light: #f5c333;
  --color-secondary-dark: #d49c00;
  
  --color-accent: #22C55E;
  --color-accent-light: #4ade80;
  --color-accent-dark: #16a34a;
  
  --color-bg-main: #FFFFFF;
  --color-bg-section: #F8FAFC;
  --color-text-main: #1F2937;
  --color-text-muted: #4B5563;

  /* Remapping old dark theme colors to light theme */
  /* navy was dark background, now map to light background and text */
  --color-navy-50: #ffffff;
  --color-navy-100: #f8fafc;
  --color-navy-200: #f1f5f9;
  --color-navy-300: #e2e8f0;
  --color-navy-400: #cbd5e1;
  --color-navy-500: #94a3b8;
  --color-navy-600: #64748b;
  --color-navy-700: #475569;
  --color-navy-800: #334155;
  --color-navy-850: #1e293b;
  --color-navy-900: #ffffff; /* Old background was 900, now it's white */
  --color-navy-950: #f8fafc; /* Old darker background was 950, now it's section bg */

  /* lightyellow was text, now map to dark text */
  --color-lightyellow-50: #111827;
  --color-lightyellow-100: #1f2937; /* main text */
  --color-lightyellow-105: #374151;
  --color-lightyellow-200: #4b5563; /* muted text */
  --color-lightyellow-300: #6b7280;
  --color-lightyellow-400: #9ca3af;
  --color-lightyellow-500: #d1d5db;

  /* gold was accent, map to secondary and primary */
  --color-gold-50: #fefce8;
  --color-gold-100: #fef9c3;
  --color-gold-200: #fef08a;
  --color-gold-300: #fde047;
  --color-gold-400: #0B3C6F; /* Primary as the main accent now */
  --color-gold-450: #16569c;
  --color-gold-500: #F4B400; /* Secondary */
  --color-gold-550: #d49c00;
  --color-gold-600: #F4B400;
  --color-gold-700: #b45309;
}

body {
  background-color: var(--color-bg-main);
  color: var(--color-text-main);
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-poppins);
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.btn-primary {
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-light));
  color: white;
  font-family: var(--font-poppins);
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(to right, var(--color-secondary), var(--color-secondary-light));
  color: var(--color-primary-dark);
}
`;

fs.writeFileSync('src/index.css', css);
console.log('Patched index.css with mapped variables');
