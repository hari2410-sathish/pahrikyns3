import React from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";

export default function DeviceAlertModal({
  open,
  deviceInfo,
  onTrust,
  onReport,
  onLogout,
}) {
  if (!open || !deviceInfo) return null;

  const { fp, persistentId } = deviceInfo;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 4000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <Paper
        sx={{
          p: 3,
          width: 420,
          borderRadius: 3,
          background: "rgba(10,20,40,0.95)",
          border: "1px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 40px rgba(0,255,255,0.4)",
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 800,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 1,
          }}
        >
          New Device Login Detected
        </Typography>

        <Typography sx={{ color: "#cbe8ff", mb: 2 }}>
          This device is not in your trusted list.
        </Typography>

        <Box
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <Typography sx={{ fontSize: 12 }}>Device ID:</Typography>
          <Typography sx={{ fontSize: 12, color: "#00eaff" }}>
            {persistentId}
          </Typography>

          <Typography sx={{ fontSize: 12, mt: 1 }}>User Agent:</Typography>
          <Typography sx={{ fontSize: 12, color: "#00eaff" }}>
            {fp.ua}
          </Typography>

          <Typography sx={{ fontSize: 12, mt: 1 }}>
            Screen / TZ / Lang:
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#00eaff" }}>
            {fp.scr} • {fp.tz} • {fp.lang}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onReport} sx={{ color: "#f97373" }}>
            Report
          </Button>
          <Button onClick={onLogout} sx={{ color: "#94a3b8" }}>
            Logout
          </Button>
          <Button
            onClick={onTrust}
            sx={{
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#020617",
              fontWeight: 800,
            }}
          >
            Trust Device
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
