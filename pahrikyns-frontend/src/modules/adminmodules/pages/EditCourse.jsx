import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Paper,
} from "@mui/material";

export default function EditCourse() {
  const { courseId } = useParams();

  const [course, setCourse] = useState({
    title: "",
    category: "",
    description: "",
    level: "",
    image: "",
  });

  // Simulated fetch (replace with API later)
  useEffect(() => {
    setCourse({
      title: "AWS EC2 Mastery",
      category: "Cloud",
      description: "Learn EC2 deeply with practical scenarios.",
      level: "Intermediate",
      image: "https://example.com/ec2.jpg",
    });
  }, [courseId]);

  const handleChange = (field) => (e) => {
    setCourse((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated:", course);
    alert("Course updated successfully!");
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 700,
        mx: "auto",
        color: "white",
      }}
    >
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 900,
          mb: 3,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Edit Course
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(10,20,40,0.8)",
          border: "1px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 25px rgba(0,255,255,0.15)",
        }}
      >
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <TextField
            label="Course Title"
            value={course.title}
            onChange={handleChange("title")}
            fullWidth
            sx={{ input: { color: "white" }, label: { color: "#94a3b8" } }}
          />

          <TextField
            label="Category"
            select
            value={course.category}
            onChange={handleChange("category")}
            fullWidth
          >
            <MenuItem value="Cloud">Cloud</MenuItem>
            <MenuItem value="DevOps">DevOps</MenuItem>
            <MenuItem value="Linux">Linux</MenuItem>
          </TextField>

          <TextField
            label="Description"
            multiline
            minRows={4}
            value={course.description}
            onChange={handleChange("description")}
            fullWidth
            sx={{ textarea: { color: "white" } }}
          />

          <TextField
            label="Level"
            select
            value={course.level}
            onChange={handleChange("level")}
            fullWidth
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>

          <TextField
            label="Image URL"
            value={course.image}
            onChange={handleChange("image")}
            fullWidth
            sx={{ input: { color: "white" } }}
          />

          <Button
            type="submit"
            sx={{
              mt: 1,
              textTransform: "none",
              fontWeight: 700,
              px: 4,
              py: 1.4,
              borderRadius: "999px",
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#020617",
              fontSize: 16,
              boxShadow: "0 0 20px rgba(0,255,255,0.4)",
              "&:hover": {
                boxShadow: "0 0 32px rgba(123,63,228,0.6)",
              },
            }}
          >
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
