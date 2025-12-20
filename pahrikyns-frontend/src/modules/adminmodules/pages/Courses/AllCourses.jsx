import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Chip,
  Snackbar,
  Alert,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import { useNavigate } from "react-router-dom";
import {
  fetchAdminCourses,
  toggleAdminCourseStatus,
} from "../../Adminapi/coursesAdmin";

export default function AllCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const pageSize = 10;

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ================= LOAD COURSES =================
  async function loadCourses(params = {}) {
    try {
      setLoading(true);

      const data = await fetchAdminCourses({
        search: params.search ?? q,
        status: params.status ?? status,
        page: params.page ?? page,
        limit: pageSize,
      });

      setCourses(data.courses || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      showToast("Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, [page, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadCourses({ search: q, page: 1 });
  };

  // ================= STATUS TOGGLE =================
  const handleToggleStatus = async (courseId) => {
    try {
      await toggleAdminCourseStatus(courseId);
      showToast("Course status updated", "success");
      loadCourses();
    } catch (err) {
      console.error(err);
      showToast("Failed to update status");
    }
  };

  const totalPages = Math.ceil(total / pageSize);

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
            Courses
          </Typography>
          <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
            All courses, pricing & enrollment status
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
            <MenuItem value="disabled">Disabled</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>

          <TextField
            size="small"
            placeholder="Search course title"
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
          background: "rgba(15,23,42,0.95)",
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
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Course
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Price
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Students
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Status
                </TableCell>
                <TableCell
                  sx={{ color: "rgba(148,163,184,1)" }}
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {courses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No courses found
                  </TableCell>
                </TableRow>
              )}

              {courses.map((c) => {
                const id = c.id || c._id;

                return (
                  <TableRow key={id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                        {c.title}
                      </Typography>
                      <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                        {c.slug}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        label={c.category || "General"}
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>

                    <TableCell>
                      ₹{c.price || c.finalPrice || 0}
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        label={`${c.studentsCount || 0} students`}
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        label={
                          c.isActive ? "Active" : "Disabled"
                        }
                        color={c.isActive ? "success" : "error"}
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Tooltip title="View">
                        <IconButton
                          size="small"
                          sx={{ color: "cyan" }}
                          onClick={() =>
                            navigate(`/admin/courses/${id}`)
                          }
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{ color: "#a5b4fc" }}
                          onClick={() =>
                            navigate(`/admin/courses/${id}/edit`)
                          }
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Course Price">
                        <IconButton
                          size="small"
                          sx={{ color: "#fde68a" }}
                          onClick={() =>
                            navigate(
                              `/admin/courses/${id}/price`
                            )
                          }
                        >
                          <CurrencyRupeeIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Enable / Disable">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleToggleStatus(id)
                          }
                          sx={{
                            color: c.isActive
                              ? "#4ade80"
                              : "#f87171",
                          }}
                        >
                          {c.isActive ? (
                            <ToggleOnIcon fontSize="small" />
                          ) : (
                            <ToggleOffIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
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
        <>
          <Divider sx={{ my: 3, borderColor: "rgba(148,163,184,0.3)" }} />

          <Stack alignItems="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, val) => setPage(val)}
              color="primary"
            />
          </Stack>
        </>
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
