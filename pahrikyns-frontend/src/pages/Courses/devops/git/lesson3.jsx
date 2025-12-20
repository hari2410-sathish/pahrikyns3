import React from "react";
import lang from "./lesson3.lang.json";
import { useLanguage } from "../../../../contexts/LanguageContext";

import GitStatus from "../../../../assets/git/git-status.png";
import GitAdd from "../../../../assets/git/git-add.png";
import GitCommit from "../../../../assets/git/git-commit.png";
import GitReset from "../../../../assets/git/git-reset.png";

export const meta = {
  title: "Git Lesson 3 - Status, Add & Commit Deep Dive",
  description:
    "Understand git status, git add and git commit in depth with real workflow and common mistakes.",
  difficulty: "Beginner → Intermediate",
  duration: "70 min",
  tags: ["git", "status", "add", "commit"],
  updated: "2025-11-25",
  thumbnail: ""
};

export default function Lesson3() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  const images = [GitStatus, GitAdd, GitCommit, GitReset];

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "auto" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg,#f97316,#f43f5e)",
          padding: 20,
          borderRadius: 14,
          color: "white",
          marginBottom: 30
        }}
      >
        <h1>{data.title}</h1>
        <p>{data.subtitle}</p>
      </div>

      {data.sections.map((sec, i) => (
        <section
          key={i}
          style={{
            marginBottom: 36,
            padding: 22,
            borderRadius: 14,
            background: "rgba(255,255,255,0.06)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <h2>{sec.title}</h2>

          {sec.description && <p>{sec.description}</p>}

          {images[i] && (
            <img
              src={images[i]}
              alt={sec.title}
              style={{
                width: "100%",
                borderRadius: 12,
                margin: "16px 0"
              }}
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
            <pre
              style={{
                background: "#020617",
                color: "#38bdf8",
                padding: 16,
                borderRadius: 10,
                marginTop: 14
              }}
            >
              {sec.commands.join("\n")}
            </pre>
          )}

          {sec.table && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 16
              }}
            >
              <thead>
                <tr>
                  {sec.table.headers.map((h, i) => (
                    <th
                      key={i}
                      style={{
                        border: "1px solid #ccc",
                        padding: 10,
                        background: "#0f172a",
                        color: "white"
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sec.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          border: "1px solid #ccc",
                          padding: 10
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {sec.note && (
            <div
              style={{
                marginTop: 14,
                background: "#dcfce7",
                padding: 14,
                borderRadius: 10
              }}
            >
              💡 {sec.note}
            </div>
          )}

          {sec.warning && (
            <div
              style={{
                marginTop: 14,
                background: "#fee2e2",
                padding: 14,
                borderRadius: 10
              }}
            >
              ⚠️ {sec.warning}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
