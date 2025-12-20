import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Auto attach token (FIXED)
API.interceptors.request.use((config) => {
  const url = config.url || "";

  // ===============================
  // ADMIN ROUTES → ADMIN TOKEN
  // ===============================
  if (url.startsWith("/admin")) {
    const adminToken = localStorage.getItem("ADMIN_TOKEN");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  }

  // ===============================
  // USER ROUTES → USER TOKEN ONLY
  // ===============================
  if (url.startsWith("/auth/user")) {
    const userToken = localStorage.getItem("USER_TOKEN");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  }

  return config;
});

export default API;
