// src/pages/Admin/Courses/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Stack,
  Button,
  CircularProgress,
  Divider,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchAdminCourseById,
  toggleAdminCourseStatus,
} from "../../Adminapi/coursesAdmin";
import { fetchCourseEnrollments } from "../../../api/course"; // create if missing

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  // ============================
  // LOAD COURSE + ENROLLMENTS
  // ============================
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const cRes = await fetchAdminCourseById(courseId);
        const sRes = await fetchCourseEnrollments(courseId);

        setCourse(cRes.course || cRes);
        setStudents(sRes.students || sRes || []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load course", "error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId]);

  // ============================
  // TOGGLE ENABLE / DISABLE
  // ============================
  const handleToggleStatus = async () => {
    try {
      setToggling(true);
      const res = await toggleAdminCourseStatus(courseId);
      setCourse((prev) => ({ ...prev, isActive: res.isActive }));
      showToast("Course status updated");
    } catch (err) {
      console.error(err);
      showToast("Failed to update status", "error");
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h6">Course not found</Typography>
      </Box>
    );
  }

  // ============================
  // STATS
  // ============================
  const totalStudents = course.totalStudents || students.length;
  const totalRevenue = course.totalRevenue || 0;
  const completionRate = course.completionRate || 0;

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {course.title}
          </Typography>
          <Typography sx={{ opacity: 0.7 }}>
            {course.category} • {course.level}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/admin/courses/${courseId}/edit`)}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(`/admin/courses/${courseId}/price`)}
          >
            Pricing
          </Button>

          <FormControlLabel
            control={
              <Switch
                checked={course.isActive !== false}
                onChange={handleToggleStatus}
                disabled={toggling}
                color="success"
              />
            }
            label={course.isActive === false ? "Disabled" : "Active"}
          />
        </Stack>
      </Box>

      {/* ================= STATS CARDS ================= */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
              Total Students
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {totalStudents}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
              Total Revenue
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
              Completion Rate
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {completionRate}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* ================= DETAILS ================= */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>About Course</Typography>

        <Typography sx={{ opacity: 0.85, mb: 2 }}>
          {course.description || course.shortDescription}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label={course.category} />
          <Chip label={course.level} />
          <Chip label={`${course.duration || 0} hrs`} />
          <Chip
            label={`₹${course.price}`}
            color="success"
            variant="outlined"
          />
        </Stack>
      </Paper>

      {/* ================= ENROLLMENTS TABLE ================= */}
      <Paper sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          Enrolled Students
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Enrolled At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No enrollments yet
                </TableCell>
              </TableRow>
            )}

            {students.map((s, index) => {
              const id = s.id || s._id;

              return (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 28, height: 28 }}>
                        {s.name?.[0] || "U"}
                      </Avatar>
                      <Typography>{s.name}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{s.email}</TableCell>

                  <TableCell>
                    {new Date(s.enrolledAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={s.progress === 100 ? "Completed" : "Learning"}
                      color={s.progress === 100 ? "success" : "primary"}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => navigate(`/admin/users/${id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

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
