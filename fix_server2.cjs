const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(
  /const supabaseUrl = process\.env\.VITE_SUPABASE_URL \|\| 'https:\/\/vazdxebogaeubgfzrkac\.supabase\.co';/,
  `let envUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseUrl = envUrl.startsWith('http') ? envUrl : 'https://vazdxebogaeubgfzrkac.supabase.co';`
);
// Also fix the tsc error response.text() -> response.text
code = code.replace(/response\.text\(\)/g, "response.text");
fs.writeFileSync('server.ts', code);
