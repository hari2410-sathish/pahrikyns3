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
  FormControlLabel,
  Switch,
} from "@mui/material";

const fieldSX = {
  "& .MuiInputBase-input": { color: "#e5f9ff" },
  "& .MuiInputLabel-root": { color: "#7dd3fc" },
  "& .MuiOutlinedInput-root": {
    background: "rgba(2,10,20,0.85)",
    "& fieldset": { borderColor: "rgba(0,234,255,0.35)" },
    "&:hover fieldset": { borderColor: "#00eaff" },
    "&.Mui-focused fieldset": {
      borderColor: "#7b3fe4",
      borderWidth: 2,
    },
  },
};

export default function AddCourseModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Cloud",
    level: "Beginner",
    lessons: "",
    students: 0,
    price: "",
    discountPrice: "",
    duration: "",
    status: "Draft",
    thumbnail: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ image validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    setForm((prev) => ({ ...prev, thumbnail: file }));
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Prevent memory leak from object URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleToggleStatus = (e) => {
    setForm((prev) => ({
      ...prev,
      status: e.target.checked ? "Published" : "Draft",
    }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert("Course title is required");
      return;
    }

    if (!form.lessons) {
      alert("Number of lessons is required");
      return;
    }

    // ✅ SEND AS FormData (for thumbnail upload)
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("category", form.category);
    fd.append("level", form.level);
    fd.append("lessons", Number(form.lessons) || 0);
    fd.append("students", Number(form.students) || 0);
    fd.append("price", Number(form.price) || 0);
    fd.append("discountPrice", Number(form.discountPrice) || 0);
    fd.append("duration", Number(form.duration) || 0);
    fd.append("status", form.status);

    if (form.thumbnail) {
      fd.append("thumbnail", form.thumbnail);
    }

    onAdd(fd);

    // ✅ reset safely
    setForm({
      title: "",
      description: "",
      category: "Cloud",
      level: "Beginner",
      lessons: "",
      students: 0,
      price: "",
      discountPrice: "",
      duration: "",
      status: "Draft",
      thumbnail: null,
    });

    setPreview(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "linear-gradient(180deg,#020617,#020617)",
          border: "1px solid rgba(0,255,255,0.4)",
          boxShadow: "0 0 30px rgba(0,255,255,0.45)",
          color: "white",
          borderRadius: 3,
          minWidth: 460,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 900, color: "#00eaff" }}>
        Add New Course
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.2} mt={1}>
          <TextField
            label="Course Title"
            value={form.title}
            onChange={handleChange("title")}
            fullWidth
            sx={fieldSX}
          />

          <TextField
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            rows={3}
            sx={fieldSX}
          />

          <TextField
            select
            label="Category"
            value={form.category}
            onChange={handleChange("category")}
            fullWidth
            sx={fieldSX}
          >
            <MenuItem value="Cloud">Cloud</MenuItem>
            <MenuItem value="DevOps">DevOps</MenuItem>
            <MenuItem value="Linux">Linux</MenuItem>
            <MenuItem value="Security">Security</MenuItem>
            <MenuItem value="FullStack">Full Stack</MenuItem>
          </TextField>

          <TextField
            select
            label="Level"
            value={form.level}
            onChange={handleChange("level")}
            fullWidth
            sx={fieldSX}
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
            sx={fieldSX}
          />

          <TextField
            label="Initial Students"
            type="number"
            value={form.students}
            onChange={handleChange("students")}
            fullWidth
            sx={fieldSX}
          />

          <TextField
            label="Course Price (₹)"
            type="number"
            value={form.price}
            onChange={handleChange("price")}
            fullWidth
            sx={fieldSX}
          />

          <TextField
            label="Discount Price (₹)"
            type="number"
            value={form.discountPrice}
            onChange={handleChange("discountPrice")}
            fullWidth
            sx={fieldSX}
          />

          <TextField
            label="Duration (Hours)"
            type="number"
            value={form.duration}
            onChange={handleChange("duration")}
            fullWidth
            sx={fieldSX}
          />

          {/* ✅ THUMBNAIL UPLOAD */}
          <Button
            variant="outlined"
            component="label"
            sx={{
              color: "#00eaff",
              borderColor: "#00eaff",
              "&:hover": { borderColor: "#7b3fe4" },
            }}
          >
            Upload Thumbnail
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: 10,
                marginTop: 10,
                border: "1px solid rgba(0,255,255,0.4)",
              }}
            />
          )}

          {/* ✅ STATUS */}
          <FormControlLabel
            sx={{ color: "#7dd3fc" }}
            control={
              <Switch
                checked={form.status === "Published"}
                onChange={handleToggleStatus}
              />
            }
            label={form.status}
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
            fontWeight: 800,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "#020617",
            px: 3,
            borderRadius: "999px",
            boxShadow: "0 0 20px rgba(0,234,255,0.6)",
          }}
        >
          Add Course
        </Button>
      </DialogActions>
    </Dialog>
  );
}
