import { Box, Typography, Button, Paper } from "@mui/material";

export default function ImportSKUs() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Import SKUs
      </Typography>

      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography mb={2}>
          Import SKU data using CSV.
        </Typography>
        <Button variant="contained">Upload SKU CSV</Button>
      </Paper>
    </Box>
  );
}
