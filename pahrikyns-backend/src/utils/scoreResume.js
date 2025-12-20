// Simple rule-based scoring (0–100) – later you can replace with real AI

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

module.exports = function scoreResume(resume) {
  const data = resume?.data || resume || {};

  let score = 0;
  const breakdown = {
    summary: 0,
    skills: 0,
    experience: 0,
    projects: 0,
    education: 0,
  };

  // SUMMARY
  const summary = (data.summary || "").trim();
  if (summary.length > 30) breakdown.summary = 15;
  if (summary.length > 80) breakdown.summary = 20;

  // SKILLS
  const skills = Array.isArray(data.skills) ? data.skills : [];
  if (skills.length >= 3) breakdown.skills = 10;
  if (skills.length >= 6) breakdown.skills = 15;
  if (skills.length >= 10) breakdown.skills = 20;

  // EXPERIENCE
  const exp = Array.isArray(data.experience) ? data.experience : [];
  if (exp.length >= 1) breakdown.experience = 15;
  if (exp.length >= 2) breakdown.experience = 20;
  if (exp.length >= 3) breakdown.experience = 25;

  // PROJECTS
  const projects = Array.isArray(data.projects) ? data.projects : [];
  if (projects.length >= 1) breakdown.projects = 10;
  if (projects.length >= 2) breakdown.projects = 15;
  if (projects.length >= 3) breakdown.projects = 20;

  // EDUCATION
  const edu = Array.isArray(data.education) ? data.education : [];
  if (edu.length >= 1) breakdown.education = 5;
  if (edu.length >= 2) breakdown.education = 10;

  score =
    breakdown.summary +
    breakdown.skills +
    breakdown.experience +
    breakdown.projects +
    breakdown.education;

  score = clamp(score, 0, 100);

  const suggestions = [];

  if (summary.length < 60) {
    suggestions.push("Add a stronger summary (2–3 lines about your profile).");
  }
  if (skills.length < 5) {
    suggestions.push("Add more relevant skills (at least 5–8).");
  }
  if (exp.length === 0) {
    suggestions.push("Add work experience or internships if you have any.");
  }
  if (projects.length < 2) {
    suggestions.push("Showcase at least 2–3 projects with clear impact.");
  }
  if (edu.length === 0) {
    suggestions.push("Add at least one education entry.");
  }

  return {
    score,
    breakdown,
    suggestions,
  };
};
