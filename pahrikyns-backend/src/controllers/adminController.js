// controllers/adminController.js
const prisma = require("../config/prismaClient");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// -----------------------
// ADMIN LOGIN (STEP 1)
// -----------------------
async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    // ✔ Check admin email in DB
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✔ Compare hashed password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✔ PRE-OTP Token
    const token = generateToken({
      id: admin.id,
      stage: "pre-otp",
    });

    return res.json({
      ok: true,
      next: "otp",
      token,
    });
  } catch (err) {
    next(err);
  }
}

// -----------------------
// OPTIONAL FUTURE TOTP
// -----------------------
async function verifyTOTPandIssue(req, res, next) {
  try {
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  adminLogin,
  verifyTOTPandIssue,
};
