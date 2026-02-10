import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const steps = [
  { title: "Basics of Web Development", status: "completed" },
  { title: "JavaScript Fundamentals", status: "completed" },
  { title: "React Beginner Level", status: "current" },
  { title: "React Advanced Concepts", status: "upcoming" },
  { title: "Fullstack Integration", status: "upcoming" },
];

export default function LearningPath() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 18px rgba(0,255,255,0.25)",
          mb: 4,
        }}
      >
        {/* Header */}
        <Typography
          sx={{
            fontSize: { xs: 16, sm: 20 },
            fontWeight: 700,
            mb: { xs: 2, sm: 3 },
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Learning Path
        </Typography>

        {/* Timeline Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 2.5 },
            position: "relative",
          }}
        >
          {/* Vertical Line (desktop only) */}
          {!isMobile && (
            <Box
              sx={{
                position: "absolute",
                left: 28,
                top: 0,
                bottom: 0,
                width: "2px",
                background: "rgba(0,255,255,0.2)",
              }}
            />
          )}

          {steps.map((step, i) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.06)",
                    border: isCurrent
                      ? "1px solid rgba(0,255,255,0.4)"
                      : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: isCurrent
                      ? "0 0 12px rgba(0,255,255,0.4)"
                      : "none",
                  }}
                >
                  {/* ICON */}
                  <Box>
                    {isCompleted ? (
                      <CheckCircleIcon sx={{ color: "#06f9a5", fontSize: 28 }} />
                    ) : isCurrent ? (
                      <PlayArrowIcon sx={{ color: "#00eaff", fontSize: 28 }} />
                    ) : (
                      <RadioButtonUncheckedIcon
                        sx={{ color: "#94a3b8", fontSize: 28 }}
                      />
                    )}
                  </Box>

                  {/* TEXT */}
                  <Typography
                    sx={{
                      color: isCompleted
                        ? "#06f9a5"
                        : isCurrent
                        ? "#00eaff"
                        : "#fff",
                      fontSize: { xs: 14, sm: 15 },
                      fontWeight: isCurrent ? 700 : 500,
                      flexGrow: 1,
                    }}
                  >
                    {step.title}
                  </Typography>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Box>
    </motion.div>
  );
}
