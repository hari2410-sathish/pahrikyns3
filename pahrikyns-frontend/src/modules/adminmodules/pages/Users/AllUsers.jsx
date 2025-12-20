import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  Pagination,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TimelineIcon from "@mui/icons-material/Timeline";

import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../Adminapi/users";

export default function AllUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  async function loadUsers(params = {}) {
    try {
      setLoading(true);
      const data = await fetchUsers({
        search: params.search ?? q,
        status: params.status ?? status,
        page: params.page ?? page,
      });

      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      console.error(e);
      showToast("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [page, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers({ search: q, page: 1 });
  };

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
            Users
          </Typography>
          <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
            All registered users, payments & activity
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Select
            size="small"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            sx={{
              minWidth: 120,
              color: "white",
              bgcolor: "rgba(15,23,42,0.9)",
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
          </Select>

          <TextField
            size="small"
            placeholder="Search name / email / phone"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{
              minWidth: 260,
              "& .MuiOutlinedInput-root": {
                color: "white",
                background: "rgba(15,23,42,0.9)",
              },
            }}
          />

          <IconButton
            type="submit"
            sx={{
              bgcolor: "cyan",
              color: "#020617",
              "&:hover": { bgcolor: "#67e8f9" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================= TABLE ================= */}
      <Paper
        sx={{
          background: "rgba(231, 234, 241, 0.95)",
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.25)",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>Name</TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>Email</TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>Phone</TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>Courses</TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>Status</TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No users found
                  </TableCell>
                </TableRow>
              )}

              {users.map((u) => {
                const id = u.id || u._id;

                return (
                  <TableRow key={id}>
                    <TableCell>{u.name || u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.phone || "-"}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${u.coursesCount || 0} Course(s)`}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={u.isActive === false ? "Blocked" : "Active"}
                        size="small"
                        color={u.isActive === false ? "error" : "success"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/users/${id}`)}
                        sx={{ color: "cyan" }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate(`/admin/users/${id}/payments`)
                        }
                        sx={{ color: "#fde68a" }}
                      >
                        <ReceiptLongIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate(`/admin/users/${id}/activity`)
                        }
                        sx={{ color: "#a5b4fc" }}
                      >
                        <TimelineIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </Stack>
      )}

      {/* ================= TOAST ================= */}
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
