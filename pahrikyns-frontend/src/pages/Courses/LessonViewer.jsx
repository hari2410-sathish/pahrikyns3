import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadAllLessons } from "./index";
import LessonSidebar from "../../components/Course/LessonSidebar";
import { useLanguage } from "../../contexts/LanguageContext";

export default function LessonViewer() {
  const { category, tool, lessonId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const { langKey, changeLang } = useLanguage();

  const LANGS = {
    en: "English",
    ta: "தமிழ்",
    tl: "Tanglish",
  };

  // Read progress
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

  // Write progress
  const writeProgress = (num, val) => {
    try {
      localStorage.setItem(
        `pahrikyns:progress:${category}:${tool}:lesson${num}`,
        String(val)
      );
    } catch {}
  };

  // Initialize lesson data
  useEffect(() => {
    async function init() {
      const list = await loadAllLessons(category, tool);
      setLessons(list);

      const num = parseInt(lessonId.replace("lesson", ""), 10);
      const found = list.find((l) => l.num === num);

      if (found) {
        setLesson(found);
        setProgress(readProgress(found.num));
      }
    }
    init();
  }, [category, tool, lessonId]);

  if (!lesson)
    return <div style={{ padding: 20, color: "white" }}>Loading lesson...</div>;

  const Component = lesson.Component;

  const prev = lessons.find((l) => l.num === lesson.num - 1);
  const next = lessons.find((l) => l.num === lesson.num + 1);

  // Scroll progress
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
        {/* ✅ LANGUAGE BUTTONS */}
        <div
  style={{
    position: "fixed",
    top: 80,
    right: 20,
    zIndex: 2000,
    display: "flex",
    gap: 10,
    background: "#001f29",
    padding: "8px 12px",
    borderRadius: 30,
    boxShadow: "0 0 12px rgba(0,234,255,0.4)"
  }}
>

          {Object.entries(LANGS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => changeLang(key)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: "1px solid #00eaff",
                background: langKey === key ? "#00eaff" : "#001f29",
                color: langKey === key ? "#001" : "#00eaff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 250,
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

        {/* Header */}
        <h1 style={{ color: "#00eaff", marginBottom: 6 }}>
          {lesson.meta.title}
        </h1>

        <div style={{ color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>
          {lesson.meta.description}
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
          <span>📘 <b>{lesson.meta.difficulty}</b></span>
          <span>⏱ {lesson.meta.duration}</span>
          {lesson.meta.updated && <span>🗓 {lesson.meta.updated}</span>}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, marginBottom: 25 }}>
          {(lesson.meta.tags || []).map((t) => (
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
        <div
          style={{
            marginBottom: 40,
            color: "hsla(120, 3%, 7%, 1.00)",
            fontSize: 17,
          }}
          className="lesson-content"
        >
          <Component />
        </div>

        {/* Navigation buttons */}
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
