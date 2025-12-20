import React from "react";
import lang from "./lesson2.lang.json";
import { useLanguage } from "../../../../contexts/LanguageContext";

import GitInit from "../../../../assets/git/git-init.png";
import GitStatus from "../../../../assets/git/git-status.png";
import GitAdd from "../../../../assets/git/git-add.png";
import GitCommit from "../../../../assets/git/git-commit.png";
import GitClone from "../../../../assets/git/git-clone.png";
import GitDanger from "../../../../assets/git/git-danger.png";

export const meta = {
  title: "Git Lesson 2 - Installation & First Setup",
  description:
    "Install Git on Windows, Linux, and Mac, configure username & email, and make your first commit.",
  difficulty: "Beginner",
  duration: "60 min",
  tags: ["git", "installation", "setup", "beginner"],
  updated: "2025-11-25",
  thumbnail: ""
};

export default function Lesson2() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  const images = [GitInit, GitStatus, GitAdd, GitCommit, GitClone, GitDanger];

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "auto" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg,#22c55e,#0ea5e9)",
          padding: 20,
          borderRadius: 14,
          color: "white",
          marginBottom: 30
        }}
      >
        <h1 style={{ margin: 0 }}>{data.title}</h1>
        <p style={{ marginTop: 6, opacity: 0.9 }}>{data.subtitle}</p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 10,
            fontSize: 13
          }}
        >
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(15,23,42,0.4)"
            }}
          >
            ⏱ Duration: {data.meta?.duration || "60 min"}
          </span>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(15,23,42,0.4)"
            }}
          >
            🧊 Level: {data.meta?.difficulty || "Beginner"}
          </span>
        </div>
      </div>

      {/* Sections */}
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
          <h2
            style={{
              borderLeft: "5px solid #22c55e",
              paddingLeft: 12,
              marginBottom: 14
            }}
          >
            {sec.title}
          </h2>

          {/* Optional intro text */}
          {sec.description && (
            <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
              {sec.description}
            </p>
          )}

          {/* Image */}
          {images[i] && (
            <img
              src={images[i]}
              alt={sec.title}
              style={{
                width: "100%",
                maxHeight: 380,
                objectFit: "contain",
                borderRadius: 12,
                margin: "16px 0"
              }}
            />
          )}

          {/* Points */}
          {sec.points && (
            <ul style={{ lineHeight: 1.9, paddingLeft: 20 }}>
              {sec.points.map((p, j) => (
                <li key={j} style={{ marginBottom: 6 }}>
                  {p}
                </li>
              ))}
            </ul>
          )}

          {/* Steps */}
          {sec.steps && (
            <ol style={{ lineHeight: 1.9, paddingLeft: 20, marginTop: 10 }}>
              {sec.steps.map((s, j) => (
                <li key={j} style={{ marginBottom: 6 }}>
                  {s}
                </li>
              ))}
            </ol>
          )}

          {/* Table */}
          {sec.table && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 16,
                fontSize: 14
              }}
            >
              <thead>
                <tr>
                  {sec.table.headers.map((h, k) => (
                    <th
                      key={k}
                      style={{
                        border: "1px solid #cbd5f5",
                        padding: 10,
                        background: "#0f172a",
                        color: "white",
                        textAlign: "left"
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sec.table.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        style={{
                          border: "1px solid #cbd5f5",
                          padding: 10,
                          verticalAlign: "top",
                          background: "rgba(15,23,42,0.02)"
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

          {/* Commands */}
          {sec.commands && (
            <pre
              style={{
                background: "#020617",
                color: "#38bdf8",
                padding: 16,
                borderRadius: 10,
                marginTop: 14,
                overflowX: "auto",
                fontSize: 13,
                lineHeight: 1.6
              }}
            >
              {sec.commands.join("\n")}
            </pre>
          )}

          {/* Note / Tip */}
          {sec.note && (
            <div
              style={{
                background: "#dcfce7",
                padding: 14,
                borderRadius: 10,
                marginTop: 14,
                fontSize: 14
              }}
            >
              💡 {sec.note}
            </div>
          )}

          {sec.warning && (
            <div
              style={{
                background: "#fef2f2",
                padding: 14,
                borderRadius: 10,
                marginTop: 10,
                fontSize: 14,
                border: "1px solid #fecaca"
              }}
            >
              ⚠️ {sec.warning}
            </div>
          )}

          {/* Quiz inside section (optional) */}
          {sec.quiz && (
            <div
              style={{
                marginTop: 18,
                padding: 16,
                borderRadius: 12,
                background: "#020617",
                color: "#e5e7eb"
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 10 }}>Quick Quiz</h3>
              {sec.quiz.questions.map((q, qi) => (
                <div
                  key={qi}
                  style={{
                    marginBottom: 16,
                    paddingBottom: 10,
                    borderBottom: "1px dashed rgba(148,163,184,0.5)"
                  }}
                >
                  <p style={{ marginBottom: 6 }}>
                    {qi + 1}. {q.q}
                  </p>
                  <ul style={{ paddingLeft: 18, marginBottom: 4 }}>
                    {q.options.map((opt, oi) => (
                      <li key={oi} style={{ marginBottom: 2 }}>
                        {String.fromCharCode(97 + oi)}) {opt}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 13, opacity: 0.9 }}>
                    ✅ Answer:{" "}
                    <strong>
                      {String.fromCharCode(97 + q.answerIndex)}
                    </strong>{" "}
                    – {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Bottom CTA */}
      <div
        style={{
          marginTop: 24,
          padding: 18,
          borderRadius: 14,
          background: "rgba(34,197,94,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap"
        }}
      >
        <div>
          <h3 style={{ margin: 0 }}>Next Step</h3>
          <p style={{ marginTop: 4, fontSize: 14 }}>
            You have installed and configured Git. In the next lesson, we will
            explore Git status, add, and commit in more depth.
          </p>
        </div>
        <button
          style={{
            border: "none",
            padding: "10px 18px",
            borderRadius: 999,
            background:
              "linear-gradient(90deg, rgba(34,197,94,1), rgba(59,130,246,1))",
            color: "white",
            cursor: "pointer",
            fontSize: 14
          }}
          onClick={() => {
            // simple navigation hint – real navigation is handled by main router
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          🚀 Ready for Lesson 3
        </button>
      </div>
    </div>
  );
}
