const prisma = require("../config/prismaClient");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../helpers/generateOTP");

exports.sendUserOTP = async (req, res) => {
  try {
    const { email } = req.body;

    await prisma.otpStore.deleteMany({ where: { email } });

    const otp = await sendOTPEmail(email);

    await prisma.otpStore.create({
      data: {
        email,
        otp,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    res.json({ message: "OTP sent" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.verifyUserOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await prisma.otpStore.findFirst({
      where: { email, otp },
    });

    if (!record) return res.status(400).json({ error: "Invalid OTP" });

    if (record.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    // Create user from tempUser
    const temp = await prisma.tempUser.findUnique({ where: { email } });

    if (!temp) return res.status(400).json({ error: "Temp user missing" });

    const user = await prisma.user.create({
      data: {
        name: temp.name,
        email,
        password: temp.password,
        isVerified: true
      },
    });

    await prisma.tempUser.delete({ where: { email } });
    await prisma.otpStore.deleteMany({ where: { email } });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ message: "Verified", token, user });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.resendUserOTP = async (req, res) => {
  try {
    const { email } = req.body;

    await prisma.otpStore.deleteMany({ where: { email } });

    const otp = await sendOTPEmail(email);

    await prisma.otpStore.create({
      data: {
        email,
        otp,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    res.json({ message: "OTP resent" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
