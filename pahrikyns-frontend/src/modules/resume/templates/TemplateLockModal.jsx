import React from "react";
import { Box, Button, Modal } from "@mui/material";

/** ========================================================
 * TEMPLATE LOCK MODAL — PRO VERSION (v1)
 * Shown when user selects a PRO template without subscription
 * Clean • Minimal • Conversion-focused
 * ======================================================== */

export default function TemplateLockModal({ open, onClose, onUpgrade }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">
          Unlock PRO Templates
        </h2>

        <p className="text-center text-gray-600 leading-relaxed">
          This is a premium template. Upgrade your plan to access all PRO
          resume designs.
        </p>

        <Box className="flex flex-col gap-3">
          <Button variant="contained" color="primary" onClick={onUpgrade}>
            Upgrade Now
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
