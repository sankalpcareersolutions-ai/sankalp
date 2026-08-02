const fs = require('fs');
let file = 'src/components/AboutAndAppointment.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  /supabase\.from\('appointments'\)\.delete\(\)\.eq\('id', id\)\.then\(\(\) => {\s*const updated = bookings\.filter\(\(b\) => b\.id !== id\);\s*setBookings\(updated\);\s*}\);\s*localStorage\.setItem\("sankalp_career_appointments", JSON\.stringify\(updated\)\);/,
  `supabase.from('appointments').delete().eq('id', id).then(() => {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem("sankalp_career_appointments", JSON.stringify(updated));
    });`
);
fs.writeFileSync(file, code);
