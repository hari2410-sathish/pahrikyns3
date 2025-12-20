import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { useResume } from "../../context/ResumeContext";

/* ============================
   RESUME FORM
============================ */

export default function ResumeForm() {
  const { resume, updatePersonal, updateSection } = useResume();

  /* ---------- SKILLS ---------- */
  const addSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      updateSection("skills", [...resume.skills, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const removeSkill = (index) => {
    updateSection(
      "skills",
      resume.skills.filter((_, i) => i !== index)
    );
  };

  return (
    <Box>
      {/* ================= PERSONAL ================= */}
      <Typography fontWeight={700} mb={1}>
        Personal Details
      </Typography>

      <Stack spacing={1.5}>
        <TextField
          label="Full Name"
          size="small"
          value={resume.personal.fullName}
          onChange={(e) => updatePersonal("fullName", e.target.value)}
        />

        <TextField
          label="Title"
          size="small"
          value={resume.personal.title}
          onChange={(e) => updatePersonal("title", e.target.value)}
        />

        <TextField
          label="Email"
          size="small"
          value={resume.personal.email}
          onChange={(e) => updatePersonal("email", e.target.value)}
        />

        <TextField
          label="Phone"
          size="small"
          value={resume.personal.phone}
          onChange={(e) => updatePersonal("phone", e.target.value)}
        />

        <TextField
          label="Location"
          size="small"
          value={resume.personal.location}
          onChange={(e) => updatePersonal("location", e.target.value)}
        />

        <TextField
          label="Summary"
          size="small"
          multiline
          rows={3}
          value={resume.personal.summary}
          onChange={(e) => updatePersonal("summary", e.target.value)}
        />
      </Stack>

      {/* ================= SKILLS ================= */}
      <Typography fontWeight={700} mt={3} mb={1}>
        Skills
      </Typography>

      <TextField
        size="small"
        placeholder="Type skill & press Enter"
        onKeyDown={addSkill}
      />

      <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
        {resume.skills.map((skill, i) => (
          <Chip
            key={i}
            label={skill}
            onDelete={() => removeSkill(i)}
          />
        ))}
      </Stack>

      {/* ================= EXPERIENCE (PLACEHOLDER) ================= */}
      <Typography fontWeight={700} mt={3}>
        Experience
      </Typography>
      <Typography variant="body2" color="text.secondary">
        (Next step – dynamic experience form)
      </Typography>

      {/* ================= PROJECTS ================= */}
      <Typography fontWeight={700} mt={2}>
        Projects
      </Typography>
      <Typography variant="body2" color="text.secondary">
        (Next step)
      </Typography>

      {/* ================= EDUCATION ================= */}
      <Typography fontWeight={700} mt={2}>
        Education
      </Typography>
      <Typography variant="body2" color="text.secondary">
        (Next step)
      </Typography>
    </Box>
  );
}
