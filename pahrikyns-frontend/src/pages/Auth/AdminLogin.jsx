import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

import { useAdminAuth } from "../../modules/adminmodules/context/AdminAuthContext";
import { googleLogin } from "../../api/auth";
import { GoogleLogin } from "@react-oauth/google";

export default function AdminLogin() {
  const { login, verifyOtp } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const navigate = useNavigate();

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ================= NORMAL ADMIN LOGIN =================
  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please enter email & password");
      return;
    }

    setLoading(true);

    try {
      const res = await login({ email, password });

      sessionStorage.setItem("admin_email", email);

      // OTP REQUIRED
      if (res.next === "otp") {
        sessionStorage.setItem("pre_otp_token", res.token);
        navigate("/admin/otp");
        return;
      }

      // DIRECT LOGIN SUCCESS
      if (res.token) {


        // 🔥 UPDATE CONTEXT to avoid auto logout
        localStorage.setItem(
          "admin",
          JSON.stringify({ email, role: "admin" })
        );

        navigate("/admin/dashboard");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  }

  // ================= GOOGLE ADMIN LOGIN =================
  const handleGoogleAdminLogin = async (cred) => {
    try {
      setGoogleLoading(true);

      const res = await googleLogin(cred.credential);

      if (res.data.user.role !== "admin") {
        showToast("This Google account is not an Admin");
        return;
      }

      // Save token
      localStorage.setItem("ADMIN_TOKEN", res.data.token);

      // 🔥 UPDATE CONTEXT
      localStorage.setItem(
        "admin",
        JSON.stringify({ email: res.data.user.email, role: "admin" })
      );

      navigate("/admin/dashboard");
    } catch (err) {
      showToast("Google Admin Login Failed");
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
        background: "radial-gradient(circle, #020617, #000)",
        p: 3,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          background: "rgba(10,20,40,0.9)",
          border: "1px solid rgba(255,0,0,0.25)",
          boxShadow: "0 0 40px rgba(255,0,0,0.25)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 800,
            mb: 2,
            color: "#f87171",
          }}
        >
          ADMIN LOGIN
        </Typography>

        {/* GOOGLE LOGIN */}
        <Box sx={{ mb: 2 }}>
          <GoogleLogin
            onSuccess={handleGoogleAdminLogin}
            onError={() => showToast("Google Login Failed")}
          />
        </Box>

        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.25)" }} />

        {/* EMAIL/PASS LOGIN */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2.3,
              "& .MuiOutlinedInput-root": {
                background: "rgba(255,255,255,0.07)",
                borderRadius: "10px",
              },
            }}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass(!showPass)}
                    sx={{ color: "#f87171" }}
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                background: "rgba(255,255,255,0.07)",
                borderRadius: "10px",
              },
            }}
            required
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
              background: "linear-gradient(90deg,#f87171,#dc2626)",
              color: "#020617",
              textTransform: "none",
              boxShadow: "0 0 20px rgba(255,0,0,0.45)",
            }}
          >
            {loading ? <CircularProgress size={26} /> : "NEXT"}
          </Button>
        </form>
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
