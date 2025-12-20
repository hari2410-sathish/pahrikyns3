/** ========================================================
 * VERSION STORE — PRO VERSION (v1)
 * Local versioning + autosave handler
 * - Stores resume drafts in LocalStorage
 * - Tracks last updated timestamp
 * - Supports simple version history
 * ======================================================== */

const STORAGE_KEY = "resume_versions";

// Load all versions from localStorage
export function loadVersions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save new version
export function saveVersion(resumeId, content) {
  const versions = loadVersions();

  const newVersion = {
    resumeId,
    content,
    timestamp: Date.now(),
  };

  const updated = [...versions, newVersion];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// Get versions for a specific resume
export function getResumeVersions(resumeId) {
  const versions = loadVersions();
  return versions.filter((v) => v.resumeId === resumeId);
}

// Clear all versions
export function clearVersions() {
  localStorage.removeItem(STORAGE_KEY);
}
