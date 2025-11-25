// === NEON THEME DASHBOARD PAGE (LIVE FAKE DATA) ===

import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import StatCard from "../../components/admin/StatCard";
import BarChart from "../../components/admin/BarChart";
import LineChart from "../../components/admin/LineChart";
import PieMini from "../../components/admin/PieMini";

import {
  getSummary,
  getEnrollments,
  getActivity,
  getCompletion
} from "../../api/fakeAdminAPI";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [enrollments, setEnrollments] = useState([]);
  const [activity, setActivity] = useState([]);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setSummary(await getSummary());
    setEnrollments(await getEnrollments());
    setActivity(await getActivity());
    setCompletion((await getCompletion()).percentage);
  }

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "100vh",
        px: 4,
        py: 3,
        width: "100%",
        maxWidth: "100%",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* ✨ Floating Neon Dots */}
      {[...Array(35)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${6 + Math.random() * 6}px`,
            height: `${6 + Math.random() * 6}px`,
            borderRadius: "50%",
            background: "rgba(0,234,255,0.7)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(6px)",
            animation: `floatDot ${4 + Math.random() * 6}s infinite ease-in-out`,
          }}
        />
      ))}

      <style>
        {`
        @keyframes floatDot {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        `}
      </style>

      {/* ================= TOP ROW: STATS ================= */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Students" value={summary.totalStudents} icon="🎓" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Active Courses" value={summary.totalCourses} icon="📚" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Revenue" value={`₹${summary.revenue}`} icon="💰" />
        </Grid>
      </Grid>

      {/* ================= MIDDLE ROW: CHARTS ================= */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <BarChart title="Monthly Enrollments" data={enrollments} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieMini title="Completion" value={completion} />
        </Grid>
        <Grid item xs={12} md={4}>
          <LineChart title="User Activity" data={activity} />
        </Grid>
      </Grid>
    </Box>
  );
}
