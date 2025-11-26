import api from "./axios";

// ----------------------------
// ADMIN LOGIN (matches backend)
// ----------------------------
export const loginAdmin = async (email, password) => {
  try {
    const res = await api.post("/admin/login", { email, password });
    return {
      ok: true,
      token: res.data.token,
      user: res.data.admin,
    };
  } catch (err) {
    return {
      ok: false,
      error: err.response?.data?.message || "Login failed",
    };
  }
};

// ----------------------------
// VERIFY TOKEN (simple check)
// ----------------------------
export const verifyAdminToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
    return payload;
  } catch {
    return null;
  }
};
