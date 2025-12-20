import { Box, Typography, Button, Paper } from "@mui/material";

export default function WebPages() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Web pages</Typography>
        <Button variant="contained">+ Create page</Button>
      </Box>
      <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        No pages created yet.
      </Paper>
    </Box>
  );
}
