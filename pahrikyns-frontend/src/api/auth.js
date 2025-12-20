import API from "./axios";

/* ---------------------------------------------------------
   USER REGISTER + LOGIN + OTP
---------------------------------------------------------- */

// ✅ USER REGISTER
export function registerUser(data) {
  return API.post("/auth/user/register", data);
}

// ✅ SEND OTP
export function sendOTP(data) {
  return API.post("/auth/user/send-otp", data);
}

// ✅ VERIFY OTP
export function verifyOTP(data) {
  return API.post("/auth/user/verify-otp", data);
}

// ✅ RESEND OTP
export function resendOTP(data) {
  return API.post("/auth/user/resend-otp", data);
}

// ✅ LOGIN
export function loginUser(data) {
  return API.post("/auth/user/login", data);
}

// ✅ GOOGLE LOGIN
export function googleLogin(token) {
  return API.post("/auth/user/google-login", { token });
}

/* ---------------------------------------------------------
   CURRENT USER  🔥 MOST IMPORTANT
---------------------------------------------------------- */

export function getCurrentUser() {
  return API.get("/auth/user/me");
}


/* ---------------------------------------------------------
   PASSWORD RESET (only if backend exists)
---------------------------------------------------------- */

export function requestPasswordReset(data) {
  return API.post("/auth/user/request-reset", data);
}

export function resetPassword(data) {
  return API.post("/auth/user/reset-password", data);
}
