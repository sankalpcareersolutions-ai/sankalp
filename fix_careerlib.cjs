const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

const getCareerImgStr = `  const getCareerImage = (category) => {
    switch(category) {
      case 'Defence': return 'https://images.unsplash.com/photo-1595886676766-3d778fb8f294?auto=format&fit=crop&w=1200&q=80'; // Students/Cadets
      case 'Engineering': return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80';
      case 'Medical': return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80';
      case 'Research': return 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80';
      case 'Law': return 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80';
      case 'Civil Services': return 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80';
      case 'Banking & Insurance': return 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80';
      default: return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'; // Diverse students
    }
  };`;

// Remove it from inside the signature
code = code.replace(getCareerImgStr + '\n', '');

// Add it before the component
code = code.replace(/export default function CareerLibrary/, getCareerImgStr + '\n\nexport default function CareerLibrary');

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
