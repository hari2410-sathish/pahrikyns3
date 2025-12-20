import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SettingsHome() {
  const navigate = useNavigate();

  const cards = [
    { title: "Admin Profile", path: "/admin/settings/profile" },
    { title: "Change Password", path: "/admin/settings/password" },
    { title: "Two Factor Auth", path: "/admin/settings/2fa" },
    { title: "Active Sessions", path: "/admin/settings/sessions" },
    { title: "Security Logs", path: "/admin/settings/security-logs" },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
        Settings & Security
      </Typography>

      <Grid container spacing={3}>
        {cards.map((c) => (
          <Grid item xs={12} md={4} key={c.path}>
            <Paper
              onClick={() => navigate(c.path)}
              sx={{
                p: 3,
                cursor: "pointer",
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(148,163,184,0.25)",
                "&:hover": { borderColor: "cyan" },
              }}
            >
              <Typography fontWeight={800}>{c.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
