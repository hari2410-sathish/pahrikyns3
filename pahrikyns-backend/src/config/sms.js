import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export const sendSmsOtp = (phone, otp) => {
  return client.messages.create({
    from: process.env.TWILIO_NUMBER,
    to: phone,
    body: `Your OTP is: ${otp}`
  });
};
