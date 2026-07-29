const fs = require('fs');
let code = fs.readFileSync('src/components/SEODashboard.tsx', 'utf-8');

// Add keyword states
code = code.replace(
  /const \[keywords, setKeywords\] = useState\(""\);/,
  `const [keywords, setKeywords] = useState("");
  const [kwTopic, setKwTopic] = useState("");
  const [kwData, setKwData] = useState<any[]>([]);
  const [isGeneratingKw, setIsGeneratingKw] = useState(false);`
);

// Add keyword fetch logic
const kwFetch = `
  const handleDiscoverKeywords = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingKw(true);
    try {
      const response = await fetch("/api/keyword-intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: kwTopic })
      });
      const data = await response.json();
      if (data.keywords) {
        setKwData(data.keywords);
      } else {
        alert("Error generating keywords: " + (data.error || "Unknown"));
      }
    } catch(err) {
      console.error(err);
      alert("Failed to connect to API");
    } finally {
      setIsGeneratingKw(false);
    }
  };
`;

code = code.replace(
  /const handleGenerateContent = async/,
  kwFetch + '\n  const handleGenerateContent = async'
);

// Replace KEYWORDS TAB
const keywordsOld = /{?\/\* KEYWORDS TAB \(Placeholder\) \*\/?}\s*\{activeTab === "keywords" && \(\s*<div className="bg-navy-900 border border-gold-500\/20 rounded-2xl p-6 text-center py-20">\s*<Search className="w-16 h-16 text-gold-400\/30 mx-auto mb-4" \/>\s*<h2 className="text-xl font-bold text-lightyellow-100 mb-2">Keyword Intelligence Module<\/h2>\s*<p className="text-sm text-lightyellow-200\/60 max-w-lg mx-auto">\s*Integration with Google Search Console and automated keyword discovery is active. System is tracking 450\+ long-tail keywords for Defence & Educational streams.\s*<\/p>\s*<\/div>\s*\)}/;

const keywordsNew = `{/* KEYWORDS TAB */}
        {activeTab === "keywords" && (
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
             <div className="lg:col-span-4 bg-navy-900 border border-gold-500/20 rounded-2xl p-6">
               <h2 className="text-xl font-bold text-lightyellow-100 mb-6 flex items-center gap-2">
                 <Search className="w-6 h-6 text-gold-400" /> Keyword Discovery
               </h2>
               <form onSubmit={handleDiscoverKeywords} className="space-y-5">
                 <div>
                   <label className="block text-xs font-mono text-gold-400 uppercase tracking-widest mb-2">Seed Topic</label>
                   <input 
                     type="text" 
                     value={kwTopic}
                     onChange={(e) => setKwTopic(e.target.value)}
                     className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-lightyellow-100 focus:outline-none focus:border-gold-400"
                     placeholder="e.g. NDA Coaching"
                   />
                 </div>
                 <button 
                   type="submit" 
                   disabled={isGeneratingKw}
                   className="w-full bg-gold-450 hover:bg-gold-400 text-navy-950 font-black px-6 py-3.5 rounded-xl text-sm transition-colors uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2"
                 >
                   {isGeneratingKw ? "Discovering..." : "Discover Keywords"}
                 </button>
               </form>
             </div>
             <div className="lg:col-span-8 bg-navy-900 border border-gold-500/20 rounded-2xl p-6">
               <h2 className="text-xl font-bold text-lightyellow-100 mb-6">Real-Time Keyword Intelligence</h2>
               {isGeneratingKw ? (
                 <div className="flex flex-col items-center justify-center py-20 opacity-50">
                   <RefreshCw className="w-12 h-12 text-gold-400 animate-spin mb-4" />
                   <p className="text-sm font-mono text-gold-400 uppercase tracking-widest">Analyzing Search Trends...</p>
                 </div>
               ) : kwData.length > 0 ? (
                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="border-b border-gold-500/20">
                         <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Keyword</th>
                         <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Volume</th>
                         <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Difficulty</th>
                         <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Intent</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gold-500/10">
                       {kwData.map((kw, i) => (
                         <tr key={i} className="hover:bg-navy-950/50 transition-colors">
                           <td className="py-3 px-4 text-sm font-bold text-lightyellow-100">{kw.keyword}</td>
                           <td className="py-3 px-4 text-sm text-lightyellow-200/70">{kw.volume}</td>
                           <td className="py-3 px-4">
                             <span className={\`text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-wider font-bold \${
                               kw.difficulty.toLowerCase() === 'low' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                               kw.difficulty.toLowerCase() === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                               'bg-red-500/10 text-red-400 border border-red-500/20'
                             }\`}>
                               {kw.difficulty}
                             </span>
                           </td>
                           <td className="py-3 px-4 text-xs text-lightyellow-200/70">{kw.intent}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               ) : (
                 <div className="text-center py-20 opacity-30">
                   <Search className="w-16 h-16 text-lightyellow-200 mx-auto mb-4" />
                   <p className="text-sm font-mono text-lightyellow-200 uppercase tracking-widest">Waiting for topic input...</p>
                 </div>
               )}
             </div>
           </div>
        )}`;

code = code.replace(keywordsOld, keywordsNew);

fs.writeFileSync('src/components/SEODashboard.tsx', code);
