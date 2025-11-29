// src/pages/Public/VerifyCertificate.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useParams } from "react-router-dom";

// In prod, this would call your backend: /api/cert/verify/:id
async function fetchCertData(id) {
  // demo stub — replace with API call
  const demo = {
    CERT1001: { id: "CERT1001", studentName: "Hari Sathish", course: "DevOps Mastery", date: "2025-02-14", score: 94, status: "active" },
  };
  return demo[id] || null;
}

export default function VerifyCertificate() {
  const { certId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCertData(certId).then(setData);
  }, [certId]);

  if (!data) return <Box sx={{ p: 4 }}>Certificate not found or invalid.</Box>;

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Certificate Verification</Typography>
        <Typography sx={{ mt: 2 }}><b>ID:</b> {data.id}</Typography>
        <Typography><b>Student:</b> {data.studentName}</Typography>
        <Typography><b>Course:</b> {data.course}</Typography>
        <Typography><b>Date:</b> {data.date}</Typography>
        <Typography><b>Status:</b> {data.status}</Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => window.print()}>Print / Save as PDF</Button>
        </Box>
      </Paper>
    </Box>
  );
}
