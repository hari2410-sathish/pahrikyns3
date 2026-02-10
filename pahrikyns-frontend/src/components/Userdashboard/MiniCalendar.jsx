import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

/**
 * MiniCalendar (Dashboard Version)
 * PURPOSE:
 * - Lightweight planning reference
 * - Should never overpower main cards
 * - Optimized for grid layouts
 */

export default function MiniCalendar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const today = new Date();
  const month = today.toLocaleString("en-IN", { month: "long" });
  const year = today.getFullYear();
  const day = today.getDate();

  const firstDay = new Date(year, today.getMonth(), 1).getDay();
  const totalDays = new Date(year, today.getMonth() + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push("");
  for (let d = 1; d <= totalDays; d++) daysArray.push(d);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* MONTH HEADER */}
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            mb: 1.5,
            textAlign: "center",
            color: "#e6f7ff",
          }}
        >
          {month} {year}
        </Typography>

        {/* WEEK LABELS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            textAlign: "center",
            mb: 0.5,
            fontSize: 11,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {["S", "M", "T", "W", "T", "F", "S"].map((w, i) => (
            <Typography key={i}>{w}</Typography>
          ))}
        </Box>

        {/* DAYS GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: 0.6,
          }}
        >
          {daysArray.map((d, i) => {
            const isToday = d === day;

            return (
              <Box
                key={i}
                sx={{
                  height: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1.5,
                  fontSize: 12,
                  color: isToday ? "#000" : "#fff",
                  background: isToday
                    ? "linear-gradient(90deg,#00eaff,#7b3fe4)"
                    : "rgba(255,255,255,0.05)",
                  fontWeight: isToday ? 600 : 400,
                }}
              >
                {d}
              </Box>
            );
          })}
        </Box>
      </Box>
    </motion.div>
  );
}
