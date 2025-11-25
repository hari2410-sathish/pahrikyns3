// === UPDATED NEON FOOTER THEME ===

import React from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        pt: 8,
        pb: 4,
        px: { xs: 3, md: 8 },
        background: "radial-gradient(circle at top, #0a0f24 0%, #020617 60%, #000510 100%)",
        borderTop: "1px solid rgba(0,234,255,0.25)",
        position: "relative",
      }}
    >
      {/* TOP GLOW LINE */}
      <Box
        sx={{
          height: "3px",
          width: "100%",
          background: "linear-gradient(90deg,#00eaff,#7b3fe4,#00eaff)",
          boxShadow: "0 0 20px rgba(0,234,255,0.6)",
          borderRadius: "999px",
          mb: 6,
        }}
      />

      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1fr" },
          gap: 6,
        }}
      >
        {/* BRAND */}
        <Box>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 900,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            PAHRIKYNS Teaching
          </Typography>

          <Typography sx={{ opacity: 0.75, mt: 2, lineHeight: 1.6 }}>
            Professional DevOps learning with real projects, neon futuristic UI
            and premium training materials.
          </Typography>
        </Box>

        {/* QUICK LINKS */}
        <FooterColumn title="Quick Links" links={["Home", "Courses", "Login", "Register"]} />

        {/* DEVOPS */}
        <FooterColumn title="DevOps Tools" links={["Docker", "Kubernetes", "Ansible", "Jenkins"]} />

        {/* SOCIAL */}
        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: "#00eaff",
              mb: 2,
            }}
          >
            Follow Us
          </Typography>

          <Stack direction="row" spacing={2}>
            {[FacebookIcon, InstagramIcon, GitHubIcon, LinkedInIcon].map((Icon, i) => (
              <IconButton
                key={i}
                sx={{
                  width: 42,
                  height: 42,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(0,234,255,0.3)",
                  borderRadius: "12px",
                  color: "white",
                  backdropFilter: "blur(12px)",
                  transition: "0.3s",
                  "&:hover": {
                    background: "rgba(0,234,255,0.15)",
                    boxShadow: "0 0 18px rgba(0,234,255,0.6)",
                    color: "#00eaff",
                  },
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* COPYRIGHT */}
      <Typography
        sx={{
          textAlign: "center",
          opacity: 0.5,
          mt: 6,
          fontSize: 13,
        }}
      >
        © 2025 PAHRIKYNS Teaching. All rights reserved.
      </Typography>
    </Box>
  );
}

/* ========== REUSABLE COLUMN COMPONENT ========== */

function FooterColumn({ title, links }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 800,
          color: "#00eaff",
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Stack spacing={1.4}>
        {links.map((item, i) => (
          <Typography
            key={i}
            component={Link}
            to={`/${item.toLowerCase()}`}
            style={{ textDecoration: "none" }}
            sx={{
              color: "white",
              opacity: 0.7,
              fontSize: 14,
              transition: "0.25s",
              "&:hover": {
                color: "#00eaff",
                opacity: 1,
              },
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
