import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

export default function StatCard({ icon, label, value, color }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  return (
    <motion.div
      whileHover={!isMobile ? { scale: 1.04, y: -4 } : {}}
      transition={{ type: "spring", stiffness: 200 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          p: { xs: 1.8, sm: 2.5 },
          borderRadius: 3,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${color}55`,
          boxShadow: `0 0 15px ${color}40`,
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.4, sm: 2 },
          cursor: "pointer",
          transition: "0.3s",
          height: "100%",
        }}
      >
        {/* ICON */}
        <Box
          sx={{
            fontSize: { xs: 26, sm: 34, md: 36 },
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        {/* TEXT SECTION */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 12.5, sm: 13.5, md: 14 },
              color: "#cbd5e1",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 18, sm: 22, md: 24 },
              fontWeight: 700,
              color: "#fff",
              mt: 0.3,
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
