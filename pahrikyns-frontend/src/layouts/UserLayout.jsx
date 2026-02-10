// src/layouts/UserLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import MainNavbar from "../components/global/MainNavbar";
import Footer from "../components/global/Footer";
import { useSocket } from "../contexts/SocketContext";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export default function UserLayout() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Routes where footer is hidden (full-screen experience)
  const hideFooterRoutes = ["/dashboard"];
  const hideFooter = hideFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  /* ================= NOTIFICATIONS ================= */
  const socket = useSocket();
  const { enqueueSnackbar } = useSnackbar();

  // Listen for global user notifications / announcements
  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (data) => {
      // data = { title, message, type }
      enqueueSnackbar(data.title + ": " + data.message, {
        variant: data.type || "info",
        autoHideDuration: 6000
      });
      // Optional sound
      try { new Audio("/notification.mp3").play(); } catch (e) { }
    });

    return () => socket.off("notification");
  }, [socket, enqueueSnackbar]);

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at 50% -20%, #0d1122, #040a16 70%)",
        overflowX: "hidden",
      }}
    >
      {/* ================= NAVBAR ================= */}
      {!isDashboard && <MainNavbar />}

      {/* ================= PAGE CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          paddingTop: isDashboard
            ? 0
            : isMobile
              ? "60px"
              : "72px",

          paddingBottom: hideFooter ? 0 : isMobile ? "24px" : "40px",

          px: {
            xs: isDashboard ? 0 : 2,
            sm: isDashboard ? 0 : 3,
            md: isDashboard ? 0 : 4,
          },

          background: isDashboard
            ? "transparent"
            : "radial-gradient(circle at top, #0b1222, #040a16)",

          transition: "0.3s ease",
        }}
      >
        <Outlet />

      </Box>

      {/* ================= FOOTER ================= */}
      {!hideFooter && (
        <Box
          sx={{
            mt: "auto",
            width: "100%",
            backdropFilter: "blur(8px)",
          }}
        >
          <Footer />
        </Box>
      )}
    </Box>
  );
}
