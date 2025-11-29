// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import AdminSidebar from "../components/admin/AdminSidebar";
import { AdminTopbar } from "../components/admin/AdminTopbar";


export default function AdminLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "#020617",
        color: "white",
        display: "flex",
      }}
    >

      {/* SIDEBAR — DO NOT WRAP INSIDE FIXED WIDTH BOX */}
      <AdminSidebar />

      {/* RIGHT MAIN CONTENT AREA */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <AdminTopbar />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>

    </Box>
  );
}
