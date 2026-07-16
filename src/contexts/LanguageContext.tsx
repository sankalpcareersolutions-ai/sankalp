import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "../locales/en";
import hiTranslations from "../locales/hi";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("app_lang") as Language;
    return saved === "hi" ? "hi" : "en";
  });

  useEffect(() => {
    localStorage.setItem("app_lang", language);
    document.documentElement.lang = language;
    if (language === "hi") {
      document.title = "करियर काउंसलिंग हब - संकल्प (Career Counselling Hub)";
    } else {
      document.title = "Career Counselling Hub - Sankalp";
    }
  }, [language]);

  const t = (key: string, variables?: Record<string, string | number>) => {
    const translations: Record<string, any> = language === "hi" ? hiTranslations : enTranslations;
    const keys = key.split(".");
    let value = translations;
    
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    
    let text = typeof value === "string" ? value : key;
    
    if (variables && text !== key) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{${k}}`, "g"), String(v));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
