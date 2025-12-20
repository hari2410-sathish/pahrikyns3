import React from "react";
import lang from "./lesson5.lang.json";
import { useLanguage } from "../../../../contexts/LanguageContext";

import GitStashImg from "../../../../assets/git/git-stash.png";
import GitResetImg from "../../../../assets/git/git-reset.png";
import GitRestoreImg from "../../../../assets/git/git-restore.png";
import GitDangerImg from "../../../../assets/git/git-danger.png";

export const meta = {
  title: "Git Lesson 5",
  description:
    "Understand git stash, restore, and reset (soft/mixed/hard) with examples and a rescue mini-project.",
  difficulty: "Intermediate",
  duration: "45 min",
  tags: ["git", "stash", "restore", "reset"],
  updated: "2025-11-25",
  thumbnail: ""
};

export default function Lesson5() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  const images = [GitDangerImg, GitStashImg, GitRestoreImg, GitResetImg];

  return (
    <div style={{ padding: 25, maxWidth: 1000, margin: "auto", lineHeight: 1.75 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>{data.title}</h1>
      <p style={{ color: "#666" }}>{data.subtitle}</p>

      <div style={{
        background: "#e8fff5",
        padding: 16,
        borderRadius: 8,
        borderLeft: "5px solid #28a745",
        marginBottom: 22
      }}>
        <strong>Goal:</strong> {data.goal}
      </div>

      {data.sections.map((sec, i) => (
        <section key={i} style={{ marginTop: 40 }}>
          <h2>{sec.title}</h2>
          {sec.description && <p>{sec.description}</p>}

          {images[i] && (
            <img
              src={images[i]}
              alt={sec.title}
              style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
            />
          )}

          {sec.points && (
            <ul>
              {sec.points.map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
          )}

          {sec.commands && (
            <pre style={{
              background: "#1f1f1f",
              color: "#f1f1f1",
              padding: 14,
              borderRadius: 8
            }}>
              {sec.commands.join("\n")}
            </pre>
          )}

          {sec.note && (
            <div style={{
              background: "#e8fff0",
              padding: 14,
              borderRadius: 8,
              borderLeft: "5px solid #28a745",
              marginTop: 12
            }}>
              💡 {sec.note}
            </div>
          )}

          {sec.warning && (
            <div style={{
              background: "#ffe6e6",
              padding: 14,
              borderRadius: 8,
              borderLeft: "5px solid #ff5c5c",
              marginTop: 12
            }}>
              ⚠️ {sec.warning}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
