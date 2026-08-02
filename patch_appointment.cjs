const fs = require('fs');

// Patch AboutAndAppointment.tsx
let file = 'src/components/AboutAndAppointment.tsx';
let code = fs.readFileSync(file, 'utf-8');

// Replace fetch on mount
code = code.replace(
  /fetch\('\/api\/appointments'\)\.then\(r => r\.json\(\)\)\.then\(data => {\s*setBookings\(data \|\| \[\]\);\s*}\)\.catch\(err => {\s*const cached = localStorage\.getItem\("sankalp_career_appointments"\);\s*if \(cached\) setBookings\(JSON\.parse\(cached\)\);\s*}\);/,
  `supabase.from('appointments').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (!error && data) {
        // Map back to UI format
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
        setBookings(mapped as any);
      }
    });`
);

// Replace handleBook insert
code = code.replace(
  /try {\s*const response = await fetch\('\/api\/appointments', {\s*method: 'POST',\s*headers: { 'Content-Type': 'application\/json' },\s*body: JSON\.stringify\(newBooking\)\s*}\);\s*const result = await response\.json\(\);\s*if \(result\.success\) {\s*setBookings\(\(prev\) => \[result\.data, \.\.\.prev\]\);\s*setBookingSuccess\(result\.data\);\s*}\s*} catch\(err\) {[\s\S]*?}/,
  `try {
      const { data, error } = await supabase.from('appointments').insert([{
        aspirant_name: formData.name,
        email: formData.email,
        mobile: formData.mobileNumber || formData.phone,
        date: formData.preferredDate,
        time: formData.preferredTime,
        service_type: formData.counsellingType,
        message: formData.questions
      }]).select();
      
      if (!error && data && data.length > 0) {
        const resultData = {
          ...newBooking,
          id: data[0].id,
          ticket_number: data[0].id.substring(0,8)
        };
        setBookings((prev) => [resultData, ...prev]);
        setBookingSuccess(resultData);
      }
    } catch(err) {
      console.error(err);
      setBookings((prev) => [newBooking, ...prev]);
      setBookingSuccess(newBooking);
    }`
);

// Replace handleCancel delete
code = code.replace(
  /const updated = bookings\.filter\(\(b\) => b\.id !== id\);\s*setBookings\(updated\);/,
  `supabase.from('appointments').delete().eq('id', id).then(() => {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
    });`
);

fs.writeFileSync(file, code);

console.log('AboutAndAppointment patched');
