import React from "react";
import lang from "./lesson1.lang.json";
import { useLanguage } from "../../../../contexts/LanguageContext";

export const meta = {
  title: "Ansible Lesson 1",
  description: "Introduction to Ansible automation",
  difficulty: "Beginner",
  duration: "45 min",
  tags: ["ansible", "devops", "automation"],
  updated: "2025-11-25",
  thumbnail: ""
};

export default function Lesson1() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  return (
    <div style={{ padding: 20, lineHeight: 1.8 }}>
      <h1>{data.title}</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>{data.subtitle}</p>

      {data.sections.map((s, i) => (
        <section key={i} style={{ marginBottom: 24 }}>
          <h2>{s.heading}</h2>
          <p>{s.content}</p>
        </section>
      ))}
    </div>
  );
}

Lesson1.displayName = "ANSIBLE Lesson 1 – Full Content";
