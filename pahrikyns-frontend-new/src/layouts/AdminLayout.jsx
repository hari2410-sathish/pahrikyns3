// === FINAL CLEAN FIXED ADMIN LAYOUT ===

import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import MainNavbar from "../components/global/MainNavbar";

export default function AdminLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        background: "radial-gradient(circle at top, #0a0f24, #020617 80%)",
        color: "white",
      }}
    >
      {/* 🔹 NAVBAR FIXED AT TOP */}
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 2000 }}>
        <MainNavbar />
      </Box>

      {/* 🔹 PUSH CONTENT BELOW NAVBAR */}
      <Box sx={{ display: "flex", width: "100%", pt: "90px" }}>
        {/* 🔹 SIDEBAR */}
        <AdminSidebar />

        {/* 🔹 RIGHT CONTENT AREA */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <AdminTopbar />

          <Box
            sx={{
              flex: 1,
              px: 4,
              py: 3,
              width: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
