const fs = require('fs');

const homeFile = 'src/components/Home.tsx';
let content = fs.readFileSync(homeFile, 'utf8');

// Insert the Vision Statement block after Hero Section
const visionBlock = `
      {/* Project Sankalp Vision */}
      <section className="bg-navy-900 border border-gold-600/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Vision Statement Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-lightyellow-100 uppercase font-sans tracking-tight">
              {t("home.vision_title")}
            </h2>
            <p className="text-base md:text-lg text-lightyellow-200/90 leading-relaxed max-w-3xl mx-auto font-medium">
              {t("home.vision_intro")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Our Vision */}
            <div className="space-y-4 bg-navy-950/50 p-6 rounded-2xl border border-gold-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-lightyellow-100 uppercase tracking-widest">{t("home.our_vision_title")}</h3>
              </div>
              <p className="text-sm text-lightyellow-200/80 leading-relaxed font-sans">
                {t("home.our_vision_desc")}
              </p>
            </div>

            {/* Our Mission */}
            <div className="space-y-4 bg-navy-950/50 p-6 rounded-2xl border border-gold-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-lightyellow-100 uppercase tracking-widest">{t("home.our_mission_title")}</h3>
              </div>
              <ul className="text-sm text-lightyellow-200/80 leading-relaxed font-sans space-y-2 list-disc list-inside">
                <li>{t("home.our_mission_item1")}</li>
                <li>{t("home.our_mission_item2")}</li>
                <li>{t("home.our_mission_item3")}</li>
                <li>{t("home.our_mission_item4")}</li>
                <li>{t("home.our_mission_item5")}</li>
                <li>{t("home.our_mission_item6")}</li>
              </ul>
            </div>
          </div>

          {/* Motto and Tagline */}
          <div className="text-center space-y-6 pt-6 border-t border-gold-500/20">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-gold-400 uppercase mb-2">{t("home.motto_title")}</h4>
              <p className="text-xl md:text-2xl font-black text-lightyellow-100 italic">
                {t("home.motto_text")}
              </p>
            </div>
            <div className="bg-gold-500/10 rounded-xl py-3 px-6 inline-block border border-gold-500/30">
              <p className="text-sm md:text-base font-bold text-gold-400 uppercase tracking-wide">
                {t("home.tagline_text")}
              </p>
            </div>
          </div>
          
        </div>
      </section>
`;

content = content.replace('{/* 2. Explore Career Library (Categories) */}', visionBlock + '\n      {/* 2. Explore Career Library (Categories) */}');

fs.writeFileSync(homeFile, content);
console.log("Patched Home.tsx");
