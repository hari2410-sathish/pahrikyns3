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
      {/* 🔹 FIXED MAIN NAVBAR AT TOP */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
          bgcolor: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
        }}
      >
        <MainNavbar />
      </Box>

      {/* 🔹 PUSH CONTENT DOWN AFTER NAVBAR HEIGHT */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          pt: "90px", // height of MainNavbar
        }}
      >
        {/* 🔹 LEFT SIDEBAR */}
        <Box sx={{ position: "sticky", top: "90px", height: "calc(100vh - 90px)" }}>
          <AdminSidebar />
        </Box>

        {/* 🔹 RIGHT MAIN CONTENT */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* 🔹 TOPBAR (INSIDE ADMIN ONLY) */}
          <AdminTopbar />

          {/* 🔹 PAGE AREA */}
          <Box
            sx={{
              flex: 1,
              px: 4,
              py: 3,
              width: "100%",
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
