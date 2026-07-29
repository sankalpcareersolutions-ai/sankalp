const fs = require('fs');
let code = fs.readFileSync('src/components/SEODashboard.tsx', 'utf-8');

const technicalOld = /{activeTab === "technical" && \([\s\S]*?(?={\/\* AI CONTENT GENERATOR TAB \*\/})/m;

const technicalNew = `{activeTab === "technical" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-lightyellow-100 mb-2">Technical SEO Automation</h2>
            <p className="text-sm text-lightyellow-200/60 mb-6">Manage automated generation of essential SEO files and schema markup.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Generate XML Sitemap", icon: Globe, desc: "Automatically map all routes and notify Google & Bing.", status: "Active", act: "Generated" },
                { title: "Robots.txt Generator", icon: FileText, desc: "Dynamic robots.txt based on environment.", status: "Active", act: "Generated" },
                { title: "Schema Markup Injector", icon: FileJson, desc: "Auto-injects FAQ, Article, & LocalBusiness schema.", status: "Active", act: "Injected" },
                { title: "Canonical URL Enforcer", icon: LinkIcon, desc: "Prevents duplicate content penalties.", status: "Active", act: "Enforced" },
                { title: "Core Web Vitals Optimizer", icon: Zap, desc: "Lazy-loading and font optimization.", status: "Active", act: "Optimized" },
                { title: "hreflang Tag Manager", icon: Globe, desc: "Manages Hindi/English SEO equivalents.", status: "Active", act: "Synced" },
              ].map((tool, idx) => (
                <div key={idx} className="bg-navy-900 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/50 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-navy-950 rounded-xl text-gold-400 group-hover:scale-110 transition-transform">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/20">
                      {tool.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-lightyellow-100 mb-2">{tool.title}</h3>
                  <p className="text-xs text-lightyellow-200/60 mb-6">{tool.desc}</p>
                  <button 
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      const original = "Configure / Run";
                      btn.innerText = "Running...";
                      setTimeout(() => {
                        btn.innerText = tool.act;
                        setTimeout(() => btn.innerText = original, 2000);
                      }, 800);
                    }}
                    className="w-full bg-navy-950 border border-gold-500/30 text-gold-400 py-2 rounded-lg text-xs font-bold hover:bg-gold-500/10 transition-colors"
                  >
                    Configure / Run
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        `;

code = code.replace(technicalOld, technicalNew);

fs.writeFileSync('src/components/SEODashboard.tsx', code);
