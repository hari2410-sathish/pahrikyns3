import { Box, Typography, Paper } from "@mui/material";

export default function AnalyticsRealtime() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Real-time analytics
      </Typography>
      <Paper sx={{ p: 4 }}>
        Live users, live orders, socket-based updates here.
      </Paper>
    </Box>
  );
}
