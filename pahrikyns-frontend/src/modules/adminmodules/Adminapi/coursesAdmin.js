import api from "../../../api/axios";


// =======================
// ALL COURSES (LIST + SEARCH)
// =======================
export const fetchAdminCourses = async (params = {}) => {
  const res = await api.get("/admin/courses", { params });
  return res.data; // expect: { courses: [], total: number }
};

// =======================
// CREATE COURSE
// =======================
export const createAdminCourse = async (payload) => {
  const res = await api.post("/admin/courses", payload);
  return res.data;
};

// =======================
// SINGLE COURSE
// =======================
export const fetchAdminCourseById = async (courseId) => {
  const res = await api.get(`/admin/courses/${courseId}`);
  return res.data; // { course: {...} }
};

// =======================
// UPDATE COURSE
// =======================
export const updateAdminCourse = async (courseId, payload) => {
  const res = await api.put(`/admin/courses/${courseId}`, payload);
  return res.data;
};

// =======================
// ENABLE / DISABLE COURSE
// =======================
export const toggleAdminCourseStatus = async (courseId) => {
  const res = await api.patch(`/admin/courses/${courseId}/toggle`);
  return res.data;
};

// =======================
// UPDATE COURSE PRICE
// =======================
export const updateAdminCoursePrice = async (courseId, payload) => {
  const res = await api.patch(`/admin/courses/${courseId}/price`, payload);
  return res.data;
};
