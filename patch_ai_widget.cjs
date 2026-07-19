const fs = require('fs');
let home = fs.readFileSync('src/components/Home.tsx', 'utf-8');

home = home.replace(
  '{/* WhatsApp Floating Button */}',
  `{/* AI Career Assistant Chat Widget */}
      <div className="fixed bottom-24 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer group">
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-primary text-sm font-poppins font-bold px-3 py-1 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">AI Career Assistant</span>
      </div>
      
      {/* WhatsApp Floating Button */}`
);

fs.writeFileSync('src/components/Home.tsx', home);
console.log('Added AI Widget');
