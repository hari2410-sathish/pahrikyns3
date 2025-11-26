import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { authenticator } from "otplib";

export default function AdminTOTPSetup() {
  const navigate = useNavigate();

  const [secret, setSecret] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [otp, setOtp] = useState("");

  // Generate secret + QR
  useEffect(() => {
    const newSecret = authenticator.generateSecret();
    setSecret(newSecret);

    const otpauth = authenticator.keyuri(
      "admin@example.com",          // admin email
      "Pahrikyns Admin Panel",      // issuer name
      newSecret
    );

    QRCode.toDataURL(otpauth).then(setQrImage);
  }, []);

  const handleVerify = () => {
    const isValid = authenticator.verify({ token: otp, secret });

    if (!isValid) {
      alert("❌ Invalid Code! Try again.");
      return;
    }

    alert("✅ TOTP Enabled Successfully!");
    navigate("/admin");
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
      {/* Floating particles */}
      {[...Array(35)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${12 + Math.random() * 18}px`,
            height: `${12 + Math.random() * 18}px`,
            borderRadius: "50%",
            background: "rgba(0,234,255,0.7)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(18px)",
            opacity: 0.25,
            animation: `float ${4 + Math.random() * 6}s infinite ease-in-out`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-12px); opacity: 0.85; }
        }
      `}</style>

      <Paper
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 4,
          background: "rgba(10,20,40,0.85)",
          border: "1px solid rgba(0,255,255,0.3)",
          boxShadow: "0 0 40px rgba(0,255,255,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 800,
            mb: 2,
            textAlign: "center",
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Setup Google Authenticator
        </Typography>

        <Typography sx={{ opacity: 0.7, mb: 3, textAlign: "center" }}>
          Scan the QR code below using Google Authenticator, Authy, or Microsoft Authenticator.
        </Typography>

        {/* QR Code */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          {qrImage ? (
            <img
              src={qrImage}
              alt="TOTP QR"
              style={{
                width: 180,
                padding: 12,
                borderRadius: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(0,255,255,0.25)",
              }}
            />
          ) : (
            <Typography>Loading QR...</Typography>
          )}
        </Box>

        {/* Manual Code */}
        <Typography
          sx={{
            fontSize: 14,
            opacity: 0.6,
            mb: 3,
            textAlign: "center",
            wordBreak: "break-all",
          }}
        >
          Manual Key: <br /> <b style={{ color: "#00eaff" }}>{secret}</b>
        </Typography>

        {/* OTP Input */}
        <Stack spacing={2}>
          <TextField
            label="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 6 }}
            sx={{
              input: { color: "white", textAlign: "center", fontSize: 20 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(0,255,255,0.25)",
              },
            }}
          />

          <Button
            onClick={handleVerify}
            sx={{
              py: 1.3,
              borderRadius: "999px",
              fontWeight: 800,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#020617",
              textTransform: "none",
              boxShadow: "0 0 25px rgba(0,234,255,0.45)",
              "&:hover": { boxShadow: "0 0 35px rgba(123,63,228,0.6)" },
            }}
          >
            Verify & Enable
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
