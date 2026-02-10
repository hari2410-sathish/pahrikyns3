import React, { useState } from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/* --------- CORE COMPONENTS --------- */
import LeftSidebar from "../../components/Userdashboard/LeftSidebar";
import TopBar from "../../components/Userdashboard/TopBar";
import CourseProgressList from "../../components/Userdashboard/CourseProgressList";
import LearningChart from "../../components/Userdashboard/LearningChart";
import ActivityChart from "../../components/Userdashboard/chart/ActivityChart";

/* --------- CARDS & WIDGETS --------- */
import StatCard from "../../components/Userdashboard/chart/StatCard";
import CourseCard from "../../components/Userdashboard/CourseCard";
import CourseGridCard from "../../components/Userdashboard/CourseGridCard";
import AchievementCard from "../../components/Userdashboard/AchievementCard";
import CertificateCard from "../../components/Userdashboard/CertificateCard";
import WelcomeBanner from "../../components/Userdashboard/WelcomeBanner";
import StreakWidget from "../../components/Userdashboard/StreakWidget";
import AIRecommendation from "../../components/Userdashboard/AIRecommendation";
import ProfileQuickCard from "../../components/Userdashboard/ProfileQuickCard";
import LearningPath from "../../components/Userdashboard/LearningPath";
import UpcomingTasks from "../../components/Userdashboard/UpcomingTasks";
import Leaderboard from "../../components/Userdashboard/Leaderboard";
import MiniCalendar from "../../components/Userdashboard/MiniCalendar";
import CourseCategoryFilter from "../../components/Userdashboard/CourseCategoryFilter";
import QuickLinks from "../../components/Userdashboard/QuickLinks";

/* -------------------------------------- */
/* ----------- MAIN COMPONENT ------------ */
/* -------------------------------------- */

export default function ProgressDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "radial-gradient(circle at top, #0a0f24, #000)",
      }}
    >
      {/* ---------- SIDEBAR ---------- */}
      <LeftSidebar />

      {/* ---------- MAIN CONTENT ---------- */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TopBar />

        {/* ---------- WELCOME BANNER ---------- */}
        <WelcomeBanner
          name={user?.name || "User"}
          level={6}
          streak={14}
        />

        {/* ---------- QUICK STATS (A+B+C style) ---------- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: 3,
            mt: 4,
            mb: 4,
          }}
        >
          <StatCard label="Courses Enrolled" value="12" color="#00eaff" />
          <StatCard label="Completed" value="5" color="#7b3fe4" />
          <StatCard label="Learning Hours" value="42 hrs" color="#06f9a5" />
          <StatCard label="Progress" value="68%" color="#ff7de9" />
        </Box>

        {/* ---------- STREAK PANEL ---------- */}
        <StreakWidget streak={14} xp={320} />

        {/* ---------- AI RECOMMENDATION ---------- */}
        <Box sx={{ mt: 4 }}>
          <AIRecommendation />
        </Box>

        {/* ---------- CONTINUE LEARNING (D style) ---------- */}
        <SectionTitle title="Continue Learning" />

        <HorizontalScroll>
          <CourseCard
            title="React Crash Course"
            progress={65}
            image="https://picsum.photos/400/200?random=1"
          />
          <CourseCard
            title="JavaScript Mastery"
            progress={40}
            image="https://picsum.photos/400/200?random=2"
          />
          <CourseCard
            title="Python Zero to Hero"
            progress={85}
            image="https://picsum.photos/400/200?random=3"
          />
          <CourseCard
            title="UI/UX Design Basics"
            progress={20}
            image="https://picsum.photos/400/200?random=4"
          />
        </HorizontalScroll>

        {/* ---------- CATEGORY FILTER ---------- */}
        <Box sx={{ mt: 5 }}>
          <CourseCategoryFilter onChange={(cat) => setSelectedCategory(cat)} />
        </Box>

        {/* ---------- MY COURSES GRID ---------- */}
        <SectionTitle title="My Courses" />

        <GridLayout>
          <CourseGridCard
            title="Front-End Development Mastery"
            category="Web Dev"
            progress={72}
            image="https://picsum.photos/600/400?random=10"
          />
          <CourseGridCard
            title="Mastering Python"
            category="Programming"
            progress={45}
            image="https://picsum.photos/600/400?random=11"
          />
          <CourseGridCard
            title="UI/UX Complete Guide"
            category="Design"
            progress={20}
            image="https://picsum.photos/600/400?random=12"
          />
          <CourseGridCard
            title="React + Firebase Pro"
            category="Fullstack"
            progress={90}
            image="https://picsum.photos/600/400?random=13"
          />
        </GridLayout>

        {/* ---------- ACTIVITY ---------- */}
        <SectionTitle title="Weekly Activity" />
        <GlassPanel>
          <ActivityChart />
        </GlassPanel>

        {/* ---------- LEARNING CHART ---------- */}
        <SectionTitle title="Learning Progress" />
        <GlassPanel>
          <LearningChart />
        </GlassPanel>

        {/* ---------- PROGRESS LIST ---------- */}
        <SectionTitle title="Your Course Progress" />
        <GlassPanel>
          <CourseProgressList />
        </GlassPanel>

        {/* ---------- ACHIEVEMENTS ---------- */}
        <SectionTitle title="Achievements" />
        <FlexWrap>
          <AchievementCard title="Course Champion" level={3} />
          <AchievementCard title="Star Learner" level={5} />
          <AchievementCard title="Premium Badge" level={1} />
          <AchievementCard title="Active Streak" level={7} />
        </FlexWrap>

        {/* ---------- CERTIFICATES ---------- */}
        <SectionTitleGradient title="Certificates" />
        <FlexWrap>
          <CertificateCard
            title="React Development Masterclass"
            issuedBy="Pahrikyns Academy"
            date="Oct 12, 2025"
          />
          <CertificateCard
            title="Python Zero to Hero"
            issuedBy="Pahrikyns Academy"
            date="Sep 28, 2025"
          />
          <CertificateCard
            title="UI/UX Design Essentials"
            issuedBy="Pahrikyns Studio"
            date="Aug 15, 2025"
          />
        </FlexWrap>

        {/* ---------- LEARNING PATH ---------- */}
        <SectionTitle title="Learning Path" />
        <LearningPath />

        {/* ---------- UPCOMING TASKS ---------- */}
        <SectionTitle title="Upcoming Tasks" />
        <UpcomingTasks />

        {/* ---------- LEADERBOARD ---------- */}
        <SectionTitle title="Leaderboard" />
        <Leaderboard />

        {/* ---------- CALENDAR ---------- */}
        <SectionTitle title="Mini Calendar" />
        <MiniCalendar />

        {/* ---------- QUICK LINKS ---------- */}
        <Box sx={{ mt: 5 }}>
          <QuickLinks navigate={navigate} />
        </Box>
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------- */
/* ------------------ SHARED COMPONENTS ------------------- */
/* -------------------------------------------------------- */

function SectionTitle({ title }) {
  return (
    <Typography
      sx={{
        mb: 2,
        fontSize: 20,
        fontWeight: 700,
        background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        mt: 5,
      }}
    >
      {title}
    </Typography>
  );
}

function SectionTitleGradient({ title }) {
  return (
    <Typography
      sx={{
        mb: 2,
        fontSize: 20,
        fontWeight: 700,
        background: "linear-gradient(90deg,#ffd700,#ff8800)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        mt: 5,
      }}
    >
      {title}
    </Typography>
  );
}

function GlassPanel({ children }) {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,255,255,0.2)",
      }}
    >
      {children}
    </Paper>
  );
}

function HorizontalScroll({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        overflowX: "auto",
        pb: 2,
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(0,255,255,0.3)",
          borderRadius: 10,
        },
      }}
    >
      {children}
    </Box>
  );
}

function FlexWrap({ children }) {
  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
      {children}
    </Box>
  );
}

function GridLayout({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 3,
      }}
    >
      {children}
    </Box>
  );
}
