import api from "../../../api/axios";


/* ================================
   ADMIN DASHBOARD – SUMMARY
================================ */
export const getAdminSummary = async () => {
  const res = await api.get("/admin/dashboard/summary");
  return res.data;
};

/* ================================
   MONTHLY ENROLLMENTS (LINE CHART)
================================ */
export const getAdminEnrollments = async () => {
  const res = await api.get("/admin/dashboard/enrollments");
  return res.data;
};

/* ================================
   DAILY ACTIVITY (BAR CHART)
================================ */
export const getAdminActivity = async () => {
  const res = await api.get("/admin/dashboard/activity");
  return res.data;
};

/* ================================
   COURSE COMPLETION %
================================ */
export const getAdminCompletion = async () => {
  const res = await api.get("/admin/dashboard/completion");
  return res.data;
};
