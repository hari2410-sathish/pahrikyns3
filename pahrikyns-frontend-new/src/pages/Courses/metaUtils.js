// src/pages/Courses/metaUtils.js
// Utilities to normalize lesson meta across inconsistent authoring.

export function normalizeTags(tags) {
  if (!tags) return [];
  // tags may be: ['a','b'] or [['a','b']] or [['a'], 'b'] etc.
  // Flatten one or two levels, remove falsy, convert to strings.
  const flat = [];

  function pushVal(v) {
    if (!v && v !== 0) return;
    if (Array.isArray(v)) {
      v.forEach(pushVal);
      return;
    }
    flat.push(String(v));
  }

  pushVal(tags);

  // dedupe & trim
  return Array.from(new Set(flat.map(t => t.trim()))).filter(Boolean);
}

export function normalizeDifficulty(d) {
  if (!d) return "Beginner";
  const s = String(d).toLowerCase();
  if (s.includes("begin")) return "Beginner";
  if (s.includes("inter")) return "Intermediate";
  if (s.includes("adv")) return "Advanced";
  // numeric mapping
  if (["1","2","3"].includes(s)) {
    return s === "1" ? "Beginner" : s === "2" ? "Intermediate" : "Advanced";
  }
  return d.charAt(0).toUpperCase() + d.slice(1);
}

export function normalizeMeta(rawMeta = {}, inferred = {}) {
  const meta = { ...rawMeta };

  // accept meta.tags various shapes
  meta.tags = normalizeTags(meta.tags || inferred.tags || []);

  // difficulty normalized
  meta.difficulty = normalizeDifficulty(meta.difficulty || inferred.difficulty);

  // duration fallback
  meta.duration = meta.duration || inferred.duration || "";

  // title fallback
  meta.title = meta.title || inferred.title || "";

  // description fallback
  meta.description = meta.description || "";

  // updated & thumbnail fallback
  meta.updated = meta.updated || "";
  meta.thumbnail = meta.thumbnail || null;

  return meta;
}
