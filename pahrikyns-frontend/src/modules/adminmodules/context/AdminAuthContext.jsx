import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../../../api/axios";


export const AdminAuthContext = createContext();
export const useAdminAuth = () => useContext(AdminAuthContext);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ AUTO LOAD ADMIN FROM LOCAL STORAGE ON APP START
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    const token = localStorage.getItem("ADMIN_TOKEN");

    if (savedAdmin && token) {
      setAdmin(JSON.parse(savedAdmin));
    } else {
      setAdmin(null);
    }

    setLoading(false);
  }, []);

  // ==================
  // LOGIN
  // ==================
  async function login({ email, password }) {
    const res = await API.post("/admin/login", { email, password });

    // ✅ OTP REQUIRED
    if (res.data.next === "otp") {
      sessionStorage.setItem("pre_otp_token", res.data.token);
    }

    // ✅ DIRECT LOGIN (NO OTP)
    if (res.data.token && res.data.next !== "otp") {
      const adminObj = { email, role: "admin" };

      setAdmin(adminObj);
      localStorage.setItem("admin", JSON.stringify(adminObj));
      localStorage.setItem("ADMIN_TOKEN", res.data.token);
    }

    return res.data;
  }

  // ==================
  // SEND OTP
  // ==================
  async function sendOtp({ email, method }) {
    const token = sessionStorage.getItem("pre_otp_token");

    return API.post(
      "/admin/send-otp",
      { email, method },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // ==================
// VERIFY OTP ✅ FIXED
// ==================
async function verifyOtp({ email, otp }) {
  const token = sessionStorage.getItem("pre_otp_token");

  if (!token) {
    throw new Error("Pre-OTP token missing. Please login again.");
  }

  const res = await API.post(
    "/admin/verify-otp",
    { email, otp },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.data.ok && res.data.token) {
    const adminObj = { email, role: "admin" };

    setAdmin(adminObj);
    localStorage.setItem("admin", JSON.stringify(adminObj));
    localStorage.setItem("ADMIN_TOKEN", res.data.token);

    // 🔥 clear temp token
    sessionStorage.removeItem("pre_otp_token");
  }

  return res.data;
}

  // ==================
  // LOGOUT
  // ==================
  function logout() {
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("ADMIN_TOKEN");
    sessionStorage.removeItem("pre_otp_token");
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        sendOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
