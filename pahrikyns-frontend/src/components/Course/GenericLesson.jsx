import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function GenericLesson({ data }) {
    if (!data) return null;

    const { title, description, longDescription, image, videoUrl, table, codeExample } = data;

    return (
        <Box>
            {/* VIDEO SECTION */}
            {videoUrl && (
                <Paper
                    elevation={10}
                    sx={{
                        overflow: "hidden",
                        borderRadius: 4,
                        mb: 4,
                        border: "1px solid rgba(0, 234, 255, 0.2)",
                        position: "relative",
                        paddingTop: "56.25%", // 16:9 Aspect Ratio
                        bgcolor: "#000",
                    }}
                >
                    <iframe
                        src={videoUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                    />
                </Paper>
            )}

            {/* TEXT CONTENT */}
            <Box mb={4}>
                <Typography variant="h4" fontWeight={800} color="#fff" mb={2}>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                    {description}
                </Typography>
                {longDescription && (
                    <Box sx={{ "& h3": { color: "#00eaff", mt: 3, mb: 1 }, "& li": { mb: 1, color: "#ccc" } }}>
                        <Typography component="div" sx={{ color: "#d1d5db", lineHeight: 1.8 }}>
                            {/* Simple parser or just render raw if safe, utilizing newline to break */}
                            {longDescription.split('\n').map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* IMAGE */}
            {image && (
                <Box mb={4} display="flex" justifyContent="center">
                    <img src={image} alt={title} style={{ maxWidth: "100%", borderRadius: 12, border: "1px solid #333" }} />
                </Box>
            )}

            {/* TABLE */}
            {table && (
                <Box mb={4} overflow="auto">
                    <Paper sx={{ width: "100%", bgcolor: "transparent", border: "1px solid #333" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", color: "#ddd" }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                                    {table.headers.map((h, i) => (
                                        <th key={i} style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #444" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {table.rows.map((row, r) => (
                                    <tr key={r}>
                                        {row.map((cell, c) => (
                                            <td key={c} style={{ padding: "12px", borderBottom: "1px solid #333" }}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Paper>
                </Box>
            )}

            {/* CODE EXAMPLE */}
            {codeExample && (
                <Box mb={4}>
                    <Typography variant="h6" color="#00eaff" mb={1} fontWeight={700}>
                        {codeExample.title || "Code Example"}
                    </Typography>
                    <Paper elevation={4} sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #333" }}>
                        <SyntaxHighlighter
                            language={codeExample.language || "javascript"}
                            style={atomOneDark}
                            customStyle={{ padding: "20px", margin: 0, fontSize: "0.9rem" }}
                        >
                            {codeExample.content.trim()}
                        </SyntaxHighlighter>
                    </Paper>
                </Box>
            )}
        </Box>
    );
}
