import api from "./axios";

export const fetchAdminDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const fetchRecentActivities = async () => {
  const res = await api.get("/admin/dashboard/activities");
  return res.data;
};
