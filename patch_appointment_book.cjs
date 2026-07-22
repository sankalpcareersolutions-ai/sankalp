const fs = require('fs');
let code = fs.readFileSync('src/components/AboutAndAppointment.tsx', 'utf-8');

const oldHandleBook = `  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const ticketNumber = \\\`CCH-APT-\\\${Math.floor(100000 + Math.random() * 900000)}\\\`;
    const googleMeetLink = 'https://meet.google.com/xya-bcvd-pqr'; // Simulated fixed Meet link for 1:1 counselling
    
    const newBooking: CareerCounselingAppointment = {
      id: \\\`booking_\\\${Date.now()}\\\`,
      ...formData as any,
      ticket_number: ticketNumber,
      timestamp: new Date().toISOString()
    };
    
    setBookings((prev) => [newBooking, ...prev]);
    setBookingSuccess(newBooking);
    localStorage.setItem("sankalp_career_appointments", JSON.stringify([newBooking, ...bookings]));
    
    // Simulate sending email to admin
    console.log(\\\`Sending email to admin (sankalpcareersolutions@gmail.com) for booking \\\${ticketNumber}\\\`);
    // Simulate sending email to user
    console.log(\\\`Sending confirmation email to \\\${formData.email} with Meet Link: \\\${googleMeetLink}\\\`);
    // Simulate sending SMS to user
    console.log(\\\`Sending SMS notification to \\\${formData.phone}\\\`);
    
    alert(\\\`Appointment Booked Successfully!\\n\\nA notification has been sent to your email (\\\${formData.email}) and mobile number (\\\${formData.phone}).\\nAn alert has also been sent to admin (sankalpcareersolutions@gmail.com).\\n\\nGoogle Meet Link for 1:1 Session: \\\${googleMeetLink}\\\`);

    setFormData({
      defenceAspirant: 'No',
      counsellingType: 'Online',
      preferredLanguage: 'English'
    });
  };\`;`;

const newHandleBook = `  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const ticketNumber = \`CCH-APT-\${Math.floor(100000 + Math.random() * 900000)}\`;
    const googleMeetLink = 'https://meet.google.com/xya-bcvd-pqr'; 
    
    const newBooking = {
      ...formData as any,
      ticket_number: ticketNumber,
      timestamp: new Date().toISOString()
    };
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      const result = await response.json();
      if (result.success) {
        setBookings((prev) => [result.data, ...prev]);
        setBookingSuccess(result.data);
      }
    } catch(err) {
      console.error(err);
      // fallback
      setBookings((prev) => [newBooking, ...prev]);
      setBookingSuccess(newBooking);
    }
    
    alert(\`Appointment Booked Successfully!\\n\\nA notification has been sent to your email (\${formData.email}) and mobile number (\${formData.mobileNumber || formData.phone}).\\nAn alert has also been sent to admin (sankalpcareersolutions@gmail.com).\\n\\nGoogle Meet Link for 1:1 Session: \${googleMeetLink}\`);

    setFormData({
      defenceAspirant: 'No',
      counsellingType: 'Online',
      preferredLanguage: 'English'
    });
  };`;

// Wait we can just do a regex replace
let replaceRegex = /const handleBook = async \(e: React\.FormEvent\) => \{[\s\S]*?\}\);\s*\};/;
code = code.replace(replaceRegex, newHandleBook);

// also update the load function to fetch from api if available
let loadRegex = /useEffect\(\(\) => \{\s*const cached = localStorage\.getItem\("sankalp_career_appointments"\);\s*if \(cached\) setBookings\(JSON\.parse\(cached\)\);\s*\}, \[\]\);/;

const newLoad = `useEffect(() => {
    fetch('/api/appointments').then(r => r.json()).then(data => {
      setBookings(data || []);
    }).catch(err => {
      const cached = localStorage.getItem("sankalp_career_appointments");
      if (cached) setBookings(JSON.parse(cached));
    });
  }, []);`;

code = code.replace(loadRegex, newLoad);

fs.writeFileSync('src/components/AboutAndAppointment.tsx', code);
