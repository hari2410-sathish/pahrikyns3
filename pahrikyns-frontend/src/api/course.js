import api from "/src/api/axios.js";

/* ============================
   GET COURSES (NORMAL JSON)
   ============================ */
export const getCourses = async (params = {}) => {
  const res = await api.get("/admin/courses", { params });
  return res.data;
};

/* ============================
   CREATE COURSE
   ✅ Supports BOTH:
   - JSON (CSV import)
   - FormData (Thumbnail upload)
   ============================ */
export const createCourse = async (payload) => {
  const isFormData = payload instanceof FormData;

  const res = await api.post("/admin/courses", payload, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  });

  return res.data;
};

/* ============================
   UPDATE COURSE
   ============================ */
export const updateCourse = async (id, payload) => {
  const res = await api.put(`/admin/courses/${id}`, payload);
  return res.data;
};

/* ============================
   DELETE COURSE
   ============================ */
export const deleteCourse = async (id) => {
  const res = await api.delete(`/admin/courses/${id}`);
  return res.data;
};

/* ============================
   BULK DELETE
   ============================ */
export const bulkDeleteCourses = async (ids) => {
  const res = await api.post("/admin/courses/bulk-delete", { ids });
  return res.data;
};

/* ============================
   TOGGLE STATUS
   ============================ */
export const toggleCourseStatus = async (id, status) => {
  const res = await api.patch(`/admin/courses/${id}/status`, { status });
  return res.data;
};

/* ============================
   GET USER ENROLLED COURSES
   ============================ */
export const getMyCourses = async () => {
  const res = await api.get("/auth/user/my-courses");
  return res.data;
};
