import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import {
  fetchTwoFAStatus,
  enableTwoFA,
  disableTwoFA,
} from "../../Adminapi/settingsAdmin";
export default function TwoFA() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    fetchTwoFAStatus().then((d) => setEnabled(d.enabled));
  }, []);

  const toggle = async () => {
    if (enabled) {
      await disableTwoFA();
    } else {
      await enableTwoFA();
    }
    const d = await fetchTwoFAStatus();
    setEnabled(d.enabled);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
        Two Factor Authentication
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 420 }}>
        <Typography sx={{ mb: 2 }}>
          Status: {enabled ? "Enabled" : "Disabled"}
        </Typography>

        <Button
          variant="contained"
          color={enabled ? "error" : "success"}
          onClick={toggle}
        >
          {enabled ? "Disable 2FA" : "Enable 2FA"}
        </Button>
      </Paper>
    </Box>
  );
}
