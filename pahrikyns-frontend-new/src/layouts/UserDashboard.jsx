import React from "react";
import { Box } from "@mui/material";

// If you later create these, just import them properly
// import DashboardSidebar from "../components/dashboard/DashboardSidebar";
// import DashboardTopBar from "../components/dashboard/DashboardTopBar";

export default function UserDashboard({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: 250,
          background: "#0a0f24",
          color: "white",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <h2>User Menu</h2>
        <p>Dashboard</p>
        <p>Courses</p>
        <p>Profile</p>
      </Box>

      {/* MAIN AREA */}
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
          }}
        >
          User Dashboard
        </Box>

        {/* PAGE CONTENT */}
        {children}
      </Box>
    </Box>
  );
}
