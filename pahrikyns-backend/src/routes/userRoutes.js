const express = require("express");
const {
  registerUser,
  loginUser
} = require("../controllers/userAuthController");

const {
  sendUserOTP,
  verifyUserOTP,
  resendUserOTP
} = require("../controllers/userOtpController");

const router = express.Router();

// REGISTER + LOGIN
router.post("/register", registerUser);
router.post("/login", loginUser);

// OTP
router.post("/send-otp", sendUserOTP);
router.post("/verify-otp", verifyUserOTP);
router.post("/resend-otp", resendUserOTP);

module.exports = router;
