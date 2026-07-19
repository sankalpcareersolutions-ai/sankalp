const fs = require('fs');
let code = fs.readFileSync('src/components/Home.tsx', 'utf-8');

code = code.replace(
  /className="bg-primary rounded-\[16px\] p-8 lg:p-12 text-white/g,
  'className="bg-[#0B1F3A] border border-primary/30 rounded-[16px] p-8 lg:p-12 text-white'
);

code = code.replace(
  /bg-secondary text-primary font-poppins font-semibold px-8 py-3 rounded-full hover:bg-white transition-colors/g,
  'bg-primary text-[#0B1F3A] font-poppins font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-primary transition-colors'
);

code = code.replace(/text-primary-50/g, 'text-white/80');

fs.writeFileSync('src/components/Home.tsx', code);
