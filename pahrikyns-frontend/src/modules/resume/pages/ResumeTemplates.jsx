import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TEMPLATE_REGISTRY } from "../templates/templateRegistry";

/** ========================================================
 * RESUME TEMPLATES — PRO VERSION (v1)
 * Premium Template Selection Page
 * - Free vs Pro lock
 * - Thumbnail previews
 * - Resume.io style grid
 * ======================================================== */

export default function ResumeTemplates() {
  const navigate = useNavigate();

  const selectTemplate = (template) => {
    if (template.type === "pro") {
      navigate(`/upgrade`);
      return;
    }
    navigate(`/resume/builder/personal?template=${template.id}`);
  };

  return (
    <Box className="min-h-screen bg-gray-50 p-6 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center">Choose a Resume Template</h1>

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {TEMPLATE_REGISTRY.map((tpl) => (
          <Box
            key={tpl.id}
            className="bg-white shadow rounded-xl overflow-hidden border hover:shadow-lg transition cursor-pointer"
            onClick={() => selectTemplate(tpl)}
          >
            {/* Thumbnail */}
            <Box className="w-full h-60 bg-gray-200">
              {/* Real app: replace with <img src={tpl.thumbnail} /> */}
            </Box>

            <Box className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold">{tpl.name}</h3>

              {tpl.type === "pro" && (
                <span className="text-sm text-purple-600 font-medium">PRO TEMPLATE</span>
              )}

              <Button variant="contained" fullWidth>
                Use Template
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
