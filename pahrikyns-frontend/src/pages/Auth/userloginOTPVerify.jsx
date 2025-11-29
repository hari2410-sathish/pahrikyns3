import React, { useState } from "react";
import {
  Box, Paper, Typography, TextField,
  Button, Snackbar, Alert
} from "@mui/material";
import { verifyOTP, resendOTP } from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function UserLoginOTPVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", type: "error" });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const email = location.state?.email;
  if (!email) navigate("/login");

  const handleVerify = async () => {
    if (otp.length !== 6) {
      showToast("Enter your 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOTP(email, otp);
      login(res.data);
      showToast("Login successful!", "success");

      setTimeout(() => navigate("/dashboard"), 800);
    } catch {
      showToast("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP(email);
      showToast("OTP sent again!", "success");
    } catch {
      showToast("Failed to resend");
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(circle,#020617,#000)"
    }}>
      <Paper sx={{
        width: "100%", maxWidth: 380, p: 4, textAlign: "center",
        background: "rgba(10,20,40,0.85)", borderRadius: 3
      }}>

        <Typography sx={{ fontSize: 26, mb: 2, color: "#00eaff" }}>
          Verify OTP
        </Typography>

        <Typography sx={{ mb: 2, color: "#94a3b8" }}>
          OTP sent to <b>{email}</b>
        </Typography>

        <TextField
          fullWidth label="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button fullWidth onClick={handleVerify}
          sx={{ py: 1.2, fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)" }}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        <Button fullWidth onClick={handleResend} sx={{ mt: 2, color: "#00eaff" }}>
          Resend OTP
        </Button>

        <Snackbar open={toast.open} autoHideDuration={3000}
          onClose={() => setToast({ ...toast, open: false })}>
          <Alert severity={toast.type}>{toast.msg}</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
