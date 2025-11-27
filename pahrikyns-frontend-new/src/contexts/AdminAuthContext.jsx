import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

export const AdminAuthContext = createContext();
export const useAdminAuth = () => useContext(AdminAuthContext);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  // LOGIN
  async function login({ email, password }) {
    const res = await API.post("/admin/login", { email, password });

    if (res.data.next === "otp") {
      sessionStorage.setItem("pre_otp_token", res.data.token);
    }

    return res.data;
  }

  // SEND OTP
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

  // VERIFY OTP
  async function verifyOtp({ email, otp }) {
    const res = await API.post("/admin/verify-otp", { email, otp });

    if (res.data.ok && res.data.token) {
      const adminObj = { email, role: "admin" };

      setAdmin(adminObj);
      localStorage.setItem("admin", JSON.stringify(adminObj));
      localStorage.setItem("admin_token", res.data.token);
    }

    return res.data;
  }

  function logout() {
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("admin_token");
    sessionStorage.removeItem("pre_otp_token");
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
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
