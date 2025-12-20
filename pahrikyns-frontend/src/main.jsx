import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { AuthProvider, useAuth } from "./contexts/AuthContext";

// ✅ UPDATED PATH (Admin module moved)
import { AdminAuthProvider } from "./modules/adminmodules/context/AdminAuthContext";

import AppThemeProvider from "./ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { io } from "socket.io-client";

/* ================================
   ✅ SOCKET CONTEXT
================================ */
export const SocketContext = React.createContext(null);

/* ================================
   ✅ SOCKET PROVIDER
================================ */
function SocketProvider({ children }) {
  const { token } = useAuth();
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    if (!token) return;

    const s = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      auth: { token },
      transports: ["websocket"],
      withCredentials: true,
    });

    s.on("connect", () => console.log("✅ Socket connected:", s.id));
    s.on("disconnect", () => console.log("❌ Socket disconnected"));

    s.on("notification", (data) => {
      console.log("🔔 New Notification:", data);
      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});
    });

    s.on("notification_read", (data) => {
      console.log("✅ Notification read sync:", data);
    });

    setSocket(s);
    return () => s.disconnect();
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

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
                  <App />
                </SocketProvider>
              </AppThemeProvider>
            </LanguageProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
