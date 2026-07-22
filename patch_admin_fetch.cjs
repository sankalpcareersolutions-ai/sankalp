const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');

const newFetchAppointments = `
  const fetchAppointments = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      if (data && Array.isArray(data)) {
         setAppointments(data);
      }
    } catch (error) {
      console.error(error);
      const cached = localStorage.getItem("sankalp_founder_appointments");
      if (cached) setAppointments(JSON.parse(cached));
    } finally {
      setLoadingData(false);
    }
  };
`;

code = code.replace(/const fetchAppointments = async \(\) => \{[\s\S]*?\} finally \{\s*setLoadingData\(false\);\s*\}\s*\};/, newFetchAppointments);
fs.writeFileSync('src/components/AdminPanel.tsx', code);
