const fs = require('fs');
let code = fs.readFileSync('src/components/StudyMaterial.tsx', 'utf-8');

const downloadFunc = `
  const handleDownload = (bookTitle) => {
    const element = document.createElement('a');
    const file = new Blob([\"This is a sample document for \" + bookTitle], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = bookTitle.replace(/\\s+/g, '_') + '.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
`;

code = code.replace(/export default function StudyMaterial[^\{]*\{/, `$&${downloadFunc}`);
code = code.replace(
  /<button className="flex items-center gap-1 text-sm text-primary hover:text-white transition-colors">/g,
  '<button onClick={() => handleDownload(book.title)} className="flex items-center gap-1 text-sm text-primary hover:text-white transition-colors cursor-pointer">'
);

fs.writeFileSync('src/components/StudyMaterial.tsx', code);
