// src/components/admin/PieMini.jsx

import React from "react";
import { Box, Typography } from "@mui/material";

export default function PieMini({ title, value }) {
  return (
    <Box
      sx={{
        background: "rgba(10,20,40,0.6)",
        borderRadius: 3,
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 3,
        border: "1px solid rgba(0,255,255,0.15)",
        boxShadow: "0 0 20px rgba(0,255,255,0.15)",
      }}
    >
      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: `conic-gradient(#00E5FF ${value * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 18px rgba(0,255,255,0.2)",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#0b1220",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontWeight: 800 }}>{value}%</Typography>
        </Box>
      </Box>

      <Box>
        <Typography sx={{ fontSize: 14, opacity: 0.7 }}>{title}</Typography>
        <Typography sx={{ fontSize: 12, opacity: 0.6, mt: 0.5 }}>
          Overall course completion
        </Typography>
      </Box>
    </Box>
  );
}
