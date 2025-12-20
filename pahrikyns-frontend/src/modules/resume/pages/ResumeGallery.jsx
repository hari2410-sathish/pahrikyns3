import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

/** ========================================================
 * RESUME GALLERY — PRO VERSION (v1)
 * Displays all saved resumes in a clean grid
 * Edit • Delete • Create New
 * ======================================================== */

export default function ResumeGallery() {
  const navigate = useNavigate();
  const { state } = useResume();

  // Example placeholder for saved resumes
  const savedResumes = state.saved || [];

  return (
    <Box className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      <Box className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Resumes</h1>
        <Button
          variant="contained"
          onClick={() => navigate("/resume/builder/personal")}
        >
          Create New Resume
        </Button>
      </Box>

      {/* Empty State */}
      {savedResumes.length === 0 && (
        <Box className="text-center text-gray-600 py-20">
          <p className="mb-4">You haven't created any resumes yet.</p>
          <Button
            variant="contained"
            onClick={() => navigate("/resume/builder/personal")}
          >
            Create Your First Resume
          </Button>
        </Box>
      )}

      {/* Resume Grid */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedResumes.map((resume, i) => (
          <Box
            key={i}
            className="bg-white shadow rounded-xl p-4 flex flex-col gap-4"
          >
            <Box className="w-full h-40 bg-gray-200 rounded-lg" />

            <h3 className="font-semibold">{resume.title || "Untitled Resume"}</h3>

            <Box className="flex gap-2">
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(`/resume/builder/personal?id=${resume.id}`)}
              >
                Edit
              </Button>
              <Button variant="outlined" color="error" fullWidth>
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
