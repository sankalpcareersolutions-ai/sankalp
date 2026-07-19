const fs = require('fs');
let content = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

// Add to categories
content = content.replace(
  'const categories = ["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services"];',
  'const categories = ["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services", "School Entrances"];'
);

// Add to careers array
content = content.replace(
  '{ id: \'civil\', category: \'Civil Services\', title: \'UPSC Civil Services (IAS/IPS)\', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: \'Top administrative roles in the Indian government.\', stream: \'Any Stream\', qualification: \'Graduation\' }',
  `{ id: 'civil', category: 'Civil Services', title: 'UPSC Civil Services (IAS/IPS)', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: 'Top administrative roles in the Indian government.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'sainik', category: 'School Entrances', title: 'Sainik School Entrance (AISSEE)', icon: <Shield className="w-6 h-6 text-primary" />, shortDesc: 'Entrance to prestigious Sainik Schools for young cadets.', stream: 'Class 5th, 8th, 9th Students', qualification: 'School Level' },
  { id: 'rms', category: 'School Entrances', title: 'Rashtriya Military Schools (RMS)', icon: <Target className="w-6 h-6 text-primary" />, shortDesc: 'Top military colleges for developing future officers.', stream: 'Class 5th, 8th, 9th Students', qualification: 'School Level' },
  { id: 'rimc', category: 'School Entrances', title: 'Rashtriya Indian Military College (RIMC)', icon: <Award className="w-6 h-6 text-primary" />, shortDesc: 'Premier feeder institution for NDA.', stream: 'Class 7th Students', qualification: 'School Level' }`
);

// Add to roadmaps array
const ndaStart = content.indexOf('const roadmaps: Record<string, RoadmapStep[]> = {');
if (ndaStart !== -1) {
  content = content.replace(
    'const roadmaps: Record<string, RoadmapStep[]> = {',
    `const roadmaps: Record<string, RoadmapStep[]> = {
  sainik: [
    { number: 1, title: 'Early Preparation', duration: 'Class 4 & 5', description: 'Start basic preparation in Math, English, Intelligence, and GK.', tip: 'Enroll in foundation courses specifically for Sainik School.', milestone: 'Mock Test Readiness' },
    { number: 2, title: 'AISSEE Exam', duration: 'January', description: 'Clear the All India Sainik School Entrance Examination.', tip: 'Practice OMR filling and time management.', milestone: 'Written Clear' },
    { number: 3, title: 'Medical & Interview', duration: 'March-April', description: 'Clear the medical board fitness tests and personal interviews.', tip: 'Maintain physical fitness and confident communication.', milestone: 'Final Merit List' }
  ],
  rms: [
    { number: 1, title: 'Early Preparation', duration: 'Class 4 & 5', description: 'Start basic preparation in Math, English, Intelligence, and GK.', tip: 'Enroll in foundation courses specifically for RMS.', milestone: 'Mock Test Readiness' },
    { number: 2, title: 'CET Exam', duration: 'December', description: 'Clear the Common Entrance Test for RMS.', tip: 'Focus on high accuracy in Intelligence section.', milestone: 'Written Clear' },
    { number: 3, title: 'Interview & Medical', duration: 'Feb-March', description: 'Clear the final interview and medical examination.', tip: 'Develop good general awareness.', milestone: 'Final Merit List' }
  ],
  rimc: [
    { number: 1, title: 'Intensive Prep', duration: 'Class 6 & 7', description: 'Master English, Mathematics, and General Knowledge.', tip: 'RIMC subjective English and Math require rigorous writing practice.', milestone: 'Subjective Readiness' },
    { number: 2, title: 'Written Exam', duration: 'June/December', description: 'Clear the All India Entrance for RIMC.', tip: 'Speed and neat handwriting are crucial.', milestone: 'Written Clear' },
    { number: 3, title: 'Viva-Voce & Medical', duration: 'Post-Written', description: 'Clear the rigorous viva-voce and medical checkup.', tip: 'Exhibit officer-like qualities early on.', milestone: 'Final Merit List' }
  ],`
  );
}

fs.writeFileSync('src/components/CareerLibrary.tsx', content);
