const fs = require('fs');
let code = fs.readFileSync('src/components/AboutAndAppointment.tsx', 'utf-8');

const newStr = '<p className="text-xs mt-2 text-emerald-200">A confirmation has been sent to your Email & Mobile, and to Admin (sankalpcareersolutions@gmail.com).</p><p className="text-sm mt-3 font-semibold">1:1 Google Meet Link:</p><a href="https://meet.google.com/xya-bcvd-pqr" target="_blank" rel="noreferrer" className="text-blue-400 underline font-mono text-sm">https://meet.google.com/xya-bcvd-pqr</a>';

code = code.replace(
  /<p className="text-xs mt-2 text-emerald-200">A confirmation email and SMS have been generated for your records\. Our team will contact you shortly\.<\/p>/g,
  newStr
);

fs.writeFileSync('src/components/AboutAndAppointment.tsx', code);
