// src/contexts/AdminAuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { loginAdmin, verifyAdminToken } from "../api/admin";

const AUTH_TOKEN_KEY = "admin_auth_token_v1";
const AUTH_USER_KEY = "admin_user_v1";

const AdminAuthContext = createContext(null);

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() =>
    localStorage.getItem(AUTH_TOKEN_KEY)
  );

  const [loading, setLoading] = useState(true);

  // ----------------- ON MOUNT: VERIFY TOKEN -----------------
  useEffect(() => {
    async function init() {
      if (token) {
        const payload = verifyAdminToken(token);

        if (!payload) {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
          setToken(null);
          setUser(null);
        } else {
          if (!user) {
            try {
              const raw = localStorage.getItem(AUTH_USER_KEY);
              if (raw) setUser(JSON.parse(raw));
            } catch {}
          }
        }
      }
      setLoading(false);
    }

    init();
    // eslint-disable-next-line
  }, []);

  // ----------------- ADMIN LOGIN -----------------
  const login = async (email, password) => {
    setLoading(true);

    const resp = await loginAdmin(email, password);

    if (resp.ok) {
      localStorage.setItem(AUTH_TOKEN_KEY, resp.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(resp.user));

      setToken(resp.token);
      setUser(resp.user);
      setLoading(false);

      return { ok: true };
    } else {
      setLoading(false);
      return { ok: false, error: resp.error || "Admin login failed" };
    }
  };

  // ----------------- LOGOUT -----------------
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(user && token),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
