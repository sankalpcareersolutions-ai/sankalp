const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /<h4 className="text-sm font-poppins font-extrabold tracking-wider uppercase text-secondary">Contact Us<\/h4>\s*<ul className="space-y-2 text-sm font-bold text-white\/80">\s*<li className="flex items-center gap-2">\s*<Mail className="w-4 h-4 text-secondary font-semibold" \/> sankalpcareersolutions@gmail\.com\s*<\/li>\s*<li className="flex items-center gap-2 mt-2">\s*<a href="https:\/\/www\.careercounsellinghub\.com" className="text-secondary hover:underline">www\.careercounsellinghub\.com<\/a>\s*<\/li>\s*<\/ul>/m;

const repl = `<h4 className="text-sm font-poppins font-extrabold tracking-wider uppercase text-secondary">Contact Us</h4>
            <ul className="space-y-2 text-sm font-bold text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary font-semibold" /> +91-8528335708
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary font-semibold text-xs flex items-center justify-center font-mono">WA:</span> +91-8528335708
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary font-semibold" /> sankalpcareersolutions@gmail.com
              </li>
              <li className="flex items-center gap-2 mt-2"> 
                 <a href="https://www.careercounsellinghub.com" className="text-secondary hover:underline">www.careercounsellinghub.com</a>
              </li>
            </ul>`;

if (regex.test(code)) {
  code = code.replace(regex, repl);
  if (!code.includes('Phone')) {
    code = code.replace(/import {([^}]+)} from "lucide-react";/, 'import { $1, Phone } from "lucide-react";');
  }
  fs.writeFileSync('src/App.tsx', code);
  console.log('patched App.tsx');
} else {
  console.log('Regex did not match');
}
