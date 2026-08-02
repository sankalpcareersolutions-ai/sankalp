const fs = require('fs');
let file = 'src/components/Dashboard.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  /async function fetchBookings\(\) {\s*try {\s*const response = await fetch\('\/api\/appointments'\);\s*const data = await response\.json\(\);\s*if \(data && Array\.isArray\(data\)\) {\s*setFounderAppointments\(data\);\s*}\s*} catch \(err\) {\s*const cached = localStorage\.getItem\("sankalp_founder_appointments"\);\s*if \(cached\) setFounderAppointments\(JSON\.parse\(cached\)\);\s*}\s*}/,
  `async function fetchBookings() {
    try {
      const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        const mapped = data.map(d => ({
          id: d.id,
          name: d.aspirant_name,
          email: d.email,
          mobileNumber: d.mobile,
          preferredDate: d.date,
          preferredTime: d.time,
          counsellingType: d.service_type,
          questions: d.message,
          ticket_number: d.id.substring(0,8),
          careerInterest: 'General'
        }));
        setFounderAppointments(mapped as any);
      }
    } catch (err) {
      console.error(err);
    }
  }`
);

fs.writeFileSync(file, code);
console.log("Dashboard patched");
