import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { registerUser } from "../../api/auth";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await registerUser(form);

      // Auto login after register
      login(res.data);

      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
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
      {/* Floating Neon Orbs */}
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
          CREATE ACCOUNT
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            sx={{
              mb: 2.3,
              "& .MuiOutlinedInput-root": {
                background: "rgba(255,255,255,0.07)",
                borderRadius: "10px",
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            sx={{
              mb: 2.3,
              "& .MuiOutlinedInput-root": {
                background: "rgba(255,255,255,0.07)",
                borderRadius: "10px",
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
            }}
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
              mt: 1,
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
            Register
          </Button>
        </form>

        <Typography sx={{ mt: 2, opacity: 0.6 }}>
          © 2025 PAHRIKYNS • Create Your Learning Journey
        </Typography>
      </Paper>
    </Box>
  );
}
