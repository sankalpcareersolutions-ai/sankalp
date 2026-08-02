const fs = require('fs');

['src/components/AdminPanel.tsx', 'src/components/Dashboard.tsx'].forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  code = code.replace(
    /const { data, error } = await supabase\.from\('appointments'\)\.select\('\*'\)\.order\('created_at', { ascending: false }\);\s*if \(!error && data\) {\s*const mapped = data\.map\(d => \({[\s\S]*?}\)\);\s*set(Appointments|FounderAppointments)\(mapped as any\);\s*}/,
    `const response = await fetch('/api/appointments');
      const data = await response.json();
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
          ticket_number: d.id ? String(d.id).substring(0,8) : '',
          careerInterest: 'General'
        }));
        set$1(mapped as any);
      }`
  );
  fs.writeFileSync(file, code);
  console.log("fixed", file);
});
