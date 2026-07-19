const fs = require('fs');
let content = fs.readFileSync('src/components/Home.tsx', 'utf-8');

content = content.replace(
  /<h1 className="text-\[36px\] lg:text-\[56px\] font-poppins font-extrabold leading-tight text-primary">[\s\S]*?<\/h1>/,
  `<h1 className="text-[36px] lg:text-[48px] xl:text-[56px] font-poppins font-extrabold leading-tight text-primary">
            Shape Your Future with <br className="hidden sm:block" />
            <span className="text-secondary">Career Counselling Hub</span>
          </h1>`
);

fs.writeFileSync('src/components/Home.tsx', content);
