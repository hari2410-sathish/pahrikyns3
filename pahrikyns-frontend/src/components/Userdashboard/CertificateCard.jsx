import React from "react";
import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { motion } from "framer-motion";

/**
 * CertificateCard — COMPACT VERSION
 * - Fixed size
 * - Grid friendly
 * - Calm, collectible feel
 */

export default function CertificateCard({
  title,
  issuedBy = "Pahrikyns Academy",
  date,
}) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Box
        sx={{
          /* 🔒 FIXED SIZE */
          width: 220,
          height: 140,

          p: 1.4,
          borderRadius: 3,

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",

          flexShrink: 0,
        }}
      >
        {/* HEADER */}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "#facc15",
            lineHeight: 1.2,
          }}
        >
          Certificate
        </Typography>

        {/* TITLE */}
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 600,
            color: "#f8fafc",
            lineHeight: 1.25,

            /* prevent overflow */
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>

        {/* META */}
        <Typography
          sx={{
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          {issuedBy}
        </Typography>

        <Typography
          sx={{
            fontSize: 10.5,
            color: "#7dd3fc",
          }}
        >
          {date}
        </Typography>

        {/* ACTION */}
        <Button
          startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
          size="small"
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            fontSize: 11,
            fontWeight: 600,
            color: "#facc15",
            px: 1.2,
            py: 0.4,
            borderRadius: 2,
            background: "rgba(250,204,21,0.12)",
            "&:hover": {
              background: "rgba(250,204,21,0.2)",
            },
          }}
        >
          Download
        </Button>
      </Box>
    </motion.div>
  );
}
