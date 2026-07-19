import React, { useState, useEffect, useRef } from "react";
import { Compass, Shield, Search, Menu, X, BookOpen, Calendar, Award, GraduationCap, Users, FileText, Globe, MoreHorizontal, ChevronDown } from "lucide-react";
import logoImg from "../assets/images/sankalp_epic_logo_1780997195913.png";
import { useLanguage } from "../contexts/LanguageContext";

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  enrolledCount: number;
  bookedCount: number;
  alertCount?: number;
}

export default function Navbar({
  currentTab,
  onTabChange,
  searchTerm,
  onSearchChange,
  enrolledCount,
  bookedCount,
  alertCount = 0,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { id: "home", label: t("navbar.nav_overview"), icon: Compass },
    { id: "career-library", label: t("navbar.nav_library"), icon: BookOpen },
    { id: "exams", label: t("navbar.nav_exams"), icon: FileText, badge: alertCount > 0 ? alertCount : null },
    { id: "dashboard", label: t("navbar.nav_dashboard"), icon: GraduationCap, badge: enrolledCount > 0 ? enrolledCount : null },
    { id: "mentorship", label: t("navbar.nav_mentorship"), icon: Users, badge: bookedCount > 0 ? bookedCount : null },
    { id: "appointment", label: t("navbar.nav_appointment"), icon: Calendar },
    { id: "courses", label: t("navbar.nav_courses"), icon: BookOpen },
    { id: "placements", label: t("navbar.nav_placements"), icon: Award },
    { id: "study-material", label: t("navbar.nav_study_material"), icon: BookOpen },
    { id: "testimonials", label: t("navbar.nav_testimonials"), icon: Shield },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#0B1F3A]/95 backdrop-blur-md shadow-md border-b border-primary/20 py-0 text-white" : "bg-white/10 backdrop-blur-md border-b border-white/20 py-2 text-white"}`} id="main_navigation_bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand SANKALP */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick("home")}>
            <img
              src={logoImg}
              alt="Career Counselling Hub Logo"
              className="w-12 h-12 object-contain rounded-xl border-2 border-gray-200 shadow-2xl transition-transform hover:scale-105 duration-200"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-primary font-poppins font-bold text-base sm:text-lg md:text-xl xl:text-2xl tracking-tight leading-none whitespace-nowrap">
                {t("navbar.brand")}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-sans font-medium text-primary uppercase tracking-widest mt-1 hidden sm:block whitespace-nowrap">
                {t("navbar.subtitle")}
              </span>
            </div>
          </div>

          {/* Core Central Search Hook */}
          <div className="hidden lg:flex items-center relative max-w-xs flex-1 mx-8 border-gray-200">
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

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-1.5 flex-wrap justify-end flex-1 lg:flex-none">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  id={`nav_tab_${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2 lg:px-3 py-1.5 rounded-lg text-[11px] lg:text-[13px] font-sans font-extrabold tracking-wide flex items-center gap-1.5 transition cursor-pointer relative ${
                    isActive
                      ? "bg-white/10 text-primary shadow-md border border-primary/30"
                      : "hover:bg-white/5 text-white/70 hover:text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary font-bold hidden xl:block" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-primary text-[9px] font-black text-[#0B1F3A] px-1.5 py-0.2 rounded-full border border-navy-900">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* More dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-2 lg:px-3 py-1.5 rounded-lg text-[11px] lg:text-[13px] font-sans font-extrabold tracking-wide flex items-center gap-1.5 transition cursor-pointer relative hover:bg-white/5 text-white/70 hover:text-primary ${dropdownOpen ? "bg-gray-50 text-primary" : ""}`}
              >
                <MoreHorizontal className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary font-bold hidden xl:block" />
                <span>More</span>
                <ChevronDown className={`w-3 h-3 text-primary transition-transform ${dropdownOpen ? 'rotate-180' : ''} font-semibold`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0B1F3A] border border-primary/20 rounded-lg shadow-xl py-2 z-50 animate-fade-in flex flex-col">
                  {navItems.slice(5).map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleNavClick(item.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[12px] font-sans font-bold flex items-center justify-between transition-colors ${
                          isActive
                            ? "bg-white/10 text-primary font-semibold border-l-2 border-primary"
                            : "text-white/70 hover:bg-white/10 hover:text-primary border-l-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-primary font-semibold" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-primary text-[9px] font-bold text-[#0B1F3A] px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Language Switcher and Mobile Menu Action Icon */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/10 border border-primary/20 rounded-lg p-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-[10px] font-bold rounded-md transition ${language === 'en' ? 'bg-primary text-[#0B1F3A]' : 'text-white/70 hover:text-primary'}`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2 py-1 text-[10px] font-bold rounded-md transition ${language === 'hi' ? 'bg-primary text-[#0B1F3A]' : 'text-white/70 hover:text-primary'}`}
              >
                🇮🇳 HI
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button
                id="mobile_menu_toggle_btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white/70 hover:text-white cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/20 bg-[#0B1F3A] px-2 pt-2 pb-3 space-y-1 animate-fade-in" id="mobile_drawer_container">
          {/* Mobile Search bar */}
          <div className="p-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 font-semibold" />
            <input
              id="navbar_mobile_search"
              type="text"
              placeholder={t("navbar.search")}
              className="w-full bg-white/10 border border-primary/20 rounded-lg pl-10 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary placeholder-white/50 cursor-text"
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
                    ? "bg-white/10 text-primary border border-primary/30"
                    : "hover:bg-white/5 text-white/70"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary font-semibold" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-primary text-[9px] font-bold text-[#0B1F3A] px-2 py-0.5 rounded-full">
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
