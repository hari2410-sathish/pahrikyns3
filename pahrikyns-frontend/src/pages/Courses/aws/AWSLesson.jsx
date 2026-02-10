import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box, Typography, Paper, Grid, Table,
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Divider, Chip
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeIcon from '@mui/icons-material/Code';
import { awsData } from "../../data/courseData/awsData";

export default function AWSLesson() {
  const { tool, lessonId } = useParams();

  // Normalize tool param to match data keys (e.g., "load-balancer")
  const dataKey = tool?.toLowerCase();
  const data = awsData[dataKey];

  // If no data found, show a fallback
  if (!data) {
    return (
      <Box sx={{ p: 4, textAlign: "center", color: "white" }}>
        <Typography variant="h4">Lesson Not Found</Typography>
        <Typography sx={{ mt: 2 }}>
          We are working on the content for {tool}. Please check back later!
        </Typography>
        <Button
          component={Link}
          to="/courses/aws"
          variant="contained"
          sx={{ mt: 3, bgcolor: "#00eaff", color: "#000" }}
        >
          Back to AWS Course
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "1400px", mx: "auto", color: "white" }}>
      {/* Header Section */}
      <Button
        component={Link}
        to="/courses/aws"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, color: "#00eaff" }}
      >
        Back to Syllabus
      </Button>

      <Paper
        elevation={10}
        sx={{
          p: 5,
          background: "rgba(10, 20, 40, 0.9)",
          border: "1px solid rgba(0, 234, 255, 0.2)",
          borderRadius: 4,
          backdropFilter: "blur(10px)"
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, color: "#fff", mb: 2 }}>
          {data.title}
        </Typography>

        <Typography variant="h6" sx={{ color: "#aaa", mb: 4, maxWidth: "800px" }}>
          {data.description}
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

        {/* Video Section (Lesson 1 mainly) */}
        {data.videoUrl && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ color: "#00eaff", mb: 3, fontWeight: 700 }}>
              Video Tutorial
            </Typography>
            <Box sx={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 2, border: "1px solid rgba(0, 234, 255, 0.2)" }}>
              <iframe
                src={data.videoUrl}
                title={data.title}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          </Box>
        )}

        {/* Main Content Grid */}
        <Grid container spacing={6}>
          {/* Left Column: Explanations & Tables */}
          <Grid item xs={12} lg={7}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ color: "#00eaff", mb: 2, fontWeight: 700 }}>
                Overview
              </Typography>
              <Typography
                sx={{
                  whiteSpace: "pre-line",
                  color: "#ddd",
                  fontSize: "1.1rem",
                  lineHeight: 1.8
                }}
              >
                {data.longDescription}
              </Typography>
            </Box>

            {/* Feature Table */}
            {data.table && (
              <Box sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{ color: "#00eaff", mb: 3, fontWeight: 700 }}>
                  Key Features & Comparisons
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    background: "transparent",
                    boxShadow: "none",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <Table>
                    <TableHead sx={{ bgcolor: "rgba(0, 234, 255, 0.1)" }}>
                      <TableRow>
                        {data.table.headers.map((header, idx) => (
                          <TableCell key={idx} sx={{ color: "#00eaff", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.table.rows.map((row, idx) => (
                        <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          {row.map((cell, cIdx) => (
                            <TableCell key={cIdx} sx={{ color: "#ccc", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Diagram / Image Placeholder */}
            {data.image && (
              <Box sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{ color: "#00eaff", mb: 3, fontWeight: 700 }}>
                  Architecture Diagram
                </Typography>
                <Box
                  component="img"
                  src={data.image}
                  alt={data.title}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)",
                    maxHeight: "400px",
                    objectFit: "contain",
                    bgcolor: "rgba(0,0,0,0.5)"
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
              </Box>
            )}
          </Grid>

          {/* Right Column: Code Examples */}
          <Grid item xs={12} lg={5}>
            <Paper
              elevation={6}
              sx={{
                bgcolor: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
                maxHeight: "800px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box sx={{ p: 2, bgcolor: "#161b22", borderBottom: "1px solid #30363d", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" sx={{ color: "#c9d1d9", fontFamily: "monospace", display: "flex", alignItems: "center", gap: 1 }}>
                  <CodeIcon fontSize="small" />
                  {data.codeExample?.title || "Example Code"}
                </Typography>
                <Chip label={data.codeExample?.language} size="small" sx={{ bgcolor: "#238636", color: "white", borderRadius: 1, fontSize: "0.7rem", height: 20 }} />
              </Box>
              <Box
                sx={{
                  p: 2,
                  flexGrow: 1,
                  overflow: "auto",
                  '&::-webkit-scrollbar': { width: '8px' },
                  '&::-webkit-scrollbar-track': { background: '#0d1117' },
                  '&::-webkit-scrollbar-thumb': { background: '#30363d', borderRadius: '4px' },
                  '&::-webkit-scrollbar-thumb:hover': { background: '#8b949e' }
                }}
              >
                <pre style={{ margin: 0, fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace", fontSize: "0.85rem", color: "#e6edf3", lineHeight: 1.5 }}>
                  {data.codeExample?.content}
                </pre>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
