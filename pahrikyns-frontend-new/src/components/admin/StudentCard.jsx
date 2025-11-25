import React from "react";
import { Box, Typography, Button, Avatar, Chip, Stack } from "@mui/material";

export default function StudentCard({ student, onRemove }) {
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
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: "#00eaff",
            color: "#020617",
            fontWeight: 800,
          }}
        >
          {student.name[0]}
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 800 }}>{student.name}</Typography>
          <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
            {student.email}
          </Typography>
        </Box>
        <Chip
          size="small"
          label={student.status}
          sx={{
            ml: "auto",
            background:
              student.status === "Active"
                ? "rgba(34,197,94,0.18)"
                : "rgba(234,179,8,0.18)",
            border:
              student.status === "Active"
                ? "1px solid rgba(34,197,94,0.6)"
                : "1px solid rgba(234,179,8,0.6)",
            color: student.status === "Active" ? "#4ade80" : "#facc15",
          }}
        />
      </Stack>

      <Typography sx={{ mt: 2, color: "#00eaff", fontWeight: 700 }}>
        {student.enrolled} courses enrolled
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
          View
        </Button>
        <Button
          size="small"
          onClick={onRemove}
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
          Remove
        </Button>
      </Stack>
    </Box>
  );
}
