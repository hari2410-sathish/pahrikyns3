import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const notifications = [
  {
    title: "New Course Unlocked",
    desc: "React Advanced Patterns is now available.",
    time: "10 min ago",
  },
  {
    title: "Assignment Due",
    desc: "Finish your JavaScript challenge.",
    time: "1 hour ago",
  },
  {
    title: "Certificate Ready",
    desc: "Your Python certificate has been issued.",
    time: "Yesterday",
  },
];

export default function NotificationDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      transition={{ type: "spring", stiffness: 120 }}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100%",
        width: 350,
        zIndex: 200,
      }}
    >
      <Box
        sx={{
          height: "100%",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(14px)",
          borderLeft: "1px solid rgba(0,255,255,0.3)",
          boxShadow: "0 0 25px rgba(0,255,255,0.25)",
          p: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Notifications
          </Typography>

          <IconButton onClick={onClose} sx={{ color: "#00eaff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Notification list */}
        {notifications.map((item, i) => (
          <Box
            key={i}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 3,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>
              {item.title}
            </Typography>

            <Typography sx={{ fontSize: 13, color: "#cbd5e1", mt: 0.5 }}>
              {item.desc}
            </Typography>

            <Typography
              sx={{ fontSize: 11, color: "#7dd3fc", mt: 1, textAlign: "right" }}
            >
              {item.time}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

        <Typography sx={{ textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
          You're all caught up 🎉
        </Typography>
      </Box>
    </motion.div>
  );
}
