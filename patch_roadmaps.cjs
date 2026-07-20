const fs = require('fs');
let code = fs.readFileSync('src/components/CareerLibrary.tsx', 'utf-8');

const additionalIds = [
  'agniveer', 'capf-ac', 'capf-si', 'paramilitary',
  'barc', 'marine', 'afmc', 'bams', 'bhms',
  'clat', 'ssc-cgl', 'ssc-chsl', 'state-pcs',
  'ibps-po', 'rbi-gradeb', 'lic-aao'
];

let addedRoadmaps = '';
additionalIds.forEach(id => {
  addedRoadmaps += `
  '${id}': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],`;
});

code = code.replace(/const roadmaps: Record<string, RoadmapStep\[\]> = \{/, 'const roadmaps: Record<string, RoadmapStep[]> = {' + addedRoadmaps);

fs.writeFileSync('src/components/CareerLibrary.tsx', code);
