const fs = require('fs');
let file = 'src/components/AboutAndAppointment.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  /supabase\.from\('appointments'\)\.select\('\*'\)\.order\('created_at', { ascending: false }\)\.then\(\({ data, error }\) => {[\s\S]*?}\);/,
  `fetch('/api/appointments')
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          const mapped = data.map(d => ({
            id: d.id,
            name: d.aspirant_name || d.name,
            email: d.email,
            mobileNumber: d.mobile || d.mobileNumber,
            preferredDate: d.date || d.preferredDate,
            preferredTime: d.time || d.preferredTime,
            counsellingType: d.service_type || d.counsellingType,
            questions: d.message || d.questions,
            ticket_number: d.id.substring(0,8),
            careerInterest: 'General'
          }));
          setBookings(mapped as any);
        }
      })
      .catch(err => {
        console.error("Fetch appointments failed", err);
      });`
);

code = code.replace(
  /supabase\.from\('appointments'\)\.delete\(\)\.eq\('id', id\)\.then\(\(\) => {[\s\S]*?}\);/,
  `// Mock delete logic
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("sankalp_career_appointments", JSON.stringify(updated));`
);

fs.writeFileSync(file, code);
console.log("reverted frontend fetch and delete");
