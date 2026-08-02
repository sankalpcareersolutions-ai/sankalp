const fs = require('fs');
let file = 'src/components/AboutAndAppointment.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  /const handleBook = async \(e: React\.FormEvent\) => {[\s\S]*?alert\(`Appointment Booked Successfully!/m,
  `const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const googleMeetLink = 'https://meet.google.com/xya-bcvd-pqr'; 
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      
      if (result.success) {
        const resultData = {
          ...formData as any,
          id: result.data.id,
          ticket_number: result.data.id.substring(0,8),
          timestamp: new Date().toISOString()
        };
        setBookings((prev) => [resultData, ...prev]);
        setBookingSuccess(resultData);
      } else {
        alert(result.error || 'Failed to book appointment.');
        return;
      }
    } catch(err) {
      console.error(err);
      alert('Error booking appointment.');
      return;
    }
    
    alert(\`Appointment Booked Successfully!`
);

fs.writeFileSync(file, code);
console.log("reverted frontend booking");
