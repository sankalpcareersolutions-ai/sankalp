const fs = require('fs');
let content = fs.readFileSync('src/components/SovereignExams.tsx', 'utf-8');
content = content.replace('onSaveAnnouncement = () => {},\n, subscribedExamDates', 'onSaveAnnouncement = () => {},\n  subscribedExamDates');
fs.writeFileSync('src/components/SovereignExams.tsx', content);
