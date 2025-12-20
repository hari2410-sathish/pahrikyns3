import React from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../components/mobile/MobileHeader";
import { hapticPattern } from "../../utils/haptics";

/** ========================================================
 * MOBILE HEADER — PRO VERSION (v1)
 * Sticky top header for mobile builder
 * - Back Button
 * - Title / Current Mode
 * - Minimal clean UI
 * ======================================================== */

export default function MobileHeader({ tab, setTab }) {
  const navigate = useNavigate();

  

  return (
    <Box className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white border-b p-3 flex items-center justify-between shadow-sm">
      {/* BACK BUTTON */}
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      {/* TITLE */}
      <Box className="flex flex-col items-center -ml-6">
        <span className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <DescriptionIcon fontSize="small" />
          Resume Builder
        </span>
        <span className="text-xs text-gray-500">
          {tab === "form" ? "Editing" : "Preview"}
        </span>
      </Box>

      {/* MODE TOGGLE BUTTON */}
      <button
        onClick={() => setTab(tab === "form" ? "preview" : "form")}
        className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
      >
        {tab === "form" ? "Preview" : "Edit"}
      </button>
onClick={() => {
  hapticPattern();
  setTab(tab === "form" ? "preview" : "form");
}}

    </Box>
  );
}
