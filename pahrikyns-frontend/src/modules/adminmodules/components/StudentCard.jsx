import React from "react";
import { Box, Typography, Chip, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StudentCard({ student, onRemove }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "rgba(10,20,40,0.85)",
        p: 3,
        borderRadius: 4,
        border: "1px solid rgba(0,255,255,0.25)",
        boxShadow: "0 0 22px rgba(0,255,255,0.18)",
        transition: "0.35s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 0 32px rgba(0,255,255,0.4)",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 800,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {student.name}
      </Typography>

      <Typography sx={{ opacity: 0.7 }}>{student.email}</Typography>

      <Typography sx={{ mt: 1, opacity: 0.75 }}>
        Enrolled Courses: {student.enrolled}
      </Typography>

      <Chip
        label={student.status}
        sx={{
          mt: 1,
          width: "fit-content",
          fontWeight: 700,
          background:
            student.status === "Active"
              ? "rgba(34,197,94,0.15)"
              : "rgba(234,179,8,0.15)",
          border:
            student.status === "Active"
              ? "1px solid rgba(34,197,94,0.5)"
              : "1px solid rgba(234,179,8,0.5)",
          color: student.status === "Active" ? "#4ade80" : "#facc15",
        }}
      />

      <Stack direction="row" spacing={2} mt={3}>
        <Button
          size="small"
          onClick={() => navigate(`/admin/students/${student.id}`)}
          sx={{
            textTransform: "none",
            borderRadius: "999px",
            px: 3,
            fontWeight: 700,
            color: "#00eaff",
            border: "1px solid rgba(0,255,255,0.4)",
            "&:hover": {
              background: "rgba(0,255,255,0.15)",
            },
          }}
        >
          View
        </Button>

        <Button
          size="small"
          onClick={onRemove}
          sx={{
            textTransform: "none",
            borderRadius: "999px",
            px: 3,
            fontWeight: 700,
            color: "#ff6b6b",
            border: "1px solid rgba(255,107,107,0.5)",
            "&:hover": {
              background: "rgba(255,107,107,0.2)",
            },
          }}
        >
          Remove
        </Button>
      </Stack>
    </Box>
  );
}
