import { Box, Typography, Button, Paper } from "@mui/material";

export default function ExportSKUs() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Export SKUs
      </Typography>

      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography mb={2}>
          Download SKU data as CSV.
        </Typography>
        <Button variant="contained">Export SKUs</Button>
      </Paper>
    </Box>
  );
}
