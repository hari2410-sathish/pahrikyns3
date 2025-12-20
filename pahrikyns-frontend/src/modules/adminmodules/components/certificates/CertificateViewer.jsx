import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

export default function CertificateViewer({ cert }) {
  // cert: {name, course, date, id, templateSVG or image}
  return (
    <Paper sx={{ p: 3, borderRadius: 2, background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 900, border: "1px solid rgba(0,255,255,0.08)", borderRadius: 1, p: 2, background: "#0b1220" }}>
        {/* if you have an svg or canvas generator, render here */}
        {cert?.image ? (
          <img src={cert.image} alt="certificate" style={{ width: "100%", display: "block", borderRadius: 6 }} />
        ) : (
          <Box sx={{ p: 6, borderRadius: 1, background: "#071024", color: "#fff", textAlign: "center" }}>
            <Typography variant="h4">{cert?.name || "Student Name"}</Typography>
            <Typography sx={{ color: "#9ca3af" }}>{cert?.course || "Course Title"}</Typography>
            <Typography sx={{ mt: 2 }}>{cert?.date || "DD MMM YYYY"}</Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" sx={{ background: "linear-gradient(90deg,#00eaff,#7b3fe4)" }}>Download</Button>
        <Button variant="outlined">Print</Button>
      </Box>
    </Paper>
  );
}
