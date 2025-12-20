const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ error: "Admin account is deactivated" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ PRE-OTP TOKEN (ADMIN)
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
        stage: "pre-otp",
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.json({
      ok: true,
      next: "otp",
      token,
    });
  } catch (err) {
    console.error("adminLogin error:", err);
    return res.status(500).json({ error: "Admin login failed" });
  }
}

module.exports = { adminLogin };
