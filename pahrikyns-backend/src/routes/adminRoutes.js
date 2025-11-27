const express = require('express');
const router = express.Router();

const { adminLogin } = require('../controllers/authController');
const { sendOtp, verifyOtp } = require('../controllers/otpController');

// STEP 1: login
router.post('/login', adminLogin);

// STEP 2: send OTP
router.post('/send-otp', sendOtp);

// STEP 3: verify OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;
