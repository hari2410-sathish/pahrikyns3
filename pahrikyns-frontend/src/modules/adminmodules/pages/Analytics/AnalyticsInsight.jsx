import { Box, Typography, Paper } from "@mui/material";

export default function AnalyticsInsight() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Insights
      </Typography>
      <Paper sx={{ p: 4 }}>
        AI insights, trends, and recommendations will appear here.
      </Paper>
    </Box>
  );
}
