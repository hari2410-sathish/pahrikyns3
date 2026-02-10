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

import axios from "../../api/axios";
import RazorpayButton from "../../components/common/RazorpayButton";
import { useAuth } from "../../contexts/AuthContext";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loadingAccess, setLoadingAccess] = useState(true);

  // Load course
  useEffect(() => {
    async function loadCourse() {
      const { data } = await axios.get(`/courses/${courseId}`);
      setCourse(data);
    }
    loadCourse();
  }, [courseId]);

  // Check access logic
  useEffect(() => {
    async function checkAccess() {
      if (!course) return;

      // ✅ Free Course Check
      if (course.price === 0) {
        setHasAccess(true);
        setLoadingAccess(false);
        return;
      }

      // ❌ Not logged in
      if (!user) {
        setHasAccess(false);
        setLoadingAccess(false);
        return;
      }

      // 🔐 Intermediate / Advanced → check backend
      try {
        const { data } = await axios.get(
          `/courses/${courseId}/access`
        );
        setHasAccess(data.access);
      } catch {
        setHasAccess(false);
      } finally {
        setLoadingAccess(false);
      }
    }

    checkAccess();
  }, [course, user, courseId]);

  if (!course || loadingAccess) {
    return <Typography sx={{ color: "white", p: 4 }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 4, color: "white" }}>
      {/* BACK */}
      <Button onClick={() => navigate(-1)} sx={backBtn}>
        ← Back to Courses
      </Button>

      {/* HEADER */}
      <Typography sx={titleStyle}>{course.title}</Typography>

      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <Chip label={course.category} sx={chipStyle} />
        <Chip label={course.level} sx={chipStyle} />

        {/* SHARE BUTTON */}
        <Button
          size="small"
          sx={{ color: '#00eaff', borderColor: '#00eaff' }}
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }}
        >
          Share
        </Button>
      </Stack>

      {/* 🔐 ACCESS CONTROL */}
      {!hasAccess ? (
        <Paper sx={lockedBox}>
          <Typography sx={{ fontSize: 20, fontWeight: 800, mb: 1 }}>
            🔒 Course Locked
          </Typography>

          <Typography sx={{ fontSize: 16, mb: 3 }}>
            {course.price > 0
              ? `Price: ₹${course.price.toLocaleString("en-IN")}`
              : "Free Course"
            }
          </Typography>

          {!user ? (
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Login to Enroll
            </Button>
          ) : course.price === 0 ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => setHasAccess(true)} // TODO: Call enroll API
            >
              Enroll Now
            </Button>
          ) : (
            <RazorpayButton
              courseId={course.id}
              courseTitle={course.title}
              user={user}
              onSuccess={() => setHasAccess(true)}
            />
          )}
        </Paper>
      ) : (
        <Paper sx={sectionStyle}>
          <Typography sx={sectionTitle}>Lessons</Typography>
          <Divider sx={dividerStyle} />

          <List>
            {[...Array(course.lessons || 0)].map((_, i) => (
              <ListItem
                key={i}
                button
                onClick={() =>
                  navigate(`/courses/${courseId}/lesson/${i + 1}`)
                }
              >
                <ListItemText
                  primary={`Lesson ${i + 1}`}
                  sx={{ color: "white" }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* RESOURCES SECTION (For Enrolled Users) */}
      {hasAccess && (
        <Paper sx={{ ...sectionStyle, mt: 3 }}>
          <Typography sx={sectionTitle}>Course Resources</Typography>
          <Divider sx={dividerStyle} />
          <Button variant="contained" size="small" color="primary" onClick={() => alert("Downloading resources...")}>
            Download Source Code
          </Button>
        </Paper>
      )}
    </Box>
  );
}

/* -------------------- Styles -------------------- */

const backBtn = {
  mb: 3,
  textTransform: "none",
  color: "#00eaff",
  border: "1px solid rgba(0,255,255,0.4)",
  px: 2,
  borderRadius: "999px",
};

const titleStyle = {
  fontSize: 32,
  fontWeight: 900,
  mb: 1,
  background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const sectionStyle = {
  p: 3,
  borderRadius: 3,
  background: "rgba(10,20,40,0.85)",
  border: "1px solid rgba(0,255,255,0.25)",
};

const lockedBox = {
  p: 4,
  borderRadius: 3,
  textAlign: "center",
  background: "rgba(255,0,0,0.08)",
  border: "1px solid rgba(255,0,0,0.3)",
};

const sectionTitle = {
  fontSize: 22,
  fontWeight: 800,
  mb: 1,
  color: "#00eaff",
};

const dividerStyle = {
  borderColor: "rgba(0,255,255,0.25)",
  mb: 2,
};

const chipStyle = {
  background: "rgba(0,255,255,0.1)",
  border: "1px solid rgba(0,255,255,0.4)",
  color: "#00eaff",
  fontWeight: 700,
};
