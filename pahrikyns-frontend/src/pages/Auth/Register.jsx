// FINAL FIXED REGISTER COMPONENT

import React, { useState } from "react";
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
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { registerUser, verifyOTP, resendOTP } from "../../api/auth";

export default function Register() {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const { login } = useAuth();

  // STEP 1 — REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      showToast("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser(form);

      if (res.data.requiresOTP) {
        showToast("OTP sent to your email", "success");
        setStep(2);
      } else {
        login(res.data);
        navigate("/dashboard");
      }
    } catch (err) {
      showToast("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — VERIFY OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      showToast("Enter valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOTP({ email: form.email, otp });

      login(res.data);

      setStep(3);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      showToast("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResend = async () => {
    try {
      await resendOTP({ email: form.email });
      showToast("OTP resent!", "success");
    } catch {
      showToast("Failed to resend OTP");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle, #020617, #000)",
        p: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating lights */}
      {[...Array(28)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
            borderRadius: "50%",
            background: "rgba(0,234,255,0.7)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(12px)",
            opacity: 0.3,
            animation: `float ${4 + Math.random() * 6}s infinite ease-in-out`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.8; }
        }
      `}</style>

      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          background: "rgba(10,20,40,0.85)",
          border: "1px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 40px rgba(0,255,255,0.25)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* STEP 1 FORM */}
        {step === 1 && (
          <>
            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 800,
                mb: 3,
                background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              CREATE ACCOUNT
            </Typography>

            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                sx={{ mb: 2.3 }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                sx={{ mb: 2.3 }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPass(!showPass)}
                        sx={{ color: "#00eaff" }}
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                type="submit"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.2,
                  borderRadius: "999px",
                  fontWeight: 800,
                  fontSize: 16,
                  background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                  color: "#020617",
                }}
              >
                {loading ? <CircularProgress size={26} /> : "Next →"}
              </Button>
            </form>
          </>
        )}

        {/* STEP 2 OTP */}
        {step === 2 && (
          <>
            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 800,
                mb: 2,
                color: "#00eaff",
              }}
            >
              Verify OTP
            </Typography>

            <Typography sx={{ mb: 3 }}>
              OTP sent to <b>{form.email}</b>
            </Typography>

            <TextField
              fullWidth
              label="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              onClick={handleVerifyOTP}
              disabled={loading}
              sx={{
                py: 1.2,
                borderRadius: "999px",
                background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              }}
            >
              {loading ? <CircularProgress size={26} /> : "Verify OTP"}
            </Button>

            <Button
              fullWidth
              onClick={handleResend}
              sx={{ mt: 2, color: "#00eaff" }}
            >
              Resend OTP
            </Button>
          </>
        )}

        {/* STEP 3 SUCCESS */}
        {step === 3 && (
          <>
            <Typography sx={{ fontSize: 28, mb: 2, color: "#00ffb3" }}>
              🎉 Account Created!
            </Typography>

            <Typography sx={{ mb: 3 }}>
              Redirecting to dashboard...
            </Typography>

            <CircularProgress />
          </>
        )}

        <Typography sx={{ mt: 2, opacity: 0.6 }}>
          © 2025 PAHRIKYNS • Secure Registration
        </Typography>
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
