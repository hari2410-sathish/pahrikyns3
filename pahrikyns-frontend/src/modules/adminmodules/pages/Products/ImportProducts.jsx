import { Box, Typography, Button, Paper } from "@mui/material";

export default function ImportProducts() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Import products
      </Typography>

      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography mb={2}>
          Upload a CSV file to import products.
        </Typography>
        <Button variant="contained">Upload CSV</Button>
      </Paper>
    </Box>
  );
}
