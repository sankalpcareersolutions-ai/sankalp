const fs = require('fs');
let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

const regex = /try \{\s*const response = await fetch\('\/api\/appointments'\);[\s\S]*?if \(cached\) setFounderAppointments\(JSON\.parse\(cached\)\);\s*\}/g;

const match = code.match(regex);
// There are duplicates or messed up code. Let's find the whole `fetchBookings` function and replace it.

const fetchBookingsRegex = /async function fetchBookings\(\) \{[\s\S]*?\}\s*\}\s*fetchBookings\(\);/;
const newFetchBookings = `async function fetchBookings() {
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
  }

  fetchBookings();`;

code = code.replace(fetchBookingsRegex, newFetchBookings);
fs.writeFileSync('src/components/Dashboard.tsx', code);
