const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
if (!code.includes("import * as dotenv from 'dotenv'")) {
  code = "import * as dotenv from 'dotenv';\ndotenv.config();\n" + code;
  fs.writeFileSync('server.ts', code);
}
console.log("patched dotenv");
