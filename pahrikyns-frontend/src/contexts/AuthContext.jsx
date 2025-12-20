import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";
import { registerFCMToken } from "../utils/fcm";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ✅ USE ONLY USER TOKEN
  const [token, setToken] = useState(
    localStorage.getItem("USER_TOKEN")
  );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================================
  // ✅ LOAD USER (SKIP ADMIN ROUTES)
  // ================================
  useEffect(() => {
  if (window.location.pathname.startsWith("/admin")) {
    setLoading(false);
    return;
  }

  const loadUser = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await getCurrentUser();
      const loggedUser = res.data;

      setUser(loggedUser);

      if (loggedUser?.id) {
        registerFCMToken(loggedUser.id);
      }
    } catch (err) {
      console.error("❌ Auth load error:", err);
      localStorage.removeItem("USER_TOKEN");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, [token]); // ✅ correct

  // ================================
  // ✅ LOGIN
  // ================================
  const login = (data) => {
    if (!data?.token || !data?.user) return;

    localStorage.setItem("USER_TOKEN", data.token);
    setToken(data.token);
    setUser(data.user);

    if (data.user?.id) {
      registerFCMToken(data.user.id);
    }
  };

  // ================================
  // ✅ LOGOUT
  // ================================
  const logout = () => {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
