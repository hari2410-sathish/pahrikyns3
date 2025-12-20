import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ResumePreview from "../components/preview/ResumePreview";

/** ========================================================
 * RESUME PUBLIC — PRO VERSION (v1)
 * Publicly shareable resume view
 * - Clean read‑only preview
 * - Share link: /resume/public/:id
 * ======================================================== */

export default function ResumePublic() {
  const { id } = useParams();

  return (
    <Box className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <Box className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full border">
        <h1 className="text-xl font-bold mb-4">Public Resume Preview</h1>
        <p className="text-gray-600 mb-6">Resume ID: {id}</p>

        {/* Read-only preview */}
        <ResumePreview readOnly />
      </Box>
    </Box>
  );
}
