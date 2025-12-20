import api from "./axios";

export const fetchRevenueAnalytics = async (params = {}) => {
  const res = await api.get("/admin/analytics/revenue", { params });
  return res.data;
};

export const fetchUserGrowthAnalytics = async (params = {}) => {
  const res = await api.get("/admin/analytics/users", { params });
  return res.data;
};

export const fetchCourseAnalytics = async (params = {}) => {
  const res = await api.get("/admin/analytics/courses", { params });
  return res.data;
};
