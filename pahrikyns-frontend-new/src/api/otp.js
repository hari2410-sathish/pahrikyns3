import api from "./axios";

export const sendOtp = (email) =>
  api.post("/otp/send", { email });

export const verifyOtp = (email, otp) =>
  api.post("/otp/verify", { email, otp });
