import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

export default function CourseProgressList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const demoCourses = [
    { title: "AWS Basics", progress: 40 },
    { title: "Docker Mastery", progress: 70 },
    { title: "Linux Shell Scripting", progress: 25 },
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,255,255,0.15)",
        width: "100%",
      }}
    >
      {/* Heading */}
      <Typography
        sx={{
          fontSize: { xs: 18, sm: 20, md: 22 },
          fontWeight: 700,
          mb: { xs: 1.5, sm: 2 },
          color: "#e2e8f0",
        }}
      >
        Continue Learning
      </Typography>

      {/* Course List */}
      {demoCourses.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <Box
            sx={{
              mb: { xs: 2, sm: 3 },
            }}
          >
            {/* Course Name */}
            <Typography
              sx={{
                color: "#94a3b8",
                mb: 1,
                fontSize: { xs: 13.5, sm: 14.5 },
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {c.title}
            </Typography>

            {/* Progress Bar */}
            <LinearProgress
              variant="determinate"
              value={c.progress}
              sx={{
                height: { xs: 7, sm: 8 },
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
                },
                background: "rgba(255,255,255,0.1)",
              }}
            />

            {/* Progress % */}
            <Typography
              sx={{
                mt: 0.6,
                fontSize: { xs: 11.5, sm: 12 },
                fontWeight: 500,
                color: "#cbd5e1",
              }}
            >
              {c.progress}% completed
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}
