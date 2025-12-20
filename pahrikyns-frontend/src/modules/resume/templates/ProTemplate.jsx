import React from "react";
import { Box } from "@mui/material";
import { useResume } from "../context/ResumeContext";

/** ========================================================
 * PRO TEMPLATE — PRO VERSION (v1)
 * Modern • Two Column • Blue Accents
 * Clean resume.io style premium template
 * ======================================================== */

export default function ProTemplate() {
  const { state } = useResume();
  const { personal, experience, projects, skills } = state;

  return (
    <Box
      id="resume-preview"
      className="w-full mx-auto bg-white p-8"
      sx={{ fontFamily: "Inter, sans-serif", maxWidth: "900px" }}
    >
      {/* ================= HEADER ================= */}
      <Box className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold text-blue-700">{personal?.name}</h1>
        <p className="text-gray-700 text-xl">{personal?.title}</p>
        <p className="text-sm text-gray-600 mt-2">
          {personal?.email} • {personal?.phone} • {personal?.location}
        </p>
      </Box>

      {/* ================= LAYOUT: 2 COLUMNS ================= */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR */}
        <Box className="md:col-span-1 flex flex-col gap-6">
          {/* SUMMARY */}
          {personal?.summary && (
            <Box>
              <h2 className="font-bold text-lg text-blue-700 mb-2">Summary</h2>
              <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
            </Box>
          )}

          {/* SKILLS */}
          {skills?.length > 0 && (
            <Box>
              <h2 className="font-bold text-lg text-blue-700 mb-2">Skills</h2>
              <Box className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                  >
                    {s}
                  </span>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* RIGHT CONTENT */}
        <Box className="md:col-span-2 flex flex-col gap-6">
          {/* EXPERIENCE */}
          {experience?.length > 0 && (
            <Box>
              <h2 className="font-bold text-lg text-blue-700 mb-2">Experience</h2>
              {experience.map((exp, i) => (
                <Box key={i} className="mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{exp.role}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    {exp.company} • {exp.start} – {exp.end}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </Box>
              ))}
            </Box>
          )}

          {/* PROJECTS */}
          {projects?.length > 0 && (
            <Box>
              <h2 className="font-bold text-lg text-blue-700 mb-2">Projects</h2>
              {projects.map((p, i) => (
                <Box key={i} className="mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{p.title}</h3>
                  <p className="text-gray-700">{p.tech}</p>
                  <p className="text-gray-700 leading-relaxed mt-1">{p.description}</p>
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
        </Box>
      </Box>
    </Box>
  );
}
