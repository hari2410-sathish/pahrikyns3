import React, { useState, useEffect } from "react";
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

export default function EditStudentModal({ open, onClose, student, onUpdate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    status: "active",
    progress: 0,
  });

  // Load selected student into form
  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || "",
        email: student.email || "",
        course: student.course || "",
        status: student.status || "active",
        progress: student.progress || 0,
      });
    }
  }, [student]);

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return;

    onUpdate({
      ...student,
      name: form.name.trim(),
      email: form.email.trim(),
      course: form.course.trim(),
      status: form.status,
      progress: Number(form.progress),
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(0,255,255,0.3)",
          color: "white",
          minWidth: 450,
          borderRadius: 4,
          boxShadow: "0 0 25px rgba(0,255,255,0.4)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 900, color: "#00eaff", fontSize: "22px" }}>
        Edit Student
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Full Name"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
            sx={{
              input: { color: "white" },
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "#00eaff" },
            }}
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange("email")}
            fullWidth
            sx={{
              input: { color: "white" },
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "#00eaff" },
            }}
          />

          <TextField
            label="Course"
            value={form.course}
            onChange={handleChange("course")}
            fullWidth
            sx={{
              input: { color: "white" },
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "#00eaff" },
            }}
          />

          <TextField
            select
            label="Status"
            value={form.status}
            onChange={handleChange("status")}
            fullWidth
            sx={{
              color: "white",
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "#00eaff" },
            }}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
            <MenuItem value="graduated">Graduated</MenuItem>
          </TextField>

          <TextField
            type="number"
            label="Progress (%)"
            value={form.progress}
            onChange={handleChange("progress")}
            fullWidth
            sx={{
              input: { color: "white" },
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "#00eaff" },
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ color: "#94a3b8" }}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "#020617",
            px: 3,
            borderRadius: "999px",
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
