import React from "react";
import { Box } from "@mui/material";
import { useResume } from "../context/ResumeContext";

/** ========================================================
 * ULTRA TEMPLATE — ULTRA PREMIUM VERSION (v1)
 * Resume.io / Enhancv Level
 * - Bold Header
 * - Left Sidebar Accent
 * - Clean Modern Spacing
 * - Premium Typography
 * ======================================================== */

export default function UltraTemplate() {
  const { state } = useResume();
  const { personal, experience, projects, skills } = state;

  return (
    <Box
      id="resume-preview"
      className="w-full mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
      sx={{ fontFamily: "Inter, sans-serif", maxWidth: "900px" }}
    >
      {/* ================= LAYOUT ================= */}
      <Box className="grid grid-cols-3">
        {/* ================ SIDEBAR ================ */}
        <Box className="col-span-1 bg-blue-700 text-white p-8 flex flex-col gap-8 min-h-full">
          {/* PHOTO (Optional) */}
          <Box className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4" />

          {/* CONTACT */}
          <Box>
            <h2 className="font-semibold text-xl mb-3">Contact</h2>
            <p className="text-sm">{personal?.email}</p>
            <p className="text-sm">{personal?.phone}</p>
            <p className="text-sm">{personal?.location}</p>
          </Box>

          {/* SKILLS */}
          {skills?.length > 0 && (
            <Box>
              <h2 className="font-semibold text-xl mb-3">Skills</h2>
              <Box className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/20 rounded-md text-sm"
                  >
                    {s}
                  </span>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* ================ MAIN CONTENT ================ */}
        <Box className="col-span-2 p-10 flex flex-col gap-10">
          {/* HEADER */}
          <Box>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {personal?.name}
            </h1>
            <p className="text-xl text-blue-700 font-medium mt-1">
              {personal?.title}
            </p>
          </Box>

          {/* SUMMARY */}
          {personal?.summary && (
            <Box>
              <h2 className="font-bold text-2xl mb-2 text-gray-900">Summary</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {personal.summary}
              </p>
            </Box>
          )}

          {/* EXPERIENCE */}
          {experience?.length > 0 && (
            <Box>
              <h2 className="font-bold text-2xl mb-4 text-gray-900">Experience</h2>
              <Box className="flex flex-col gap-6">
                {experience.map((exp, i) => (
                  <Box key={i}>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                      {exp.company} • {exp.start} – {exp.end}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-md">
                      {exp.description}
                    </p>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* PROJECTS */}
          {projects?.length > 0 && (
            <Box>
              <h2 className="font-bold text-2xl mb-4 text-gray-900">Projects</h2>
              <Box className="flex flex-col gap-6">
                {projects.map((p, i) => (
                  <Box key={i}>
                    <h3 className="text-xl font-semibold text-gray-900">{p.title}</h3>
                    <p className="text-gray-700">{p.tech}</p>
                    <p className="text-gray-700 leading-relaxed text-md mt-1">
                      {p.description}
                    </p>
                    {p.github && (
                      <p className="text-sm text-blue-600">GitHub: {p.github}</p>
                    )}
                    {p.link && (
                      <p className="text-sm text-blue-600">Live: {p.link}</p>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
