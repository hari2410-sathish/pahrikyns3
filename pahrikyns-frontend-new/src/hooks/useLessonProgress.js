import { useState, useEffect } from "react";

export default function useLessonProgress(category, tool) {
  const storageKey = `progress-${category}-${tool}`;

  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setCompleted(saved);
  }, [category, tool]);

  const markCompleted = (lessonId) => {
    if (completed.includes(lessonId)) return;

    const updated = [...completed, lessonId];
    setCompleted(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return { completed, markCompleted };
}
