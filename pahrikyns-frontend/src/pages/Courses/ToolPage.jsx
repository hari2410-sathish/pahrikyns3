// src/pages/Courses/ToolPage.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { loadAllLessons } from "./index";
import axios from "../../api/axios";
import RazorpayButton from "../../components/common/RazorpayButton";
import { useAuth } from "../../contexts/AuthContext";
import { Box, Typography, Button, Chip, Container, Grid, Paper, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

const TOOL_ICONS = {
  docker: "🐳",
  git: "🔧",
  jenkins: "⚙️",
  kubernetes: "☸️",
  terraform: "🌍",
  ansible: "🅰️",
  prometheus: "📈",
  grafana: "📊",
  splunk: "🌀",
  default: "📘",
};

// ---------------------------
// PROGRESS STORAGE
// ---------------------------
const progressKey = (category, tool, lessonNum) =>
  `pahrikyns:progress:${category}:${tool}:lesson${lessonNum}`;

const readProgress = (c, t, n) =>
  Number(localStorage.getItem(progressKey(c, t, n))) || 0;
const writeProgress = (c, t, n, v) =>
  localStorage.setItem(progressKey(c, t, n), String(v));

export default function ToolPage() {
  const { category, tool } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [rawLessons, setRawLessons] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const canvasRef = useRef(null);

  // ACCESS STATE
  const [course, setCourse] = useState(null);
  const [access, setAccess] = useState(false);
  const [loadingAccess, setLoadingAccess] = useState(true);

  // ---------------------------
  // LOAD COURSE ACCESS
  // ---------------------------
  useEffect(() => {
    async function checkAccess() {
      try {
        setLoadingAccess(true);
        // 1. Fetch Course Info
        const { data: courseData } = await axios.get(`/courses/${tool}`);
        setCourse(courseData);

        // 2. If no user, only Beginner is free
        if (!user) {
          if (courseData.level === "Beginner" || courseData.price === 0) {
            // Double check price logic alongside level logic if needed, 
            // but for now relying on what was established.
            // Actually access controller uses PRICE now.
            if (courseData.price === 0) {
              setAccess(true);
            } else {
              setAccess(false);
            }
          } else {
            setAccess(false);
          }
          setLoadingAccess(false);
          return;
        }

        // 3. Authenticated User - Check Access
        const { data: accessData } = await axios.get(
          `/courses/${courseData.id}/access`
        );
        setAccess(accessData.access);

      } catch (err) {
        console.error("Failed to load course/access", err);
        setAccess(false);
      } finally {
        setLoadingAccess(false);
      }
    }
    checkAccess();
  }, [tool, user]);


  // ---------------------------
  // LOAD LESSONS + META
  // ---------------------------
  useEffect(() => {
    async function load() {
      const loaded = await loadAllLessons(category, tool);
      setRawLessons(loaded);

      // prepare progress map
      const map = {};
      loaded.forEach((l) => {
        map[l.num] = readProgress(category, tool, l.num);
      });
      setProgressMap(map);
    }
    load();
  }, [category, tool]);

  // ---------------------------
  // ANIMATION
  // ---------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles = [...Array(40)].map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.3 + 0.1,
    }));
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    let raf;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      // Transparent background so we can see CSS gradient behind key hero elements if needed
      // But here we draw a dark overlay
      ctx.fillStyle = "rgba(10, 25, 41, 0.0)";
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#00eaff";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    };
    window.addEventListener("resize", resize);
    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const totalLessons = rawLessons.length;
  // Calculate average progress
  const totalProgressVal = Object.values(progressMap).reduce((a, b) => a + b, 0);
  const averageProgress = totalLessons > 0 ? Math.round(totalProgressVal / totalLessons) : 0;

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", bgcolor: "#0f172a", color: "white", overflow: "hidden" }}>
      {/* BACKGROUND CANVAS */}
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.5 }} />

      {/* HERO SECTION */}
      <Box sx={{
        position: "relative",
        pt: 15,
        pb: 10,
        px: 3,
        background: "linear-gradient(180deg, rgba(0,234,255,0.05) 0%, rgba(15,23,42,0) 100%)"
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                label={`${category.toUpperCase()} / ${tool.toUpperCase()}`}
                sx={{ bgcolor: "rgba(0,234,255,0.1)", color: "#00eaff", fontWeight: 700, mb: 2 }}
              />
              <Typography variant="h2" fontWeight={900} sx={{
                mb: 2,
                background: "linear-gradient(90deg, #fff, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                {course?.title || tool.toUpperCase()} Mastery
              </Typography>
              <Typography variant="h6" color="#94a3b8" sx={{ mb: 4, lineHeight: 1.6, maxValue: 600 }}>
                {course?.description || `Master ${tool} with our comprehensive, hands-on course designed to take you from beginner to advanced.`}
              </Typography>

              <Box display="flex" gap={3} mb={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <SignalCellularAltIcon sx={{ color: "#fde68a" }} />
                  <Typography fontWeight={600} color="#cbd5e1">{course?.level || "Beginner"}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon sx={{ color: "#00eaff" }} />
                  <Typography fontWeight={600} color="#cbd5e1">{totalLessons > 0 ? "~" + (totalLessons * 15) + " Mins" : "TBD"}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <PlayArrowIcon sx={{ color: "#7b3fe4" }} />
                  <Typography fontWeight={600} color="#cbd5e1">{totalLessons} Lessons</Typography>
                </Box>
              </Box>

              {/* HERO ACTIONS */}
              <Box display="flex" gap={2}>
                {access ? (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={`/courses/${category}/${tool}/lesson1`}
                    sx={{
                      background: "#00eaff",
                      color: "#0f172a",
                      fontWeight: 800,
                      px: 4,
                      py: 1.5,
                      ":hover": { background: "#00c4d6" }
                    }}
                  >
                    {averageProgress > 0 ? "Continue Learning" : "Start Course"}
                  </Button>
                ) : (
                  // LOCKED ACTIONS
                  !user ? (
                    <Button
                      variant="contained"
                      component={Link}
                      to="/login"
                      sx={{ background: "#00eaff", color: "black", fontWeight: 700, px: 4 }}
                    >
                      Login to Access
                    </Button>
                  ) : (
                    <Box>
                      {course?.price === 0 ? (
                        <Button variant="contained" color="success" onClick={() => setAccess(true)}>Enroll For Free</Button>
                      ) : (
                        <RazorpayButton
                          courseId={course?.id}
                          courseTitle={course?.title || tool}
                          user={user}
                          onSuccess={() => window.location.reload()}
                        />
                      )}
                    </Box>
                  )
                )}
              </Box>
            </Grid>

            {/* HERO IMAGE / ICON */}
            <Grid item xs={12} md={5} display="flex" justifyContent="center">
              <Box sx={{
                fontSize: 180,
                filter: "drop-shadow(0 0 60px rgba(0,234,255,0.3))",
                animation: "float 6s ease-in-out infinite"
              }}>
                {TOOL_ICONS[tool.toLowerCase()] || TOOL_ICONS.default}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SYLLABUS SECTION */}
      <Container maxWidth="lg" sx={{ pb: 10, position: "relative", zIndex: 1 }}>
        <Typography variant="h4" fontWeight={800} mb={4} sx={{ borderLeft: "4px solid #00eaff", pl: 2 }}>
          Course Syllabus
        </Typography>

        <Grid container spacing={3}>
          {rawLessons.map((l, i) => {
            const prog = progressMap[l.num] || 0;
            const isCompleted = prog >= 100;
            const isLocked = !access && i > 0; // Assuming first lesson might be preview, or strictly all locked? 
            // Actually strictly locked if access is false.
            const actuallyLocked = !access;

            return (
              <Grid item xs={12} md={6} key={l.num}>
                <Paper sx={{
                  p: 3,
                  bgcolor: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 3,
                  transition: "all 0.3s",
                  ":hover": {
                    transform: "translateY(-4px)",
                    borderColor: "rgba(0,234,255,0.2)"
                  },
                  opacity: actuallyLocked ? 0.6 : 1
                }}>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Box>
                      <Typography variant="subtitle2" color="#00eaff" mb={0.5}>LESSON {l.num}</Typography>
                      <Typography variant="h6" fontWeight={700} color="white">{l.meta.title || `Lesson ${l.num}`}</Typography>
                    </Box>
                    {actuallyLocked ? <LockIcon sx={{ color: "rgba(255,255,255,0.3)" }} /> :
                      isCompleted ? <CheckCircleIcon sx={{ color: "#00ffb8" }} /> :
                        <PlayArrowIcon sx={{ color: "#00eaff" }} />
                    }
                  </Box>

                  <Typography variant="body2" color="rgba(255,255,255,0.6)" mb={3}>
                    {l.meta.description || "Dive into the details of this module."}
                  </Typography>

                  {/* PROGRESS BAR */}
                  {!actuallyLocked && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={prog}
                        sx={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "rgba(255,255,255,0.1)",
                          "& .MuiLinearProgress-bar": { bgcolor: "#00eaff" }
                        }}
                      />
                      <Typography variant="caption" color="rgba(255,255,255,0.5)">{prog}%</Typography>
                    </Box>
                  )}

                  {/* ACTION (Link overlay) */}
                  {access && (
                    <Link
                      to={`/courses/${category}/${tool}/${l.name}`}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    />
                  )}
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      {/* FOOTER CTA */}
      {!access && user && (
        <Box textAlign="center" py={8} bgcolor="rgba(0,234,255,0.02)">
          <Typography variant="h4" fontWeight={900} mb={2}>Ready to Master {tool.toUpperCase()}?</Typography>
          <Typography mb={4} color="rgba(255,255,255,0.6)">Join thousands of students learning {tool} today.</Typography>
          <Box>
            {course?.price > 0 ? (
              <RazorpayButton
                courseId={course?.id}
                courseTitle={course?.title || tool}
                user={user}
                onSuccess={() => window.location.reload()}
              />
            ) : (
              <Button variant="contained" size="large" onClick={() => setAccess(true)} sx={{ bgcolor: "#00eaff", color: "black", fontWeight: 700 }}>
                Enroll for Free
              </Button>
            )}
          </Box>
        </Box>
      )}

      <style>{`
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }
      `}</style>
    </Box>
  );
}
