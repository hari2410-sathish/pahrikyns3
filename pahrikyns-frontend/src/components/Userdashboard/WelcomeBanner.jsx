import React from "react";
import { Box, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { motion } from "framer-motion";

export default function WelcomeBanner({
  name = "annamalai",
  level = 6,
  streak = 14,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Box
        sx={{
          /* 🔒 FIXED SIZE — IMPORTANT */
          width: 220,          // 👉 change if needed
          height: 100,          // 👉 rectangular height
          borderRadius: 2,     // square / soft rectangle
          px: 1.2,

          display: "flex",
          alignItems: "center",
          gap: 1,

          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(12px)",

          /* ❌ prevent full stretch */
          flexShrink: 0,
        }}
      >
        {/* NAME */}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: "#e5f6ff",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>

        {/* LEVEL ICON */}
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 13, color: "#c7d2fe" }} />
        </Box>

        <Typography sx={{ fontSize: 11, color: "#cbd5e1" }}>
          {level}
        </Typography>

        {/* STREAK ICON */}
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "rgba(251,146,60,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WhatshotIcon sx={{ fontSize: 13, color: "#fdba74" }} />
        </Box>

        <Typography sx={{ fontSize: 11, color: "#cbd5e1" }}>
          {streak}
        </Typography>
      </Box>
    </motion.div>
  );
}
