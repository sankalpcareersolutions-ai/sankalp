const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

content = content.replace(
  '<h2 className="text-[38px] font-poppins font-extrabold text-primary mb-4">Why Choose Career Counselling Hub</h2>',
  '<h2 className="text-[28px] md:text-[38px] font-poppins font-extrabold text-primary mb-4 leading-tight">Why Choose Career Counselling Hub</h2>'
);

content = content.replace(
  '<h2 className="text-[38px] font-poppins font-extrabold text-primary mb-4">50+ Student Success Stories</h2>',
  '<h2 className="text-[28px] md:text-[38px] font-poppins font-extrabold text-primary mb-4 leading-tight">50+ Student Success Stories</h2>'
);

fs.writeFileSync('src/components/Home.tsx', content);
