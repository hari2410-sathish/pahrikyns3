import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

export default function AddStudentModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    enrolled: "",
    status: "Active",
  });

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return;

    onAdd({
      name: form.name,
      email: form.email,
      enrolled: Number(form.enrolled) || 0,
      status: form.status,
    });

    setForm({
      name: "",
      email: "",
      enrolled: "",
      status: "Active",
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(0,255,255,0.3)",
          boxShadow: "0 0 25px rgba(0,255,255,0.4)",
          color: "white",
          borderRadius: 3,
          minWidth: 450,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, color: "#00eaff" }}>
        Add New Student
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Full Name"
            placeholder="Enter student's name"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
            sx={{ input: { color: "white" } }}
          />

          <TextField
            label="Email"
            placeholder="example@mail.com"
            value={form.email}
            onChange={handleChange("email")}
            fullWidth
            sx={{ input: { color: "white" } }}
          />

          <TextField
            label="Courses Enrolled"
            type="number"
            value={form.enrolled}
            onChange={handleChange("enrolled")}
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={form.status}
            onChange={handleChange("status")}
            fullWidth
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ color: "#94a3b8" }}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "#020617",
            px: 3,
            borderRadius: "999px",
            boxShadow: "0 0 15px rgba(0,234,255,0.4)",
            "&:hover": { boxShadow: "0 0 25px rgba(123,63,228,0.6)" },
          }}
        >
          Add Student
        </Button>
      </DialogActions>
    </Dialog>
  );
}
