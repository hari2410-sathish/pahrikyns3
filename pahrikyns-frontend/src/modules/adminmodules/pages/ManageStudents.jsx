// src/pages/Admin/ManageStudents.jsx
// === ULTRA PREMIUM STUDENTS PAGE ===
// Full Canva-Style Layout + Glass UI + Animations + API + All Modals

import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem,
  Chip, IconButton, Avatar, Paper, Button, Stack, Table, TableHead,
  TableRow, TableCell, TableBody, Pagination
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Modals
import AddStudentModal from "../../components/admin/AddStudentModal";
import EditStudentModal from "../../components/admin/EditStudentModal";
import DeleteStudentModal from "../../components/admin/DeleteStudentModal";

// API
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../api/users";

export default function ManageStudents() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const navigate = useNavigate();

  // Load Data
  const load = async () => {
    try {
      const data = await fetchStudents({
        search,
        status: filter,
        page,
      });

      setStudents(data.students || []);
      setPagination(data.pagination || {});
    } catch (err) {
      console.error("Error loading students", err);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [search, filter, page]);

  // ADD STUDENT
  const handleAddStudent = async (payload) => {
    try {
      await createStudent(payload);
      setOpenAdd(false);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT Student Modal Open
  const handleEditClick = (s) => {
    setSelectedStudent(s);
    setOpenEdit(true);
  };

  // UPDATE Student
  const handleUpdateStudent = async (updated) => {
    try {
      await updateStudent(updated.id, updated);
      setOpenEdit(false);
      setSelectedStudent(null);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE Confirm Modal
  const handleDeleteClick = (s) => {
    setDeleteTarget(s);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteStudent(id);
      setOpenDelete(false);
      setDeleteTarget(null);
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  // SUSPEND / ACTIVATE Toggle
  const toggleStatus = async (s) => {
    try {
      const newStatus = s.status === "active" ? "suspended" : "active";
      await updateStudent(s.id, { ...s, status: newStatus });
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  // Status Colors
  const statusColors = {
    active: "success",
    suspended: "warning",
    graduated: "primary",
  };

  return (
    <Box sx={{ p: 2, color: "white" }}>

      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, mb: 3, textShadow: "0 0 20px cyan" }}
      >
        Students Management — Ultra Premium
      </Typography>

      {/* TOP TOOLBAR */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "16px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
        }}
      >
        <Stack direction="row" spacing={2} flexWrap="wrap">

          {/* Search */}
          <TextField
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "cyan", mr: 1 }} />,
            }}
            sx={{
              width: "260px",
              input: { color: "white" },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "cyan",
              },
            }}
          />

          {/* Filter */}
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel sx={{ color: "gray" }}>Status</InputLabel>
            <Select
              value={filter}
              label="Status"
              onChange={(e) => setFilter(e.target.value)}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "cyan",
                },
              }}
            >
              <MenuItem value="all">All Students</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
              <MenuItem value="graduated">Graduated</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" startIcon={<UploadIcon />}
            sx={{ color: "cyan", borderColor: "cyan" }}>
            Import
          </Button>

          <Button variant="outlined" startIcon={<DownloadIcon />}
            sx={{ color: "cyan", borderColor: "cyan" }}>
            Export
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAdd(true)}
            sx={{
              bgcolor: "cyan",
              color: "black",
              fontWeight: 700,
              "&:hover": { bgcolor: "#00eaff" },
            }}
          >
            Add Student
          </Button>
        </Stack>
      </Paper>

      {/* MAIN TABLE */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        sx={{
          p: 2,
          borderRadius: "14px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {["Student", "Email", "Course", "Status", "Progress", "Actions"].map((h) => (
                <TableCell
                  key={h}
                  sx={{ color: "cyan", fontWeight: 700, fontSize: "16px" }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((s, i) => (
              <TableRow
                key={s.id}
                component={motion.tr}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                sx={{
                  "&:hover": {
                    background: "rgba(0,255,255,0.04)",
                  },
                }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ bgcolor: "#00bcd4" }}>{s.name?.[0]}</Avatar>

                    {/* Click to open profile */}
                    <Button
                      onClick={() => navigate(`/admin/students/${s.id}`)}
                      sx={{ color: "white", textTransform: "none" }}
                    >
                      {s.name}
                    </Button>
                  </Stack>
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
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/admin/students/${s.id}`)}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    color="secondary"
                    onClick={() => handleEditClick(s)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    onClick={() => toggleStatus(s)}
                  >
                    <BlockIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(s)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Pagination */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={pagination.totalPages || 1}
          page={page}
          onChange={(e, v) => setPage(v)}
          sx={{
            "& .MuiPaginationItem-root": { color: "white" },
            "& .Mui-selected": { backgroundColor: "cyan", color: "black" },
          }}
        />
      </Box>

      {/* MODALS */}
      <AddStudentModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddStudent}
      />

      <EditStudentModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        student={selectedStudent}
        onUpdate={handleUpdateStudent}
      />

      <DeleteStudentModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        student={deleteTarget}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
