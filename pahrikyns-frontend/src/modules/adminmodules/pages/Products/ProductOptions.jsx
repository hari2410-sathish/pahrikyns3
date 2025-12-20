import { Box, Typography, Button, Paper } from "@mui/material";

export default function ProductOptions() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Product options
        </Typography>
        <Button variant="contained">+ Add option</Button>
      </Box>

      <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        No product options created yet.
      </Paper>
    </Box>
  );
}
