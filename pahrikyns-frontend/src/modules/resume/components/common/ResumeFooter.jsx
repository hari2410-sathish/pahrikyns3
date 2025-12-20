import React from "react";
import { Box } from "@mui/material";

/** ========================================================
 * RESUME FOOTER — PRO VERSION (v1)
 * Minimal • Clean • Resume.io Style
 * - Auto year
 * - Adaptive to all layouts
 * ======================================================== */

export default function ResumeFooter() {
  const year = new Date().getFullYear();

  return (
    <Box className="w-full text-center py-4 text-gray-500 text-sm select-none">
      © {year} Resume Builder — All rights reserved.
    </Box>
  );
}
