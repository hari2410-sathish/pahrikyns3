import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { resetPassword } from "../../api/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  const navigate = useNavigate();
  const location = useLocation();

  // comes from OTP verification page
  const resetToken = location.state?.resetToken;

  // If no token → block access
  if (!resetToken) {
    navigate("/forgot-password");
    return null;
  }

  const validatePassword = () => {
    if (form.newPassword.length < 6) return "Minimum 6 characters";
    if (!/[A-Z]/.test(form.newPassword)) return "Must include one uppercase letter";
    if (!/[0-9]/.test(form.newPassword)) return "Must include one number";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validatePassword();
    if (error) {
      showToast(error);
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        token: resetToken,
        newPassword: form.newPassword,
      });

      showToast("Password changed successfully!", "success");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      showToast("Failed to reset password");
    } finally {
      setLoading(false);
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
          maxWidth: 400,
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
            mb: 3,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* NEW PASSWORD */}
          <TextField
            fullWidth
            label="New Password"
            type={showPass ? "text" : "password"}
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
            helperText={validatePassword()}
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
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                background: "rgba(255,255,255,0.07)",
                borderRadius: "10px",
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
            }}
          />

          {/* CONFIRM PASSWORD */}
          <TextField
            fullWidth
            label="Confirm Password"
            type={showPass2 ? "text" : "password"}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass2(!showPass2)}
                    sx={{ color: "#00eaff" }}
                  >
                    {showPass2 ? <VisibilityOff /> : <Visibility />}
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
              "& .MuiInputLabel-root": { color: "#94a3b8" },
            }}
          />

          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              py: 1.2,
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: 16,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#020617",
              textTransform: "none",
              boxShadow: "0 0 20px rgba(0,234,255,0.45)",
            }}
          >
            {loading ? <CircularProgress size={26} /> : "Reset Password"}
          </Button>
        </form>

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
