const express = require("express");
const router = express.Router();

/* -------------------- AUTH (Login / Register / Google) -------------------- */
const {
  registerUser,
  loginUser,
  verifyOTP,
  googleLogin,
} = require("../controllers/userAuthController");

/* -------------------- USER PROFILE -------------------- */
const {
  getCurrentUser,
  updateProfile,
  changePassword,
} = require("../controllers/userProfileController");

/* -------------------- USER COURSES + SUBSCRIPTION + PROGRESS -------------------- */
const {
  getMyCourses,
  getCourseProgress,
  updateCourseProgress,
  subscriptionStatus,
} = require("../controllers/userCourseController");

/* -------------------- OTP (SEND / RESEND) -------------------- */
const {
  sendUserOTP,
  resendUserOTP,
} = require("../controllers/userOtpController");

/* -------------------- MIDDLEWARE -------------------- */
const auth = require("../middlewares/authMiddleware");

/* =========================
   PUBLIC ROUTES
========================= */

// ✅ REGISTER → SEND OTP
router.post("/register", registerUser);

// ✅ LOGIN
router.post("/login", loginUser);

// ✅ SEND OTP
router.post("/send-otp", sendUserOTP);

// ✅ VERIFY OTP
router.post("/verify-otp", verifyOTP);

// ✅ RESEND OTP
router.post("/resend-otp", resendUserOTP);

// ✅ GOOGLE LOGIN
router.post("/google-login", googleLogin);

/* =========================
   PROTECTED ROUTES (JWT)
========================= */

// ✅ CURRENT USER
router.get("/me", auth, getCurrentUser);

// ✅ PROFILE
router.put("/update-profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);

// ✅ SUBSCRIPTION STATUS (FOR UserProtectedRoute)
router.get("/subscription-status", auth, subscriptionStatus);

// ✅ MY COURSES
router.get("/my-courses", auth, getMyCourses);

// ✅ COURSE PROGRESS
router.get("/course-progress/:courseId", auth, getCourseProgress);
router.post("/course-progress", auth, updateCourseProgress);

module.exports = router;
