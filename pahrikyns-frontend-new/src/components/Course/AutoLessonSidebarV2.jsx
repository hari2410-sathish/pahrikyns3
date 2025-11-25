// src/components/Course/AutoLessonSidebarV2.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadAllLessons } from "../../pages/Courses";

export default function AutoLessonSidebarV2() {
  const { category, tool, lessonId } = useParams();
  const currentNum = Number(lessonId.replace("lesson", ""));
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = useState(true); // collapsible

  // completed lessons from localStorage
  const saved = JSON.parse(localStorage.getItem("completedLessons") || "{}");

  useEffect(() => {
    loadAllLessons(category, tool).then(setLessons);
  }, [category, tool]);

  // Save current lesson as completed
  useEffect(() => {
    const newData = { ...saved };

    if (!newData[category]) newData[category] = {};
    if (!newData[category][tool]) newData[category][tool] = [];

    if (!newData[category][tool].includes(currentNum)) {
      newData[category][tool].push(currentNum);
      localStorage.setItem("completedLessons", JSON.stringify(newData));
    }
  }, [currentNum]);

  const completed = saved?.[category]?.[tool] || [];
  const progress = Math.round((completed.length / lessons.length) * 100);

  return (
    <div style={{
      width: 260,
      background: "#06101d",
      borderRight: "1px solid rgba(0,255,255,0.1)",
      height: "100vh",
      position: "sticky",
      top: 0,
      overflowY: "auto",
      padding: 15,
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ color: "#00eaff", fontSize: 18 }}>
          {tool.toUpperCase()}
        </h2>
        <div style={{
          background: "#0a1a2a",
          height: 8,
          borderRadius: 4,
          marginTop: 8,
          overflow: "hidden",
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            background: "#00eaff",
            transition: "0.3s",
          }}></div>
        </div>
        <p style={{ color: "#7cc7ff", fontSize: 13, marginTop: 5 }}>
          {completed.length}/{lessons.length} Lessons Completed
        </p>
      </div>

      {/* Collapsible section */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 10px",
          background: "rgba(0,255,255,0.08)",
          borderRadius: 5,
          cursor: "pointer",
          color: "#00eaff",
          fontWeight: 700,
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        Lessons
        <span>{open ? "▲" : "▼"}</span>
      </div>

      {/* Lessons list */}
      <div style={{
        display: open ? "block" : "none",
        transition: "0.3s",
      }}>
        {lessons.map((l) => {
          const isActive = currentNum === l.num;
          const isDone = completed.includes(l.num);

          return (
            <Link
              key={l.num}
              to={`/courses/${category}/${tool}/${l.name}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 10px",
                marginBottom: 4,
                borderRadius: 5,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                color: isActive ? "#00eaff" : "#cfe7ff",
                background: isActive
                  ? "rgba(0,234,255,0.15)"
                  : "transparent",
                borderLeft: isActive
                  ? "3px solid #00eaff"
                  : "3px solid transparent",
              }}
            >
              Lesson {l.num}
              {isDone && (
                <span style={{ color: "#00ff85", fontWeight: 900 }}>✓</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
