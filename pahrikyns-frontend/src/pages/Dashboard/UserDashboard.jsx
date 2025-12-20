import React from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import LeftSidebar from "../../components/dashboard/LeftSidebar";
import TopBar from "../../components/dashboard/TopBar";
import CourseProgressList from "../../components/dashboard/CourseProgressList";
import LearningChart from "../../components/dashboard/LearningChart";

export default function ProgressDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "radial-gradient(circle at top, #0a0f24, #000)",
      }}
    >
      {/* SIDEBAR */}
      <LeftSidebar />

      {/* MAIN AREA */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TopBar />

        {/* GREETING */}
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            mb: 3,
            color: "#fff",
          }}
        >
          Welcome back, {user?.name || "Learner"} 👋
        </Typography>

        <Grid container spacing={3}>
          {/* ---------------- STAT CARDS ---------------- */}
          <Grid item xs={12} md={4}>
            <StatCard
              title="Courses Enrolled"
              value={user?.courses?.length || 12}
              color="#00eaff"
              delay={0.1}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              title="Hours Learned"
              value={`${user?.hours || 56} hrs`}
              color="#7b3fe4"
              delay={0.2}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatCard
              title="Learning Streak"
              value={`${user?.streak || 9} days 🔥`}
              color="#00ff95"
              delay={0.3}
            />
          </Grid>

          {/* ---------------- CONTINUE LEARNING ---------------- */}
          <Grid item xs={12} md={6}>
            <GlassPanel title="Continue Learning">
              <Typography sx={{ mb: 1 }}>
                You were last watching:
              </Typography>

              <Typography sx={{ fontWeight: 700, color: "#00eaff" }}>
                Docker & Kubernetes - Lesson 7
              </Typography>

              <Button
                sx={{
                  mt: 2,
                  background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                  color: "#000",
                  fontWeight: 700,
                }}
                onClick={() => navigate("/my-courses")}
              >
                Resume
              </Button>
            </GlassPanel>
          </Grid>

          {/* ---------------- RECENT ACTIVITY ---------------- */}
          <Grid item xs={12} md={6}>
            <GlassPanel title="Recent Activity">
              <Typography sx={{ opacity: 0.8 }}>
                ✅ Watched: Git Branching – 1 hour ago
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                ✅ Completed: Linux Basics – Yesterday
              </Typography>
              <Typography sx={{ opacity: 0.8 }}>
                ✅ Attempted Quiz: AWS EC2 – 2 days ago
              </Typography>
            </GlassPanel>
          </Grid>

          {/* ---------------- CHART SECTION ---------------- */}
          <Grid item xs={12}>
            <GlassPanel title="Weekly Learning Activity">
              <LearningChart />
            </GlassPanel>
          </Grid>

          {/* ---------------- PROGRESS LIST ---------------- */}
          <Grid item xs={12}>
            <GlassPanel title="Your Course Progress">
              <CourseProgressList />
            </GlassPanel>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function StatCard({ title, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 80 }}
    >
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(14px)",
          border: `1px solid ${color}55`,
          color: "#e0f7ff",
          minHeight: 120,
          boxShadow: "0 0 12px rgba(0,0,0,0.3)",
        }}
      >
        <Typography sx={{ fontSize: 14, opacity: 0.7 }}>{title}</Typography>
        <Typography sx={{ fontSize: 30, fontWeight: 700, mt: 1 }}>
          {value}
        </Typography>
      </Paper>
    </motion.div>
  );
}

function GlassPanel({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0,255,255,0.12)",
          boxShadow: "0 0 12px rgba(0,0,0,0.35)",
          color: "#fff",
        }}
      >
        <Typography
          sx={{
            mb: 2,
            fontSize: 20,
            fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </Typography>

        {children}
      </Paper>
    </motion.div>
  );
}
