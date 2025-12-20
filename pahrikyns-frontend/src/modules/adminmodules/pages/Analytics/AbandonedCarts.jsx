import { Box, Typography, Paper } from "@mui/material";

export default function AbandonedCarts() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Abandoned carts
      </Typography>
      <Paper sx={{ p: 4 }}>
        Cart abandonment statistics and recovery.
      </Paper>
    </Box>
  );
}
