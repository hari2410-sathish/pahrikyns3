import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";

import { getStudentById, updateStudent } from "../../api/fakeAdminAPI";

export default function StudentDetails() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  // Load student on mount
  useEffect(() => {
    async function load() {
      const data = await getStudentById(studentId);
      setStudent(data);
    }
    load();
  }, [studentId]);

  if (!student) {
    return (
      <Typography sx={{ color: "white", p: 4 }}>Loading...</Typography>
    );
  }

  const handleChange = (key) => (e) => {
    setStudent((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSave = async () => {
    await updateStudent(studentId, student);
    alert("Student updated successfully!");
  };

  return (
    <Box sx={{ p: 4, color: "white" }}>
      {/* Back Button */}
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
        ← Back to Students
      </Button>

      {/* Title */}
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
        Student Details
      </Typography>

      {/* MAIN CARD */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(10,20,40,0.85)",
          border: "1px solid rgba(0,255,255,0.25)",
          boxShadow: "0 0 20px rgba(0,255,255,0.2)",
        }}
      >
        <Stack spacing={3}>
          <TextField
            label="Full Name"
            value={student.name}
            onChange={handleChange("name")}
            fullWidth
            sx={{ input: { color: "white" }, label: { color: "#9ca3af" } }}
          />

          <TextField
            label="Email"
            value={student.email}
            onChange={handleChange("email")}
            fullWidth
            sx={{ input: { color: "white" } }}
          />

          <TextField
            label="Courses Enrolled"
            type="number"
            value={student.enrolled}
            onChange={handleChange("enrolled")}
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={student.status}
            onChange={handleChange("status")}
            fullWidth
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>

          <Divider sx={{ borderColor: "rgba(0,255,255,0.25)" }} />

          <Button
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
              color: "#020617",
              px: 4,
              py: 1.4,
              borderRadius: "999px",
              boxShadow: "0 0 20px rgba(0,255,255,0.4)",
              "&:hover": {
                boxShadow: "0 0 35px rgba(123,63,228,0.7)",
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
