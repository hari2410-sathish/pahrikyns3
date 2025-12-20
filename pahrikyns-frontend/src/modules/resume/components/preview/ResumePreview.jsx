import React from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getTemplateComponent } from "../../templates/templateRegistry";
import { useResume } from "../../context/ResumeContext";

/** ========================================================
 * RESUME PREVIEW — PRO VERSION (v1)
 * Loads correct template dynamically
 * Live preview engine for all templates
 * ======================================================== */

export default function ResumePreview({ readOnly = false }) {
  const { state } = useResume();
  const [params] = useSearchParams();

  // Default template if none selected
  const templateId = params.get("template") || "free-01";

  const Template = getTemplateComponent(templateId);

  if (!Template) {
    return <p className="text-red-600">Template not found.</p>;
  }

  return (
    <Box className="w-full">
      <Template readOnly={readOnly} />
    </Box>
  );
}
