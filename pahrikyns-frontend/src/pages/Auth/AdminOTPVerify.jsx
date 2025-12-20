import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../modules/adminmodules/context/AdminAuthContext";

export default function AdminOTPVerify() {
  // ✅ USE CUSTOM HOOK (FIX)
  const { sendOtp, verifyOtp } = useAdminAuth();

  const savedEmail = sessionStorage.getItem("admin_email");
  const preOtpToken = sessionStorage.getItem("pre_otp_token");

  const [email] = useState(savedEmail || "");
  const [otp, setOtp] = useState("");
  const [method, setMethod] = useState("email");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =========================
  // 🔒 PROTECT DIRECT ACCESS
  // =========================
  useEffect(() => {
    if (!savedEmail || !preOtpToken) {
      alert("Session expired! Please login again.");
      navigate("/admin/login", { replace: true });
    }
  }, [savedEmail, preOtpToken, navigate]);

  // =========================
  // 📩 SEND OTP
  // =========================
  async function handleSend() {
    if (!preOtpToken) {
      alert("Token expired! Please login again.");
      navigate("/admin/login");
      return;
    }

    try {
      setLoading(true);
      await sendOtp({ email, method });
      alert("OTP sent successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Sending OTP failed");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // 🔐 VERIFY OTP
  // =========================
  async function handleVerify() {
    if (!otp.trim()) {
      alert("Please enter the OTP");
      return;
    }

    if (otp.length < 4) {
      alert("OTP must be at least 4 digits");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtp({ email, otp });

      // ✅ CONTEXT already saves admin + token
      if (!res?.token) {
        throw new Error("Invalid OTP response");
      }

      // ✅ CLEAR TEMP SESSION DATA
      sessionStorage.removeItem("admin_email");
      sessionStorage.removeItem("pre_otp_token");

      // ✅ REDIRECT
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh"
    >
      <Paper sx={{ p: 4, width: 420 }}>
        <Typography variant="h6" mb={2}>
          Admin OTP Verification
        </Typography>

        <Stack spacing={2}>
          <TextField fullWidth label="Email" value={email} disabled />

          <Stack direction="row" spacing={1}>
            <Button
              variant={method === "email" ? "contained" : "outlined"}
              onClick={() => setMethod("email")}
            >
              Email
            </Button>

            <Button
              variant={method === "sms" ? "contained" : "outlined"}
              onClick={() => setMethod("sms")}
            >
              SMS
            </Button>

            <Button
              variant={method === "both" ? "contained" : "outlined"}
              onClick={() => setMethod("both")}
            >
              Both
            </Button>
          </Stack>

          <Button
            variant="outlined"
            onClick={handleSend}
            disabled={loading}
          >
            Send OTP
          </Button>

          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 6 }}
          />

          <Button
            variant="contained"
            onClick={handleVerify}
            disabled={loading || otp.trim() === ""}
          >
            Verify & Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
