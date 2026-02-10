import React from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

/**
 * Leaderboard (Dashboard Version)
 * PURPOSE:
 * - Show competitive ranking
 * - Should feel structured & authoritative
 * - Must not overpower surrounding cards
 */

const leaderboard = [
  { name: "Arun", xp: 1540, rank: 1, color: "#ffd700" },
  { name: "Sanjay", xp: 1390, rank: 2, color: "#c0c0c0" },
  { name: "Nisha", xp: 1260, rank: 3, color: "#cd7f32" },
  { name: "Ravi", xp: 970, rank: 4, color: "#00eaff" },
  { name: "Megha", xp: 820, rank: 5, color: "#7b3fe4" },
];

export default function Leaderboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%" }}
    >
      {/* LIST */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        {leaderboard.map((user, i) => {
          const isTopThree = user.rank <= 3;

          return (
            <motion.div
              key={i}
              whileHover={!isMobile ? { x: 6 } : {}}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1.8,
                  py: 1.4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  gap: 1.6,
                }}
              >
                {/* RANK */}
                <Typography
                  sx={{
                    width: 28,
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    color: isTopThree ? user.color : "#94a3b8",
                    flexShrink: 0,
                  }}
                >
                  #{user.rank}
                </Typography>

                {/* AVATAR */}
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: isTopThree ? user.color : "rgba(255,255,255,0.2)",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>

                {/* NAME + XP */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {user.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 11.5,
                      color: "#94a3b8",
                    }}
                  >
                    {user.xp} XP
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </motion.div>
  );
}
