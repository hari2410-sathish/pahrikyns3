import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setOpen(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
        right: 20,
        maxWidth: 520,
        mx: "auto",
        p: 3,
        borderRadius: 4,
        backdropFilter: "blur(18px)",
        background:
          "linear-gradient(135deg, rgba(0,234,255,0.22), rgba(123,63,228,0.22))",
        border: "1px solid rgba(0,234,255,0.4)",
        boxShadow: "0 0 25px rgba(0,234,255,0.6)",
        zIndex: 9999,
      }}
    >
      <Typography fontWeight={900} fontSize={16}>
        🍪 Privacy & Cookies
      </Typography>
      <Typography fontSize={13} opacity={0.85} my={1}>
        We use cookies for analytics, security and performance improvements.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          onClick={acceptCookies}
          sx={{
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "black",
            fontWeight: 900,
          }}
        >
          Accept
        </Button>
        <Button variant="outlined">Settings</Button>
      </Stack>
    </Box>
  );
}
