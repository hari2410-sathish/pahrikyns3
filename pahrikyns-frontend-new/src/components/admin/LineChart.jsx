// src/components/admin/LineChart.jsx

import React from "react";
import { Box, Typography } from "@mui/material";

export default function LineChart({ title, data = [] }) {
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

      <Box sx={{ position: "relative", height: 200 }}>
        <svg width="100%" height="100%">
          {/* neon line */}
          <polyline
            fill="none"
            stroke="#00eaff"
            strokeWidth="3"
            points={data
              .map(
                (p, i) =>
                  `${(i / (data.length - 1)) * 100}%, ${
                    100 - (p.value / max) * 100
                  }%`
              )
              .join(" ")}
            style={{ filter: "drop-shadow(0 0 6px #00eaff)" }}
          />
        </svg>

        {/* Glow dots */}
        {data.map((p, i) => (
          <Box
            key={p.day}
            sx={{
              position: "absolute",
              left: `${(i / (data.length - 1)) * 100}%`,
              bottom: `${(p.value / max) * 100}%`,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#00eaff",
              boxShadow: "0 0 12px #00eaff",
              transform: "translate(-50%, 50%)",
            }}
          />
        ))}
      </Box>

      {/* labels */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        {data.map((p) => (
          <Typography key={p.day} sx={{ fontSize: 12, opacity: 0.7 }}>
            {p.day}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
