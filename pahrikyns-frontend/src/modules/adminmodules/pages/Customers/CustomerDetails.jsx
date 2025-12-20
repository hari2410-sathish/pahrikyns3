import { Box, Typography, Paper } from "@mui/material";

export default function CustomerDetails() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>Customer details</Typography>
      <Paper sx={{ p: 4 }}>
        Customer profile, orders, payments will show here.
      </Paper>
    </Box>
  );
}
