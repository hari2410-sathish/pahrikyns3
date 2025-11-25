// src/components/admin/BarChart.jsx

import React from "react";
import { Box, Typography } from "@mui/material";

export default function BarChart({ title, data = [] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Box
      sx={{
        background: "rgba(10,20,40,0.6)",
        borderRadius: 3,
        p: 3,
        border: "1px solid rgba(0,255,255,0.15)",
        boxShadow: "0 0 20px rgba(0,255,255,0.15)",
      }}
    >
      <Typography sx={{ mb: 2, fontWeight: 800, color: "#00eaff" }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 2,
          height: 200,
        }}
      >
        {data.map((item) => (
          <Box key={item.month} sx={{ flex: 1, textAlign: "center" }}>
            <Box
              sx={{
                height: `${(item.value / max) * 100}%`,
                background: "linear-gradient(180deg,#00eaff,#0072ff)",
                borderRadius: 2,
                boxShadow: "0 0 15px rgba(0,255,255,0.4)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 0 25px #00eaff",
                  transform: "translateY(-4px)",
                },
              }}
            />
            <Typography sx={{ mt: 1, fontSize: 12, opacity: 0.7 }}>
              {item.month}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
