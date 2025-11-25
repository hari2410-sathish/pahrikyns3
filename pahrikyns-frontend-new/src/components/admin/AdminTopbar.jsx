// === NEON THEME ADMIN TOPBAR ===

import React from "react";
import { Box, TextField, IconButton, Avatar, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function AdminTopbar() {
  return (
    <Box
      sx={{
        height: 72,
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        background: "linear-gradient(90deg, rgba(5,10,25,0.85), rgba(10,20,40,0.85))",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(0,234,255,0.25)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
        zIndex: 99,
      }}
    >
      <TextField
        placeholder="Search..."
        size="small"
        sx={{
          width: 320,
          borderRadius: "999px",
          input: {
            color: "#e2e8f0",
            padding: "10px 14px",
          },
          "& .MuiOutlinedInput-root": {
            background: "rgba(255,255,255,0.06)",
            borderRadius: "999px",
            border: "1px solid rgba(0,234,255,0.3)",
            backdropFilter: "blur(10px)",
            "& fieldset": { border: "none" },
            "&:hover": {
              border: "1px solid rgba(0,234,255,0.6)",
              boxShadow: "0 0 12px rgba(0,234,255,0.45)",
            },
          },
          "& input::placeholder": {
            color: "rgba(255,255,255,0.5)",
          },
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <IconButton
          sx={{
            width: 42,
            height: 42,
            borderRadius: "12px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(0,234,255,0.3)",
            color: "#00eaff",
            backdropFilter: "blur(10px)",
            "&:hover": {
              background: "rgba(0,234,255,0.15)",
              boxShadow: "0 0 15px rgba(0,234,255,0.55)",
            },
          }}
        >
          <NotificationsNoneIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              border: "2px solid #00eaff",
              boxShadow: "0 0 15px rgba(0,234,255,0.5)",
            }}
          >
            A
          </Avatar>

          <Typography fontWeight={700} sx={{ color: "#e0faff" }}>
            Admin
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
