const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');

// add import for SEODashboard
code = code.replace(
  /import \{ supabase \} from "\.\.\/lib\/supabase";/,
  'import { supabase } from "../lib/supabase";\nimport SEODashboard from "./SEODashboard";'
);

// add activeTab state
code = code.replace(
  /const \[loadingData, setLoadingData\] = useState\(false\);/,
  'const [loadingData, setLoadingData] = useState(false);\n  const [activeAdminTab, setActiveAdminTab] = useState("appointments");'
);

const renderTabs = `
      <div className="flex gap-4 border-b border-gold-500/20 pb-4">
        <button 
          onClick={() => setActiveAdminTab("appointments")}
          className={\`px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider rounded-lg transition-colors \${activeAdminTab === 'appointments' ? 'bg-gold-500 text-navy-950' : 'text-gold-400 hover:bg-navy-800'}\`}
        >
          Appointments
        </button>
        <button 
          onClick={() => setActiveAdminTab("seo")}
          className={\`px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider rounded-lg transition-colors \${activeAdminTab === 'seo' ? 'bg-gold-500 text-navy-950' : 'text-gold-400 hover:bg-navy-800'}\`}
        >
          SEO Automation
        </button>
      </div>
      
      {activeAdminTab === "seo" ? (
         <SEODashboard />
      ) : (
`;

code = code.replace(
  /<div className="bg-navy-900\/50 border border-gold-500\/20 rounded-2xl p-6">/,
  renderTabs + '\n<div className="bg-navy-900/50 border border-gold-500/20 rounded-2xl p-6">'
);

code = code.replace(
  /<\/div>\n    <\/div>\n  \);\n\}/,
  '</div>\n      )}\n    </div>\n  );\n}'
);

fs.writeFileSync('src/components/AdminPanel.tsx', code);
