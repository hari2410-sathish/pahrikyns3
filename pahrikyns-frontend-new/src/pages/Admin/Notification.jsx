import React from "react";
import { Box, Typography } from "@mui/material";

export default function Notification() {
  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Typography variant="h4">Notifications</Typography>
      <p>No new notifications.</p>
    </Box>
  );
}
