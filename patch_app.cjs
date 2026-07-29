const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
const search = `              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary font-semibold" /> sankalpcareersolutions@gmail.com
              </li>
              
              <li className="flex items-center gap-2 mt-2"> 
                 <a href="https://www.careercounsellinghub.com" className="text-secondary hover:underline">www.careercounsellinghub.com</a>
              </li>`;
const repl = `              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary font-semibold" /> sankalpcareersolutions@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary font-semibold" /> +91 8528335708
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary font-semibold text-xs flex items-center justify-center">WhatsApp:</span> +91 8528335708
              </li>
              <li className="flex items-center gap-2 mt-2"> 
                 <a href="https://www.careercounsellinghub.com" className="text-secondary hover:underline">www.careercounsellinghub.com</a>
              </li>`;

// Also check imports for Phone
if (!code.includes('Phone')) {
  code = code.replace(/import {([^}]+)} from "lucide-react";/, 'import { $1, Phone } from "lucide-react";');
}

code = code.replace(search, repl);
fs.writeFileSync('src/App.tsx', code);
