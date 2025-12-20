import { Box, Typography } from "@mui/material";
import BarChart from "../../components/chart/BarChart";

export default function AnalyticsOrders() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Orders analytics
      </Typography>
      <BarChart />
    </Box>
  );
}
