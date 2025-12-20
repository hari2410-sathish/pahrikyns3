import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/** ========================================================
 * RESUME HOME — PRO VERSION (v1)
 * Premium landing page for Resume Builder
 * - Clean hero section
 * - Resume.io style layout
 * ======================================================== */

export default function ResumeHome() {
  const navigate = useNavigate();

  return (
    <Box className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* HERO SECTION */}
      <Box className="flex flex-col items-center text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">
          Build a Professional Resume in Minutes
        </h1>
        <p className="text-gray-600 max-w-xl mb-6">
          Choose a premium template, fill your details, and download your
          polished resume instantly.
        </p>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/resume/builder/personal")}
        >
          Create Resume
        </Button>
      </Box>

      {/* FEATURES SECTION */}
      <Box className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto pb-20">
        <Box className="p-6 bg-white shadow rounded-xl text-center">
          <h3 className="font-semibold text-lg mb-2">Professional Templates</h3>
          <p className="text-gray-600 text-sm">
            Modern, elegant, and fully customizable designs.
          </p>
        </Box>

        <Box className="p-6 bg-white shadow rounded-xl text-center">
          <h3 className="font-semibold text-lg mb-2">ATS Friendly</h3>
          <p className="text-gray-600 text-sm">
            All templates follow HR-standard formatting.
          </p>
        </Box>

        <Box className="p-6 bg-white shadow rounded-xl text-center">
          <h3 className="font-semibold text-lg mb-2">Instant PDF Export</h3>
          <p className="text-gray-600 text-sm">
            Download your resume instantly in high quality.
          </p>
        </Box>
      </Box>
    </Box>
  );
}
