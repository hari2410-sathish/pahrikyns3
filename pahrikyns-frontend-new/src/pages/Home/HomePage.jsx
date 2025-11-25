import React, { useState } from "react";
import {
  Box,
  Chip,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import SecurityIcon from "@mui/icons-material/Security";
import SchoolIcon from "@mui/icons-material/School";

// FIX THIS — include NavBar
import NavBar from "../../components/global/MainNavbar.jsx";


export default function HomePage() {
  const [/*unused*/] = useState(null);

  return (
    <Box className="app-root" sx={{ minHeight: "100vh", bgcolor: "#020617" }}>
      <style>{globalCss}</style>

      {/* === Render global NavBar (single place) === */}
     

      {/* ================= HERO + CONTENT ================= */}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          pt: 8,
          pb: 12,
          px: { xs: 2, md: 6 },
          color: "white",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top, #0a0f24 0%, #020617 60%, #000510 100%)",
        }}
      >
        {/* Neon floating dots (decorative) */}
        {[...Array(22)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: `${6 + (i % 6)}px`,
              height: `${6 + (i % 6)}px`,
              borderRadius: "50%",
              background: "rgba(0,234,255,0.6)",
              top: `${(i * 7) % 100}%`,
              left: `${(i * 13) % 100}%`,
              filter: "blur(6px)",
              animation: `blink ${(5 + (i % 6))}s infinite ease-in-out`,
            }}
          />
        ))}

        <Box sx={{ maxWidth: 1300, mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "stretch",
              gap: { xs: 6, md: 10 },
              mt: 4,
              position: "relative",
            }}
          >
            {/* LEFT */}
            <Box sx={{ flex: 1 }}>
              <Chip
                label="DevOps • AWS • Linux • CI/CD"
                sx={{
                  mb: 2,
                  borderRadius: "999px",
                  border: "1px solid rgba(0,234,255,0.4)",
                  background: "rgba(0,234,255,0.08)",
                  color: "#00eaff",
                  fontWeight: 700,
                  boxShadow: "0 0 18px rgba(0,234,255,0.35)",
                }}
              />

              <Typography
                sx={{
                  fontSize: { xs: 34, md: 46 },
                  fontWeight: 900,
                  lineHeight: 1.25,
                  mb: 2,
                }}
              >
                Learn DevOps the{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 0 25px rgba(0,234,255,0.6)",
                  }}
                >
                  clean & structured
                </Box>{" "}
                way.
              </Typography>

              <Typography
                sx={{
                  fontSize: 17,
                  maxWidth: 600,
                  opacity: 0.85,
                  lineHeight: 1.6,
                  color: "#dbeafe",
                }}
              >
                PAHRIKYNS Teaching will take you from basics of Linux and AWS to
                real production-ready CI/CD pipelines with tools like Jenkins,
                Docker, Kubernetes, Terraform, Ansible & more — step by step,
                without confusion.
              </Typography>

              <Stack direction="row" spacing={3} mt={4} flexWrap="wrap">
                <Button
                  component={Link}
                  to="/courses"
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderRadius: "999px",
                    fontSize: 16,
                    fontWeight: 800,
                    background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                    color: "#020617",
                    textTransform: "none",
                    boxShadow: "0 0 30px rgba(0,234,255,0.45)",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 0 45px rgba(123,63,228,0.65)",
                    },
                  }}
                >
                  Start Learning FREE
                </Button>

                <Button
                  component={Link}
                  to="/courses/aws"
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderRadius: "999px",
                    fontSize: 15,
                    fontWeight: 700,
                    textTransform: "none",
                    border: "2px solid #00eaff",
                    color: "#00eaff",
                    "&:hover": {
                      borderColor: "#7b3fe4",
                      color: "#7b3fe4",
                      boxShadow: "0 0 20px rgba(123,63,228,0.5)",
                    },
                  }}
                >
                  View AWS Track
                </Button>
              </Stack>

              <Stack direction="row" spacing={6} mt={6} flexWrap="wrap">
                <Stat num="5000+" label="Students trained" />
                <Stat num="25+" label="Hands-on projects" />
                <Stat num="98%" label="Success & clarity" />
              </Stack>
            </Box>

            {/* RIGHT GLASS PANEL */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <GlassPanel />
            </Box>
          </Box>

          {/* FEATURED TRACKS */}
          <Box sx={{ mt: 12 }}>
            <Typography
              sx={{
                fontSize: { xs: 22, md: 28 },
                fontWeight: 800,
                mb: 4,
                color: "#00eaff",
                textShadow: "0 0 15px rgba(0,234,255,0.5)",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ⚡ Featured DevOps Tracks
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <CourseCard
                  title="AWS + Linux Beginner to Pro"
                  level="Beginner • 40+ lessons"
                  description="Start from zero, learn Linux commands, AWS core services and cloud confidence."
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CourseCard
                  title="Complete Jenkins CI/CD"
                  level="Intermediate • 25+ lessons"
                  description="Create pipelines, integrate Git, Maven, SonarQube, Nexus and automated deployments."
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CourseCard
                  title="Docker & Kubernetes in Practice"
                  level="Advanced • 30+ lessons"
                  description="Deploy real apps to Kubernetes clusters with production patterns."
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------ Small helper components ------------------ */
function Stat({ num, label }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 900,
          color: "#00eaff",
          textShadow: "0 0 12px rgba(0,234,255,0.6)",
        }}
      >
        {num}
      </Typography>
      <Typography sx={{ fontSize: 13, opacity: 0.7 }}>{label}</Typography>
    </Box>
  );
}

function GlassPanel() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 420 },
        p: 3,
        borderRadius: "26px",
        background: "rgba(0,10,25,0.55)",
        border: "1px solid rgba(0,234,255,0.35)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 40px rgba(123,63,228,0.35)",
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2, color: "#00eaff" }}>
        Your DevOps Journey
      </Typography>
      {[
        ["Foundations", <BuildIcon />],
        ["Cloud & AWS", <CloudIcon />],
        ["Security", <SecurityIcon />],
        ["CI/CD & Automation", <SchoolIcon />],
      ].map(([title, icon], i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "12px",
              background: "rgba(0,234,255,0.12)",
              border: "1px solid rgba(0,234,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00eaff",
            }}
          >
            {icon}
          </Box>

          <Typography sx={{ fontSize: 14, opacity: 0.9, mt: 0.8 }}>{title}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function CourseCard({ title, level, description }) {
  return (
    <Box
      sx={{
        background: "rgba(5,15,30,0.7)",
        borderRadius: "20px",
        p: 3,
        border: "1px solid rgba(0,234,255,0.15)",
        transition: "0.3s",
        "&:hover": {
          borderColor: "#00eaff",
          boxShadow: "0 0 22px rgba(0,234,255,0.45)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Typography sx={{ fontSize: 17, fontWeight: 800, color: "white" }}>{title}</Typography>
      <Typography sx={{ fontSize: 13, color: "#7b3fe4", mt: 1 }}>{level}</Typography>
      <Typography sx={{ fontSize: 14, opacity: 0.85, mt: 2, color: "#dbeafe" }}>
        {description}
      </Typography>
    </Box>
  );
}

/* --------------- Styles & constants --------------- */
const globalCss = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:radial-gradient(circle at top,#101633 0,#050816 55%,#02010f 100%);color:#fff}
@keyframes blink{0%,100%{opacity:0.1;transform:scale(0.7)}50%{opacity:0.9;transform:scale(1.4)}}
`;

