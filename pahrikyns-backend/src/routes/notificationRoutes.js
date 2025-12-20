const express = require("express");
const router = express.Router();

const {
  createNotification,
  listNotifications,
  markRead,
  deleteNotification,
  saveFcmToken, // 🔥 NEW (FCM TOKEN SAVE)
} = require("../controllers/notificationController");

const auth = require("../middlewares/authMiddleware");

/**
 * ✅ SAVE FCM TOKEN (USER LOGIN TIME)
 * Protected Route
 */
router.post("/save-fcm-token", auth, saveFcmToken);

/**
 * ✅ CREATE NOTIFICATION
 * Admin -> User OR Broadcast
 * Protected Route
 */
router.post("/", auth, createNotification);

/**
 * ✅ LIST USER NOTIFICATIONS (WITH PAGINATION & UNREAD COUNT)
 * Logged-in user only
 */
router.get("/", auth, listNotifications);

/**
 * ✅ MARK SINGLE NOTIFICATION AS READ
 * Logged-in user only
 */
router.put("/:id/read", auth, markRead);

/**
 * ✅ DELETE A NOTIFICATION
 * User can delete only their own, Admin can delete any
 */
router.delete("/:id", auth, deleteNotification);

module.exports = router;
