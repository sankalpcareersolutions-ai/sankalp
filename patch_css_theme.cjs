const fs = require('fs');

const css = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-poppins: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-primary: #0F4C81;
  --color-primary-light: #1c6aa8;
  --color-primary-dark: #0a3359;
  
  --color-secondary: #FF8C42;
  --color-secondary-light: #ffa86e;
  --color-secondary-dark: #d66a25;
  
  --color-accent: #FF8C42;
  --color-accent-light: #ffa86e;
  --color-accent-dark: #d66a25;
  
  --color-bg-main: #FFFFFF;
  --color-bg-section: #F8FAFC;
  --color-text-main: #1F2937;
  --color-text-muted: #4B5563;

  /* Remapping old dark theme colors to light theme */
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

  --color-lightyellow-50: #111827;
  --color-lightyellow-100: #1f2937; /* main text */
  --color-lightyellow-105: #374151;
  --color-lightyellow-200: #4b5563; /* muted text */
  --color-lightyellow-300: #6b7280;
  --color-lightyellow-400: #9ca3af;
  --color-lightyellow-500: #d1d5db;

  --color-gold-50: #fff7ed;
  --color-gold-100: #ffedd5;
  --color-gold-200: #fed7aa;
  --color-gold-300: #fdba74;
  --color-gold-400: #0F4C81; /* Primary as the main accent now */
  --color-gold-450: #1c6aa8;
  --color-gold-500: #FF8C42; /* Secondary */
  --color-gold-550: #d66a25;
  --color-gold-600: #FF8C42;
  --color-gold-700: #c2410c;
}

body {
  background-color: var(--color-bg-main);
  background-image: radial-gradient(circle at 100% 0%, rgba(15, 76, 129, 0.04) 0%, transparent 25%), radial-gradient(circle at 0% 100%, rgba(255, 140, 66, 0.04) 0%, transparent 25%);
  background-attachment: fixed;
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
  border: 1px solid rgba(15, 76, 129, 0.05);
  border-radius: 16px;
  box-shadow: 0 10px 30px -10px rgba(15, 76, 129, 0.06);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px -10px rgba(15, 76, 129, 0.1);
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  font-family: var(--font-poppins);
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px -3px rgba(15, 76, 129, 0.3);
}

.btn-primary:hover {
  background: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(15, 76, 129, 0.4);
}
`;

fs.writeFileSync('src/index.css', css);
console.log('Patched index.css with new theme');
