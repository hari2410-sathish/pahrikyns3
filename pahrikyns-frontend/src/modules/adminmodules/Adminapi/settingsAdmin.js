import api from "../../../api/axios";


// ================= PROFILE =================
export const fetchAdminProfile = async () => {
  const res = await api.get("/admin/settings/profile");
  return res.data;
};

export const updateAdminProfile = async (payload) => {
  const res = await api.put("/admin/settings/profile", payload);
  return res.data;
};

// ================= PASSWORD =================
export const changeAdminPassword = async (payload) => {
  const res = await api.post("/admin/settings/change-password", payload);
  return res.data;
};

// ================= 2FA =================
export const fetchTwoFAStatus = async () => {
  const res = await api.get("/admin/settings/2fa");
  return res.data;
};

export const enableTwoFA = async () => {
  const res = await api.post("/admin/settings/2fa/enable");
  return res.data;
};

export const disableTwoFA = async () => {
  const res = await api.post("/admin/settings/2fa/disable");
  return res.data;
};

// ================= SESSIONS =================
export const fetchAdminSessions = async () => {
  const res = await api.get("/admin/settings/sessions");
  return res.data; // { sessions: [] }
};

export const revokeSession = async (sessionId) => {
  const res = await api.post(`/admin/settings/sessions/${sessionId}/revoke`);
  return res.data;
};

// ================= SECURITY LOGS =================
export const fetchSecurityLogs = async () => {
  const res = await api.get("/admin/settings/security-logs");
  return res.data; // { logs: [] }
};
