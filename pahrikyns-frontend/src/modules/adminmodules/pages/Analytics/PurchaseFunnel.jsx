import { Box, Typography, Paper } from "@mui/material";

export default function PurchaseFunnel() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Purchase funnel
      </Typography>
      <Paper sx={{ p: 4 }}>
        Visits → Add to cart → Checkout → Purchase funnel data.
      </Paper>
    </Box>
  );
}
