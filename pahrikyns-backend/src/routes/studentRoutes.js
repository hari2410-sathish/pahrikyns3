const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudentProfile,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const auth = require("../middlewares/authMiddleware");

// Async wrapper
const safe = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* ===============================
   STUDENT API ROUTES (ADMIN)
================================ */

// ✅ CREATE STUDENT
router.post("/admin/students", auth, safe(createStudent));

// ✅ GET ALL STUDENTS
router.get("/admin/students", auth, safe(getStudents));

// ✅ ✅ GET SINGLE STUDENT PROFILE (FOR 👁 VIEW)
router.get("/admin/students/:id", auth, safe(getStudentProfile));

// ✅ UPDATE STUDENT (BLOCK / PROGRESS / STATUS)
router.patch("/admin/students/:id", auth, safe(updateStudent));

// ✅ DELETE STUDENT
router.delete("/admin/students/:id", auth, safe(deleteStudent));

module.exports = router;
