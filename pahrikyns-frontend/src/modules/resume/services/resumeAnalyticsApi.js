/** ========================================================
 * RESUME ANALYTICS API — PRO VERSION (v1)
 * Tracks all analytics for admin dashboard
 * - Template usage
 * - Resume views
 * - PDF exports
 * - User activity
 * ======================================================== */

const ANALYTICS_BASE = "/api/analytics"; // change backend route

// Track template selection
export async function trackTemplateUse(templateId) {
  await fetch(`${ANALYTICS_BASE}/template`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId }),
  });
}

// Track resume view
export async function trackResumeView(resumeId) {
  await fetch(`${ANALYTICS_BASE}/view`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeId }),
  });
}

// Track PDF export
export async function trackExport(resumeId) {
  await fetch(`${ANALYTICS_BASE}/export`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeId }),
  });
}

// Get dashboard summary
export async function fetchDashboardStats() {
  const res = await fetch(`${ANALYTICS_BASE}/stats`);
  return res.json();
}
