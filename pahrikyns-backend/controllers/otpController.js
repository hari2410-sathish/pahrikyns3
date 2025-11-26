import pkg from "@prisma/client";
import { generateOTP } from "../helpers/generateOTP.js";
import { sendEmailOtp } from "../config/email.js";

const { PrismaClient } = pkg;

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (email !== process.env.ADMIN_EMAIL1)
    return res.status(400).json({ message: "Invalid email" });

  const otp = generateOTP();

  await prisma.otpStore.deleteMany({ where: { email } });

  await prisma.otpStore.create({
    data: {
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    }
  });

  await sendEmailOtp(email, otp);

  res.json({ message: "OTP sent successfully" });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const record = await prisma.otpStore.findFirst({ where: { email } });

  if (!record)
    return res.status(400).json({ message: "OTP expired" });

  if (record.otp !== otp)
    return res.status(400).json({ message: "Wrong OTP" });

  res.json({ message: "OTP Verified" });
};
