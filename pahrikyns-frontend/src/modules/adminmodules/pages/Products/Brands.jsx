import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";

export default function Brands() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Brands
        </Typography>
        <Button variant="contained">+ Add brand</Button>
      </Box>

      <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        No brands added yet.
      </Paper>
    </Box>
  );
}
