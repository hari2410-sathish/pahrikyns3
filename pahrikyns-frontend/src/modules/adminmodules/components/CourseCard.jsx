import React from "react";
import { Box, Typography, Chip, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, onDelete }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "rgba(8,15,30,0.85)",
        p: 3,
        borderRadius: 4,
        border: "1px solid rgba(0,255,255,0.25)",
        boxShadow: "0 0 25px rgba(0,255,255,0.18)",
        transition: "0.35s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 0 35px rgba(0,255,255,0.45)",
          borderColor: "rgba(0,255,255,0.6)",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Neon Title */}
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 800,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {course.title}
        </Typography>

        <Chip
          size="small"
          label={course.status}
          sx={{
            background:
              course.status === "Published"
                ? "rgba(34,197,94,0.15)"
                : "rgba(234,179,8,0.15)",
            border:
              course.status === "Published"
                ? "1px solid rgba(34,197,94,0.5)"
                : "1px solid rgba(234,179,8,0.5)",
            color: course.status === "Published" ? "#4ade80" : "#facc15",
            fontWeight: 700,
          }}
        />
      </Stack>

      {/* Category + Level */}
      <Typography sx={{ opacity: 0.7, mt: 1.2 }}>
        {course.category} • {course.level}
      </Typography>

      {/* Lessons + Students */}
      <Typography sx={{ opacity: 0.75, mt: 1 }}>
        {course.lessons} lessons • {course.students} students
      </Typography>

      {/* Actions */}
      <Stack direction="row" spacing={2} mt={3}>
        {/* VIEW BUTTON */}
        <Button
          size="small"
          onClick={() => navigate(`/admin/courses/${course.id}`)}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            borderRadius: "999px",
            color: "#00eaff",
            border: "1px solid rgba(0,255,255,0.4)",
            background: "rgba(0,255,255,0.07)",
            "&:hover": {
              background: "rgba(0,255,255,0.2)",
              boxShadow: "0 0 12px rgba(0,255,255,0.5)",
            },
          }}
        >
          View
        </Button>

        {/* EDIT BUTTON */}
        <Button
          size="small"
          onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            borderRadius: "999px",
            color: "#00eaff",
            border: "1px solid rgba(0,255,255,0.4)",
            background: "rgba(0,255,255,0.07)",
            "&:hover": {
              background: "rgba(0,255,255,0.2)",
              boxShadow: "0 0 12px rgba(0,255,255,0.5)",
            },
          }}
        >
          Edit
        </Button>

        <Button
          size="small"
          onClick={onDelete}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            borderRadius: "999px",
            color: "#ff6b6b",
            border: "1px solid rgba(255,107,107,0.5)",
            "&:hover": {
              background: "rgba(255,107,107,0.15)",
              boxShadow: "0 0 12px rgba(255,107,107,0.4)",
            },
          }}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
}
