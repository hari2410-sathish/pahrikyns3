import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  registerUser,
  verifyOTP,
  resendOTP,
  googleLogin,
} from "../../api/auth";

import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  const navigate = useNavigate();
  const { login, user } = useAuth();

  // ✅ Already logged-in user redirect
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // ================= EMAIL REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      showToast("Please fill all fields");
      return;
    }

    if (form.password.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser(form);

      if (res.data?.requiresOTP) {
        showToast("OTP sent to your email", "success");
        setStep(2);
      } else {
        login({
          token: res.data.token,
          user: res.data.user,
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      showToast(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= OTP VERIFY =================
  const handleVerifyOTP = async () => {
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      showToast("Enter valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOTP({
        email: form.email,
        otp,
      });

      login({
        token: res.data.token,
        user: res.data.user,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      showToast(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP({ email: form.email });
      showToast("OTP resent successfully!", "success");
    } catch {
      showToast("Failed to resend OTP");
    }
  };

  // ================= GOOGLE SIGNUP =================
  const handleGoogleSignup = async (credentialResponse) => {
    try {
      setGoogleLoading(true);

      const res = await googleLogin(
        credentialResponse.credential // ✅ ID TOKEN
      );

      login({
        token: res.data.token,
        user: res.data.user,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      showToast("Google Signup Failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/bg-login.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 900,
          height: 560,
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            flex: 1,
            background: "#f8fbff",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <img
            src="/assets/login-security.png"
            alt="register"
            style={{ width: "75%", maxWidth: 320 }}
          />
          <Typography sx={{ mt: 3, color: "#2563eb", fontWeight: 800 }}>
            Secure Registration System
          </Typography>
        </Box>

        {/* RIGHT FORM */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(180deg,#2563eb,#1e3a8a)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 5,
          }}
        >
          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <>
              <Typography
                sx={{ fontSize: 32, fontWeight: 800, color: "#fff", mb: 1 }}
              >
                Create Account
              </Typography>

              <Typography
                sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}
              >
                Register to continue
              </Typography>

              {/* ✅ GOOGLE SIGNUP */}
              <Box sx={{ mb: 2, pointerEvents: googleLoading ? "none" : "auto" }}>
                <GoogleLogin
                  onSuccess={handleGoogleSignup}
                  onError={() => showToast("Google Signup Failed")}
                />
                {googleLoading && (
                  <Typography sx={{ mt: 1, color: "#fff", fontSize: 12 }}>
                    Signing in with Google…
                  </Typography>
                )}
              </Box>

              <Divider
                sx={{
                  mb: 3,
                  borderColor: "rgba(255,255,255,0.4)",
                }}
              />

              {/* EMAIL REGISTER FORM */}
              <form onSubmit={handleRegister}>
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  sx={{ mb: 2.5, background: "#fff", borderRadius: 1 }}
                />

                <TextField
                  fullWidth
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  sx={{ mb: 2.5, background: "#fff", borderRadius: 1 }}
                />

                <TextField
                  fullWidth
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3, background: "#fff", borderRadius: 1 }}
                />

                <Button
                  fullWidth
                  type="submit"
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    borderRadius: 2,
                    fontWeight: 800,
                    background: "#facc15",
                    color: "#000",
                    textTransform: "none",
                    "&:hover": { background: "#fde047" },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "NEXT →"}
                </Button>
              </form>

              <Typography
                sx={{
                  mt: 3,
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "#fde047", fontWeight: 700 }}
                >
                  Login
                </Link>
              </Typography>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <>
              <Typography
                sx={{ fontSize: 30, fontWeight: 800, color: "#fff", mb: 1 }}
              >
                Verify OTP
              </Typography>

              <Typography
                sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}
              >
                OTP sent to <b>{form.email}</b>
              </Typography>

              <TextField
                fullWidth
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                sx={{ mb: 3, background: "#fff", borderRadius: 1 }}
              />

              <Button
                fullWidth
                onClick={handleVerifyOTP}
                disabled={loading}
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: 800,
                  background: "#facc15",
                  color: "#000",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "VERIFY OTP"}
              </Button>

              <Button
                fullWidth
                onClick={handleResend}
                sx={{ mt: 2, color: "#fff", textTransform: "none" }}
              >
                Resend OTP
              </Button>
            </>
          )}

          <Typography
            sx={{ mt: 3, color: "rgba(255,255,255,0.7)", fontSize: 13 }}
          >
            © 2025 PAHRIKYNS
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
