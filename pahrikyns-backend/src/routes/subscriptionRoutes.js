const express = require("express");
const router = express.Router();

const {
  getMySubscription,
  getAllSubscriptions,
  cancelSubscription,
} = require("../controllers/subscriptionController");

const auth = require("../middlewares/authMiddleware");
const adminAuth = require("../middlewares/adminAuthMiddleware");

/* ============================
   USER SUBSCRIPTION
   ============================ */
router.get("/my", auth, getMySubscription);

/* ============================
   ADMIN SUBSCRIPTIONS
   ============================ */
router.get("/admin", adminAuth, getAllSubscriptions);
router.post("/admin/cancel/:id", adminAuth, cancelSubscription);

module.exports = router;
