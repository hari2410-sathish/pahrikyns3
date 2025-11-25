// === HOVER-EXPAND NEON SIDEBAR ===

import React, { useState } from "react";
import { Box, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";

export default function AdminSidebar() {
  const [hovered, setHovered] = useState(false);

  const collapsed = !hovered; // hover = expanded

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { label: "Manage Courses", icon: <MenuBookIcon />, path: "/admin/courses" },
    { label: "Manage Students", icon: <GroupIcon />, path: "/admin/students" },
    { label: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
  ];

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        width: collapsed ? 80 : 260,
        height: "100vh",
        background: "rgba(10, 20, 40, 0.45)",
        backdropFilter: "blur(22px)",
        borderRight: "1px solid rgba(0, 234, 255, 0.25)",
        transition: "width 0.35s ease",
        display: "flex",
        flexDirection: "column",
        p: 2,
        position: "sticky",
        top: 0,
        overflow: "hidden",
      }}
    >
      {/* Title (hidden when collapsed) */}
      {!collapsed && (
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 800,
            mb: 3,
            whiteSpace: "nowrap",
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Admin Panel
        </Typography>
      )}

      {/* Menu */}
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1.3,
              display: "flex",
              gap: collapsed ? 0 : 1.5,
              justifyContent: collapsed ? "center" : "flex-start",
              color: "rgba(255,255,255,0.85)",
              transition: "0.3s",
              "&.active": {
                background: "rgba(0,234,255,0.12)",
                color: "#00eaff",
                borderLeft: collapsed ? "none" : "3px solid #00eaff",
                boxShadow: "0 0 10px rgba(0,234,255,0.35)",
              },
              "&:hover": {
                background: "rgba(255,255,255,0.08)",
                color: "#00eaff",
              },
            }}
          >
            {item.icon}
            {!collapsed && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
