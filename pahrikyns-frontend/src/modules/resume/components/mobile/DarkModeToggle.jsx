import React from "react";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDarkMode } from "../../context/DarkModeContext";

/** ========================================================
 * DARK MODE TOGGLE — PRO VERSION (v1)
 * - One tap theme switch
 * - Works with global DarkModeContext
 * - Perfect for mobile + desktop
 * ======================================================== */

export default function DarkModeToggle() {
  const { dark, toggle } = useDarkMode();

  return (
    <IconButton
      onClick={toggle}
      className="lg:hidden fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 shadow-xl rounded-full"
    >
      {dark ? (
        <LightModeIcon className="text-yellow-400" />
      ) : (
        <DarkModeIcon className="text-gray-700" />
      )}
    </IconButton>
  );
}
