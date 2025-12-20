// ============================================================
// OFFLINE AUTOSAVE ENGINE — FINAL PRO VERSION
// Matching your ResumeContext imports
// ============================================================

// Storage key wrapper
function key(id) {
  return `resume_offline_${id}`;
}

// ------------------------ SNAPSHOT SAVE / LOAD ------------------------

export function saveOfflineSnapshot(resumeId, data) {
  try {
    const snapshot = {
      id: resumeId,
      savedAt: Date.now(),
      data,
    };
    localStorage.setItem(key(resumeId), JSON.stringify(snapshot));
  } catch (err) {
    console.error("Offline save error:", err);
  }
}

export function loadOfflineSnapshot(resumeId) {
  try {
    const raw = localStorage.getItem(key(resumeId));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Offline load error:", err);
    return null;
  }
}

// ------------------------ SYNC QUEUE ------------------------

const SYNC_QUEUE_KEY = "resume_sync_queue";

export function queueSync(resumeId, data) {
  try {
    const existing = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || "[]");
    existing.push({ resumeId, data, timestamp: Date.now() });
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Queue Sync error:", err);
  }
}

export async function flushSyncQueue(updateFn) {
  try {
    const queue = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || "[]");
    if (!queue.length) return;

    for (const item of queue) {
      await updateFn(item.resumeId, item.data);
    }

    localStorage.removeItem(SYNC_QUEUE_KEY);
  } catch (err) {
    console.error("Flush Sync Queue error:", err);
  }
}

// ------------------------ ONLINE / OFFLINE WATCHER ------------------------

export function isOnline() {
  return navigator.onLine;
}

export function setupOfflineAutosaveWatcher(callback) {
  const handler = () => callback(isOnline());

  window.addEventListener("online", handler);
  window.addEventListener("offline", handler);

  return () => {
    window.removeEventListener("online", handler);
    window.removeEventListener("offline", handler);
  };
}
