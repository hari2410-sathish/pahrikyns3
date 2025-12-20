import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { getCourseById, getStudents } from "../../api/fakeAdminAPI";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);

  // Load course + students
  useEffect(() => {
    async function load() {
      const c = await getCourseById(courseId);
      const s = await getStudents();

      setCourse(c);
      setStudents(s.filter((stu) => stu.enrolled > 0)); // just sample logic
    }
    load();
  }, [courseId]);

  if (!course) return <Typography sx={{ color: "white", p: 4 }}>Loading...</Typography>;

  return (
    <Box sx={{ p: 4, color: "white" }}>
      {/* BACK BUTTON */}
      <Button
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          textTransform: "none",
          color: "#00eaff",
          border: "1px solid rgba(0,255,255,0.4)",
          px: 2,
          borderRadius: "999px",
          "&:hover": { background: "rgba(0,255,255,0.1)" },
        }}
      >
        ← Back to Courses
      </Button>

      {/* HEADER */}
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 900,
          mb: 1,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {course.title}
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <Chip label={course.category} sx={chipStyle} />
        <Chip label={course.level} sx={chipStyle} />
        <Chip
          label={course.status}
          sx={{
            ...chipStyle,
            borderColor: course.status === "Published" ? "#4ade80" : "#facc15",
            color: course.status === "Published" ? "#4ade80" : "#facc15",
          }}
        />
      </Stack>

      {/* EDIT BUTTON */}
      <Button
        onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
        sx={{
          textTransform: "none",
          fontWeight: 700,
          px: 3,
          py: 1,
          mb: 4,
          borderRadius: "999px",
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          color: "#020617",
          boxShadow: "0 0 18px rgba(0,255,255,0.4)",
          "&:hover": {
            boxShadow: "0 0 30px rgba(123,63,228,0.6)",
          },
        }}
      >
        Edit Course
      </Button>

      <Stack spacing={4}>
        {/* LESSONS SECTION */}
        <Paper sx={sectionStyle}>
          <Typography sx={sectionTitle}>Lessons</Typography>
          <Divider sx={dividerStyle} />

          <List>
            {[...Array(course.lessons || 0)].map((_, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`Lesson ${i + 1}`}
                  sx={{ color: "white" }}
                />
              </ListItem>
            ))}
          </List>

          {course.lessons === 0 && (
            <Typography sx={{ opacity: 0.6 }}>No lessons added.</Typography>
          )}
        </Paper>

        {/* ENROLLED STUDENTS SECTION */}
        <Paper sx={sectionStyle}>
          <Typography sx={sectionTitle}>Enrolled Students</Typography>
          <Divider sx={dividerStyle} />

          <List>
            {students.map((stu) => (
              <ListItem key={stu.id}>
                <ListItemText
                  primary={stu.name}
                  secondary={stu.email}
                  sx={{
                    "& .MuiListItemText-primary": { color: "white" },
                    "& .MuiListItemText-secondary": { color: "#94a3b8" },
                  }}
                />
              </ListItem>
            ))}
          </List>

          {students.length === 0 && (
            <Typography sx={{ opacity: 0.6 }}>No students enrolled yet.</Typography>
          )}
        </Paper>
      </Stack>
    </Box>
  );
}

/* -------------------- Styles -------------------- */

const sectionStyle = {
  p: 3,
  borderRadius: 3,
  background: "rgba(10,20,40,0.85)",
  border: "1px solid rgba(0,255,255,0.25)",
  boxShadow: "0 0 20px rgba(0,255,255,0.2)",
};

const sectionTitle = {
  fontSize: 22,
  fontWeight: 800,
  mb: 1,
  color: "#00eaff",
};

const dividerStyle = { borderColor: "rgba(0,255,255,0.25)", mb: 2 };

const chipStyle = {
  background: "rgba(0,255,255,0.1)",
  border: "1px solid rgba(0,255,255,0.4)",
  color: "#00eaff",
  fontWeight: 700,
};
