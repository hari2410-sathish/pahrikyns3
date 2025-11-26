// src/ThemeContext.jsx
import { createContext, useState, useEffect } from "react";

export const AppThemeContext = createContext();

export default function AppThemeProvider({ children }) {
  // load saved theme from browser or fallback to "dark"
  const [theme, setTheme] = useState(
    localStorage.getItem("site-theme") || "dark"
  );

  // your existing futuristic variant
  const [variant, setVariant] = useState("futuristic");

  // apply theme to body + save to localStorage
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  // toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AppThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        variant,
        setVariant,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
}
