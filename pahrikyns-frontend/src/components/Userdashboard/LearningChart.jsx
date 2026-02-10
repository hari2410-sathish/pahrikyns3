import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts";
import { Box } from "@mui/material";

/**
 * LearningChart (Dashboard Version)
 * PURPOSE:
 * - Show learning effort + consistency
 * - Bar = minutes spent
 * - Line = weekly trend
 * - Calm, readable, non-distracting
 */

const data = [
  { day: "Mon", mins: 40 },
  { day: "Tue", mins: 55 },
  { day: "Wed", mins: 20 },
  { day: "Thu", mins: 75 },
  { day: "Fri", mins: 30 },
  { day: "Sat", mins: 90 },
  { day: "Sun", mins: 60 },
];

export default function LearningChart() {
  return (
    <Box sx={{ height: 290, width: "100%", mt: 1 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          {/* SUBTLE GRID */}
          <CartesianGrid
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />

          {/* AXIS */}
          <XAxis
            dataKey="day"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* TOOLTIP */}
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              background: "#0b1226",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              fontSize: 12,
              color: "#fff",
            }}
            labelStyle={{ color: "#7dd3fc" }}
            formatter={(value) => [`${value} mins`, "Learning Time"]}
          />

          {/* BARS = EFFORT */}
          <Bar
            dataKey="mins"
            fill="rgba(125,211,252,0.35)"
            radius={[6, 6, 0, 0]}
          />

          {/* LINE = TREND */}
          <Line
            type="monotone"
            dataKey="mins"
            stroke="#7b3fe4"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
