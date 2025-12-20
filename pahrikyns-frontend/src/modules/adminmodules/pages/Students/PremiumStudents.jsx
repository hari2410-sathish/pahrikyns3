import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Select,
  CircularProgress,
  Stack,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";

import { useNavigate } from "react-router-dom";
import { fetchStudents, updateStudent } from "../../../api/users";

const ROWS_PER_PAGE = 10;

export default function PremiumStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ---------------- LOAD STUDENTS ----------------
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const data = await fetchStudents({
          search,
          status: statusFilter,
          page,
        });

        setStudents(data.students || data || []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [search, statusFilter, page]);

  // ---------------- FILTER CLIENT SIDE ----------------
  const filteredStudents = useMemo(() => {
    let list = [...students];

    if (statusFilter !== "all") {
      list = list.filter(
        (s) =>
          (s.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) =>
        [s.name, s.email, s.phone]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return list;
  }, [students, statusFilter, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / ROWS_PER_PAGE)
  );

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredStudents.slice(start, start + ROWS_PER_PAGE);
  }, [filteredStudents, page]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  // ---------------- BLOCK / UNBLOCK ----------------
  const toggleStudentStatus = async (student) => {
    try {
      await updateStudent(student._id || student.id, {
        isActive: !student.isActive,
      });

      showToast("Student status updated", "success");

      const data = await fetchStudents({});
      setStudents(data.students || data || []);
    } catch (err) {
      console.error(err);
      showToast("Failed to update student");
    }
  };

  // ---------------- RENDER ----------------
  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Premium Students
          </Typography>
          <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
            All active & blocked students
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
          </Select>

          <TextField
            size="small"
            placeholder="Search name / email / phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* TABLE */}
      <Paper>
        {loading ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedStudents.map((s) => (
                <TableRow key={s._id || s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.phone || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      label={s.isActive ? "Active" : "Blocked"}
                      size="small"
                      color={s.isActive ? "success" : "error"}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        navigate(`/admin/students/${s._id || s.id}`)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => toggleStudentStatus(s)}
                    >
                      <BlockIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* PAGINATION */}
      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, v) => setPage(v)}
        />
      </Stack>

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
