const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

code = `import CareerFlowChart from "./CareerFlowChart";\n` + code;

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
