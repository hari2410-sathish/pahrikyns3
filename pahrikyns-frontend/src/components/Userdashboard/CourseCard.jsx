import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";

/**
 * CourseCard — COMPACT VERSION
 * - Fixed size
 * - Grid friendly
 * - Calm dashboard tile
 */

export default function CourseCard({ title, progress, image }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Box
        sx={{
          /* 🔒 FIXED SIZE */
          width: 220,
          height: 240,

          p: 1.2,
          borderRadius: 3,

          display: "flex",
          flexDirection: "column",
          gap: 1,

          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",

          flexShrink: 0,
        }}
      >
        {/* THUMBNAIL */}
        <Box
          sx={{
            height: 90,
            borderRadius: 2,
            overflow: "hidden",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* TITLE */}
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 600,
            color: "#f1f5f9",
            lineHeight: 1.25,

            /* prevent layout break */
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>

        {/* PROGRESS */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 6,
            backgroundColor: "rgba(255,255,255,0.1)",
            "& .MuiLinearProgress-bar": {
              background:
                "linear-gradient(90deg,#7dd3fc,#6366f1)",
            },
          }}
        />

        <Typography
          sx={{
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          {progress}% done
        </Typography>

        {/* ACTION */}
        <Button
          size="small"
          sx={{
            mt: "auto",
            alignSelf: "flex-start",
            textTransform: "none",
            fontSize: 11.5,
            fontWeight: 600,
            px: 1.4,
            py: 0.4,
            borderRadius: 2,
            color: "#7dd3fc",
            background: "rgba(125,211,252,0.12)",
            "&:hover": {
              background: "rgba(125,211,252,0.2)",
            },
          }}
        >
          Continue
        </Button>
      </Box>
    </motion.div>
  );
}
