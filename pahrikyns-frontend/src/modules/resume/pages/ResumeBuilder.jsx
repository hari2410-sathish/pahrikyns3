import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ResumeLayout from "../layouts/ResumeLayout";
import ResumeForm from "../components/forms/ResumeForm";
import ResumePreview from "../components/preview/ResumePreview";

/** ========================================================
 * RESUME BUILDER — PRO VERSION (v1)
 * The main workspace for building resumes
 * - Layout + Navbar wrapper
 * - Form (left) + Live Preview (right)
 * - True resume.io split-pane builder
 * ======================================================== */

export default function ResumeBuilder() {
  return (
    <ResumeLayout>
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Form Controller */}
        <Box className="bg-white p-6 rounded-xl shadow-md border">
          <ResumeForm />
        </Box>

        {/* RIGHT: Live Resume Preview */}
        <Box className="bg-white p-6 rounded-xl shadow-md border overflow-auto max-h-[85vh]">
          <ResumePreview />
        </Box>
      </Box>

      {/* Nested routes support if needed */}
      <Outlet />
    </ResumeLayout>
  );
}
