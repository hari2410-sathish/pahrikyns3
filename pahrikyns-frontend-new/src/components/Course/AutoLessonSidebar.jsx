// src/components/Course/AutoLessonSidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadAllLessons } from "../../pages/Courses";

export default function AutoLessonSidebar() {
  const { category, tool, lessonId } = useParams();
  
  const currentNum = Number(lessonId.replace("lesson", ""));
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    loadAllLessons(category, tool).then(setLessons);
  }, [category, tool]);

  return (
    <div style={{
      width: 250,
      background: "#06101d",
      height: "100vh",
      borderRight: "1px solid rgba(0,255,255,0.1)",
      padding: "15px 10px",
      boxSizing: "border-box",
      overflowY: "auto",
      position: "sticky",
      top: 0
    }}>
      <h2 style={{ color: "#00eaff", marginBottom: 15, fontSize: 18 }}>
        {tool.toUpperCase()}
      </h2>

      {lessons.map(l => (
        <Link
          key={l.num}
          to={`/courses/${category}/${tool}/${l.name}`}
          style={{
            display: "block",
            padding: "8px 10px",
            marginBottom: 4,
            borderRadius: 5,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            background: currentNum === l.num ? "rgba(0,234,255,0.15)" : "transparent",
            color: currentNum === l.num ? "#00eaff" : "#cfe7ff",
            borderLeft: currentNum === l.num ? "3px solid #00eaff" : "3px solid transparent",
            transition: "0.15s",
          }}
        >
          Lesson {l.num}
        </Link>
      ))}
    </div>
  );
}
