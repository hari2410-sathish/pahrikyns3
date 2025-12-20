/** ========================================================
 * RESUME API — PRO VERSION (v1)
 * Clean API wrapper for all resume CRUD operations
 * Works with any backend (Firebase, Node, Supabase)
 * ======================================================== */

const API_BASE = "/api/resumes"; // change based on backend

// Fetch all resumes
export async function fetchResumes() {
  const res = await fetch(API_BASE);
  return res.json();
}

// Fetch single resume by ID
export async function fetchResume(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return res.json();
}

// Create a new resume
export async function createResume(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Update existing resume
export async function updateResume(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Delete resume
export async function deleteResume(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
