import React from "react";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

export default function Reviews() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Product reviews
      </Typography>

      <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        No product reviews yet.
      </Paper>
    </Box>
  );
}
