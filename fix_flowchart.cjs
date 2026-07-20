const fs = require('fs');
let code = fs.readFileSync('src/components/CareerFlowChart.tsx', 'utf-8');

code = code.replace(
  "return \\`M\\${sourceNode.x + 80},\\${sourceNode.y} C\\${sourceNode.x + 120},\\${sourceNode.y} \\${targetNode.x - 40},\\${targetNode.y} \\${targetNode.x - 10},\\${targetNode.y}\\`;",
  "return `M${sourceNode.x + 80},${sourceNode.y} C${sourceNode.x + 120},${sourceNode.y} ${targetNode.x - 40},${targetNode.y} ${targetNode.x - 10},${targetNode.y}`;"
);

code = code.replace(
  ".attr(\"transform\", d => \\`translate(\\${d.x},\\${d.y})\\`);",
  ".attr(\"transform\", d => `translate(${d.x},${d.y})`);"
);

fs.writeFileSync('src/components/CareerFlowChart.tsx', code);
