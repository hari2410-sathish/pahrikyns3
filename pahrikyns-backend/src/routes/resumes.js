const express = require("express");
const router = express.Router();

const resumeController = require("../controllers/resumeController");
const authMiddleware = require("../middlewares/authMiddleware");

// ================================
// ✅ PUBLIC ROUTES (NO AUTH)
// ================================

// Public Resume View
// /api/resumes/public/:username
router.get("/public/:username", resumeController.getPublicResume);
router.get("/share/:token", resumeController.getSharedResume);

// ================================
// ✅ USER ROUTES (LOGIN REQUIRED)
// ================================

// Save or Update Resume
// /api/resumes/save
router.post(
  "/save",
  authMiddleware,
  resumeController.saveOrUpdateResume
);

// Download Resume (SUBSCRIPTION REQUIRED)
// /api/resumes/download/:resumeId
router.get(
  "/download/:resumeId",
  authMiddleware,
  resumeController.downloadResume
);

// Generate Share Link (SUBSCRIPTION REQUIRED)
// /api/resumes/share
router.post(
  "/share",
  authMiddleware,
  resumeController.generateShareLink
);

// ================================
// ✅ ADMIN ROUTES (ADMIN ONLY)
// ================================

// Get All Resumes
// /api/resumes/admin/all
router.get(
  "/admin/all",
  authMiddleware,
  resumeController.adminGetAllResumes
);

// Get Resume Edit History
// /api/resumes/admin/history
router.get(
  "/admin/history",
  authMiddleware,
  resumeController.adminGetResumeHistory
);

// Force Update Any Resume
// /api/resumes/admin/force-update
router.put(
  "/admin/force-update",
  authMiddleware,
  resumeController.adminForceUpdateResume
);

module.exports = router;
// Score resume (user or admin)
router.get(
  "/score/:resumeId",
  authMiddleware,
  resumeController.getResumeScore
);

// User activity (self)
router.get(
  "/activity/me",
  authMiddleware,
  resumeController.getMyResumeActivity
);

// Admin – user activity
router.get(
  "/admin/activity/:userId",
  authMiddleware,
  resumeController.adminGetUserResumeActivity
);

// Admin – version history for single resume
router.get(
  "/admin/history/:resumeId",
  authMiddleware,
  resumeController.adminGetResumeVersionHistoryByResumeId
);
