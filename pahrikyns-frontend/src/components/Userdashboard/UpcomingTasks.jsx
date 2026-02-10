import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";
import SchoolIcon from "@mui/icons-material/School";

const tasks = [
  {
    title: "JavaScript Quiz – Chapter 3",
    type: "Quiz",
    due: "Today • 8 PM",
  },
  {
    title: "React Project – Component Structure",
    type: "Assignment",
    due: "Tomorrow • 6 PM",
  },
  {
    title: "Live Class – Firebase Authentication",
    type: "Class",
    due: "Wed • 5:30 PM",
  },
];

const getIcon = (type, size) => {
  switch (type) {
    case "Quiz":
      return <QuizIcon sx={{ color: "#00eaff", fontSize: size }} />;
    case "Assignment":
      return <AssignmentIcon sx={{ color: "#7b3fe4", fontSize: size }} />;
    case "Class":
      return <SchoolIcon sx={{ color: "#06f9a5", fontSize: size }} />;
    default:
      return null;
  }
};

export default function UpcomingTasks() {
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
          borderRadius: 4,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 18px rgba(0,255,255,0.25)",
          mb: { xs: 4, sm: 5 },
        }}
      >
        {/* HEADER */}
        <Typography
          sx={{
            fontSize: { xs: 16, sm: 20 },
            fontWeight: 700,
            mb: { xs: 1.5, sm: 2 },
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Upcoming Tasks
        </Typography>

        {/* TASK LIST */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 } }}>
          {tasks.map((task, i) => (
            <motion.div
              key={i}
              whileHover={!isMobile ? { scale: 1.02, x: 4 } : {}}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.2, sm: 2 },
                  p: { xs: 1.4, sm: 2 },
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                }}
              >
                {/* CHECKBOX */}
                <Checkbox
                  sx={{
                    scale: { xs: 0.8, sm: 1 },
                    color: "#00eaff",
                    "&.Mui-checked": {
                      color: "#00eaff",
                    },
                  }}
                />

                {/* ICON */}
                <Box>{getIcon(task.type, isMobile ? 20 : 24)}</Box>

                {/* DETAILS */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 13.5, sm: 15 },
                      fontWeight: 600,
                      color: "#fff",
                      lineHeight: 1.3,
                    }}
                  >
                    {task.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: 11, sm: 12 },
                      color: "#94a3b8",
                      mt: 0.2,
                    }}
                  >
                    {task.due}
                  </Typography>
                </Box>

                {/* TYPE BADGE */}
                <Chip
                  label={task.type}
                  sx={{
                    background: "rgba(0,255,255,0.2)",
                    color: "#00eaff",
                    fontWeight: 600,
                    fontSize: { xs: 11, sm: 12 },
                    height: { xs: 22, sm: 24 },
                    borderRadius: 1.5,
                  }}
                />
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}
