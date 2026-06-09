import React from "react";
import { Compass, Shield, Search, Menu, X, BookOpen, Calendar, Award, GraduationCap, Users, FileText } from "lucide-react";
import logoImg from "../assets/images/sankalp_epic_logo_1780997195913.png";

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  enrolledCount: number;
  bookedCount: number;
}

export default function Navbar({
  currentTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  enrolledCount,
  bookedCount,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: "Overview", icon: Compass },
    { id: "exams", label: "Sovereign Exams", icon: FileText },
    { id: "dashboard", label: "Cadet Hub", icon: GraduationCap, badge: enrolledCount > 0 ? enrolledCount : null },
    { id: "mentorship", label: "Mentorship", icon: Users, badge: bookedCount > 0 ? bookedCount : null },
    { id: "appointment", label: "Book Appointment", icon: Calendar },
    { id: "courses", label: "Academy Courses", icon: BookOpen },
    { id: "placements", label: "Placements", icon: Award },
    { id: "testimonials", label: "Call of Honor", icon: Shield },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-b from-navy-950 to-navy-900 border-b border-gold-600/30 text-lightyellow-100 sticky top-0 z-40 shadow-xl" id="main_navigation_bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand SANKALP */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick("home")}>
            <img
              src={logoImg}
              alt="Sankalp Logo"
              className="w-12 h-12 object-contain rounded-xl border-2 border-gold-400/70 shadow-2xl transition-transform hover:scale-105 duration-200"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-lightyellow-50 font-black text-lg md:text-2xl tracking-widest font-sans uppercase leading-none">
                SANKALP
              </span>
              <span className="text-[10px] font-mono text-gold-450 font-black uppercase tracking-widest mt-0.5">
                CONSOLIDATED CAREER ENGINE
              </span>
            </div>
          </div>

          {/* Core Central Search Hook */}
          <div className="hidden lg:flex items-center relative max-w-xs flex-1 mx-8 border-gold-400">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400 w-3.5 h-3.5" />
            <input
              id="navbar_central_search"
              type="text"
              placeholder="Query training, mentors, or exams..."
              className="w-full bg-navy-950 text-lightyellow-100 border border-gold-500/20 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-gold-450 focus:border-transparent placeholder-navy-300 cursor-text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== "testimonials") {
                  onTabChange("testimonials");
                }
              }}
            />
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  id={`nav_tab_${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-sans font-extrabold tracking-wide flex items-center gap-1.5 transition cursor-pointer relative ${
                    isActive
                      ? "bg-navy-800 text-white shadow-md border-2 border-gold-450"
                      : "hover:bg-navy-800/60 text-lightyellow-100 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-gold-400 font-bold" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-[9px] font-black text-white px-1.5 py-0.2 rounded-full border border-navy-900">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Action Icon */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile_menu_toggle_btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-lightyellow-100 hover:text-lightyellow-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gold-600/20 bg-navy-950 px-2 pt-2 pb-3 space-y-1 animate-fade-in" id="mobile_drawer_container">
          {/* Mobile Search bar */}
          <div className="p-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 w-4 h-4" />
            <input
              id="navbar_mobile_search"
              type="text"
              placeholder="Search platform..."
              className="w-full bg-navy-900 border border-gold-550/20 rounded-lg pl-10 pr-3 py-1.5 text-xs text-lightyellow-100 focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== "testimonials") {
                  onTabChange("testimonials");
                }
              }}
            />
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                id={`nav_tab_mobile_${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-sans font-bold flex items-center justify-between ${
                  isActive
                    ? "bg-navy-800 text-lightyellow-200 border border-gold-500/20"
                    : "hover:bg-navy-800/50 text-lightyellow-101"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gold-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-600 text-[9px] font-bold text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
