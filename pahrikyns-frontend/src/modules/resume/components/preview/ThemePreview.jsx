import React from "react";
import { Box } from "@mui/material";

/** ========================================================
 * THEME PREVIEW — PRO VERSION (v1)
 * Small mini-preview card for templates/themes
 * Used in gallery or theme chooser
 * Clean + minimal
 * ======================================================== */

export default function ThemePreview({ thumbnail, name, onClick }) {
  return (
    <Box
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition border overflow-hidden flex flex-col"
    >
      {/* Thumbnail (placeholder div; replace with <img> if needed) */}
      <Box className="w-full h-40 bg-gray-200 flex items-center justify-center">
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 text-sm">Preview</span>
        )}
      </Box>

      {/* Title */}
      <Box className="p-3 text-center border-t">
        <p className="font-medium text-gray-800 text-sm">{name}</p>
      </Box>
    </Box>
  );
}
