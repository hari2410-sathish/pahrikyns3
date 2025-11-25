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

export default function AddCourseModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    category: "Cloud",
    level: "Beginner",
    lessons: "",
    students: 0,
  });

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onAdd({
      title: form.title,
      category: form.category,
      level: form.level,
      lessons: Number(form.lessons) || 0,
      students: Number(form.students) || 0,
    });
    setForm({
      title: "",
      category: "Cloud",
      level: "Beginner",
      lessons: "",
      students: 0,
    });
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
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, color: "#00eaff" }}>
        Add New Course
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Course Title"
            value={form.title}
            onChange={handleChange("title")}
            fullWidth
            sx={{ input: { color: "white" }, label: { color: "#94a3b8" } }}
          />
          <TextField
            select
            label="Category"
            value={form.category}
            onChange={handleChange("category")}
            fullWidth
          >
            <MenuItem value="Cloud">Cloud</MenuItem>
            <MenuItem value="DevOps">DevOps</MenuItem>
            <MenuItem value="Linux">Linux</MenuItem>
          </TextField>
          <TextField
            select
            label="Level"
            value={form.level}
            onChange={handleChange("level")}
            fullWidth
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>
          <TextField
            label="Number of Lessons"
            type="number"
            value={form.lessons}
            onChange={handleChange("lessons")}
            fullWidth
          />
          <TextField
            label="Initial Students (optional)"
            type="number"
            value={form.students}
            onChange={handleChange("students")}
            fullWidth
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
            textTransform: "none",
            fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "#020617",
            px: 3,
            borderRadius: "999px",
          }}
        >
          Add Course
        </Button>
      </DialogActions>
    </Dialog>
  );
}
