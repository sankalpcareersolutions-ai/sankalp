const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const importsToAdd = `import fs from "fs";\n`;

code = code.replace(/import express from "express";/, importsToAdd + 'import express from "express";');

const apiToAdd = `
  // Appointments API
  const dataDir = path.join(process.cwd(), 'data');
  const appointmentsFile = path.join(dataDir, 'appointments.json');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(appointmentsFile)) {
    fs.writeFileSync(appointmentsFile, JSON.stringify([]));
  }

  app.get("/api/appointments", (req, res) => {
    try {
      const data = fs.readFileSync(appointmentsFile, "utf-8");
      res.json(JSON.parse(data));
    } catch(err) {
      res.status(500).json({ error: "Failed to read appointments" });
    }
  });

  app.post("/api/appointments", (req, res) => {
    try {
      const data = fs.readFileSync(appointmentsFile, "utf-8");
      const appointments = JSON.parse(data);
      const newAppt = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ticket_number: "TKT-" + Math.floor(1000 + Math.random() * 9000),
        ...req.body
      };
      appointments.unshift(newAppt);
      fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));
      res.json({ success: true, data: newAppt });
    } catch(err) {
      res.status(500).json({ error: "Failed to save appointment" });
    }
  });
`;

code = code.replace(/\/\/ Technical SEO APIs/, apiToAdd + '\n  // Technical SEO APIs');

fs.writeFileSync('server.ts', code);
