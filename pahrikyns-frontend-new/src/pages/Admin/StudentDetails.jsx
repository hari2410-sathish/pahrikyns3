import React from "react";
import { Box, Typography } from "@mui/material";

export default function StudentDetails() {
  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Typography variant="h4" fontWeight={800}>Student Details</Typography>
      <p>Details about individual student...</p>
    </Box>
  );
}
