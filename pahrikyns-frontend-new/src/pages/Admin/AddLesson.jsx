import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function AddLesson() {
  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Add New Lesson
      </Typography>

      <TextField label="Lesson Title" fullWidth sx={{ mb: 3 }} />
      <TextField label="Content" fullWidth multiline rows={6} sx={{ mb: 3 }} />

      <Button variant="contained">Add Lesson</Button>
    </Box>
  );
}
