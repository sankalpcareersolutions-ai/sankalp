const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

const newCareers = `
  { id: 'agniveer', category: 'Defence', title: 'Agniveer (Army, Navy, Air Force)', icon: <Shield className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Short-term service in the Indian Armed Forces under the Agnipath scheme.', stream: 'Any Stream (Science for Technical)', qualification: '10th/12th Pass' },
  { id: 'capf-ac', category: 'Defence', title: 'CAPF Assistant Commandant (UPSC)', icon: <Shield className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Officer role in BSF, CRPF, CISF, ITBP, SSB.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'capf-si', category: 'Defence', title: 'CAPF Sub Inspector (SSC CPO)', icon: <Target className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Sub Inspector roles in Delhi Police and CAPFs.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'paramilitary', category: 'Defence', title: 'Paramilitary & State Police', icon: <Target className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Constable and State level law enforcement roles.', stream: 'Any Stream', qualification: '10th/12th/Graduation' },
  { id: 'barc', category: 'Research', title: 'BARC Scientist (OCES/DGFS)', icon: <Cpu className="w-6 h-6 text-blue-400" />, shortDesc: 'Nuclear research and engineering at Bhabha Atomic Research Centre.', stream: 'Engineering/Science', qualification: 'B.Tech/M.Sc' },
  { id: 'marine', category: 'Engineering', title: 'Marine Engineering', icon: <Plane className="w-6 h-6 text-emerald-400" />, shortDesc: 'Design, build, and maintain ships and naval systems.', stream: 'PCM', qualification: 'B.Tech/B.E. (Marine)' },
  { id: 'afmc', category: 'Medical', title: 'Armed Forces Medical College (AFMC)', icon: <HeartPulse className="w-6 h-6 text-red-400" />, shortDesc: 'Premier medical institute for serving in the Armed Forces as doctors.', stream: 'PCB', qualification: 'NEET Qualified' },
  { id: 'bams', category: 'Medical', title: 'Ayurvedic Medicine (BAMS)', icon: <HeartPulse className="w-6 h-6 text-red-400" />, shortDesc: 'Bachelor of Ayurvedic Medicine and Surgery.', stream: 'PCB', qualification: 'NEET Qualified' },
  { id: 'bhms', category: 'Medical', title: 'Homeopathic Medicine (BHMS)', icon: <HeartPulse className="w-6 h-6 text-red-400" />, shortDesc: 'Bachelor of Homeopathic Medicine and Surgery.', stream: 'PCB', qualification: 'NEET Qualified' },
  { id: 'clat', category: 'Law', title: 'National Law Universities (CLAT)', icon: <Gavel className="w-6 h-6 text-amber-400" />, shortDesc: 'Undergraduate and postgraduate degree programs at NLUs.', stream: 'Any Stream', qualification: '12th Pass' },
  { id: 'ssc-cgl', category: 'Civil Services', title: 'SSC CGL', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: 'Staff Selection Commission Combined Graduate Level examination.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'ssc-chsl', category: 'Civil Services', title: 'SSC CHSL', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: 'Staff Selection Commission Combined Higher Secondary Level.', stream: 'Any Stream', qualification: '12th Pass' },
  { id: 'state-pcs', category: 'Civil Services', title: 'State Civil Services (PCS)', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: 'State Public Service Commission exams for administration.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'ibps-po', category: 'Banking & Insurance', title: 'IBPS PO / SBI PO', icon: <Briefcase className="w-6 h-6 text-teal-400" />, shortDesc: 'Probationary Officer roles in public sector banks and SBI.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'rbi-gradeb', category: 'Banking & Insurance', title: 'RBI Grade B Officer', icon: <Briefcase className="w-6 h-6 text-teal-400" />, shortDesc: 'Management and policy-making roles in the Reserve Bank of India.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'lic-aao', category: 'Banking & Insurance', title: 'LIC AAO', icon: <Briefcase className="w-6 h-6 text-teal-400" />, shortDesc: 'Assistant Administrative Officer in Life Insurance Corporation.', stream: 'Any Stream', qualification: 'Graduation' }
];`;

code = code.replace(/\];\n\ninterface RoadmapStep/m, ',\n' + newCareers.trim().replace(/^\[|\];$/gm, '') + '\n];\n\ninterface RoadmapStep');

code = code.replace(
  /const categories = \["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services", "School Entrances \(Class 5th-9th\)"\];/,
  'const categories = ["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services", "Banking & Insurance", "School Entrances (Class 5th-9th)"];'
);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
