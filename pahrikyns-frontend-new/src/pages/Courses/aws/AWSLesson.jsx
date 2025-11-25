import React from "react";
import { useParams } from "react-router-dom";

export default function AWSLesson() {
  const { tool, lessonId } = useParams();

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>{tool.toUpperCase()} – Lesson {lessonId}</h1>
      <p>Lesson content will come here…</p>
    </div>
  );
}
