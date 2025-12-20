import React from "react";
import SyncIcon from "@mui/icons-material/Sync";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";

/** ========================================================
 * AUTOSAVE STATUS — PRO VERSION (v1)
 * Shows saving state: Saving… | Synced | Offline | Saved Offline
 * Can be used inside Navbar, Mobile Header, Builder UI
 * ======================================================== */

export default function AutosaveStatus({ status }) {
  const baseClass =
    "flex items-center gap-1 text-xs px-2 py-1 rounded-md select-none";

  if (status === "saving")
    return (
      <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>
        <SyncIcon fontSize="inherit" className="animate-spin" /> Saving…
      </span>
    );

  if (status === "synced")
    return (
      <span className={`${baseClass} bg-green-100 text-green-700`}>
        <CheckCircleIcon fontSize="inherit" /> Synced
      </span>
    );

  if (status === "offline")
    return (
      <span className={`${baseClass} bg-red-100 text-red-700`}>
        <CloudOffIcon fontSize="inherit" /> Offline
      </span>
    );

  if (status === "saved-offline")
    return (
      <span className={`${baseClass} bg-orange-100 text-orange-700`}>
        <SaveIcon fontSize="inherit" /> Saved Offline
      </span>
    );

  return null;
}