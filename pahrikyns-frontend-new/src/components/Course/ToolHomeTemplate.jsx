import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function ToolHomeTemplate({ toolName, toolKey, lessonsCount, learnItems }) {
  return (
    <Box sx={{ p: 4, color: "white", maxWidth: "1200px", mx: "auto" }}>
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(135deg, #0a0f28, #07101f)",
          border: "1px solid rgba(0,234,255,0.3)",
          borderRadius: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, color: "#00eaff" }}>
          {toolName}
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.8 }}>
          Master {toolName} from basics to advanced.
        </Typography>

        <Button
          component={Link}
          to={`/courses/devops/${toolKey}/lesson1`}
          sx={{
            mt: 3,
            background: "#00eaff",
            color: "#000",
            fontWeight: 700,
            px: 3,
            py: 1,
            borderRadius: 2
          }}
        >
          Start Learning →
        </Button>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        What You Will Learn
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "rgba(5,10,25,0.75)",
        }}
      >
        <ul style={{ paddingLeft: "20px" }}>
          {learnItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Lessons ({lessonsCount})
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(5,10,25,0.75)",
        }}
      >
        {Array.from({ length: lessonsCount }, (_, i) => (
          <Box
            key={i}
            component={Link}
            to={`/courses/devops/${toolKey}/lesson${i + 1}`}
            sx={{
              display: "block",
              py: 1.2,
              px: 1,
              textDecoration: "none",
              color: "white",
              "&:hover": { color: "#00eaff" },
            }}
          >
            Lesson {i + 1}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
