const prisma = require("../config/prismaClient");
const generateOTP = require("../utils/generateOTP");
const { sendEmail } = require("../services/mailer");
const { sendSMS } = require("../services/sms");
const generateToken = require("../utils/generateToken");

const OTP_TTL_MIN = 10;

// ========================================
// SEND OTP
// ========================================
async function sendOtp(req, res, next) {
  try {
    const { email, method } = req.body; // 'email' | 'sms' | 'both'

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const otp = generateOTP(6);
    const expiresAt = new Date(Date.now() + OTP_TTL_MIN * 60 * 1000);

    // Save OTP
    await prisma.otpStore.create({
      data: {
        adminId: admin.id,
        otp,
        method: method || "email",
        expiresAt,
      },
    });

    // Send SMS (if enabled)
    if (method === "sms" || method === "both") {
      if (!admin.phone) {
        console.warn("Admin has no phone number for SMS OTP");
      } else {
        await sendSMS(admin.phone, `Your OTP is: ${otp}`);
      }
    }

    // Send Email
    if (method === "email" || method === "both") {
      await sendEmail(
        admin.email,
        "Your OTP",
        `Your OTP is: ${otp}`,
        `<p>Your OTP is <strong>${otp}</strong></p>`
      );
    }

    return res.json({ ok: true, message: "OTP sent" });
  } catch (err) {
    next(err);
  }
}

// ========================================
// VERIFY OTP
// ========================================
async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Missing data" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find latest valid OTP
    const record = await prisma.otpStore.findFirst({
      where: {
        adminId: admin.id,
        otp,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark this OTP as used
    await prisma.otpStore.update({
      where: { id: record.id },
      data: { used: true },
    });

    // Issue final JWT token
    const token = generateToken({
      id: admin.id,
      role: admin.role,
    });

    return res.json({ ok: true, token });
  } catch (err) {
    next(err);
  }
}

module.exports = { sendOtp, verifyOtp };
