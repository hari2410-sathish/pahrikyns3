import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";

import { sendResetEmail } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Enter your email");
      return;
    }

    await sendResetEmail(email);

    alert("Password reset link sent to your email!");
    navigate("/reset-password");
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
      {/* Neon Floating Orbs */}
      {[...Array(26)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${10 + Math.random() * 18}px`,
            height: `${10 + Math.random() * 18}px`,
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
            mb: 3,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Forgot Password
        </Typography>

        <Typography sx={{ opacity: 0.6, mb: 3, fontSize: 14 }}>
          Enter your email and we'll send you a reset link.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
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
            sx={{
              py: 1.2,
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: 16,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#020617",
              textTransform: "none",
              boxShadow: "0 0 20px rgba(0,234,255,0.45)",
              "&:hover": {
                boxShadow: "0 0 30px rgba(123,63,228,0.7)",
              },
            }}
          >
            Send Reset Link
          </Button>
        </form>

        <Typography sx={{ mt: 2, opacity: 0.6 }}>
          © 2025 Secure Recovery • PAHRIKYNS
        </Typography>
      </Paper>
    </Box>
  );
}
    