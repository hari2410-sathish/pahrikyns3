const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendOTPEmail } = require("../helpers/generateOTP");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ===========================
   REGISTER USER (STEP 1)
=========================== */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.tempUser.upsert({
      where: { email },
      update: { name, password: hashed },
      create: { name, email, password: hashed },
    });

    // ✅ Clear old OTPs
    await prisma.otpStore.deleteMany({ where: { email } });

    // ✅ Generate OTP
    const otp = await sendOTPEmail(email);
    const otpHash = crypto.createHash("sha256").update(String(otp)).digest("hex");

    // ✅ Save HASHED OTP
    await prisma.otpStore.create({
      data: {
        email,
        otpHash,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    res.json({ message: "OTP sent", requiresOTP: true, email });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   LOGIN USER (WITH NOTIFICATION)
=========================== */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔔 LOGIN NOTIFICATION
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Login Alert 🔐",
        message: "You logged in successfully",
        type: "login",
      },
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };

    res.json({ message: "Login successful", token, user: safeUser });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   VERIFY OTP (STEP 2) → FINAL REGISTER + NOTIFICATION
=========================== */
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ error: "Missing email or OTP" });

    const otpHash = crypto.createHash("sha256").update(String(otp)).digest("hex");

    const record = await prisma.otpStore.findFirst({
      where: { email, otpHash },
    });

    if (!record)
      return res.status(400).json({ error: "Invalid OTP" });

    if (record.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    const tempUser = await prisma.tempUser.findUnique({ where: { email } });
    if (!tempUser)
      return res.status(400).json({ error: "Temp user not found" });

    const user = await prisma.user.create({
      data: {
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password,
        isVerified: true,
      },
    });

    await prisma.tempUser.delete({ where: { email } });
    await prisma.otpStore.deleteMany({ where: { email } });

    // 🔔 REGISTER SUCCESS NOTIFICATION
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Welcome 🎉",
        message: "Your account registered successfully!",
        type: "register",
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: true,
      createdAt: user.createdAt,
    };

    res.json({
      message: "OTP verified successfully",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("verifyOTP error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   GOOGLE LOGIN (WITH NOTIFICATION)
=========================== */
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res.status(400).json({ error: "Google token missing" });

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    if (!email)
      return res.status(400).json({ error: "Google email missing" });

    let user = await prisma.user.findUnique({ where: { email } });

    // ✅ NEW USER → AUTO REGISTER
    if (!user) {
      const randomPass = crypto.randomBytes(16).toString("hex");
      const hashed = await bcrypt.hash(randomPass, 10);

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashed,
          isVerified: true,
          avatar: picture || null,
        },
      });

      // 🔔 GOOGLE REGISTER NOTIFICATION
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: "Welcome via Google 🎉",
          message: "Your account was created using Google",
          type: "register",
        },
      });
    }

    // 🔔 GOOGLE LOGIN NOTIFICATION
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Google Login ✅",
        message: "You logged in using Google",
        type: "login",
      },
    });

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };

    res.json({
      message: "Google login successful",
      token: jwtToken,
      user: safeUser,
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({ error: "Google authentication failed" });
  }
};
