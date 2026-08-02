const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(
  /app\.get\("\/api\/appointments", async \(req, res\) => {\s*try {\s*if \(supabaseUrl\.includes\('vazdxebogaeubgfzrkac'\)\) {\s*return res\.json\(\[\]\);\s*}\s*try {/,
  `app.get("/api/appointments", async (req, res) => {
    if (supabaseUrl.includes('vazdxebogaeubgfzrkac')) {
      return res.json([]);
    }
    try {`
);
fs.writeFileSync('server.ts', code);
console.log("Fixed server.ts syntax");
