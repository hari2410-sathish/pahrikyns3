const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const { sendOTPEmail } = require("../helpers/generateOTP");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    // Check if permanent user exists
    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // TEMP USER SAVE (upsert)
    await prisma.tempUser.upsert({
      where: { email },
      update: { name, password: hashed },
      create: { name, email, password: hashed },
    });

    // SEND OTP EMAIL
    await prisma.otpStore.deleteMany({ where: { email } }); // clear previous

    const otp = await sendOTPEmail(email);

    await prisma.otpStore.create({
      data: {
        email,
        otp,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    res.json({
      message: "OTP sent",
      requiresOTP: true,
      email,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid password" });

    res.json({
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
