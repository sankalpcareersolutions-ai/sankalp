const fs = require('fs');
let code = fs.readFileSync('src/components/Courses.tsx', 'utf-8');
code = code.replace(/<button[^>]*id={`course_enroll_btn_act_\${c\.id}`}[^>]*>[\s\S]*?<\/button>/g, '');
code = code.replace(/<button[^>]*id={`course_enroll_btn_enrolled_\${c\.id}`}[^>]*>[\s\S]*?<\/button>/g, '');
fs.writeFileSync('src/components/Courses.tsx', code);
