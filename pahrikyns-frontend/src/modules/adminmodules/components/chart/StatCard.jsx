// src/components/admin/StatCard.jsx

import React from "react";
import { Box, Typography } from "@mui/material";

export default function StatCard({ title, value, icon }) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "rgba(10,20,40,0.6)",
        border: "1px solid rgba(0,255,255,0.15)",
        boxShadow: "0 0 18px rgba(0,255,255,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 0 25px rgba(0,255,255,0.4)",
        },
      }}
    >
      <Typography sx={{ opacity: 0.6, fontSize: 14 }}>{title}</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <Typography sx={{ fontSize: 32, fontWeight: 800 }}>
          {value}
        </Typography>

        <span style={{ fontSize: 28 }}>{icon}</span>
      </Box>
    </Box>
  );
}
