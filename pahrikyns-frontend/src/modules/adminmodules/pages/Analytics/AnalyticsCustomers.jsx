import { Box, Typography } from "@mui/material";
import PieMini from "../../components/chart/PieMini";

export default function AnalyticsCustomers() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Customer analytics
      </Typography>
      <PieMini />
    </Box>
  );
}
