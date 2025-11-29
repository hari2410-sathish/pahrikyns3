import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import { sendResetOTP } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showToast("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await sendResetOTP({ email });

      showToast("OTP sent to your email!", "success");

      navigate("/reset-verify", { state: { email } });
    } catch (err) {
      showToast("Failed to send reset OTP");
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
            borderRadius: "50%",
            background: "rgba(0,234,255,0.7)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(12px)",
            opacity: 0.3,
            animation: `float ${4 + Math.random() * 6}s infinite ease-in-out`,
          }}
        />
      ))}

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
          Forgot Password
        </Typography>

        <Typography sx={{ opacity: 0.6, mb: 3 }}>
          Enter your email to receive an OTP.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? <CircularProgress size={26} /> : "Send OTP"}
          </Button>
        </form>

        <Typography sx={{ mt: 2, opacity: 0.6 }}>
          © 2025 PAHRIKYNS • Secure Recovery
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
