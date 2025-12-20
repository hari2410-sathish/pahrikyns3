import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const AppThemeContext = createContext();   // ✅ ADD THIS LINE

export const useThemeMode = () => useContext(AppThemeContext);

export default function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#2563eb" },
          secondary: { main: "#facc15" },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <AppThemeContext.Provider value={{ theme: mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
