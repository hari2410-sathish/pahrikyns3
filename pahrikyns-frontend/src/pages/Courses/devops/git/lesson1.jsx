import React from "react";
import lang from "./lesson1.lang.json";
import { useLanguage } from "../../../../contexts/LanguageContext";

import GitWhatIs from "../../../../assets/git/git-what-is.png";
import GitDistributed from "../../../../assets/git/git-distributed.png";
import GitWhy from "../../../../assets/git/git-why-use.png";
import GitArch from "../../../../assets/git/git-architecture.png";
import GitStates from "../../../../assets/git/git-file-states.png";

export default function Lesson1() {
  const { langKey } = useLanguage();
  const data = lang[langKey] || lang.en;

  const images = [GitWhatIs, GitDistributed, GitWhy, GitArch, GitStates];

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg,#00eaff,#0066ff)",
        padding: 20,
        borderRadius: 14,
        color: "white",
        marginBottom: 30
      }}>
        <h1>{data.title}</h1>
        <p>{data.subtitle}</p>
      </div>

      {data.sections.map((sec, i) => (
        <section key={i} style={{
          marginBottom: 36,
          padding: 22,
          borderRadius: 14,
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}>
          <h2>{sec.title}</h2>

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

          {/* ✅ Points */}
          {sec.points && (
            <ul>
              {sec.points.map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
          )}

          {/* ✅ TABLE SUPPORT */}
          {sec.table && (
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 16
            }}>
              <thead>
                <tr>
                  {sec.table.headers.map((h, i) => (
                    <th key={i} style={{
                      border: "1px solid #ccc",
                      padding: 10,
                      background: "#0f172a",
                      color: "white"
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sec.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        border: "1px solid #ccc",
                        padding: 10
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ✅ CODE */}
          {sec.commands && (
            <pre style={{
              background: "#0f172a",
              color: "#38bdf8",
              padding: 16,
              borderRadius: 10,
              marginTop: 14
            }}>
              {sec.commands.join("\n")}
            </pre>
          )}

          {/* ✅ NOTE */}
          {sec.note && (
            <div style={{
              background: "#e8f7ff",
              padding: 16,
              borderRadius: 10,
              marginTop: 14
            }}>
              💡 {sec.note}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
