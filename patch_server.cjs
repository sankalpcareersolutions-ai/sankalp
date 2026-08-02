const fs = require('fs');
let file = 'server.ts';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  /let appointments: any\[\] = \[\];/,
  `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://vazdxebogaeubgfzrkac.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);`
);

code = code.replace(
  /app\.get\("\/api\/appointments", \(req, res\) => {[\s\S]*?}\);/,
  `app.get("/api/appointments", async (req, res) => {
    try {
      const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });`
);

code = code.replace(
  /app\.post\("\/api\/appointments", \(req, res\) => {[\s\S]*?}\);/,
  `app.post("/api/appointments", async (req, res) => {
    try {
      const apt = req.body;
      
      // Server-side Data Validation
      if (!apt.name || !apt.email || !apt.preferredDate || !apt.preferredTime) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      
      // Availability Checks (Mock logic for time slot conflict)
      const { data: existing, error: checkErr } = await supabase
        .from('appointments')
        .select('*')
        .eq('date', apt.preferredDate)
        .eq('time', apt.preferredTime);
        
      if (checkErr) throw checkErr;
      
      if (existing && existing.length >= 3) {
        return res.status(409).json({ success: false, error: "This time slot is fully booked. Please select another time." });
      }
      
      // Database Insert Operation
      const { data, error } = await supabase.from('appointments').insert([{
        aspirant_name: apt.name,
        email: apt.email,
        mobile: apt.mobileNumber || apt.phone || '',
        date: apt.preferredDate,
        time: apt.preferredTime,
        service_type: apt.counsellingType || 'General',
        message: apt.questions || ''
      }]).select();
      
      if (error) throw error;
      
      // Trigger notifications here in the future
      
      res.json({ success: true, data: data[0] });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  });`
);

fs.writeFileSync(file, code);
console.log("server.ts patched");
