const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// The central search hook is overlapping. Let's move it to the right side, just before the language switcher
// Currently it is between Logo and Desktop Nav Items.
code = code.replace(
  /\{\/\* Core Central Search Hook \*\/\}[\s\S]*?<\/div>/,
  ''
);

// We'll place it right next to language switcher for lg screens
let replacement = `
          {/* Core Central Search Hook - Shifted Right */}
          <div className="hidden lg:flex items-center relative max-w-[200px] flex-none mr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-3.5 h-3.5 font-semibold" />
            <input
              id="navbar_central_search"
              type="text"
              placeholder={t("navbar.search")}
              className="w-full bg-white/10 text-white border border-primary/20 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-white/50 cursor-text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== "testimonials") {
                  onTabChange("testimonials");
                }
              }}
            />
          </div>
`;

code = code.replace(
  /\{\/\* Language Switcher and Mobile Menu Action Icon \*\/\}/,
  replacement + '\n          {/* Language Switcher and Mobile Menu Action Icon */}'
);

fs.writeFileSync('src/components/Navbar.tsx', code);
