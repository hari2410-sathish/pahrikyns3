import React, { useState, useContext } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../contexts/AdminAuthContext";

export default function AdminLogin() {
  const { login } = useContext(AdminAuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      if (res.next === "otp") {
        sessionStorage.setItem("pre_otp_token", res.token);
        navigate("/admin/verify-otp"); // ✅ FIXED ROUTE
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h6" mb={2}>
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" fullWidth>
            NEXT
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
