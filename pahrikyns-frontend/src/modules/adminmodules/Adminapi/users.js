import api from "../../../api/axios";


/* ================= USERS (FROM DASHBOARD DATA) ================= */

// ✅ FETCH TOTAL USERS (FROM SUMMARY)
export const fetchUsersFromSummary = async () => {
  const res = await api.get("/admin/dashboard/summary");
  return res.data;
};

/* ================= USER ACTIVITY ================= */

export const fetchUserActivity = async () => {
  const res = await api.get("/admin/dashboard/activity");
  return res.data;
};

/* ================= STUDENTS ================= */

export const fetchStudentsFromEnrollments = async () => {
  const res = await api.get("/admin/dashboard/enrollments");
  return res.data;
};

/* ================= COMPLETION STATS ================= */

export const fetchCompletionStats = async () => {
  const res = await api.get("/admin/dashboard/completion");
  return res.data;
};

/* ================= ALL USERS LIST (WITH PAGINATION) ================= */

export const fetchUsers = async ({ search = "", status = "all", page = 1 }) => {
  const res = await api.get("/admin/users", {
    params: { search, status, page },
  });

  return res.data; // { users, totalPages }
};

/* ================= ✅✅✅ FETCH ALL USERS (NO PAGINATION) – FIX ADDED ================= */
/* 👉 Used by IssueCertificate.jsx */
export const fetchAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

/* ================= ADD NEW USER ================= */

export const addUser = async (data) => {
  const res = await api.post("/admin/users", data);
  return res.data;
};

/* ================= GET SINGLE USER BY ID ================= */

export const getUserById = async (userId) => {
  const res = await api.get(`/admin/users/${userId}`);
  return res.data;
};

/* ================= USER PAYMENTS ================= */

export const fetchUserPayments = async (userId) => {
  const res = await api.get(`/admin/users/${userId}/payments`);
  return res.data;
};
