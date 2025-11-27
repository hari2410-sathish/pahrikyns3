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

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Temporary token (pre-otp stage)
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
// (OPTIONAL) TOTP ENTRY POINT
// -----------------------
async function verifyTOTPandIssue(req, res, next) {
  try {
    // Will implement later if needed
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  adminLogin,
  verifyTOTPandIssue,
};
