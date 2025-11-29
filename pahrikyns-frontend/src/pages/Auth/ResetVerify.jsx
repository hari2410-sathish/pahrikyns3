import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  TextField,
} from "@mui/material";

import { verifyResetOTP, resendResetOTP } from "../../api/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetVerify() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // If opened without email -> redirect
  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // Countdown Timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // OTP input handler
  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box automatically
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      showToast("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyResetOTP({ email, otp: code });

      const resetToken = res.data.resetToken;

      showToast("OTP Verified!", "success");

      setTimeout(() => {
        navigate("/reset-password", { state: { resetToken } });
      }, 800);
    } catch (err) {
      showToast("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!canResend) return;

    try {
      await resendResetOTP({ email });
      showToast("OTP resent successfully!", "success");

      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
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
      {[...Array(26)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${10 + Math.random() * 18}px`,
            height: `${10 + Math.random() * 18}px`,
            borderRadius: "50%`,
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
          50% { transform: translateY(-18px); opacity: 0.8; }
        }
      `}</style>

      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 380,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          background: "rgba(10,20,40,0.85)",
          border: "1px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 40px rgba(0,255,255,0.25)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 800,
            mb: 2,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Verify OTP
        </Typography>

        <Typography sx={{ opacity: 0.6, mb: 3 }}>
          OTP sent to <b>{email}</b>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          {otp.map((digit, idx) => (
            <TextField
              key={idx}
              inputRef={(el) => (inputRefs.current[idx] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: 22,
                  color: "#00eaff",
                },
              }}
              sx={{
                width: 45,
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                },
              }}
            />
          ))}
        </Box>

        <Button
          fullWidth
          onClick={handleVerify}
          disabled={loading}
          sx={{
            py: 1.2,
            borderRadius: "999px",
            fontWeight: 800,
            fontSize: 16,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "#020617",
            textTransform: "none",
          }}
        >
          {loading ? <CircularProgress size={26} /> : "Verify OTP"}
        </Button>

        <Button
          fullWidth
          disabled={!canResend}
          onClick={handleResend}
          sx={{
            mt: 2,
            color: canResend ? "#00eaff" : "#6b7280",
            fontWeight: 600,
          }}
        >
          {canResend ? "Resend OTP" : `Resend in ${timer}s`}
        </Button>

        <Typography sx={{ mt: 2, opacity: 0.6 }}>
          © 2025 Secure Recovery • PAHRIKYNS
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
