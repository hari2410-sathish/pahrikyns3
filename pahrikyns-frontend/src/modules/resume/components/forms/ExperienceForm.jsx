import React from "react";
import { Box, Button, TextField, Grid } from "@mui/material";
import { useResume } from "../../context/ResumeContext";

/** ========================================================
 * EXPERIENCE FORM — PRO VERSION (v1)
 * - Dynamic Add / Remove
 * - Clean resume.io style layout
 * - Instant state sync
 * ======================================================== */

export default function ExperienceForm() {
  const { state, update } = useResume();
  const experience = state.experience || [];

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    update({ experience: updated });
  };

  const addExperience = () => {
    update({
      experience: [
        ...experience,
        { role: "", company: "", start: "", end: "", description: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    update({ experience: updated });
  };

  return (
    <Box className="flex flex-col gap-6">
      {experience.map((exp, i) => (
        <Box
          key={i}
          className="border p-4 rounded-lg bg-white shadow-sm flex flex-col gap-4"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Role"
                value={exp.role || ""}
                onChange={(e) => handleChange(i, "role", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={exp.company || ""}
                onChange={(e) => handleChange(i, "company", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                value={exp.start || ""}
                onChange={(e) => handleChange(i, "start", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                value={exp.end || ""}
                onChange={(e) => handleChange(i, "end", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Description"
                value={exp.description || ""}
                onChange={(e) => handleChange(i, "description", e.target.value)}
              />
            </Grid>
          </Grid>

          <Button color="error" onClick={() => removeExperience(i)}>
            Remove Experience
          </Button>
        </Box>
      ))}

      <Button variant="contained" onClick={addExperience}>
        Add Experience
      </Button>
    </Box>
  );
}
