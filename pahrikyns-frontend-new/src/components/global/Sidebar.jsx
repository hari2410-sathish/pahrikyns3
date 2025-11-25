// src/components/global/Sidebar.jsx

import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { navbarCourses } from "../../data/navbarCourses";

export default function Sidebar({ open, onClose }) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 260,
          backgroundColor: "#0c101a",
          color: "white",
          paddingTop: 3,
        },
      }}
    >
      <Box sx={{ px: 3 }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 900,
            mb: 3,
            color: "#00eaff",
          }}
        >
          PAHRIKYNS
        </Typography>

        {/* STATIC LINKS */}
        <List>
          <ListItemButton component={Link} to="/" onClick={onClose}>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton component={Link} to="/dashboard" onClick={onClose}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/login" onClick={onClose}>
            <ListItemText primary="Login" />
          </ListItemButton>

          <ListItemButton component={Link} to="/register" onClick={onClose}>
            <ListItemText primary="Register" />
          </ListItemButton>
        </List>

        <Typography sx={{ mt: 3, mb: 1, fontWeight: 700 }}>
          Courses
        </Typography>

        {/* DYNAMIC COURSES */}
        <List>
          {navbarCourses.map((course) => (
            <ListItemButton key={course.name} onClick={onClose}>
              <ListItemText primary={course.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
