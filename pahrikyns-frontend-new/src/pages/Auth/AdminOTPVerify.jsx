import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../contexts/AdminAuthContext";

export default function AdminOTPVerify() {
  const { sendOtp, verifyOtp } = useContext(AdminAuthContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [method, setMethod] = useState("email");

  const navigate = useNavigate();

  async function handleSend() {
    try {
      await sendOtp({ email, method }); // ✅ FIXED (remove preToken)
      alert("OTP sent successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Sending OTP failed");
    }
  }

  async function handleVerify() {
    try {
      const res = await verifyOtp({ email, otp }); // ✅ FIXED

      if (res.token) {
        localStorage.setItem("admin_token", res.token);
        localStorage.setItem("admin", JSON.stringify({ email })); // optional
        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Paper sx={{ p: 4, width: 420 }}>
        <Typography variant="h6" mb={2}>
          Admin OTP Verification
        </Typography>

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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

          <Button variant="outlined" onClick={handleSend}>
            Send OTP
          </Button>

          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button variant="contained" onClick={handleVerify}>
            Verify & Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
