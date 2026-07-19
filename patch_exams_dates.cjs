const fs = require('fs');
let content = fs.readFileSync('src/components/SovereignExams.tsx', 'utf-8');

// Update Props
const propsRegex = /interface SovereignExamsProps \{([\s\S]*?)\}/;
content = content.replace(propsRegex, (match, p1) => {
  return `interface SovereignExamsProps {${p1}  subscribedExamDates?: Record<string, string>;\n  onSetExamDate?: (examCode: string, date: string) => void;\n}`;
});

// Update component signature
const sigRegex = /export default function SovereignExams\(\{([\s\S]*?)\}: SovereignExamsProps\) \{/;
content = content.replace(sigRegex, (match, p1) => {
  return `export default function SovereignExams({${p1}, subscribedExamDates = {}, onSetExamDate = () => {}}: SovereignExamsProps) {`;
});

// Add an input field for the date in the exam card when subscribed.
// We'll place it under the "Subscribed" button or next to it.
const btnRegex = /(<button[\s\S]*?<span>\{subscribedExams\.includes\(ex\.code\) \? "Subscribed" : "Get Alerts"\}<\/span>\s*<\/button>)/;
content = content.replace(btnRegex, (match, p1) => {
  return `${match}
                        {subscribedExams.includes(ex.code) && (
                          <div className="flex flex-col ml-3">
                            <label className="text-[9px] text-lightyellow-200/50 mb-0.5">Exam Date</label>
                            <input
                              type="date"
                              value={subscribedExamDates[ex.code] || ""}
                              onChange={(e) => onSetExamDate(ex.code, e.target.value)}
                              className="bg-navy-950 border border-gold-600/30 text-lightyellow-100 text-[10px] px-1.5 py-1 rounded"
                            />
                          </div>
                        )}`;
});

fs.writeFileSync('src/components/SovereignExams.tsx', content);
console.log("Patched SovereignExams.tsx");
