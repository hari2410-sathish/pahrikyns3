import React from "react";
import { Box, Button, TextField, Grid } from "@mui/material";
import { useResume } from "../../context/ResumeContext";

/** ========================================================
 * PROJECT FORM — PRO VERSION (v1)
 * - Add / Remove multiple projects
 * - Clean card UI
 * - GitHub + Live Link support
 * ======================================================== */

export default function ProjectForm() {
  const { state, update } = useResume();
  const projects = state.projects || [];

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    update({ projects: updated });
  };

  const addProject = () => {
    update({
      projects: [
        ...projects,
        { title: "", tech: "", description: "", github: "", link: "" },
      ],
    });
  };

  const removeProject = (index) => {
    update({ projects: projects.filter((_, i) => i !== index) });
  };

  return (
    <Box className="flex flex-col gap-6">
      {projects.map((project, i) => (
        <Box
          key={i}
          className="border p-4 rounded-lg bg-white shadow-sm flex flex-col gap-4"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Title"
                value={project.title || ""}
                onChange={(e) => handleChange(i, "title", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tech Stack (React, Node, Firebase...)"
                value={project.tech || ""}
                onChange={(e) => handleChange(i, "tech", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Description"
                value={project.description || ""}
                onChange={(e) => handleChange(i, "description", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GitHub Link"
                value={project.github || ""}
                onChange={(e) => handleChange(i, "github", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Live URL"
                value={project.link || ""}
                onChange={(e) => handleChange(i, "link", e.target.value)}
              />
            </Grid>
          </Grid>

          <Button color="error" onClick={() => removeProject(i)}>
            Remove Project
          </Button>
        </Box>
      ))}

      <Button variant="contained" onClick={addProject}>
        Add Project
      </Button>
    </Box>
  );
}
