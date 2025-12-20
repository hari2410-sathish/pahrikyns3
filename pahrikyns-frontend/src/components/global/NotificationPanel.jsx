import React from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion } from "framer-motion";

import { useAuth } from "../../contexts/AuthContext";
import {
  fetchNotifications,
  markNotificationReadAPI,
} from "../../api/notifications";

import { SocketContext } from "../../main"; // ✅ socket context from main.jsx

export default function NotificationPanel({ open, onClose }) {
  const [items, setItems] = React.useState([]);
  const { user } = useAuth();
  const socket = React.useContext(SocketContext);

  // ================================
  // ✅ LOAD FROM API WHEN PANEL OPENS
  // ================================
  React.useEffect(() => {
    if (open) load();
  }, [open]);

  const load = async () => {
    try {
      const res = await fetchNotifications(1, 50);
      setItems(res.notifications || []);
    } catch (e) {
      console.error("Notification load error:", e);
    }
  };

  // ================================
  // ✅ REAL-TIME SOCKET LISTENERS
  // ================================
  React.useEffect(() => {
    if (!socket) return;

    // ✅ New notification arrives
    socket.on("notification", (data) => {
      setItems((prev) => [data, ...prev]);

      // 🔊 Sound
      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});
    });

    // ✅ Read sync from other tabs
    socket.on("notification_read", ({ id }) => {
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    });

    return () => {
      socket.off("notification");
      socket.off("notification_read");
    };
  }, [socket]);

  // ================================
  // ✅ MARK SINGLE READ
  // ================================
  const handleRead = async (id) => {
    try {
      await markNotificationReadAPI(id);

      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );

      // sync to other tabs
      if (socket) socket.emit("notification_read", { id });
    } catch (e) {
      console.error("Read error:", e);
    }
  };

  const unreadCount = items.filter((i) => !i.isRead).length;

  return (
    <>
      {/* 🔔 BELL ICON */}
      <IconButton onClick={() => onClose(true)} sx={{ color: "#00eaff" }}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* 🔔 SLIDE PANEL */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 160 }}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          width: 380,
          zIndex: 1400,
        }}
      >
        <Box
          sx={{
            height: "100%",
            p: 2,
            background: "rgba(10,15,36,0.9)",
            backdropFilter: "blur(12px)",
            borderLeft: "1px solid rgba(0,255,255,0.12)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ✅ HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>
              Notifications
            </Typography>
            <Box>
              <Typography component="span" sx={{ mr: 1, color: "#94a3b8" }}>
                {user?.name}
              </Typography>
              <IconButton
                onClick={() => onClose(false)}
                sx={{ color: "#cbd5e1" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* ✅ ACTIONS */}
          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }}
              onClick={load}
            >
              Refresh
            </Typography>
          </Box>

          {/* ✅ LIST */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <List>
              {items.length === 0 && (
                <Typography
                  sx={{
                    color: "#94a3b8",
                    mt: 4,
                    textAlign: "center",
                  }}
                >
                  No notifications yet
                </Typography>
              )}

              {items.map((n) => (
                <ListItem
                  key={n.id}
                  onClick={() => handleRead(n.id)}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    background: n.isRead
                      ? "transparent"
                      : "linear-gradient(90deg,#00eaff11,#7b3fe411)",
                    "&:hover": { transform: "translateX(4px)" },
                    transition: "all .18s ease",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 700 }}>
                        {n.title}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ fontSize: 13, color: "#cbd5e1" }}>
                        {n.body}
                      </Typography>
                    }
                  />
                  <Typography
                    sx={{ fontSize: 11, color: "#94a3b8", ml: 1 }}
                  >
                    {new Date(n.createdAt).toLocaleString()}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* ✅ FOOTER */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
              Tip: Click a notification to mark it as read
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}
