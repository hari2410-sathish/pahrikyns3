import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function SaasStatCard({
  title,
  value,
  subtitle,
  color = "#38bdf8",
}) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 16,
        background: "#020617",
        border: "1px solid #1e293b",
        boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box>
        <Typography fontSize={12} color="#9ca3af">
          {title}
        </Typography>
        <Typography fontSize={22} fontWeight={700}>
          {value}
        </Typography>
        <Typography fontSize={11} color="#22c55e" mt={0.5}>
          {subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: `linear-gradient(135deg,${color},#0ea5e9)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          color: "white",
        }}
      >
        $
      </Box>
    </Paper>
  );
}
