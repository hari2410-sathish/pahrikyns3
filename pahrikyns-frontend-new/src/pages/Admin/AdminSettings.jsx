// src/pages/Admin/AdminSettings.jsx
// Full neon settings page for admin + Trusted Devices Manager

import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  Stack,
  Slider,
  Avatar,
  Divider,
} from "@mui/material";

import { AppThemeContext } from "../../ThemeContext";

// device store helpers
import {
  getTrustedDevices,
  removeTrustedDevice,
} from "../../utils/deviceStore";

// ------------------------------------------
// REUSABLE SETTINGS CARD
// ------------------------------------------
function SettingsCard({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        background: "rgba(10,20,40,0.85)",
        border: "1px solid rgba(0,255,255,0.18)",
        boxShadow: "0 0 24px rgba(0,255,255,0.18)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 2,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
        }}
      />

      <Typography sx={{ fontWeight: 800, mb: 0.5 }}>{title}</Typography>

      {subtitle && (
        <Typography sx={{ fontSize: 13, opacity: 0.7, mb: 2 }}>
          {subtitle}
        </Typography>
      )}

      {children}
    </Box>
  );
}

// ------------------------------------------
// MAIN COMPONENT
// ------------------------------------------
export default function AdminSettings() {
  // ---------- PROFILE ----------
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@pahrikyns.com",
  });

  // ---------- NOTIFS ----------
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newEnrollments: true,
    courseUpdates: false,
  });

  // ---------- UI SETTINGS ----------
  const [uiSettings, setUiSettings] = useState({
    compactSidebar: false,
    reducedMotion: false,
    glowIntensity: 70,
  });

  // ---------- THEME CONTEXT ----------
  const themeContext = useContext(AppThemeContext || {});
  const variant = themeContext?.variant;
  const setVariant = themeContext?.setVariant;

  // ---------- TRUSTED DEVICES ----------
  const [trustedDevices, setTrustedDevices] = useState([]);

  useEffect(() => {
    setTrustedDevices(getTrustedDevices());
  }, []);

  const handleRemoveDevice = (deviceId) => {
    removeTrustedDevice(deviceId);
    setTrustedDevices(getTrustedDevices());
  };

  // ---------- HANDLERS ----------
  const handleProfileChange = (key) => (e) => {
    setProfile((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleNotifToggle = (key) => (e) => {
    setNotifications((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  const handleUiToggle = (key) => (e) => {
    setUiSettings((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  const handleGlowChange = (_, value) => {
    setUiSettings((prev) => ({ ...prev, glowIntensity: value }));
  };

  const primaryButtonSx = {
    textTransform: "none",
    fontWeight: 700,
    px: 3,
    py: 1.1,
    borderRadius: "999px",
    background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
    color: "#020617",
    boxShadow: "0 0 20px rgba(0,234,255,0.5)",
    "&:hover": {
      boxShadow: "0 0 28px rgba(123,63,228,0.9)",
    },
  };

  return (
    <Box sx={{ p: 4, color: "white", position: "relative", zIndex: 1 }}>
      {/* PAGE TITLE */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 900 }}>
          Admin Settings
        </Typography>
        <Typography sx={{ fontSize: 14, opacity: 0.7, mt: 0.5 }}>
          Manage your profile, notifications and dashboard experience.
        </Typography>
      </Box>

      <Grid container spacing={3}>

        {/* ------------------ PROFILE ------------------ */}
        <Grid item xs={12} md={6}>
          <SettingsCard
            title="Profile & Account"
            subtitle="Update your basic information and login details."
          >
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "#00eaff",
                  color: "#020617",
                  fontWeight: 800,
                }}
              >
                {profile.name[0]}
              </Avatar>

              <Box>
                <Typography sx={{ fontWeight: 700 }}>
                  {profile.name}
                </Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
                  Admin • PAHRIKYNS Teaching
                </Typography>
              </Box>
            </Stack>

            <TextField
              label="Full Name"
              value={profile.name}
              onChange={handleProfileChange("name")}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { color: "white" },
                "& .MuiInputLabel-root": {
                  color: "rgba(148,163,184,0.9)",
                },
              }}
            />

            <TextField
              label="Email Address"
              value={profile.email}
              onChange={handleProfileChange("email")}
              fullWidth
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { color: "white" },
                "& .MuiInputLabel-root": {
                  color: "rgba(148,163,184,0.9)",
                },
              }}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={1}>
              <Button sx={primaryButtonSx}>Save Profile</Button>

              <Button
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  px: 3,
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.7)",
                  color: "#e5e7eb",
                  "&:hover": {
                    borderColor: "#00eaff",
                    color: "#00eaff",
                  },
                }}
              >
                Change Password
              </Button>
            </Stack>
          </SettingsCard>
        </Grid>

        {/* ------------------ NOTIFICATIONS ------------------ */}
        <Grid item xs={12} md={6}>
          <SettingsCard
            title="Notifications"
            subtitle="Control which events send you alerts."
          >
            <Stack spacing={2}>
              <RowToggle
                label="Email alerts"
                description="Important updates about your account"
                checked={notifications.emailAlerts}
                onChange={handleNotifToggle("emailAlerts")}
              />

              <RowToggle
                label="New enrollments"
                description="When students enroll into your courses"
                checked={notifications.newEnrollments}
                onChange={handleNotifToggle("newEnrollments")}
              />

              <RowToggle
                label="Course updates"
                description="Reminders about drafts & changes"
                checked={notifications.courseUpdates}
                onChange={handleNotifToggle("courseUpdates")}
              />
            </Stack>
          </SettingsCard>
        </Grid>

        {/* ------------------ THEME & UI ------------------ */}
        <Grid item xs={12} md={6}>
          <SettingsCard
            title="Theme & Interface"
            subtitle="Adjust how the dashboard looks and feels."
          >
            {setVariant && (
              <>
                <Typography sx={{ fontSize: 13, opacity: 0.7, mb: 1 }}>
                  Global Theme Variant
                </Typography>

                <Stack direction="row" spacing={1.5} mb={3}>
                  <Button
                    onClick={() => setVariant("futuristic")}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "999px",
                      px: 2,
                      py: 1.1,
                      background:
                        variant === "futuristic"
                          ? "linear-gradient(90deg,#00eaff,#7b3fe4)"
                          : "transparent",
                      color:
                        variant === "futuristic" ? "#020617" : "#e5e7eb",
                      border:
                        variant === "futuristic"
                          ? "1px solid transparent"
                          : "1px solid rgba(148,163,184,0.7)",
                    }}
                  >
                    Futuristic
                  </Button>

                  <Button
                    onClick={() => setVariant("corporate")}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "999px",
                      px: 2,
                      py: 1.1,
                      background:
                        variant === "corporate"
                          ? "rgba(15,23,42,0.9)"
                          : "transparent",
                      color:
                        variant === "corporate" ? "#e5e7eb" : "#9ca3af",
                      border:
                        variant === "corporate"
                          ? "1px solid rgba(148,163,184,0.9)"
                          : "1px solid rgba(55,65,81,0.8)",
                    }}
                  >
                    Corporate
                  </Button>
                </Stack>
              </>
            )}

            <RowToggle
              label="Compact sidebar"
              description="Reduce sidebar width"
              checked={uiSettings.compactSidebar}
              onChange={handleUiToggle("compactSidebar")}
            />

            <RowToggle
              label="Reduce motion"
              description="Turn off animations"
              checked={uiSettings.reducedMotion}
              onChange={handleUiToggle("reducedMotion")}
            />

            <Divider sx={{ my: 2, borderColor: "rgba(148,163,184,0.4)" }} />

            <Typography sx={{ fontSize: 13, opacity: 0.7, mb: 1 }}>
              Neon glow intensity
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Slider
                value={uiSettings.glowIntensity}
                onChange={handleGlowChange}
                min={0}
                max={100}
                sx={{
                  flex: 1,
                  "& .MuiSlider-thumb": {
                    boxShadow: "0 0 10px #00eaff",
                  },
                  "& .MuiSlider-track": {
                    background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                  },
                }}
              />

              <Typography sx={{ fontSize: 13, width: 40, textAlign: "right" }}>
                {uiSettings.glowIntensity}%
              </Typography>
            </Stack>
          </SettingsCard>
        </Grid>

        {/* ------------------ SECURITY ------------------ */}
        <Grid item xs={12} md={6}>
          <SettingsCard
            title="Security"
            subtitle="Keep your admin account safe."
          >

            <RowToggle
              label="Login alerts"
              description="Email when new device logs in"
              checked={true}
              onChange={() => {}}
            />

            <Divider sx={{ my: 2, borderColor: "rgba(148,163,184,0.4)" }} />

            {/* TRUSTED DEVICES LIST */}
            <Typography sx={{ fontSize: 16, fontWeight: 700, mb: 1 }}>
              Trusted Devices
            </Typography>

            <Typography sx={{ fontSize: 13, opacity: 0.7, mb: 2 }}>
              These devices skip extra OTP verification.
            </Typography>

            <Box
              sx={{
                border: "1px solid rgba(0,255,255,0.25)",
                borderRadius: 2,
                p: 2,
                mb: 2,
                background: "rgba(0,20,40,0.4)",
              }}
            >
              {trustedDevices.length === 0 ? (
                <Typography sx={{ opacity: 0.6, fontSize: 13 }}>
                  No trusted devices.
                </Typography>
              ) : (
                trustedDevices.map((dev) => (
                  <Box
                    key={dev.deviceId}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      borderBottom:
                        "1px solid rgba(0,255,255,0.1)",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        {dev.label}
                      </Typography>

                      <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
                        Device ID: {dev.deviceId}
                      </Typography>

                      <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
                        Added: {new Date(dev.addedAt).toLocaleString()}
                      </Typography>
                    </Box>

                    <Button
                      onClick={() =>
                        handleRemoveDevice(dev.deviceId)
                      }
                      sx={{
                        fontSize: 12,
                        px: 2,
                        py: 0.5,
                        borderRadius: "999px",
                        color: "#ff6b6b",
                        border:
                          "1px solid rgba(255,107,107,0.7)",
                        "&:hover": {
                          background: "rgba(255,107,107,0.2)",
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                ))
              )}
            </Box>

            <Typography sx={{ fontSize: 13, opacity: 0.7, mb: 1 }}>
              Danger Zone
            </Typography>

            <Typography sx={{ fontSize: 12, opacity: 0.6, mb: 2 }}>
              Logout from all devices if you suspect unauthorized access.
            </Typography>

            <Button
              sx={{
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                py: 1.1,
                borderRadius: "999px",
                border: "1px solid rgba(248,113,113,0.8)",
                color: "#fecaca",
                "&:hover": {
                  background: "rgba(248,113,113,0.18)",
                },
              }}
            >
              Logout from all devices
            </Button>
          </SettingsCard>
        </Grid>

      </Grid>
    </Box>
  );
}

// ------------------------------------------
// ROW TOGGLE COMPONENT
// ------------------------------------------
function RowToggle({ label, description, checked, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          {label}
        </Typography>

        {description && (
          <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
            {description}
          </Typography>
        )}
      </Box>

      <Switch checked={checked} onChange={onChange} />
    </Box>
  );
}
