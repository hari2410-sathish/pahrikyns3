import { Box, Typography, Paper } from "@mui/material";

export default function AnalyticsMarketing() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Marketing analytics
      </Typography>
      <Paper sx={{ p: 4 }}>
        Campaigns, UTM tracking, channel performance.
      </Paper>
    </Box>
  );
}
