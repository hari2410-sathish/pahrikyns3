import React from "react";
import { Box } from "@mui/material";
import { useResume } from "../context/ResumeContext";

/** ========================================================
 * FREE TEMPLATE — PRO VERSION (v1)
 * Clean • ATS Friendly • Simple Black & White
 * Perfect for basic resumes
 * ======================================================== */

export default function FreeTemplate() {
  const { state } = useResume();
  const { personal, experience, projects, skills } = state;

  return (
    <Box
      id="resume-preview"
      className="w-full mx-auto p-8 text-black"
      sx={{ fontFamily: "Inter, sans-serif", maxWidth: "800px" }}
    >
      {/* ================= HEADER ================= */}
      <Box className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold">{personal?.name}</h1>
        <p className="text-gray-700">{personal?.title}</p>
        <p className="text-sm text-gray-600 mt-2">
          {personal?.email} • {personal?.phone} • {personal?.location}
        </p>
      </Box>

      {/* ================= SUMMARY ================= */}
      {personal?.summary && (
        <Box className="mb-6">
          <h2 className="font-semibold text-xl mb-2">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </Box>
      )}

      {/* ================= EXPERIENCE ================= */}
      {experience?.length > 0 && (
        <Box className="mb-6">
          <h2 className="font-semibold text-xl mb-2">Experience</h2>
          {experience.map((exp, i) => (
            <Box key={i} className="mb-4">
              <h3 className="font-semibold">{exp.role}</h3>
              <p className="text-sm text-gray-700">
                {exp.company} • {exp.start} - {exp.end}
              </p>
              <p className="text-gray-700 mt-1 leading-relaxed">
                {exp.description}
              </p>
            </Box>
          ))}
        </Box>
      )}

      {/* ================= PROJECTS ================= */}
      {projects?.length > 0 && (
        <Box className="mb-6">
          <h2 className="font-semibold text-xl mb-2">Projects</h2>
          {projects.map((p, i) => (
            <Box key={i} className="mb-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-gray-700">{p.tech}</p>
              <p className="text-gray-700 mt-1 leading-relaxed">{p.description}</p>
              {p.github && (
                <p className="text-sm text-blue-600">GitHub: {p.github}</p>
              )}
              {p.link && (
                <p className="text-sm text-blue-600">Live: {p.link}</p>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* ================= SKILLS ================= */}
      {skills?.length > 0 && (
        <Box>
          <h2 className="font-semibold text-xl mb-2">Skills</h2>
          <Box className="flex flex-wrap gap-2 text-gray-800">
            {skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-gray-200 rounded-md text-sm">
                {skill}
              </span>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}