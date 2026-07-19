const fs = require('fs');
let css = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-poppins: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-primary: #1E3A8A;
  --color-primary-light: #2563EB;
  --color-primary-dark: #172554;
  
  --color-secondary: #FBBF24;
  
  --color-bg-main: transparent;
  --color-text-main: #FFFFFF;
  --color-text-muted: rgba(255, 255, 255, 0.85);
}

body {
  background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);
  background-attachment: fixed;
  color: var(--color-text-main);
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.6;
  min-height: 100vh;
}

/* Background Pattern */
.bg-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.3;
  background-image: 
    radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 35%),
    radial-gradient(circle at 85% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 25%);
  pointer-events: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-poppins);
}

.glass-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  color: #FFFFFF;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(251, 191, 36, 0.3);
}

/* Forcing headings in glass cards to have secondary color */
.glass-card h1, .glass-card h2, .glass-card h3, .glass-card h4, .glass-card h5, .glass-card h6 {
  color: var(--color-secondary);
}
.glass-card .text-text-muted {
  color: rgba(255, 255, 255, 0.8) !important;
}

.btn-primary {
  background: var(--color-secondary);
  color: #0F172A;
  font-family: var(--font-poppins);
  font-weight: 700;
  border-radius: 9999px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px -3px rgba(251, 191, 36, 0.4);
}

.btn-primary:hover {
  background: #F59E0B;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(251, 191, 36, 0.5);
}

.btn-secondary {
  background: transparent;
  color: var(--color-secondary);
  border: 2px solid var(--color-secondary);
  font-family: var(--font-poppins);
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(251, 191, 36, 0.1);
  transform: translateY(-2px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
`;
fs.writeFileSync('src/index.css', css);
