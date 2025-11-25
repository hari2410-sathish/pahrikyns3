// src/ThemeContext.jsx
import { createContext, useState } from "react";

export const AppThemeContext = createContext();

export default function AppThemeProvider({ children }) {
  const [variant, setVariant] = useState("futuristic");

  return (
    <AppThemeContext.Provider value={{ variant, setVariant }}>
      {children}
    </AppThemeContext.Provider>
  );
}
