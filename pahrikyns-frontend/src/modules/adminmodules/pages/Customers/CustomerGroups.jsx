import { Box, Typography, Button, Paper } from "@mui/material";

export default function CustomerGroups() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Customer groups</Typography>
        <Button variant="contained">+ Add group</Button>
      </Box>
      <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        No customer groups yet.
      </Paper>
    </Box>
  );
}
