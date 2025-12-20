const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/authMiddleware"); // your admin auth
const analyticsController = require("../controllers/adminResumeAnalyticsController");

// ✅ ADMIN ONLY ANALYTICS ROUTES
router.get("/overview", adminAuth, analyticsController.getOverallAnalytics);

router.get("/top", adminAuth, analyticsController.getTopResumes);

router.get("/daily", adminAuth, analyticsController.getDailyStats);

router.get("/resume/:id", adminAuth, analyticsController.getSingleResumeStats);

module.exports = router;
