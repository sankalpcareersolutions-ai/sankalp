import React, { useState } from "react";
import { 
  BarChart, LineChart, Search, Globe, Zap, Settings, RefreshCw, 
  FileText, Link as LinkIcon, Activity, CheckCircle, AlertTriangle, 
  ChevronRight, Download, Brain, FileJson, TrendingUp, Users, Smartphone,
  Mail, MessageSquare, Plus, PenTool, LayoutTemplate
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SEODashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("English");

  const handleGenerateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-seo-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, keywords, language })
      });
      
      const data = await response.json();
      if (response.ok) {
        setGeneratedContent(data);
      } else {
        alert("Error generating content: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Failed to connect to AI service. Ensure GEMINI_API_KEY is set in your environment.");
    } finally {
      setIsGenerating(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Performance Overview", icon: BarChart },
    { id: "technical", label: "Technical SEO", icon: Zap },
    { id: "content", label: "AI Content Generator", icon: Brain },
    { id: "keywords", label: "Keyword Intelligence", icon: Search },
    { id: "leads", label: "Lead Generation CRM", icon: Users },
  ];

  return (
    <div className="space-y-6 animate-fade-in" id="seo_dashboard_root">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-gold-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
           <Globe className="w-64 h-64 text-gold-500" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gold-500/10 text-gold-400 text-[10px] font-mono px-2 py-1 rounded border border-gold-500/20 uppercase tracking-widest font-black flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> AI-Powered
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-widest font-black flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> System Active
              </span>
            </div>
            <h1 className="text-3xl font-black text-lightyellow-100 tracking-tight font-sans mb-2">
              SEO Automation Command Center
            </h1>
            <p className="text-lightyellow-200/70 text-sm max-w-2xl">
              Centralized dashboard for technical SEO, AI content generation, keyword intelligence, and lead tracking for CareerCounsellingHub.com.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-navy-800 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
              <RefreshCw className="w-4 h-4" /> Run Weekly Tasks
            </button>
            <button className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <FileJson className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                ? "bg-gold-450 text-navy-950 shadow-md" 
                : "bg-navy-900 border border-gold-500/10 text-lightyellow-200/70 hover:border-gold-500/30 hover:text-lightyellow-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-navy-900 border border-gold-500/10 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                    +24.5%
                  </span>
                </div>
                <h3 className="text-lightyellow-200/50 text-xs font-mono uppercase tracking-widest mb-1">Organic Traffic</h3>
                <p className="text-2xl font-black text-lightyellow-100">12,450</p>
                <p className="text-xs text-lightyellow-200/40 mt-1">Visitors this month</p>
              </div>

              <div className="bg-navy-900 border border-gold-500/10 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gold-500/10 rounded-lg text-gold-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                    98/100
                  </span>
                </div>
                <h3 className="text-lightyellow-200/50 text-xs font-mono uppercase tracking-widest mb-1">SEO Health Score</h3>
                <p className="text-2xl font-black text-lightyellow-100">Excellent</p>
                <p className="text-xs text-lightyellow-200/40 mt-1">Based on 120 checks</p>
              </div>

              <div className="bg-navy-900 border border-gold-500/10 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                    +12
                  </span>
                </div>
                <h3 className="text-lightyellow-200/50 text-xs font-mono uppercase tracking-widest mb-1">Top 10 Keywords</h3>
                <p className="text-2xl font-black text-lightyellow-100">145</p>
                <p className="text-xs text-lightyellow-200/40 mt-1">Ranking in top 10 positions</p>
              </div>

              <div className="bg-navy-900 border border-gold-500/10 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                    +18%
                  </span>
                </div>
                <h3 className="text-lightyellow-200/50 text-xs font-mono uppercase tracking-widest mb-1">Lead Conversions</h3>
                <p className="text-2xl font-black text-lightyellow-100">342</p>
                <p className="text-xs text-lightyellow-200/40 mt-1">Enquiries & Bookings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-navy-900 border border-gold-500/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-lightyellow-100 mb-6 flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-gold-400" /> Search Console Integration (Mock)
                </h3>
                <div className="h-64 border-b border-l border-gold-500/20 relative flex items-end px-4 gap-2">
                  {/* Mock Chart Bars */}
                  {[40, 55, 45, 60, 75, 65, 80, 90, 85, 100, 95, 110].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-gold-500/10 to-gold-400/40 rounded-t-sm hover:to-gold-400/60 transition-colors relative group" style={{ height: `${(h/120)*100}%` }}>
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy-950 text-gold-400 text-[10px] px-2 py-1 rounded border border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                         ${h}k
                       </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-lightyellow-200/50 font-mono">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
              </div>

              <div className="bg-navy-900 border border-gold-500/10 rounded-2xl p-6 flex flex-col">
                <h3 className="text-lg font-bold text-lightyellow-100 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" /> AI Recommendations
                </h3>
                <div className="space-y-4 flex-grow">
                  <div className="bg-navy-950 border border-amber-500/20 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-amber-400 mb-1">Create Topic Cluster: "NDA 2026"</h4>
                    <p className="text-xs text-lightyellow-200/70">Search volume for "NDA 2026 notification" is surging. AI suggests generating 3 pillar articles.</p>
                  </div>
                  <div className="bg-navy-950 border border-blue-500/20 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-blue-400 mb-1">Optimize Internal Links</h4>
                    <p className="text-xs text-lightyellow-200/70">5 pages in the "Polytechnic" category have no inbound internal links (Orphan pages).</p>
                  </div>
                  <div className="bg-navy-950 border border-emerald-500/20 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-emerald-400 mb-1">Update Core Web Vitals</h4>
                    <p className="text-xs text-lightyellow-200/70">LCP on mobile is currently 2.8s. Recommend enabling aggressive image compression.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TECHNICAL SEO TAB */}
        {activeTab === "technical" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-lightyellow-100 mb-2">Technical SEO Automation</h2>
            <p className="text-sm text-lightyellow-200/60 mb-6">Manage automated generation of essential SEO files and schema markup.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Generate XML Sitemap", icon: Globe, desc: "Automatically map all routes and notify Google & Bing.", status: "Active" },
                { title: "Robots.txt Generator", icon: FileText, desc: "Dynamic robots.txt based on environment.", status: "Active" },
                { title: "Schema Markup Injector", icon: FileJson, desc: "Auto-injects FAQ, Article, & LocalBusiness schema.", status: "Active" },
                { title: "Canonical URL Enforcer", icon: LinkIcon, desc: "Prevents duplicate content penalties.", status: "Active" },
                { title: "Core Web Vitals Optimizer", icon: Zap, desc: "Lazy-loading and font optimization.", status: "Active" },
                { title: "hreflang Tag Manager", icon: Globe, desc: "Manages Hindi/English SEO equivalents.", status: "Active" },
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
                  <button className="w-full bg-navy-950 border border-gold-500/30 text-gold-400 py-2 rounded-lg text-xs font-bold hover:bg-gold-500/10 transition-colors">
                    Configure / Run
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI CONTENT GENERATOR TAB */}
        {activeTab === "content" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-5 bg-navy-900 border border-gold-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-lightyellow-100 mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-gold-400" /> SEO Content Generator
              </h2>
              
              <form onSubmit={handleGenerateContent} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-gold-400 uppercase tracking-widest mb-2">Primary Topic / Title</label>
                  <input 
                    type="text" 
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-lightyellow-100 focus:outline-none focus:border-gold-400"
                    placeholder="e.g. How to clear NDA Exam in first attempt"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono text-gold-400 uppercase tracking-widest mb-2">Target Keywords (Comma separated)</label>
                  <input 
                    type="text" 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-lightyellow-100 focus:outline-none focus:border-gold-400"
                    placeholder="nda preparation, ssb interview, defence career"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gold-400 uppercase tracking-widest mb-2">Language</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-lightyellow-100 focus:outline-none focus:border-gold-400 appearance-none"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Hinglish">Hinglish</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isGenerating}
                    className="w-full bg-gold-450 hover:bg-gold-400 text-navy-950 font-black px-6 py-3.5 rounded-xl text-sm transition-colors uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <><RefreshCw className="w-5 h-5 animate-spin" /> Generating AI Content...</>
                    ) : (
                      <><Zap className="w-5 h-5" /> Generate SEO Article</>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 p-4 bg-navy-950 border border-blue-500/20 rounded-xl">
                <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1.5"><LayoutTemplate className="w-4 h-4" /> Automated Features</h4>
                <ul className="text-[10px] text-lightyellow-200/60 space-y-1.5 list-disc pl-4">
                  <li>Generates perfect 50-60 char Title & 150-160 char Meta Desc.</li>
                  <li>Builds H1, H2, H3 semantic structure.</li>
                  <li>Includes FAQ schema formatted questions.</li>
                  <li>Recommends optimal featured image prompt.</li>
                </ul>
              </div>
            </div>

            {/* Output Preview */}
            <div className="lg:col-span-7 bg-navy-900 border border-gold-500/20 rounded-2xl p-6 flex flex-col">
              <h2 className="text-xl font-bold text-lightyellow-100 mb-6 flex items-center justify-between">
                <span>Output Preview</span>
                {generatedContent && (
                  <button className="text-xs bg-navy-950 border border-gold-500/30 px-3 py-1.5 rounded-lg text-gold-400 hover:bg-gold-500/10 transition-colors flex items-center gap-1.5 font-sans">
                    <Plus className="w-4 h-4" /> Publish to Blog
                  </button>
                )}
              </h2>
              
              <div className="flex-grow bg-navy-950 border border-gold-500/10 rounded-xl p-6 overflow-y-auto max-h-[600px] custom-scrollbar">
                {isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <Brain className="w-16 h-16 text-gold-400 animate-pulse" />
                    <p className="text-sm font-mono text-gold-400 uppercase tracking-widest">Synthesizing SEO Data...</p>
                  </div>
                ) : generatedContent ? (
                  <div className="space-y-6">
                    <div className="space-y-2 border-b border-gold-500/10 pb-4">
                       <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Slug: /{generatedContent.slug}</span>
                       <h3 className="text-2xl font-black text-lightyellow-100">{generatedContent.title}</h3>
                       <p className="text-sm text-lightyellow-200/60 italic">{generatedContent.metaDescription}</p>
                    </div>
                    
                    <div className="prose prose-invert prose-gold max-w-none prose-sm">
                       {/* Render markdown simply (in real app, use react-markdown) */}
                       <pre className="whitespace-pre-wrap font-sans text-lightyellow-100/90 text-sm">{generatedContent.content}</pre>
                    </div>

                    <div className="border-t border-gold-500/10 pt-4 mt-6">
                      <h4 className="text-sm font-bold text-gold-400 mb-3">Generated FAQs</h4>
                      <div className="space-y-3">
                        {generatedContent.faqs?.map((faq: any, i: number) => (
                          <div key={i} className="bg-navy-900 p-3 rounded-lg border border-gold-500/10">
                            <p className="font-bold text-sm text-lightyellow-100">Q: {faq.question}</p>
                            <p className="text-xs text-lightyellow-200/70 mt-1">A: {faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                    <PenTool className="w-16 h-16 text-lightyellow-200" />
                    <p className="text-sm font-mono text-lightyellow-200 uppercase tracking-widest">Waiting for input...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LEAD GENERATION CRM TAB */}
        {activeTab === "leads" && (
          <div className="bg-navy-900 border border-gold-500/20 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-lightyellow-100 flex items-center gap-2">
                <Users className="w-6 h-6 text-gold-400" /> Incoming Leads & Enquiries
              </h2>
              <div className="flex gap-2">
                <button className="bg-navy-950 border border-gold-500/30 text-gold-400 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gold-500/10">Export CSV</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gold-500/20">
                    <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Date</th>
                    <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Name</th>
                    <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Source</th>
                    <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Interest</th>
                    <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Status</th>
                    <th className="py-3 px-4 text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-500/10">
                  {[
                    { date: "2026-07-22", name: "Rahul Verma", source: "SEO - NDA Article", interest: "NDA Coaching", status: "New" },
                    { date: "2026-07-21", name: "Priya Singh", source: "WhatsApp Widget", interest: "SSB Mentorship", status: "Contacted" },
                    { date: "2026-07-21", name: "Amit Kumar", source: "Direct Booking", interest: "ISRO Guidance", status: "Converted" },
                    { date: "2026-07-20", name: "Neha Sharma", source: "SEO - Law Careers", interest: "General Counselling", status: "Follow Up" },
                  ].map((lead, i) => (
                    <tr key={i} className="hover:bg-navy-950/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-lightyellow-200/70">{lead.date}</td>
                      <td className="py-3 px-4 text-sm font-bold text-lightyellow-100">{lead.name}</td>
                      <td className="py-3 px-4 text-xs text-lightyellow-200/70">{lead.source}</td>
                      <td className="py-3 px-4 text-sm text-lightyellow-100">{lead.interest}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-wider font-bold ${
                          lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          lead.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-stone-500/10 text-stone-400 border border-stone-500/20'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 bg-navy-950 rounded hover:bg-gold-500/20 text-gold-400 transition" title="WhatsApp"><Smartphone className="w-4 h-4" /></button>
                          <button className="p-1.5 bg-navy-950 rounded hover:bg-gold-500/20 text-gold-400 transition" title="Email"><Mail className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* KEYWORDS TAB (Placeholder) */}
        {activeTab === "keywords" && (
           <div className="bg-navy-900 border border-gold-500/20 rounded-2xl p-6 text-center py-20">
             <Search className="w-16 h-16 text-gold-400/30 mx-auto mb-4" />
             <h2 className="text-xl font-bold text-lightyellow-100 mb-2">Keyword Intelligence Module</h2>
             <p className="text-sm text-lightyellow-200/60 max-w-lg mx-auto">
               Integration with Google Search Console and automated keyword discovery is active. System is tracking 450+ long-tail keywords for Defence & Educational streams.
             </p>
           </div>
        )}

      </div>
    </div>
  );
}
