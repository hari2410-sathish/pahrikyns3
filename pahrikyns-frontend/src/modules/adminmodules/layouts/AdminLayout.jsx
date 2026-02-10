import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import AdminSidebar from "../components/AdminSidebar";
import { AdminTopbar } from "../components/AdminTopbar";

import { useSocket } from "../../../contexts/SocketContext";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export default function AdminLayout() {
  const [notifyCount, setNotifyCount] = useState(3);
  const socket = useSocket();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      // Only show admin-relevant notifications here if needed, or all.
      // Assuming 'admin_notification' event name from backend
      if (data) {
        enqueueSnackbar(data.message || "New Notification", {
          variant: data.type || "info",
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 5000
        });
        setNotifyCount(prev => prev + 1);

        // Optional: Play sound
        try {
          const audio = new Audio("/notification.mp3");
          audio.play();
        } catch (e) { console.log("Audio play failed", e); }
      }
    };

    socket.on("admin_notification", handleNotification);

    return () => {
      socket.off("admin_notification", handleNotification);
    };
  }, [socket, enqueueSnackbar]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "white",
        backgroundImage: "radial-gradient(circle at 15% 50%, rgba(0, 234, 255, 0.03), transparent 25%), radial-gradient(circle at 85% 30%, rgba(123, 63, 228, 0.03), transparent 25%)",
        backgroundAttachment: "fixed"
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 1200,
          bgcolor: "transparent",
        }}
      >
        <AdminSidebar notifyCount={notifyCount} />
      </Box>

      {/* MAIN AREA */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* TOP BAR */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            backdropFilter: "blur(12px)",
          }}
        >
          <AdminTopbar
            notifyCount={notifyCount}
            onToggleSidebar={() => {
              document.body.classList.toggle("sidebar-collapsed");
            }}
          />
        </Box>

        {/* PAGE CONTENT */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 4 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
