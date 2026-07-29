const fs = require('fs');
let code = fs.readFileSync('src/components/SEODashboard.tsx', 'utf-8');

code = code.replace(/export default function SEODashboard\(\) \{/, 'export default function SEODashboard({ appointments = [] }: { appointments?: any[] }) {');

// Replace the hardcoded mock leads with real time data.
// We'll replace the array inside .map() with appointments
const oldMap = `                  {[
                    { date: "2026-07-22", name: "Rahul Verma", source: "SEO - NDA Article", interest: "NDA Coaching", status: "New" },
                    { date: "2026-07-21", name: "Priya Singh", source: "WhatsApp Widget", interest: "SSB Mentorship", status: "Contacted" },
                    { date: "2026-07-21", name: "Amit Kumar", source: "Direct Booking", interest: "ISRO Guidance", status: "Converted" },
                    { date: "2026-07-20", name: "Neha Sharma", source: "SEO - Law Careers", interest: "General Counselling", status: "Follow Up" },
                  ].map((lead, i) => (`;

const newMap = `                  {appointments.map((lead: any, i: number) => (`;

code = code.replace(oldMap, newMap);

// The object properties also need to map from 'appointments' format
// Actually wait, appointments have: date? No, timestamp, name, focus_area, etc.
// Let's replace the td fields.
const oldRow = `                    <tr key={i} className="hover:bg-navy-950/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-lightyellow-200/70">{lead.date}</td>
                      <td className="py-3 px-4 text-sm font-bold text-lightyellow-100">{lead.name}</td>
                      <td className="py-3 px-4 text-xs text-lightyellow-200/70">{lead.source}</td>
                      <td className="py-3 px-4 text-sm text-lightyellow-100">{lead.interest}</td>
                      <td className="py-3 px-4">
                        <span className={\`text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-wider font-bold \${
                          lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          lead.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-stone-500/10 text-stone-400 border border-stone-500/20'
                        }\`}>
                          {lead.status}
                        </span>
                      </td>`;

const newRow = `                    <tr key={i} className="hover:bg-navy-950/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-lightyellow-200/70">{new Date(lead.timestamp).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-sm font-bold text-lightyellow-100">{lead.name}</td>
                      <td className="py-3 px-4 text-xs text-lightyellow-200/70">Organic (SEO)</td>
                      <td className="py-3 px-4 text-sm text-lightyellow-100">{lead.focus_area}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-wider font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          New
                        </span>
                      </td>`;
                      
code = code.replace(oldRow, newRow);

fs.writeFileSync('src/components/SEODashboard.tsx', code);
