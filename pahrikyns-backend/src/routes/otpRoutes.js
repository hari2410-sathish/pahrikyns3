// routes/otpRoutes.js
import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otpController.js";

const router = express.Router();

// Send OTP after correct email + password step
router.post("/send", sendOtp);

// Verify OTP and return token + admin object
router.post("/verify", verifyOtp);

export default router;
