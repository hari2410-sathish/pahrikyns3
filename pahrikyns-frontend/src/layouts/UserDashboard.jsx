// src/layouts/UserDashboard.jsx
import React from "react";
import { Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/* COMPONENTS */
import LeftSidebar from "../components/Userdashboard/LeftSidebar";
import TopBar from "../components/Userdashboard/TopBar";
import WelcomeBanner from "../components/Userdashboard/WelcomeBanner";
import StatCard from "../components/Userdashboard/chart/StatCard";
import CourseCard from "../components/Userdashboard/CourseCard";
import CourseGridCard from "../components/Userdashboard/CourseGridCard";
import CourseProgressList from "../components/Userdashboard/CourseProgressList";
import ActivityChart from "../components/Userdashboard/chart/ActivityChart";
import LearningChart from "../components/Userdashboard/LearningChart";
import AchievementCard from "../components/Userdashboard/AchievementCard";
import CertificateCard from "../components/Userdashboard/CertificateCard";
import MiniCalendar from "../components/Userdashboard/MiniCalendar";
import Leaderboard from "../components/Userdashboard/Leaderboard";
import UpcomingTasks from "../components/Userdashboard/UpcomingTasks";
import StreakWidget from "../components/Userdashboard/StreakWidget";
import AIRecommendation from "../components/Userdashboard/AIRecommendation";
import CourseCategoryFilter from "../components/Userdashboard/CourseCategoryFilter";
import QuickLinks from "../components/Userdashboard/QuickLinks";

/* ======================================================
   USER DASHBOARD — VERSION 6 (DISPLAY SAFE)
====================================================== */

export default function UserDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { user } = useAuth();

  const sidebarWidth = 240;

  return (
    <Box sx={styles.root}>
      {/* SIDEBAR */}
      {!isMobile && (
        <Box sx={styles.sidebar}>
          <LeftSidebar />
        </Box>
      )}

      {/* MAIN CONTENT */}
      <Box
        sx={{
          ...styles.main,
          ml: isMobile ? 0 : `${sidebarWidth}px`,
        }}
      >
        <TopBar />

        <WelcomeBanner name={user?.name || "User"} level={6} streak={14} />

        {/* STATS */}
        <SafeGrid cols={4}>
          <StatCard label="Courses" value="12" />
          <StatCard label="Completed" value="5" />
          <StatCard label="Learning Hours" value="42h" />
          <StatCard label="Progress" value="68%" />
        </SafeGrid>

        <StreakWidget streak={14} xp={320} />

        <Box sx={{ mt: 5 }}>
          <AIRecommendation />
        </Box>

        {/* CONTINUE */}
        <Section title="Continue Learning" />
        <HorizontalSafe>
          <CourseCard title="React Crash Course" progress={65} />
          <CourseCard title="JavaScript Mastery" progress={40} />
          <CourseCard title="Python Zero to Hero" progress={85} />
        </HorizontalSafe>

        <Box sx={{ mt: 4 }}>
          <CourseCategoryFilter />
        </Box>

        {/* MY COURSES */}
        <Section title="My Courses" />
        <SafeGrid cols={4}>
          <CourseGridCard title="Front-End Development" progress={72} />
          <CourseGridCard title="Mastering Python" progress={45} />
          <CourseGridCard title="UI/UX Complete Guide" progress={20} />
          <CourseGridCard title="React + Firebase Pro" progress={90} />
        </SafeGrid>

        {/* CHARTS */}
        <Section title="Activity & Progress" />
        <SafeGrid cols={2}>
          <SafePanel title="Weekly Activity">
            <ActivityChart />
          </SafePanel>

          <SafePanel title="Learning Progress">
            <LearningChart />
          </SafePanel>
        </SafeGrid>

        {/* COURSE LIST */}
        <Section title="Your Course Progress" />
        <SafePanel>
          <CourseProgressList />
        </SafePanel>

        {/* INSIGHTS */}
        <Section title="Insights & Planning" />
        <SafeGrid cols={3}>
          <SafePanel title="Achievements">
            <AchievementCard title="Champion" level={3} />
            <AchievementCard title="Streak" level={7} />
          </SafePanel>

          <SafePanel title="Certificates">
            <CertificateCard title="React Development" />
            <CertificateCard title="Python Zero to Hero" />
            <Box sx={{ mt: 3 }}>
              <MiniCalendar />
            </Box>
          </SafePanel>

          <SafePanel title="Leaderboard">
            <Leaderboard />
            <Box sx={{ mt: 3 }}>
              <UpcomingTasks />
            </Box>
          </SafePanel>
        </SafeGrid>

        <Box sx={{ mt: 6 }}>
          <QuickLinks navigate={navigate} />
        </Box>
      </Box>
    </Box>
  );
}

/* ================= DISPLAY SAFE STYLES ================= */

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    width: "100%",
    maxWidth: "100vw",
    overflowX: "hidden",
    background: "linear-gradient(180deg,#0c1328,#000)",
  },
  sidebar: {
    width: 240,
    position: "fixed",
    height: "100vh",
    left: 0,
    top: 0,
  },
  main: {
    flexGrow: 1,
    maxWidth: "100%",
    overflowX: "hidden",
    p: { xs: 2, md: 4 },
  },
};

/* ================= SAFE UI PRIMITIVES ================= */

function Section({ title }) {
  return (
    <Typography sx={{ mt: 7, mb: 2, fontSize: 20, fontWeight: 700 }}>
      {title}
    </Typography>
  );
}

function SafePanel({ title, children }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
        overflow: "hidden",
        background: "rgba(255,255,255,0.06)",
      }}
    >
      {title && (
        <Typography sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}

function SafeGrid({ children, cols = 3 }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        width: "100%",
        gridTemplateColumns: {
          xs: "1fr",
          sm: cols > 1 ? "repeat(2,1fr)" : "1fr",
          md: `repeat(${cols},1fr)`,
        },
      }}
    >
      {children}
    </Box>
  );
}

function HorizontalSafe({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        maxWidth: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        "& > *": {
          minWidth: 260,
        },
      }}
    >
      {children}
    </Box>
  );
}
