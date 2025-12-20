import React, { useState } from "react";
import { Box, TextField, Button, Chip } from "@mui/material";
import { useResume } from "../../context/ResumeContext";

/** ========================================================
 * SKILLS FORM — PRO VERSION (v1)
 * - Chip style skills
 * - Add / Remove
 * - Clean UI
 * ======================================================== */

export default function SkillsForm() {
  const { state, update } = useResume();
  const skills = state.skills || [];

  const [input, setInput] = useState("");

  const addSkill = () => {
    if (!input.trim()) return;
    update({ skills: [...skills, input.trim()] });
    setInput("");
  };

  const removeSkill = (skill) => {
    update({ skills: skills.filter((s) => s !== skill) });
  };

  return (
    <Box className="flex flex-col gap-4">
      <Box className="flex gap-2">
        <TextField
          fullWidth
          label="Add Skill"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />
        <Button variant="contained" onClick={addSkill}>
          Add
        </Button>
      </Box>

      <Box className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <Chip
            key={i}
            label={skill}
            onDelete={() => removeSkill(skill)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
}
