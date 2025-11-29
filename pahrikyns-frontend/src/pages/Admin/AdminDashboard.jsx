// === ULTRA PRO NEON ADMIN DASHBOARD ===
// FULLY READY FOR USE — Copy/Paste

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import StatCard from "../../components/admin/StatCard";
import BarChart from "../../components/admin/BarChart";
import LineChart from "../../components/admin/LineChart";
import PieMini from "../../components/admin/PieMini";

import {
  getSummary,
  getEnrollments,
  getActivity,
  getCompletion,
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
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ✨ FLOATING NEON PARTICLES */}
      {[...Array(40)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: "50%",
            background: "rgba(0,230,255,0.65)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(8px)",
            animation: `floatDot ${4 + Math.random() * 5}s infinite ease-in-out`,
            opacity: 0.4,
          }}
        />
      ))}

      <style>
        {`
        @keyframes floatDot {
          0% { transform: translateY(0px) scale(0.9); opacity: 0.3; }
          50% { transform: translateY(-15px) scale(1.4); opacity: 1; }
          100% { transform: translateY(0px) scale(0.9); opacity: 0.3; }
        }
        `}
      </style>

      {/* ================= HEADER ================= */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.5 }}
      >
        Dashboard Overview
      </Typography>

      {/* ================= TOP STATS ================= */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Students"
            value={summary.totalStudents}
            icon="🎓"
            glowColor="0,255,255"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Courses"
            value={summary.totalCourses}
            icon="📚"
            glowColor="0,200,255"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Revenue"
            value={`₹${summary.revenue}`}
            icon="💰"
            glowColor="255,230,0"
          />
        </Grid>
      </Grid>

      {/* ================= CHARTS SECTION ================= */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <BarChart title="Monthly Enrollments" data={enrollments} />
        </Grid>

        <Grid item xs={12} md={4}>
          <PieMini title="Course Completion" value={completion} />
        </Grid>

        <Grid item xs={12} md={4}>
          <LineChart title="User Activity" data={activity} />
        </Grid>
      </Grid>
    </Box>
  );
}
