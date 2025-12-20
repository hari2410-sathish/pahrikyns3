import { Box, Typography, Paper } from "@mui/material";

export default function ProductFiltering() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Product filtering
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Typography>
          Configure filters like price, category, brand, and stock.
        </Typography>
      </Paper>
    </Box>
  );
}
