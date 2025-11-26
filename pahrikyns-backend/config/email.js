import nodemailer from "nodemailer";

export const sendEmailOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP: ${otp}`
  });
};
