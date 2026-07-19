const fs = require('fs');

const css = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-poppins: "Poppins", ui-sans-serif, system-ui, sans-serif;

  --color-primary: #D4AF37;
  --color-primary-light: #F3E5AB;
  --color-primary-dark: #B8860B;
  
  --color-secondary: #D4AF37;
  
  --color-bg-main: #0B1F3A;
  --color-text-main: #FFFFFF;
  --color-text-muted: #E2E8F0;
}

body {
  background: radial-gradient(circle at top right, #132D52 0%, #0B1F3A 60%);
  background-attachment: fixed;
  color: var(--color-text-main);
  font-family: var(--font-sans);
  font-size: 16px;
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
  opacity: 0.15;
  background-image: 
    radial-gradient(circle at 15% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 35%),
    radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 25%);
  pointer-events: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-poppins);
  color: #FFFFFF;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: #FFFFFF;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.4);
}

.glass-card h1, .glass-card h2, .glass-card h3, .glass-card h4, .glass-card h5, .glass-card h6 {
  color: #FFFFFF;
}

.glass-card .text-text-muted {
  color: #E2E8F0 !important;
}

.btn-primary {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  color: #0B1F3A !important;
  font-family: var(--font-poppins);
  font-weight: 700;
  border-radius: 9999px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px -3px rgba(212, 175, 55, 0.4);
  border: 1px solid transparent;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(212, 175, 55, 0.6), 0 0 15px rgba(212, 175, 55, 0.4);
  background: linear-gradient(135deg, #E5C158 0%, #D4AF37 100%);
}

.btn-secondary {
  background: rgba(212, 175, 55, 0.05);
  color: #D4AF37 !important;
  border: 2px solid #D4AF37 !important;
  font-family: var(--font-poppins);
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0);
}

.btn-secondary:hover {
  background: rgba(212, 175, 55, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.3);
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.6);
}

/* Fix global text colors */
@layer utilities {
  .text-white { color: #FFFFFF !important; }
  .text-white\\/90 { color: rgba(255, 255, 255, 0.9) !important; }
  .text-white\\/80 { color: rgba(255, 255, 255, 0.8) !important; }
  .text-white\\/70 { color: rgba(255, 255, 255, 0.7) !important; }
  .text-white\\/60 { color: rgba(255, 255, 255, 0.6) !important; }
  .text-white\\/50 { color: rgba(255, 255, 255, 0.5) !important; }
  .text-white\\/40 { color: rgba(255, 255, 255, 0.4) !important; }
  
  .text-gray-100 { color: #F1F5F9 !important; }
  .text-gray-200 { color: #E2E8F0 !important; }
  .text-gray-300 { color: #CBD5E1 !important; }
  .text-gray-400 { color: #94A3B8 !important; }
  .text-gray-500 { color: #64748B !important; }
  .text-gray-600 { color: #475569 !important; }
  .text-gray-700 { color: #334155 !important; }
  .text-gray-800 { color: #1E293B !important; }
  .text-gray-900 { color: #0F172A !important; }
  
  .text-primary { color: #D4AF37 !important; }
  
  .hover\\:text-white:hover { color: #FFFFFF !important; }
  .hover\\:text-primary:hover { color: #F3E5AB !important; }
  
  .bg-white { background-color: rgba(255, 255, 255, 0.05) !important; }
  .bg-white\\/5 { background-color: rgba(255, 255, 255, 0.05) !important; }
  .bg-white\\/10 { background-color: rgba(255, 255, 255, 0.1) !important; }
  .bg-white\\/20 { background-color: rgba(255, 255, 255, 0.2) !important; }
  .bg-white\\/50 { background-color: rgba(255, 255, 255, 0.5) !important; }
  .bg-white\\/80 { background-color: rgba(255, 255, 255, 0.8) !important; }
  .bg-gray-50 { background-color: rgba(255, 255, 255, 0.02) !important; }
  .bg-gray-100 { background-color: rgba(255, 255, 255, 0.05) !important; }
  .bg-gray-200 { background-color: rgba(255, 255, 255, 0.08) !important; }
  
  .border-gray-100 { border-color: rgba(255, 255, 255, 0.05) !important; }
  .border-gray-200 { border-color: rgba(255, 255, 255, 0.1) !important; }
  .border-gray-300 { border-color: rgba(255, 255, 255, 0.15) !important; }
}

input, textarea, select {
  background-color: rgba(0, 0, 0, 0.2) !important;
  color: #FFFFFF !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

input:focus, textarea:focus, select:focus {
  border-color: #D4AF37 !important;
  box-shadow: 0 0 0 1px #D4AF37 !important;
  outline: none !important;
}

input::placeholder, textarea::placeholder {
  color: rgba(255, 255, 255, 0.4) !important;
}
`;

fs.writeFileSync('src/index.css', css);
