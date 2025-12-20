import React from "react";
import { Box } from "@mui/material";
import ResumeNavbar from "../components/common/ResumeNavbar";

/** ========================================================
 *  RESUME LAYOUT — PRO VERSION (v1)
 *  Global layout wrapper for Resume Builder system
 *  - Sticky premium navbar
 *  - Max-width container
 *  - Clean padding
 *  ======================================================== */

export default function ResumeLayout({ children }) {
  return (
    <Box className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <Box className="sticky top-0 z-50 shadow-md bg-white">
        <ResumeNavbar />
      </Box>

      {/* PAGE CONTENT */}
      <Box className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        {children}
      </Box>
    </Box>
  );
}
