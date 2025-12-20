import React, { createContext, useContext, useEffect, useState } from "react";

/** ========================================================
 * DARK MODE CONTEXT — PRO VERSION (v1)
 * Global theme switcher (Light / Dark)
 * - Saves preference in localStorage
 * - Works across mobile + desktop
 * - Auto-applies CSS class to <html>
 * ======================================================== */

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("dark-mode") === "1";
  });

  useEffect(() => {
    localStorage.setItem("dark-mode", dark ? "1" : "0");

    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const toggle = () => setDark((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
