// src/pages/Auth/AdminOTPVerify.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function AdminOTPVerify() {
  const navigate = useNavigate();

  // "email" or "sms"
  const [mode, setMode] = useState("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------
  // HANDLE OTP CHANGE BOXES
  // ---------------------------------------------------
  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);

      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    }
  };

  // ---------------------------------------------------
  // SEND OTP (TO BACKEND)
  // ---------------------------------------------------
 // SEND OTP
const sendOTP = async () => {
  setLoading(true);

  try {
    const res = await api.post("/otp/send", {
      method: mode,
      email: localStorage.getItem("adminEmail"),  // OPTIONAL
      phone: localStorage.getItem("adminPhone"),  // OPTIONAL
    });

    setSent(true);
    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to send OTP");
  }

  setLoading(false);
};

// VERIFY OTP
const handleSubmit = async (e) => {
  e.preventDefault();

  const code = otp.join("");

  try {
    const res = await api.post("/otp/verify", {
      otp: code,
    });

    alert("OTP Verified Successfully!");
    navigate("/admin");
  } catch (err) {
    alert(err.response?.data?.message || "Invalid OTP");
  }
};


  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------
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
      {/* FLOATING DOTS */}
      {[...Array(35)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${12 + Math.random() * 20}px`,
            height: `${12 + Math.random() * 20}px`,
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
          0%,100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-15px); }
        }
      `}</style>

      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 450,
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
            fontSize: 26,
            fontWeight: 800,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 3,
          }}
        >
          2-Step Verification
        </Typography>

        {/* MODE BUTTONS */}
        <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
          <Button
            onClick={() => setMode("email")}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "999px",
              px: 3,
              py: 1,
              color: mode === "email" ? "#020617" : "#00eaff",
              background:
                mode === "email"
                  ? "linear-gradient(90deg,#00eaff,#7b3fe4)"
                  : "rgba(255,255,255,0.08)",
            }}
          >
            Email OTP
          </Button>

          <Button
            onClick={() => setMode("sms")}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "999px",
              px: 3,
              py: 1,
              color: mode === "sms" ? "#020617" : "#00eaff",
              background:
                mode === "sms"
                  ? "linear-gradient(90deg,#00eaff,#7b3fe4)"
                  : "rgba(255,255,255,0.08)",
            }}
          >
            SMS OTP
          </Button>
        </Stack>

        <Typography sx={{ opacity: 0.7, mb: 2 }}>
          {sent
            ? `OTP sent to your ${
                mode === "email" ? "email" : "mobile number"
              }`
            : "Click below to receive OTP"}
        </Typography>

        {!sent && (
          <Button
            fullWidth
            onClick={sendOTP}
            disabled={loading}
            sx={{
              mb: 3,
              py: 1.2,
              borderRadius: "999px",
              fontWeight: 800,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#020617",
              textTransform: "none",
              boxShadow: "0 0 20px rgba(0,234,255,0.45)",
            }}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        )}

        {sent && (
          <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1.5} justifyContent="center" mb={4}>
              {otp.map((digit, index) => (
                <TextField
                  id={`otp-${index}`}
                  key={index}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: 22,
                      color: "#00eaff",
                      fontWeight: 700,
                    },
                  }}
                  sx={{
                    width: 50,
                    "& .MuiOutlinedInput-root": {
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      border: "1px solid rgba(0,255,255,0.3)",
                    },
                  }}
                />
              ))}
            </Stack>

            <Button
              fullWidth
              type="submit"
              sx={{
                py: 1.2,
                borderRadius: "999px",
                fontWeight: 800,
                background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                color: "#020617",
                textTransform: "none",
                boxShadow: "0 0 20px rgba(0,234,255,0.45)",
              }}
            >
              Verify OTP
            </Button>

            <Typography sx={{ mt: 3, opacity: 0.7 }}>
              Didn’t receive code?{" "}
              <span
                onClick={sendOTP}
                style={{ cursor: "pointer", color: "#00eaff" }}
              >
                Resend OTP
              </span>
            </Typography>
          </form>
        )}
      </Paper>
    </Box>
  );
}
