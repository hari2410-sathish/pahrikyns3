import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // from /admin/reset/:token

  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pass.trim() || !confirm.trim()) {
      alert("Please fill all fields.");
      return;
    }

    if (pass !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    // Fake backend success
    alert("Password reset successful!");
    navigate("/admin/login");
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
      {/* Floating Neon Orbs */}
      {[...Array(35)].map((_, i) => (
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
            filter: "blur(15px)",
            opacity: 0.25,
            animation: `float ${4 + Math.random() * 6}s infinite ease-in-out`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-15px); opacity: 0.85; }
        }
      `}</style>

      {/* Reset Password Card */}
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
          boxShadow: "0 0 40px rgba(0,255,255,0.22)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 800,
            mb: 3,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Reset Password
        </Typography>

        <Typography sx={{ opacity: 0.7, mb: 3, fontSize: 15 }}>
          Set a strong new password for your admin account.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                background: "rgba(255,255,255,0.08)",
                borderRadius: "10px",
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                background: "rgba(255,255,255,0.08)",
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
                boxShadow: "0 0 30px rgba(123,63,228,0.65)",
              },
            }}
          >
            Reset Password
          </Button>
        </form>

        <Typography sx={{ mt: 3, opacity: 0.7 }}>
          Back to{" "}
          <span
            onClick={() => navigate("/admin/login")}
            style={{ cursor: "pointer", color: "#00eaff" }}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}
