const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
  createPayment,
  verifyPayment,
  getMyPayments,
  getAllPayments,
  refundPayment,
} = require("../controllers/paymentController");

/* ================================
   USER ROUTES
================================ */

// ✅ Create Razorpay Order + DB Entry
router.post("/create", auth, createPayment);

// ✅ Verify Razorpay Payment (Client Side Success)
router.post("/verify", auth, verifyPayment);

// ✅ Get Logged-in User Payments
router.get("/my", auth, getMyPayments);

/* ================================
   ADMIN ROUTES
================================ */

// ✅ Get All Payments (Admin Dashboard)
router.get("/admin", auth, getAllPayments);
router.get("/admin/:id", auth, getPaymentById);


// ✅ Refund Payment (Admin)
router.post("/refund/:id", auth, refundPayment);

module.exports = router;
