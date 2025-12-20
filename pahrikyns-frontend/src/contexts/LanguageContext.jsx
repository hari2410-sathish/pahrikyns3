import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [langKey, setLangKey] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("APP_LANG");
    if (saved) setLangKey(saved);
  }, []);

  const changeLang = (lang) => {
    setLangKey(lang);
    localStorage.setItem("APP_LANG", lang);
  };

  return (
    <LanguageContext.Provider value={{ langKey, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
