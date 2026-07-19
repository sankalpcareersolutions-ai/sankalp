const fs = require('fs');
let css = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-poppins: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-primary: #2563EB;
  --color-primary-light: #60A5FA;
  --color-primary-dark: #1D4ED8;
  
  --color-secondary: #FF8C42;
  
  --color-bg-main: transparent;
  --color-text-main: #FFFFFF;
  --color-text-muted: rgba(255, 255, 255, 0.85);
}

body {
  background: linear-gradient(135deg, #2563EB 0%, #60A5FA 100%);
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
  opacity: 0.5;
  background-image: 
    radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 35%),
    radial-gradient(circle at 85% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 25%);
  pointer-events: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-poppins);
}

.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #1F2937;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.15);
}

/* Forcing headings in glass cards to have primary color */
.glass-card h1, .glass-card h2, .glass-card h3, .glass-card h4, .glass-card h5, .glass-card h6 {
  color: var(--color-primary);
}
.glass-card .text-text-muted {
  color: #4B5563 !important;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  font-family: var(--font-poppins);
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px -3px rgba(37, 99, 235, 0.4);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(37, 99, 235, 0.5);
}

.btn-secondary {
  background: white;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  font-family: var(--font-poppins);
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(37, 99, 235, 0.05);
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
