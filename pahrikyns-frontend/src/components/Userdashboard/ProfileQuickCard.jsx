import React from "react";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import { motion } from "framer-motion";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import StarsIcon from "@mui/icons-material/Stars";

export default function ProfileQuickCard({
  name = "User",
  level = 6,
  completed = 12,
  xp = 850,
  joined = "Jan 2025",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(0,255,255,0.3)",
          boxShadow: "0 0 20px rgba(0,255,255,0.25)",
          width: 320,
        }}
      >
        {/* Avatar + name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              fontSize: 24,
              bgcolor: "#7b3fe4",
              border: "2px solid rgba(0,255,255,0.4)",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              {name}
            </Typography>
            <Typography sx={{ color: "#7dd3fc", fontSize: 13 }}>
              Joined {joined}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Stats */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <StarsIcon sx={{ color: "#00eaff" }} />
            <Typography sx={{ color: "#e2e8f0" }}>Level: {level}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SchoolIcon sx={{ color: "#00eaff" }} />
            <Typography sx={{ color: "#e2e8f0" }}>
              Courses Completed: {completed}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmojiEventsIcon sx={{ color: "#ffd700" }} />
            <Typography sx={{ color: "#e2e8f0" }}>XP Points: {xp}</Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
