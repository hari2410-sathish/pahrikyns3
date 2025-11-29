const nodemailer = require("nodemailer");

// Generate 6-digit OTP
function generateOTP(length = 6) {
  const chars = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  return otp;
}

// Send OTP to email
async function sendOTPEmail(email) {
  const otp = generateOTP();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Gmail = false for TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <h2>Your OTP Code</h2>
      <p style="font-size: 20px;"><b>${otp}</b></p>
      <p>Valid for 5 minutes.</p>
    `,
  });

  return otp;
}

module.exports = {
  generateOTP,
  sendOTPEmail,
};
