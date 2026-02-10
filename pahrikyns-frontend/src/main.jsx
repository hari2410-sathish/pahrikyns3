import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { AuthProvider, useAuth } from "./contexts/AuthContext";

// ✅ UPDATED PATH (Admin module moved)
import { AdminAuthProvider } from "./modules/adminmodules/context/AdminAuthContext";

import AppThemeProvider from "./ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import { SocketProvider } from "./contexts/SocketContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import theme from "./theme";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
// SocketProvider is now imported from contexts/SocketContext
// Inline version removed to prevent conflicts

/* ================================
   ✅ ROOT RENDER
================================ */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          {/* ADMIN AUTH - FIXED PATH */}
          <AdminAuthProvider>
            <LanguageProvider>
              <AppThemeProvider>
                <SocketProvider>
                  <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <App />
                  </SnackbarProvider>
                </SocketProvider>
              </AppThemeProvider>
            </LanguageProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
