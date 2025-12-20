import { Box, Typography, Paper } from "@mui/material";

export default function SalesTaxReports() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Sales tax reports
      </Typography>
      <Paper sx={{ p: 4 }}>
        GST / VAT / Tax breakdown reports.
      </Paper>
    </Box>
  );
}
