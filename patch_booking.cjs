const fs = require('fs');
let code = fs.readFileSync('src/components/AboutAndAppointment.tsx', 'utf-8');

const updatedHandleBook = `
  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const ticketNumber = \`CCH-APT-\${Math.floor(100000 + Math.random() * 900000)}\`;
    const googleMeetLink = 'https://meet.google.com/xya-bcvd-pqr'; // Simulated fixed Meet link for 1:1 counselling
    
    const newBooking: CareerCounselingAppointment = {
      id: \`booking_\${Date.now()}\`,
      ...formData as any,
      ticket_number: ticketNumber,
      timestamp: new Date().toISOString()
    };
    
    setBookings((prev) => [newBooking, ...prev]);
    setBookingSuccess(newBooking);
    localStorage.setItem("sankalp_career_appointments", JSON.stringify([newBooking, ...bookings]));
    
    // Simulate sending email to admin
    console.log(\`Sending email to admin (sankalpcareersolutions@gmail.com) for booking \${ticketNumber}\`);
    // Simulate sending email to user
    console.log(\`Sending confirmation email to \${formData.email} with Meet Link: \${googleMeetLink}\`);
    // Simulate sending SMS to user
    console.log(\`Sending SMS notification to \${formData.phone}\`);
    
    alert(\`Appointment Booked Successfully!\\n\\nA notification has been sent to your email (\${formData.email}) and mobile number (\${formData.phone}).\\nAn alert has also been sent to admin (sankalpcareersolutions@gmail.com).\\n\\nGoogle Meet Link for 1:1 Session: \${googleMeetLink}\`);

    setFormData({
      defenceAspirant: 'No',
      counsellingType: 'Online',
      preferredLanguage: 'English'
    });
  };
`;

code = code.replace(/const handleBook = async \(e: React\.FormEvent\) => \{[\s\S]*?\}\;\n/m, updatedHandleBook);
fs.writeFileSync('src/components/AboutAndAppointment.tsx', code);
