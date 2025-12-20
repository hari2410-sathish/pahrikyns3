import { Box, Typography, Button, Paper } from "@mui/material";

export default function Blog() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Blog</Typography>
        <Button variant="contained">+ New post</Button>
      </Box>
      <Paper sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
        No blog posts yet.
      </Paper>
    </Box>
  );
}
