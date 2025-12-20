import { Box, Typography, TextField, Button, Paper } from "@mui/material";

export default function AddCustomer() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>Add customer</Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <TextField fullWidth label="Name" sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" sx={{ mb: 2 }} />
        <TextField fullWidth label="Phone" sx={{ mb: 2 }} />
        <Button variant="contained">Save customer</Button>
      </Paper>
    </Box>
  );
}
