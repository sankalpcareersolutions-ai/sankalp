const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

// Update categories
code = code.replace(
  /const categories = \["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services", "Banking & Insurance", "School Entrances \(Class 5th-9th\)"\];/,
  'const categories = ["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services", "Banking & Insurance", "Teaching", "Railway Exams", "School Entrances (Class 5th-9th)"];'
);

// Add career entries before ];
const newCareers = `
  { id: 'tgt-pgt', category: 'Teaching', title: 'TGT/PGT Teacher', icon: <BookOpen className="w-6 h-6 text-purple-400" />, shortDesc: 'Trained Graduate & Post Graduate Teachers in Gov/Private schools.', stream: 'Any Stream', qualification: 'Graduation + B.Ed' },
  { id: 'ugc-net', category: 'Teaching', title: 'University Professor (UGC NET)', icon: <BookOpen className="w-6 h-6 text-purple-400" />, shortDesc: 'Lectureship and Junior Research Fellowship at universities.', stream: 'Any Stream', qualification: 'Post Graduation' },
  { id: 'ctet', category: 'Teaching', title: 'CTET / State TET', icon: <BookOpen className="w-6 h-6 text-purple-400" />, shortDesc: 'Central/State Eligibility Test for primary and upper primary teachers.', stream: 'Any Stream', qualification: '12th/Graduation + D.El.Ed/B.Ed' },
  { id: 'rrb-ntpc', category: 'Railway Exams', title: 'RRB NTPC', icon: <Train className="w-6 h-6 text-blue-400" />, shortDesc: 'Non-Technical Popular Categories like Station Master, Clerk, Goods Guard.', stream: 'Any Stream', qualification: '12th/Graduation' },
  { id: 'rrb-alp', category: 'Railway Exams', title: 'RRB Assistant Loco Pilot (ALP)', icon: <Train className="w-6 h-6 text-blue-400" />, shortDesc: 'Drive and maintain trains for Indian Railways.', stream: 'Engineering/ITI', qualification: '10th + ITI / Diploma / B.Tech' },
  { id: 'rrb-je', category: 'Railway Exams', title: 'RRB Junior Engineer (JE)', icon: <Train className="w-6 h-6 text-blue-400" />, shortDesc: 'Supervise maintenance and construction in railways.', stream: 'Engineering', qualification: 'Diploma/B.Tech' },
];`;

code = code.replace(/];[\s\n]*interface RoadmapStep/m, newCareers + '\n\ninterface RoadmapStep');

// Need to add Train import if it doesn't exist
if (!code.includes('Train')) {
  code = code.replace(/import \{ (.*?) \} from "lucide-react";/, 'import { $1, Train } from "lucide-react";');
}

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
