const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

code = code.replace(
  /\{ id: 'lic-aao', category: 'Banking & Insurance', title: 'LIC AAO', icon: <Briefcase className="w-6 h-6 text-teal-400" \/>, shortDesc: 'Assistant Administrative Officer in Life Insurance Corporation.', stream: 'Any Stream', qualification: 'Graduation' \}/,
  "{ id: 'lic-aao', category: 'Banking & Insurance', title: 'LIC AAO', icon: <Briefcase className=\"w-6 h-6 text-teal-400\" />, shortDesc: 'Assistant Administrative Officer in Life Insurance Corporation.', stream: 'Any Stream', qualification: 'Graduation' },"
);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
