import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

export default function AddProduct() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Add product
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 700 }}>
        <TextField fullWidth label="Product name" sx={{ mb: 2 }} />
        <TextField fullWidth label="SKU" sx={{ mb: 2 }} />
        <TextField fullWidth label="Price" sx={{ mb: 2 }} />
        <TextField fullWidth label="Stock quantity" sx={{ mb: 2 }} />

        <Box sx={{ textAlign: "right" }}>
          <Button variant="contained">Save product</Button>
        </Box>
      </Paper>
    </Box>
  );
}
