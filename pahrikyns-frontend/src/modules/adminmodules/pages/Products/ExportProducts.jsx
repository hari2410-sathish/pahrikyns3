import { Box, Typography, Button, Paper } from "@mui/material";

export default function ExportProducts() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Export products
      </Typography>

      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography mb={2}>
          Download product data as CSV.
        </Typography>
        <Button variant="contained">Export CSV</Button>
      </Paper>
    </Box>
  );
}
