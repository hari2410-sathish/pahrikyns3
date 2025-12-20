import { Box, Typography, Button, Paper } from "@mui/material";

export default function ImageManager() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>Image manager</Typography>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography mb={2}>Upload and manage storefront images.</Typography>
        <Button variant="contained">Upload image</Button>
      </Paper>
    </Box>
  );
}
