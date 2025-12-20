import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Divider,
  Tooltip,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Social icons
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import AdbIcon from "@mui/icons-material/Adb"; // 🔧 using as GitLab icon

import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { loginUser, googleLogin } from "../../api/auth";
import { getDeviceInfo } from "../../utils/deviceHelper";

import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from =
  location.state?.from || (isAdmin ? "/admin/dashboard" : "/");



  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ================= NORMAL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      showToast("Please enter email & password");
      return;
    }

    setLoading(true);
    try {
      const device = getDeviceInfo();

      const res = await loginUser({
        ...form,
        device,
        role: isAdmin ? "admin" : "user",
      });

      login(res.data);

      if (isAdmin) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      showToast("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // small helper – for future backend you just replace showToast with redirect
  const handleSocialComingSoon = (name) => {
    showToast(`${name} login coming soon`, "info");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/bg-login.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      <Paper
        elevation={14}
        sx={{
          width: "100%",
          maxWidth: 920,
          height: 570,
          display: "flex",
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            flex: 1,
            background:
              "radial-gradient(circle at top, #dbeafe, #eff6ff 40%, #e5f4ff)",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <img
            src="/assets/login-security.png"
            alt="login"
            style={{ width: "75%", maxWidth: 320 }}
          />
          <Typography sx={{ mt: 3, color: "#2563eb", fontWeight: 800 }}>
            Secure Login System
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#4b5563",
              fontSize: 13,
              textAlign: "center",
              maxWidth: 260,
            }}
          >
            Device tracking, admin control & multi-factor security built for
            DevOps learners.
          </Typography>
        </Box>

        {/* RIGHT FORM */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(180deg,#2563eb,#1e3a8a)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 3, md: 5 },
          }}
        >
          <Typography
            sx={{ fontSize: 32, fontWeight: 800, color: "#fff", mb: 0.5 }}
          >
            Welcome Back
          </Typography>
          <Typography
            sx={{ fontSize: 14, color: "rgba(255,255,255,0.8)", mb: 2 }}
          >
            Login to continue your DevOps journey.
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                color="warning"
              />
            }
            label={
              <Typography sx={{ color: "#fff", fontSize: 13 }}>
                Login as Admin
              </Typography>
            }
            sx={{ mb: 2 }}
          />

          {/* ========== SOCIAL LOGINS ========== */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 13,
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Continue with
            </Typography>

            {/* GOOGLE (REAL) */}
            <Box sx={{ mb: 1 }}>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
  try {
    const res = await googleLogin(
      credentialResponse.credential
    );
    login(res.data);
    navigate(from, { replace: true }); // ✅ SAME FIX
  } catch (err) {
    showToast("Google Login Failed");
  }
}}

                onError={() => {
                  showToast("Google Login Failed");
                }}
              />
            </Box>

            {/* OTHER SOCIALS – FRONTEND ONLY NOW */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 0.5,
              }}
            >
              <Tooltip title="GitHub (coming soon)">
                <IconButton
                  onClick={() => handleSocialComingSoon("GitHub")}
                  sx={{
                    bgcolor: "#111827",
                    "&:hover": { bgcolor: "#020617" },
                    color: "#fff",
                  }}
                  size="small"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="GitLab (coming soon)">
                <IconButton
                  onClick={() => handleSocialComingSoon("GitLab")}
                  sx={{
                    bgcolor: "#fc6d26",
                    "&:hover": { bgcolor: "#ea580c" },
                    color: "#fff",
                  }}
                  size="small"
                >
                  <AdbIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Facebook (coming soon)">
                <IconButton
                  onClick={() => handleSocialComingSoon("Facebook")}
                  sx={{
                    bgcolor: "#1877f2",
                    "&:hover": { bgcolor: "#1456b8" },
                    color: "#fff",
                  }}
                  size="small"
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Instagram (coming soon)">
                <IconButton
                  onClick={() => handleSocialComingSoon("Instagram")}
                  sx={{
                    bgcolor:
                      "radial-gradient(circle at 30% 30%, #fdf497 0, #fd5949 40%, #d6249f 70%, #285AEB 100%)",
                    color: "#fff",
                  }}
                  size="small"
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="WhatsApp OTP (coming soon)">
                <IconButton
                  onClick={() => handleSocialComingSoon("WhatsApp")}
                  sx={{
                    bgcolor: "#22c55e",
                    "&:hover": { bgcolor: "#16a34a" },
                    color: "#fff",
                  }}
                  size="small"
                >
                  <WhatsAppIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.35)" }}>
            <Typography
              sx={{
                fontSize: 11,
                color: "rgba(255,255,255,0.7)",
                px: 1,
              }}
            >
              or sign in with email
            </Typography>
          </Divider>

          {/* ========== EMAIL / PASSWORD LOGIN ========== */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={{
                mb: 2.5,
                background: "#fff",
                borderRadius: 1.5,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
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
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                background: "#fff",
                borderRadius: 1.5,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                py: 1.4,
                borderRadius: 999,
                fontWeight: 800,
                letterSpacing: 0.5,
                background:
                  "linear-gradient(90deg,#facc15,#fde047,#f97316)",
                color: "#000",
                "&:hover": {
                  background:
                    "linear-gradient(90deg,#eab308,#facc15,#fb923c)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.18s ease",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "LOGIN"}
            </Button>
          </form>

          <Typography
            sx={{
              mt: 3,
              color: "rgba(255,255,255,0.85)",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#fde047", fontWeight: 700 }}
            >
              Register
            </Link>
          </Typography>
        </Box>
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
