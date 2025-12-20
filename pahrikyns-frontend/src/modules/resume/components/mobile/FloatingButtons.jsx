import React from "react";
import { Box, Fab } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import ExportPDFButton from "../common/ExportPDFButton";
import { hapticMedium } from "../../utils/haptics";

/** ========================================================
 * FLOATING ACTION BUTTONS — PRO VERSION (v1)
 * Mobile-only FAB group
 * - Export PDF
 * - Change Template
 * - Save Resume (UI only)
 * ======================================================== */

export default function FloatingButtons() {
  const navigate = useNavigate();

  return (
    <Box className="fixed bottom-20 right-4 flex flex-col gap-3 z-50 lg:hidden">
      {/* EXPORT FAB */}
      <Box>
        <ExportPDFButton>
          <Fab color="primary">
            <PictureAsPdfIcon />
          </Fab>
        </ExportPDFButton>
      </Box>

      {/* CHANGE TEMPLATE */}
      <Fab
        color="secondary"
        onClick={() => navigate("/resume/templates")}
      >
        <ColorLensIcon />
      </Fab>

      {/* SAVE BUTTON (UI only for now) */}
      <Fab
        color="success"
        onClick={() => alert("Resume saved (UI mock)")}
      >
        <SaveIcon />
        onClick={() => {
  hapticMedium();
  navigate("/resume/templates");
}}
onClick={() => {
  hapticMedium();
  alert("Resume saved");
}}

      </Fab>
    </Box>
  );
}
