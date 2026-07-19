const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

content = content.replace(
  /<h1 className="text-\[36px\] lg:text-\[48px\] xl:text-\[56px\] font-poppins font-extrabold leading-tight text-primary">[\s\S]*?<\/h1>/,
  `<h1 className="text-[36px] lg:text-[48px] xl:text-[56px] font-poppins font-extrabold leading-tight text-primary">
            Shape Your Future with
            <span className="text-secondary block mt-2 lg:mt-3">Career Counselling Hub</span>
          </h1>`
);

// Also fix the paragraph alignment to be centered on mobile
content = content.replace(
  '<p className="text-[18px] text-text-muted max-w-2xl">',
  '<p className="text-[18px] text-text-muted max-w-2xl mx-auto lg:mx-0">'
);

fs.writeFileSync('src/components/Home.tsx', content);
