// src/api/auth.js

// ---------- USER LOGIN ----------
export async function loginUser({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "123456") {
        resolve({
          data: {
            token: "user_token_123",
            user: {
              id: 1,
              name: "Test User",
              email,
            },
          },
        });
      } else {
        reject({ message: "Invalid credentials" });
      }
    }, 800);
  });
}

// ---------- USER REGISTER ----------
export async function registerUser(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message: "User registered successfully",
          user: payload,
        },
      });
    }, 800);
  });
}

// ---------- FORGOT PASSWORD ----------
export async function requestPasswordReset(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { message: "Reset link sent to your email" },
      });
    }, 800);
  });
}

// ---------- RESET PASSWORD ----------
export async function resetPassword({ token, newPassword }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message: "Password reset successful!",
        },
      });
    }, 800);
  });
}
