import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function CertificateViewer({ certificate }) {
  if (!certificate) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>No certificate data</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700}>
        Certificate Preview
      </Typography>

      <Typography mt={2}>
        Name: {certificate.userName}
      </Typography>

      <Typography>
        Course: {certificate.courseName}
      </Typography>

      <Typography>
        Certificate ID: {certificate._id}
      </Typography>
    </Paper>
  );
}
