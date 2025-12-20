import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function BarChart({ data = [], height = 180 }) {
  const safe = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState(null);

  const max = Math.max(...safe.map((d) => Number(d.value || 0)), 1);

  // Animate bars
  useEffect(() => {
    setProgress(0);
    if (!safe.length) return;

    let current = 0;
    const timer = setInterval(() => {
      current += 5;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
      }
      setProgress(current);
    }, 16);

    return () => clearInterval(timer);
  }, [safe.length]);

  if (!safe.length) {
    return (
      <Box sx={{ height, display: "flex", alignItems: "center" }}>
        <Box sx={{ fontSize: 12, color: "#6b7280" }}>No data</Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 1, position: "relative" }}>
      {/* Tooltip */}
      {hover && (
        <Box
          sx={{
            position: "absolute",
            top: hover.y - 36,
            left: hover.x - 18,
            bgcolor: "#020617",
            border: "1px solid rgba(56,189,248,0.6)",
            px: 1,
            py: 0.4,
            borderRadius: 1,
            fontSize: 11,
            color: "#E5E7EB",
            pointerEvents: "none",
            zIndex: 10,
            whiteSpace: "nowrap",
          }}
        >
          {hover.label} : {hover.value}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
          height,
        }}
      >
        {safe.map((item, i) => {
          const rawHeight = (Number(item.value || 0) / max) * 100;
          const animatedHeight = (rawHeight * progress) / 100;

          return (
            <Box key={i} sx={{ flex: 1, textAlign: "center" }}>
              <Box
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHover({
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                    label: item.name || item.month || item.label || `#${i + 1}`,
                    value: item.value,
                  });
                }}
                onMouseLeave={() => setHover(null)}
                sx={{
                  height: `${animatedHeight}%`,
                  borderRadius: 8,
                  background:
                    "linear-gradient(180deg,#38bdf8,#1d4ed8 60%,#020617)",
                  border: "1px solid #1d4ed8",
                  boxShadow: "0 0 15px rgba(56,189,248,0.35)",
                  transition: "height 0.2s linear",
                  cursor: "pointer",
                }}
              />
              <Typography sx={{ mt: 0.6, fontSize: 11, color: "#9ca3af" }}>
                {item.name || item.month || item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
