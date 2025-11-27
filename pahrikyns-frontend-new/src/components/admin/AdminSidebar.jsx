import React from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const nav = useNavigate();

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItemButton onClick={() => nav("/admin/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => nav("/admin/manage-courses")}>
          <ListItemText primary="Courses" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
