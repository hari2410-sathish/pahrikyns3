import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import {
  fetchAdminProfile,
  updateAdminProfile,
} from "../../Adminapi/settingsAdmin";

export default function AdminProfile() {
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchAdminProfile().then((d) => setForm(d.admin || d));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAdminProfile(form);
    alert("Profile updated");
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
        Admin Profile
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 420 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={form.email}
            disabled
          />

          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
