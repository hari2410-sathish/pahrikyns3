import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { LineChart } from "@mui/x-charts/LineChart";

/**
 * ActivityChart (Dashboard Version)
 * PURPOSE:
 * - Show weekly consistency
 * - Calm + responsive
 * - Never overflow container
 */

export default function ActivityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          height: 120,              // ✅ controlled height
        }}
      >
        <LineChart
          xAxis={[
            {
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: [2, 4, 3, 6, 8, 5, 7],
              color: "#7dd3fc",     // ✅ softer cyan
              area: true,
            },
          ]}
          width={undefined}         // ❌ remove fixed width
          height={320}              // ✅ match container
          sx={{
            width: "100%",
            "& .MuiLineElement-root": {
              strokeWidth: 2,
            },
            "& .MuiAreaElement-root": {
              fill: "rgba(125,211,252,0.18)",
            },
            "& .MuiChartsAxis-tickLabel": {
              fill: "#94a3b8",
              fontSize: 12,
            },
            "& .MuiChartsAxis-line": {
              stroke: "rgba(255,255,255,0.08)",
            },
            "& .MuiChartsGrid-line": {
              stroke: "rgba(255,255,255,0.05)",
            },
          }}
        />
      </Box>
    </motion.div>
  );
}
