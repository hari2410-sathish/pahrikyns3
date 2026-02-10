import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import WhatshotIcon from "@mui/icons-material/Whatshot";

export default function StreakWidget({ streak = 7, xp = 420 }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const progressValue = Math.min((xp / 500) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,100,0,0.4)",
          boxShadow:
            "0 0 20px rgba(255,80,0,0.4), inset 0 0 25px rgba(255,120,0,0.2)",
          mt: { xs: 3, sm: 4 },
        }}
      >
        {/* FIRE ROW */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
            mb: 1.5,
          }}
        >
          <WhatshotIcon
            sx={{
              fontSize: { xs: 34, sm: 40 },
              color: "#ff6b00",
              filter: "drop-shadow(0 0 8px #ff4500)",
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: 18, sm: 22 },
              fontWeight: 700,
              background: "linear-gradient(90deg,#ff7a00,#ff4500)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              lineHeight: 1.2,
            }}
          >
            {streak}-Day Streak!
          </Typography>
        </Box>

        {/* XP LABEL */}
        <Typography
          sx={{
            fontSize: { xs: 12.5, sm: 14 },
            color: "#fca5a5",
            mb: 1,
          }}
        >
          XP Earned Today: {xp}
        </Typography>

        {/* PROGRESS BAR */}
        <LinearProgress
          variant="determinate"
          value={progressValue}
          sx={{
            height: { xs: 8, sm: 10 },
            borderRadius: 5,
            background: "rgba(255,255,255,0.15)",
            "& .MuiLinearProgress-bar": {
              background: "linear-gradient(90deg,#ff7a00,#ff4500)",
              boxShadow: "0 0 10px #ff4500",
            },
          }}
        />

        {/* XP GOAL TEXT */}
        <Typography
          sx={{
            fontSize: { xs: 11, sm: 12 },
            color: "#fbd5d5",
            mt: 1,
          }}
        >
          Reach 500 XP to keep your streak alive.
        </Typography>
      </Box>
    </motion.div>
  );
}
