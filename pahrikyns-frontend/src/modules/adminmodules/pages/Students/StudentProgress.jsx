import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  LinearProgress,
  Chip,
  Snackbar,
  Alert,
  IconButton,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../../../api/users";

export default function StudentProgress() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  useEffect(() => {
    const load = async () => {
      try {
        if (!studentId) return;   // ✅ SAFETY
        setLoading(true);
        const data = await getStudentById(studentId);
        setStudent(data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load student");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [studentId]);

  const courses = useMemo(
    () => student?.courses || student?.enrollments || [],
    [student]
  );

  const stats = useMemo(() => {
    if (!courses.length) {
      return {
        totalCourses: 0,
        completedCourses: 0,
        inProgressCourses: 0,
        avgCompletion: 0,
      };
    }

    let completed = 0;
    let inProgress = 0;
    let totalPercent = 0;

    courses.forEach((c) => {
      const p = Number(c.progress ?? c.completion ?? 0);
      totalPercent += p;

      if (p >= 95 || (c.status || "").toLowerCase() === "completed") {
        completed += 1;
      } else {
        inProgress += 1;
      }
    });

    return {
      totalCourses: courses.length,
      completedCourses: completed,
      inProgressCourses: inProgress,
      avgCompletion: Math.round(totalPercent / courses.length),
    };
  }, [courses]);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!student) return <Typography>No student selected</Typography>;

  return (
    <Box>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h5" mb={2}>
        {student.name} - Progress
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Courses</Typography>
            <Typography fontWeight={800}>{stats.totalCourses}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography>Completed</Typography>
            <Typography fontWeight={800}>
              {stats.completedCourses}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography>In Progress</Typography>
            <Typography fontWeight={800}>
              {stats.inProgressCourses}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography>Avg Completion</Typography>
            <Typography fontWeight={800}>
              {stats.avgCompletion}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {courses.map((c) => (
        <Box key={c._id} sx={{ mb: 2 }}>
          <Typography>{c.title}</Typography>
          <LinearProgress value={c.progress || 0} variant="determinate" />
        </Box>
      ))}
    </Box>
  );
}
