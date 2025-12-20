import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function PieMini({ value = 0, size = 140 }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  const [animatedValue, setAnimatedValue] = useState(0);

  // Smooth animation when value changes
  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = safeValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= safeValue) {
        start = safeValue;
        clearInterval(timer);
      }
      setAnimatedValue(Math.round(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [safeValue]);

  const degree = animatedValue * 3.6;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 1,
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `conic-gradient(#38bdf8 ${degree}deg, #1f2937 0deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 25px rgba(56,189,248,0.35)",
          transition: "background 0.3s linear",
        }}
      >
        <Box
          sx={{
            width: size * 0.62,
            height: size * 0.62,
            borderRadius: "50%",
            background: "#020617",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(148,163,184,0.2)",
          }}
        >
          <Typography fontSize={11} color="#9ca3af">
            Completion
          </Typography>
          <Typography fontSize={20} fontWeight={700} color="#E5E7EB">
            {animatedValue}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
