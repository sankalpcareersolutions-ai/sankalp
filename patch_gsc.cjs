const fs = require('fs');
let code = fs.readFileSync('src/components/SEODashboard.tsx', 'utf-8');

const search = `            <p className="text-sm text-lightyellow-200/60 mb-6">Manage automated generation of essential SEO files and schema markup.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;
            
const repl = `            <p className="text-sm text-lightyellow-200/60 mb-6">Manage automated generation of essential SEO files and schema markup.</p>
            
            {/* Google Search Console Integration */}
            <div className="bg-navy-900 border border-emerald-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-lightyellow-100 flex items-center gap-2">
                    Google Search Console API
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-widest font-bold">Connected</span>
                  </h3>
                  <p className="text-xs text-lightyellow-200/70 mt-1 max-w-lg">
                    Real-time synchronization of sitemaps, automated indexing requests, and performance tracking directly synced with GSC.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 relative z-10 w-full md:w-auto">
                <button className="flex-1 md:flex-none bg-navy-950 border border-gold-500/30 text-gold-400 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-gold-500/10 transition-colors">
                  Sync Now
                </button>
                <button className="flex-1 md:flex-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-500/20 transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`;

code = code.replace(search, repl);
fs.writeFileSync('src/components/SEODashboard.tsx', code);
