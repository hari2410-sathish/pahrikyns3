import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

/**
 * AchievementCard — COMPACT VERSION
 * - Fixed size collectible badge
 * - Data driven (title, icon, level)
 * - Never stretches full width
 */

export default function AchievementCard({ title, icon, level }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        sx={{
          /* 🔒 FIXED SIZE */
          width: 120,      // 👈 square feel
          height: 120,

          borderRadius: 3,
          p: 1.2,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.6,

          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",

          flexShrink: 0,   // 🚫 no shrink / stretch
        }}
      >
        {/* ICON */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            background: "rgba(125,211,252,0.18)",
            color: "#7dd3fc",
          }}
        >
          {icon || "★"}
        </Box>

        {/* TITLE */}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: "#e5e7eb",
            textAlign: "center",
            lineHeight: 1.2,

            /* 🛑 prevent overflow */
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>

        {/* LEVEL */}
        <Typography
          sx={{
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          Lv {level}
        </Typography>
      </Box>
    </motion.div>
  );
}
