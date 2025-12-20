const express = require("express");
const router = express.Router();

/* ===============================
   CONTROLLERS
================================ */
const { adminLogin } = require("../controllers/adminController");
const { sendOtp, verifyOtp } = require("../controllers/otpController");

const {
  listNotifications,
  createNotification,
  deleteNotification,
} = require("../controllers/notificationController");

const {
  getAdminSummary,
  getMonthlyEnrollments,
  getUserActivity,
  getCompletionStats,
  getAdminTransactions,
  getMonthlyRevenue,
} = require("../controllers/adminDashboardController");

const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  bulkDeleteCourses,
  toggleStatus,
} = require("../controllers/adminCourseController");

/* ===============================
   MIDDLEWARES
================================ */
const adminAuth = require("../middlewares/adminAuthMiddleware");
const adminPreOtpAuth = require("../middlewares/adminPreOtpAuth");
const upload = require("../middlewares/upload");

/* ===============================
   ADMIN ORDER ROUTES
================================ */
const adminOrderRoutes = require("./adminOrderRoutes");

/* ===============================
   AUTH ROUTES (NO AUTH HERE)
================================ */

// 🔑 ADMIN LOGIN
router.post("/login", adminLogin);

// 🔐 OTP FLOW (PRE-OTP TOKEN ONLY)
router.post("/send-otp", adminPreOtpAuth, sendOtp);
router.post("/verify-otp", adminPreOtpAuth, verifyOtp);

/* ===============================
   DASHBOARD ROUTES (POST-OTP ONLY)
================================ */

router.get("/dashboard/summary", adminAuth, getAdminSummary);
router.get("/dashboard/enrollments", adminAuth, getMonthlyEnrollments);
router.get("/dashboard/activity", adminAuth, getUserActivity);
router.get("/dashboard/completion", adminAuth, getCompletionStats);
router.get("/dashboard/transactions", adminAuth, getAdminTransactions);
router.get("/dashboard/revenue", adminAuth, getMonthlyRevenue);

/* ===============================
   COURSES ROUTES (ADMIN ONLY)
================================ */

router.get("/courses", adminAuth, getCourses);

router.post(
  "/courses",
  adminAuth,
  upload.single("thumbnail"),
  createCourse
);

router.put(
  "/courses/:id",
  adminAuth,
  upload.single("thumbnail"),
  updateCourse
);

router.delete("/courses/:id", adminAuth, deleteCourse);
router.post("/courses/bulk-delete", adminAuth, bulkDeleteCourses);
router.patch("/courses/:id/status", adminAuth, toggleStatus);

/* ===============================
   NOTIFICATIONS (ADMIN ONLY)
================================ */

router.get("/notifications", adminAuth, listNotifications);
router.post("/notifications", adminAuth, createNotification);
router.delete("/notifications/:id", adminAuth, deleteNotification);

/* ===============================
   ORDERS (ADMIN ONLY)
================================ */

router.use("/orders", adminAuth, adminOrderRoutes);

/* ===============================
   EXPORT
================================ */
module.exports = router;
