const prisma = require("../config/prismaClient");
const { generateOTP } = require("../helpers/generateOTP");
const { sendMail } = require("../config/email");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// ✅ HASH FUNCTION
function hashOTP(otp) {
  return crypto.createHash("sha256").update(String(otp)).digest("hex");
}

/* =========================================================
   SEND OTP — ADMIN LOGIN (SECURE)
========================================================= */
async function sendOtp(req, res) {
  try {
    const { email, method } = req.body;
    if (!email)
      return res.status(400).json({ message: "Missing email" });

    // ✅ CHECK ADMIN EXISTS
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    // ✅ 1 MIN COOLDOWN
    const lastOtp = await prisma.otpStore.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (
      lastOtp &&
      Date.now() - new Date(lastOtp.createdAt).getTime() < 60 * 1000
    ) {
      return res.status(429).json({
        message: "Please wait 1 minute before requesting another OTP",
      });
    }

    const otp = generateOTP(6);
    const otpHash = hashOTP(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otpStore.create({
      data: {
        email,
        otpHash,
        method: method || "email",
        expiresAt,
      },
    });

    // ✅ EMAIL ONLY (SMS removed – production safe)
    const subject = "🔐 Admin Login OTP";
    const text = `Your Admin OTP is ${otp}. Valid for 5 minutes.`;
    const html = `
      <div style="font-family: Arial; background:#f4f6f8; padding:30px">
        <div style="max-width:520px;margin:auto;background:white;padding:30px;border-radius:10px">
          <h2 style="text-align:center;color:#2563eb">Admin Security Verification</h2>
          <p>Your OTP is:</p>
          <div style="text-align:center;margin:25px 0">
            <span style="font-size:28px;font-weight:bold;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px">
              ${otp}
            </span>
          </div>
          <p>Valid for <b>5 minutes</b>. Do not share it with anyone.</p>
        </div>
      </div>
    `;

    await sendMail(email, subject, text, html);

    return res.json({ ok: true, message: "OTP sent securely" });
  } catch (err) {
    console.error("sendOtp error:", err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
}

/* =========================================================
   VERIFY OTP — ADMIN FINAL LOGIN
========================================================= */
async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Missing fields" });

    const otpHash = hashOTP(otp);

    const record = await prisma.otpStore.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (!record)
      return res.status(400).json({ message: "Invalid OTP" });

    // ❌ EXPIRED
    if (new Date(record.expiresAt) < new Date()) {
      await prisma.otpStore.delete({ where: { id: record.id } });
      return res.status(400).json({ message: "OTP expired" });
    }

    // ❌ MAX ATTEMPTS
    if (record.attempts >= 5) {
      await prisma.otpStore.delete({ where: { id: record.id } });
      return res.status(403).json({
        message: "Too many invalid attempts. OTP locked.",
      });
    }

    // ❌ WRONG OTP
    if (record.otpHash !== otpHash) {
      await prisma.otpStore.update({
        where: { id: record.id },
        data: { attempts: { increment: 1 } },
      });

      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ VALID OTP — DELETE AFTER SUCCESS
    await prisma.otpStore.delete({ where: { id: record.id } });

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin)
      return res.status(400).json({ message: "No admin found" });

    // ✅ FINAL ADMIN JWT TOKEN
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ ok: true, token });
  } catch (err) {
    console.error("verifyOtp error:", err);
    return res.status(500).json({ message: "OTP verification failed" });
  }
}

module.exports = { sendOtp, verifyOtp };
