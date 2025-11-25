// src/components/Course/LessonSidebar.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const DIFF_COLORS = {
  Beginner: "#59ffa8",
  Intermediate: "#ffd86b",
  Advanced: "#ff6b6b",
};

export default function LessonSidebar({ lessons, current, category, tool }) {
  const activeRef = useRef(null);

  // Scroll active item into view automatically
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [current]);

  return (
    <div
      style={{
        width: 280,
        background: "#07141c",
        height: "100vh",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        overflowY: "auto",
        padding: "20px 0",
        position: "sticky",
        top: 0,
        color: "white",
      }}
    >
      {/* Sidebar Header */}
      <div style={{ padding: "0 20px", marginBottom: 20 }}>
        <h2 style={{ color: "#00eaff", marginBottom: 6 }}>
          {tool.toUpperCase()}
        </h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Total Lessons: {lessons.length}
        </div>
      </div>

      {/* LESSON GROUPS BY DIFFICULTY */}
      {["Beginner", "Intermediate", "Advanced"].map((diff) => {
        const group = lessons.filter((l) => l.meta.difficulty === diff);
        if (group.length === 0) return null;

        return (
          <div key={diff} style={{ marginBottom: 20 }}>
            {/* Group Header */}
            <div
              style={{
                padding: "0 20px",
                marginBottom: 8,
                fontWeight: 700,
                color: DIFF_COLORS[diff],
                fontSize: 15,
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              {diff}
            </div>

            {/* Lesson list */}
            {group.map((l) => {
              const isActive = l.num === current;
              return (
                <Link
                  key={l.num}
                  to={`/courses/${category}/${tool}/lesson${l.num}`}
                  ref={isActive ? activeRef : null}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: isActive ? "#001521" : "white",
                    background: isActive
                      ? "linear-gradient(90deg,#00eaff,#00ffb8)"
                      : "transparent",
                    padding: "12px 20px",
                    marginBottom: 6,
                    transition: "0.2s",
                    borderLeft: isActive
                      ? "4px solid #001521"
                      : "4px solid transparent",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    Lesson {l.num}
                  </div>

                  {/* Lesson Title */}
                  <div
                    style={{
                      fontSize: 13,
                      opacity: isActive ? 1 : 0.7,
                      marginBottom: 6,
                    }}
                  >
                    {l.meta.title}
                  </div>

                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "wrap",
                      marginBottom: 6,
                    }}
                  >
                    {l.meta.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 6,
                          background: "rgba(0,234,255,0.18)",
                          color: "#00eaff",
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Difficulty Dot + Duration */}
                  <div style={{ fontSize: 12, opacity: 0.8 }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        background: DIFF_COLORS[l.meta.difficulty],
                        borderRadius: "50%",
                        marginRight: 6,
                      }}
                    ></span>
                    {l.meta.duration}
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
