import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import PersonalForm from "./PersonalForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectForm from "./ProjectForm";
import ResumeHistory from "../common/ResumeHistory";

/** ========================================================
 * RESUME FORM (MASTER CONTROLLER) — PRO VERSION (v1)
 * Handles all form routing & rendering
 * Clean • Scalable • Resume.io Workflow
 * ======================================================== */

export default function ResumeForm() {
  const { section } = useParams();

  const renderSection = () => {
    switch (section) {
      case "personal":
        return <PersonalForm />;
      case "experience":
        return <ExperienceForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectForm />;
      default:
        return <PersonalForm />;
    }
  };

  return (
    <Box className="flex flex-col gap-6">
      {/* Undo / Redo Controller */}
      <ResumeHistory />

      {/* Active Form */}
      <Box className="bg-white rounded-lg p-6 shadow-md border">
        {renderSection()}
      </Box>
    </Box>
  );
}
