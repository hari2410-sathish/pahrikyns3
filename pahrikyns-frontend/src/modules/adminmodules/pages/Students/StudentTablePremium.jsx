// src/components/admin/StudentTablePremium.jsx
import React from "react";
import {
  Box, Paper, Typography, Avatar, IconButton,
  Chip, LinearProgress, Tooltip
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";

const shadow = {
  boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
};

export default function StudentTablePremium({ search, filter }) {
  const students = [
    { name: "Hari Sathish", email: "hari@gmail.com", course: "DevOps", status: "active", progress: 72 },
    { name: "Arun Kumar", email: "arun@gmail.com", course: "Docker", status: "suspended", progress: 40 },
    { name: "Priya Devi", email: "priya@gmail.com", course: "AWS", status: "graduated", progress: 100 },
  ];

  const statusColor = {
    active: "success",
    suspended: "warning",
    graduated: "primary",
  };

  const filtered = students.filter((s) => {
    return (
      (filter === "all" || s.status === filter) &&
      (search === "" || s.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <Paper sx={{ p: 2, borderRadius: 3, ...shadow }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", p: 1 }}>
        <Typography fontWeight={700}>Student</Typography>
        <Typography fontWeight={700}>Email</Typography>
        <Typography fontWeight={700}>Course</Typography>
        <Typography fontWeight={700}>Status</Typography>
        <Typography fontWeight={700}>Actions</Typography>
      </Box>

      {filtered.map((s, idx) => (
        <Paper
          key={idx}
          sx={{
            mt: 1,
            p: 2,
            borderRadius: 2,
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
            alignItems: "center",
            "&:hover": { boxShadow: "0 14px 30px rgba(0,0,0,0.18)", transform: "scale(1.01)", transition: "0.2s" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#0ea5e9" }}>{s.name[0]}</Avatar>
            <Typography>{s.name}</Typography>
          </Box>

          <Typography>{s.email}</Typography>

          <Typography>{s.course}</Typography>

          <Chip
            label={s.status}
            color={statusColor[s.status]}
            sx={{ textTransform: "capitalize", fontWeight: 700 }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="View">
              <IconButton><VisibilityIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton><EditIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Suspend">
              <IconButton color="warning"><BlockIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error"><DeleteIcon /></IconButton>
            </Tooltip>
          </Box>
        </Paper>
      ))}
    </Paper>
  );
}
