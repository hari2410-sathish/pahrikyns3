import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function LineChart({ data = [], height = 160 }) {
  const safe = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState(null);

  const max = Math.max(...safe.map((d) => Number(d.value || 0)), 1);

  // ✅ Smooth animation (requestAnimationFrame – pro level)
  useEffect(() => {
    setProgress(0);
    if (!safe.length) return;

    let frame;
    let start;

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / 800) * 100, 100);
      setProgress(pct);

      if (pct < 100) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [safe.length]);

  if (!safe.length) {
    return (
      <Box sx={{ height, display: "flex", alignItems: "center" }}>
        <Typography fontSize={12} sx={{ opacity: 0.6 }}>
          No data available
        </Typography>
      </Box>
    );
  }

  const points = safe
    .map((p, i) => {
      const x = (i / (safe.length - 1 || 1)) * 100;
      const y = 100 - (Number(p.value || 0) / max) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Box sx={{ height, position: "relative" }}>
      {/* ✅ Tooltip */}
      {hover && (
        <Box
          sx={{
            position: "absolute",
            top: hover.y - 30,
            left: hover.x + 10,
            bgcolor: "#020617",
            border: "1px solid rgba(56,189,248,0.6)",
            px: 1.1,
            py: 0.4,
            borderRadius: 1,
            fontSize: 11,
            color: "#E5E7EB",
            pointerEvents: "none",
            zIndex: 10,
            whiteSpace: "nowrap",
          }}
        >
          <b>{hover.label}</b> : {hover.value}
        </Box>
      )}

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="v2Glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* ✅ Grid base */}
        <line
          x1="0"
          y1="90"
          x2="100"
          y2="90"
          stroke="#111827"
          strokeWidth="0.5"
        />

        {/* ✅ Area glow */}
        <polygon
          fill="url(#v2Glow)"
          points={`0,90 ${points} 100,90`}
          opacity={progress / 100}
        />

        {/* ✅ Animated main line */}
        <polyline
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.2"
          strokeDasharray="240"
          strokeDashoffset={240 - progress * 2.4}
          points={points}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />

        {/* ✅ Interactive points */}
        {safe.map((p, i) => {
          const x = (i / (safe.length - 1 || 1)) * 100;
          const y = 100 - (Number(p.value || 0) / max) * 80 - 10;

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2.8"
              fill="#38bdf8"
              stroke="#020617"
              strokeWidth="0.7"
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => {
                const rect =
                  e.target.ownerSVGElement.getBoundingClientRect();
                setHover({
                  x: (x / 100) * rect.width,
                  y: (y / 100) * rect.height,
                  label: p.name || `Point ${i + 1}`,
                  value: p.value,
                });
              }}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </svg>

      {/* ✅ Bottom Labels – mobile safe */}
      <Box
        sx={{
          mt: 0.6,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          color: "#9ca3af",
          overflow: "hidden",
        }}
      >
        {safe.map((p, i) => (
          <Typography
            key={i}
            variant="caption"
            sx={{
              maxWidth: 60,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {p.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
