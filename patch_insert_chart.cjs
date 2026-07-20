const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

const anchor = `<div className="text-[10px] text-lightyellow-200/40 text-center italic mt-6">`;
code = code.replace(
  anchor,
  `<CareerFlowChart category={detailedCareer.category} />\n          ` + anchor
);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
