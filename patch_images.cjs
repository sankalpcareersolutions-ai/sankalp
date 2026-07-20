const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

const imgFunc = `
  const getCareerImage = (category) => {
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
  };
`;

code = code.replace(/export default function CareerLibrary[^\{]*\{/, `$&${imgFunc}`);

const imageHtml = `
          <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 relative border border-gold-500/20 shadow-[0_0_20px_rgba(212,175,55,0.15)] group">
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent z-10"></div>
            <img 
              src={getCareerImage(detailedCareer.category)} 
              alt={translatedCareer.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
              <span className="bg-gold-500 text-navy-950 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">Success Awaits</span>
            </div>
          </div>
`;

code = code.replace(
  /<div className="flex items-start gap-4 mb-8 border-b border-gold-500\/20 pb-6">/,
  imageHtml + '\\n          <div className="flex items-start gap-4 mb-8 border-b border-gold-500/20 pb-6">'
);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
