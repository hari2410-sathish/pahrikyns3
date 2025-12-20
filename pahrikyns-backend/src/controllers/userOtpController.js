const prisma = require("../config/prismaClient");
const { sendOTPEmail } = require("../helpers/generateOTP");
const crypto = require("crypto");

/*
|--------------------------------------------------------------------------
| SEND USER OTP
|--------------------------------------------------------------------------
*/
exports.sendUserOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ error: "Email required" });

    // ✅ Clear old OTPs
    await prisma.otpStore.deleteMany({ where: { email } });

    // ✅ Generate & send OTP
    const otp = await sendOTPEmail(email);
    const otpHash = crypto.createHash("sha256").update(String(otp)).digest("hex");

    // ✅ Save HASHED OTP (schema-safe)
    await prisma.otpStore.create({
      data: {
        email,
        otpHash,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
      },
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("sendUserOTP error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

/*
|--------------------------------------------------------------------------
| VERIFY USER OTP
|--------------------------------------------------------------------------
*/
exports.verifyUserOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ error: "Missing OTP data" });

    const otpHash = crypto.createHash("sha256").update(String(otp)).digest("hex");

    // ✅ Find OTP by hashed value
    const otpRecord = await prisma.otpStore.findFirst({
      where: { email, otpHash },
    });

    if (!otpRecord)
      return res.status(400).json({ error: "Invalid OTP" });

    if (otpRecord.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    // ✅ Get TEMP user
    const tempUser = await prisma.tempUser.findUnique({
      where: { email },
    });

    if (!tempUser)
      return res.status(400).json({ error: "User not found in TempUser" });

    // ✅ Move TempUser → User table
    const user = await prisma.user.create({
      data: {
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password,
        isVerified: true,
      },
    });

    // ✅ Cleanup
    await prisma.tempUser.delete({ where: { email } });
    await prisma.otpStore.deleteMany({ where: { email } });

    res.json({
      message: "OTP verified successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("verifyUserOTP error:", err);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

/*
|--------------------------------------------------------------------------
| RESEND OTP
|--------------------------------------------------------------------------
*/
exports.resendUserOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ error: "Email required" });

    // ✅ Delete previous OTPs
    await prisma.otpStore.deleteMany({ where: { email } });

    // ✅ Generate & send new OTP
    const otp = await sendOTPEmail(email);
    const otpHash = crypto.createHash("sha256").update(String(otp)).digest("hex");

    await prisma.otpStore.create({
      data: {
        email,
        otpHash,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    res.json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error("resendUserOTP error:", err);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
};
