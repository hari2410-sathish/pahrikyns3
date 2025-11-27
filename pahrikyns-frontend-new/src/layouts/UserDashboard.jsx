import React from "react";
import { Box } from "@mui/material";

export default function UserDashboard({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#0d152b",
      }}
    >
      {/* ================= SIDEBAR ================= */}
      <Box
        sx={{
          width: 240,
          background: "#0a0f24",
          color: "white",
          display: "flex",
          flexDirection: "column",
          p: 2,
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>User Menu</h2>

        <Box sx={{ opacity: 0.8, cursor: "pointer", mb: 1 }}>Dashboard</Box>
        <Box sx={{ opacity: 0.8, cursor: "pointer", mb: 1 }}>Courses</Box>
        <Box sx={{ opacity: 0.8, cursor: "pointer", mb: 1 }}>Profile</Box>
      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        sx={{
          flex: 1,
          background: "#f5f7fb",
          overflowY: "auto",
          p: 3,
        }}
      >
        {/* TOP BAR */}
        <Box
          sx={{
            background: "white",
            p: 2,
            mb: 3,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: "18px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          User Dashboard
        </Box>

        {/* CHILD PAGE RENDER */}
        {children}
      </Box>
    </Box>
  );
}
