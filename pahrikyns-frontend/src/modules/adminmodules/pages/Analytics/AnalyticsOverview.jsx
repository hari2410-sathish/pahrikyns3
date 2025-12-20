import { Box, Typography } from "@mui/material";
import SaasStatCard from "../../components/chart/SaasStatCard";
import LineChart from "../../components/chart/LineChart";

export default function AnalyticsOverview() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Analytics overview
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, mb: 3 }}>
        <SaasStatCard title="Revenue" value="₹2,45,000" />
        <SaasStatCard title="Orders" value="1,245" />
        <SaasStatCard title="Customers" value="820" />
        <SaasStatCard title="Conversion" value="3.2%" />
      </Box>

      <LineChart />
    </Box>
  );
}
