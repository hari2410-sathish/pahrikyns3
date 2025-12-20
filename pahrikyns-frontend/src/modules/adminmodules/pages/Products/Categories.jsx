import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";

export default function Categories() {
  return (
    <Box >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Categories
        </Typography>
        <Button variant="contained">+ Add category</Button>
      </Box>

      <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        No categories created yet.
      </Paper>
    </Box>
  );
}
