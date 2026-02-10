import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CertificateIcon from "@mui/icons-material/WorkspacePremium";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";

const links = [
  { title: "My Courses", icon: <SchoolIcon />, path: "/my-courses", color: "#00eaff" },
  { title: "Resume Builder", icon: <AssignmentIcon />, path: "/resume/builder", color: "#7b3fe4" },
  { title: "Achievements", icon: <EmojiEventsIcon />, path: "/achievements", color: "#ffd700" },
  { title: "Certificates", icon: <CertificateIcon />, path: "/certificates", color: "#ff9900" },
  { title: "Progress", icon: <TimelineIcon />, path: "/progress", color: "#06f9a5" },
  { title: "Settings", icon: <SettingsIcon />, path: "/settings", color: "#ff7de9" },
];

export default function QuickLinks({ navigate }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          mb: { xs: 3, sm: 4 },
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 15px rgba(0,255,255,0.25)",
        }}
      >
        <Typography
          sx={{
            mb: { xs: 1.5, sm: 2 },
            fontSize: { xs: 16, sm: 20 },
            fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Quick Links
        </Typography>

        {/* Responsive Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)", // mobile (3 per row)
              sm: "repeat(4, 1fr)", // tablets
              md: "repeat(auto-fit, minmax(140px, 1fr))", // desktop flexible
            },
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          {links.map((item, i) => (
            <motion.div
              key={i}
              whileHover={!isMobile ? { scale: 1.08, y: -4 } : {}}
              transition={{ type: "spring", stiffness: 160 }}
            >
              <Box
                onClick={() => navigate && navigate(item.path)}
                sx={{
                  p: { xs: 1.4, sm: 2 },
                  borderRadius: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${item.color}44`,
                  boxShadow: `0 0 12px ${item.color}22`,
                  transition: "0.3s",
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: 24, sm: 30 },
                    mb: { xs: 0.5, sm: 1 },
                    display: "flex",
                    justifyContent: "center",
                    color: item.color,
                    filter: `drop-shadow(0 0 6px ${item.color})`,
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: 11.5, sm: 14 },
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}
