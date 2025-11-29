// === ULTRA PRO STUDENTS PAGE ===
// Copy/Paste — Complete UI

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Paper,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";

export default function ManageStudents() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  function loadStudents() {
    // FAKE DATA — Replace with real API later
    setStudents([
      {
        id: 1,
        name: "Hari Sathish",
        email: "hari@gmail.com",
        status: "active",
        course: "DevOps",
        progress: 72,
      },
      {
        id: 2,
        name: "Arun Kumar",
        email: "arun@gmail.com",
        status: "suspended",
        course: "Docker",
        progress: 40,
      },
      {
        id: 3,
        name: "Priya Devi",
        email: "priya@gmail.com",
        status: "graduated",
        course: "AWS",
        progress: 100,
      },
    ]);
  }

  // FILTER + SEARCH
  const filtered = students.filter((s) => {
    const matchText =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" ? true : s.status === filter;

    return matchText && matchFilter;
  });

  const statusColors = {
    active: "success",
    suspended: "warning",
    graduated: "primary",
  };

  return (
    <Box sx={{ color: "white", p: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Students Management
      </Typography>

      {/* SEARCH + FILTER BAR */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search Students"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "gray" },
            width: "260px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": {
                borderColor: "rgba(0,255,255,0.5)",
              },
            },
          }}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel sx={{ color: "gray" }}>Filter</InputLabel>
          <Select
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,255,255,0.5)",
              },
            }}
          >
            <MenuItem value="all">All Students</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
            <MenuItem value="graduated">Graduated</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* PRO TABLE */}
      <Paper
        sx={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Student</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Course</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Progress</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((s) => (
              <TableRow
                key={s.id}
                sx={{
                  "&:hover": {
                    background: "rgba(0,255,255,0.08)",
                  },
                }}
              >
                {/* Avatar + Name */}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ bgcolor: "#00bcd4" }}>
                      {s.name[0].toUpperCase()}
                    </Avatar>
                    {s.name}
                  </Box>
                </TableCell>

                <TableCell>{s.email}</TableCell>
                <TableCell>{s.course}</TableCell>

                <TableCell>
                  <Chip
                    label={s.status}
                    color={statusColors[s.status]}
                    sx={{ textTransform: "capitalize" }}
                  />
                </TableCell>

                <TableCell>{s.progress}%</TableCell>

                <TableCell>
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <BlockIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 3 }}>
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
