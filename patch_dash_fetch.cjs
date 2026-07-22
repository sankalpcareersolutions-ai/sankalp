const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const newFetch = `
      try {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        if (data && Array.isArray(data)) {
           setFounderAppointments(data);
        }
      } catch (err) {
        const cached = localStorage.getItem("sankalp_founder_appointments");
        if (cached) setFounderAppointments(JSON.parse(cached));
      }
`;

const oldFetchRegex = /try \{\s*const \{ data, error \} = await supabase[\s\S]*?if \(cached\) setFounderAppointments\(JSON\.parse\(cached\)\);\s*\}/;

code = code.replace(oldFetchRegex, newFetch);

const oldDeleteRegex = /try \{\s*const \{ error \} = await supabase[\s\S]*?\}\s*\} catch \(err\) \{\s*\/\/ Ignore delete issues during offline simulation\s*\}/;
const newDelete = `
    try {
      // simulate delete
      localStorage.setItem("sankalp_founder_appointments", JSON.stringify(updated));
    } catch(err) {}
`;
code = code.replace(oldDeleteRegex, newDelete);

fs.writeFileSync('src/components/Dashboard.tsx', code);
