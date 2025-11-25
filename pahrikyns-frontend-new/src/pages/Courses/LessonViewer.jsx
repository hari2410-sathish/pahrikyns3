// src/pages/Courses/LessonViewer.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { loadAllLessons } from "./index";
import LessonSidebar from "../../components/Course/LessonSidebar";

export default function LessonViewer() {
  const { category, tool, lessonId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Read progress from localStorage
  const readProgress = (num) => {
    try {
      const v = localStorage.getItem(
        `pahrikyns:progress:${category}:${tool}:lesson${num}`
      );
      return v ? Number(v) : 0;
    } catch {
      return 0;
    }
  };

  // Save progress for this lesson
  const writeProgress = (num, val) => {
    try {
      localStorage.setItem(
        `pahrikyns:progress:${category}:${tool}:lesson${num}`,
        String(val)
      );
    } catch {}
  };

  useEffect(() => {
    async function init() {
      const list = await loadAllLessons(category, tool);
      setLessons(list);

      const num = parseInt(lessonId.replace("lesson", ""), 10);
      const found = list.find((l) => l.num === num);

      if (found) {
        setLesson(found);
        setProgress(readProgress(found.num)); // Load existing progress
      }
    }
    init();
  }, [category, tool, lessonId]);

  if (!lesson) return <div>Loading lesson...</div>;

  const Component = lesson.Component;

  const prev = lessons.find((l) => l.num === lesson.num - 1);
  const next = lessons.find((l) => l.num === lesson.num + 1);

  // 🟦 Update progress as user scrolls
  const handleScroll = (e) => {
    const el = e.target;
    const percent = Math.min(
      100,
      Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    );

    setProgress(percent);
    writeProgress(lesson.num, percent);
  };

  return (
    <div style={{ display: "flex", height: "100vh", color: "white" }}>
      {/* Sidebar */}
      <LessonSidebar
        lessons={lessons}
        current={lesson.num}
        category={category}
        tool={tool}
      />

      {/* Main Viewer */}
      <div
        style={{
          flex: 1,
          padding: 30,
          overflowY: "auto",
          position: "relative",
        }}
        onScroll={handleScroll}
      >
        {/* TOP PROGRESS BAR */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 280,
            right: 0,
            height: 6,
            background: "rgba(255,255,255,0.08)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg,#00eaff,#00ffb8)",
              transition: "width 0.2s",
            }}
          ></div>
        </div>

        {/* Lesson Header */}
        <h1 style={{ color: "#00eaff", marginBottom: 6 }}>
          {lesson.meta.title}
        </h1>

        <div style={{ color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>
          {lesson.meta.description}
        </div>

        {/* Meta Row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
          <span>📘 <b>{lesson.meta.difficulty}</b></span>
          <span>⏱ {lesson.meta.duration}</span>
          {lesson.meta.updated && <span>🗓 {lesson.meta.updated}</span>}
        </div>

        {/* Tag Row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 25 }}>
          {lesson.meta.tags.map((t) => (
            <span
              key={t}
              style={{
                background: "rgba(0,234,255,0.15)",
                padding: "6px 12px",
                borderRadius: 8,
                fontSize: 13,
                color: "#00eaff",
              }}
            >
              #{t}
            </span>
          ))}
        </div>

        {/* LESSON CONTENT */}
        <div style={{ marginBottom: 40 }}>
          <Component />
        </div>

        {/* NEXT/PREV BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          {prev ? (
            <button
              onClick={() =>
                navigate(`/courses/${category}/${tool}/lesson${prev.num}`)
              }
              style={{
                padding: "10px 16px",
                background: "#001f29",
                border: "1px solid #00eaff",
                color: "#00eaff",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              ◀ Previous
            </button>
          ) : (
            <div />
          )}

          {next ? (
            <button
              onClick={() =>
                navigate(`/courses/${category}/${tool}/lesson${next.num}`)
              }
              style={{
                padding: "10px 16px",
                background: "#001f29",
                border: "1px solid #00eaff",
                color: "#00eaff",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Next ▶
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
