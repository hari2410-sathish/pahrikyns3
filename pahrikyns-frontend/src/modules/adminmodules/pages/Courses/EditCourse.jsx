// src/pages/Admin/Courses/EditCourse.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Button,
  Chip,
  Stack,
  Snackbar,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAdminCourseById,
  updateAdminCourse,
} from "../../Adminapi/coursesAdmin";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    level: "Beginner",
    price: "",
    discountPrice: "",
    durationHours: "",
    thumbnailUrl: "",
    shortDescription: "",
    description: "",
    tagsInput: "",
    tags: [],
    isActive: true,
  });

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ===========================
  // LOAD COURSE
  // ===========================
  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminCourseById(courseId);
        const course = data.course || data;

        setForm({
          title: course.title || "",
          slug: course.slug || "",
          category: course.category || "",
          level: course.level || "Beginner",
          price: course.price || "",
          discountPrice: course.discountPrice || "",
          durationHours: course.durationHours || "",
          thumbnailUrl: course.thumbnailUrl || "",
          shortDescription: course.shortDescription || "",
          description: course.description || "",
          tagsInput: "",
          tags: course.tags || [],
          isActive: course.isActive !== false,
        });
      } catch (err) {
        console.error(err);
        showToast("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  // ===========================
  // HELPERS
  // ===========================
  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "title" && !prev.slug
        ? { slug: slugify(value) }
        : {}),
    }));
  };

  const handleToggleActive = (e) => {
    setForm((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const raw = form.tagsInput.trim();
    if (!raw) return;

    const parts = raw.split(",").map((t) => t.trim());
    const unique = Array.from(new Set([...form.tags, ...parts])).filter(
      Boolean
    );

    setForm((prev) => ({ ...prev, tags: unique, tagsInput: "" }));
  };

  const handleRemoveTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const estimatedLessons = useMemo(() => {
    const hrs = Number(form.durationHours || 0);
    if (!hrs) return "-";
    const min = Math.max(hrs * 4, 1);
    const max = hrs * 6;
    return `${min}-${max} lessons (approx)`;
  }, [form.durationHours]);

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.slug.trim()) return "Slug is required";
    if (!form.shortDescription.trim())
      return "Short description is required";
    if (!form.price) return "Price is required";

    if (form.discountPrice && Number(form.discountPrice) > Number(form.price)) {
      return "Discount price cannot be greater than price";
    }

    return null;
  };

  // ===========================
  // SUBMIT
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      showToast(error, "error");
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      category: form.category,
      level: form.level,
      price: Number(form.price),
      discountPrice: form.discountPrice
        ? Number(form.discountPrice)
        : undefined,
      durationHours: form.durationHours
        ? Number(form.durationHours)
        : undefined,
      thumbnailUrl: form.thumbnailUrl || undefined,
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      tags: form.tags,
      isActive: form.isActive,
    };

    try {
      setSubmitting(true);
      await updateAdminCourse(courseId, payload);
      showToast("Course updated successfully", "success");
      setTimeout(() => navigate("/admin/courses"), 600);
    } catch (err) {
      console.error(err);
      showToast("Failed to update course");
    } finally {
      setSubmitting(false);
    }
  };

  // ===========================
  // LOADING STATE
  // ===========================
  if (loading) {
    return (
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Edit Course
          </Typography>
          <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
            Update course details, pricing & visibility
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={form.isActive}
              onChange={handleToggleActive}
              color="success"
            />
          }
          label={form.isActive ? "Active" : "Disabled"}
        />
      </Box>

      {/* MAIN FORM */}
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          background: "rgba(15,23,42,0.95)",
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.25)",
        }}
      >
        <Grid container spacing={3}>
          {/* LEFT */}
          <Grid item xs={12} md={8}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>
              Course Info
            </Typography>

            <TextField
              label="Course Title *"
              fullWidth
              margin="normal"
              value={form.title}
              onChange={handleChange("title")}
            />

            <TextField
              label="Slug *"
              fullWidth
              margin="normal"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  slug: slugify(e.target.value),
                }))
              }
            />

            <TextField
              label="Short Description *"
              fullWidth
              margin="normal"
              multiline
              minRows={2}
              value={form.shortDescription}
              onChange={handleChange("shortDescription")}
            />

            <TextField
              label="Detailed Description"
              fullWidth
              margin="normal"
              multiline
              minRows={6}
              value={form.description}
              onChange={handleChange("description")}
            />
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>
              Meta & Pricing
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={form.category}
                onChange={handleChange("category")}
              >
                <MenuItem value="devops">DevOps</MenuItem>
                <MenuItem value="aws">AWS</MenuItem>
                <MenuItem value="cloud">Cloud</MenuItem>
                <MenuItem value="linux">Linux</MenuItem>
                <MenuItem value="programming">Programming</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Level</InputLabel>
              <Select
                label="Level"
                value={form.level}
                onChange={handleChange("level")}
              >
                {LEVELS.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Price (₹) *"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={form.price}
                  onChange={handleChange("price")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Discount (₹)"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={form.discountPrice}
                  onChange={handleChange("discountPrice")}
                />
              </Grid>
            </Grid>

            <TextField
              label="Duration (hours)"
              type="number"
              fullWidth
              margin="normal"
              value={form.durationHours}
              onChange={handleChange("durationHours")}
              helperText={estimatedLessons}
            />

            <TextField
              label="Thumbnail URL"
              fullWidth
              margin="normal"
              value={form.thumbnailUrl}
              onChange={handleChange("thumbnailUrl")}
            />

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: 600, mb: 1 }}>Tags</Typography>

            <Stack
              direction="row"
              spacing={1}
              component="form"
              onSubmit={handleAddTag}
            >
              <TextField
                size="small"
                placeholder="Add tags (comma separated)"
                value={form.tagsInput}
                onChange={handleChange("tagsInput")}
                fullWidth
              />
              <Button type="submit" variant="outlined">
                Add
              </Button>
            </Stack>

            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {form.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* FOOTER */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/courses")}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? "Updating..." : "Update Course"}
          </Button>
        </Stack>
      </Paper>

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
