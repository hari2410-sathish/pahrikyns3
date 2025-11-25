import React from "react";
import { Box, Typography, Chip, Button, Stack } from "@mui/material";

export default function CourseCard({ course, onDelete }) {
  return (
    <Box
      sx={{
        background: "rgba(10,20,40,0.8)",
        p: 3,
        borderRadius: 4,
        border: "1px solid rgba(0,255,255,0.18)",
        boxShadow: "0 0 22px rgba(0,255,255,0.2)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 0 32px rgba(0,255,255,0.5)",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
          {course.title}
        </Typography>
        <Chip
          size="small"
          label={course.status}
          sx={{
            background:
              course.status === "Published"
                ? "rgba(34,197,94,0.18)"
                : "rgba(234,179,8,0.18)",
            border:
              course.status === "Published"
                ? "1px solid rgba(34,197,94,0.6)"
                : "1px solid rgba(234,179,8,0.6)",
            color: course.status === "Published" ? "#4ade80" : "#facc15",
          }}
        />
      </Stack>

      <Typography sx={{ opacity: 0.65, mt: 1 }}>
        {course.category} • {course.level}
      </Typography>

      <Typography sx={{ opacity: 0.7, mt: 1 }}>
        {course.lessons} lessons • {course.students} students
      </Typography>

      <Stack direction="row" spacing={2} mt={3}>
        <Button
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 2.5,
            borderRadius: "999px",
            background: "rgba(15,23,42,0.9)",
            border: "1px solid rgba(148,163,184,0.6)",
            color: "white",
            "&:hover": {
              borderColor: "#00eaff",
              color: "#00eaff",
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
            px: 2.5,
            borderRadius: "999px",
            color: "#f97373",
            border: "1px solid rgba(248,113,113,0.7)",
            "&:hover": {
              background: "rgba(248,113,113,0.15)",
            },
          }}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
}
