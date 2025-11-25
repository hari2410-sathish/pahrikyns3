// src/pages/Courses/ToolPage.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { loadAllLessons } from "./index";

const TOOL_ICONS = {
  docker: "🐳",
  git: "🔧",
  jenkins: "⚙️",
  kubernetes: "☸️",
  terraform: "🌍",
  ansible: "🅰️",
  prometheus: "📈",
  grafana: "📊",
  splunk: "🌀",
  default: "📘",
};

// ---------------------------
// PROGRESS STORAGE
// ---------------------------
const progressKey = (category, tool, lessonNum) =>
  `pahrikyns:progress:${category}:${tool}:lesson${lessonNum}`;

const readProgress = (c, t, n) => Number(localStorage.getItem(progressKey(c, t, n))) || 0;
const writeProgress = (c, t, n, v) =>
  localStorage.setItem(progressKey(c, t, n), String(v));

// Debounce utility
const debounce = (fn, ms = 120) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

export default function ToolPage() {
  const { category, tool } = useParams();
  const [rawLessons, setRawLessons] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("num");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showCompleted, setShowCompleted] = useState("all");
  const canvasRef = useRef(null);

  // ---------------------------
  // LOAD LESSONS + META
  // ---------------------------
  useEffect(() => {
    async function load() {
      const loaded = await loadAllLessons(category, tool);
      setRawLessons(loaded);

      // prepare progress map
      const map = {};
      loaded.forEach((l) => {
        map[l.num] = readProgress(category, tool, l.num);
      });
      setProgressMap(map);
    }
    load();
  }, [category, tool]);

  // ---------------------------
  // PARTICLE ANIMATION
  // ---------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [...Array(80)].map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.4 + 0.8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    let raf;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#00111a");
      bg.addColorStop(1, "#001827");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#00eaff";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", resize);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ---------------------------
  // CLEANED META STRUCTURE
  // ---------------------------
  const lessons = useMemo(() => {
    return rawLessons.map((l, i) => ({
      num: l.num,
      name: l.name,
      Component: l.Component,
      title: l.meta.title || `Lesson ${l.num}`,
      description: l.meta.description || "",
      difficulty:
        l.meta.difficulty ||
        ["Beginner", "Intermediate", "Advanced"][l.num % 3],
      duration: l.meta.duration || `${10 + l.num} min`,
      tags: l.meta.tags || [],
      updated: l.meta.updated || "",
      thumbnail: l.meta.thumbnail || null,
    }));
  }, [rawLessons]);

  // ---------------------------
  // FILTER + SORT
  // ---------------------------
  const filtered = useMemo(() => {
    let list = [...lessons];

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((l) =>
        `${l.title} ${l.description} lesson ${l.num} ${l.tags.join(" ")}`
          .toLowerCase()
          .includes(q)
      );
    }

    if (difficultyFilter !== "all") {
      list = list.filter((l) => l.difficulty === difficultyFilter);
    }

    if (showCompleted === "completed") {
      list = list.filter((l) => (progressMap[l.num] || 0) >= 100);
    } else if (showCompleted === "incomplete") {
      list = list.filter((l) => (progressMap[l.num] || 0) < 100);
    }

    if (sortBy === "num") {
      list.sort((a, b) => a.num - b.num);
    } else if (sortBy === "progress") {
      list.sort((a, b) => (progressMap[b.num] || 0) - (progressMap[a.num] || 0));
    } else if (sortBy === "difficulty") {
      const rank = { Beginner: 0, Intermediate: 1, Advanced: 2 };
      list.sort(
        (a, b) => rank[a.difficulty] - rank[b.difficulty] || a.num - b.num
      );
    }

    return list;
  }, [lessons, search, difficultyFilter, showCompleted, sortBy, progressMap]);

  // ---------------------------
  // UPDATE PROGRESS
  // ---------------------------
  const updateProgress = (num, v) => {
    const val = Math.max(0, Math.min(100, v));
    writeProgress(category, tool, num, val);
    setProgressMap((p) => ({ ...p, [num]: val }));
  };

  const setSearchDebounced = useMemo(() => debounce(setSearch), []);

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "36px",
          color: "#eaffff",
          minHeight: "100vh",
          zIndex: 2,
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", marginBottom: 20, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#00eaff" }}>
              {tool.toUpperCase()}
            </div>
            <div
              style={{
                width: 140,
                height: 6,
                background: "#00eaff",
                marginTop: 8,
                borderRadius: 6,
              }}
            />
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ fontSize: 22 }}>
            {TOOL_ICONS[tool] || TOOL_ICONS.default}
          </div>
        </div>

        {/* CONTROLS */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <input
            placeholder="Search lessons..."
            onChange={(e) => setSearchDebounced(e.target.value)}
            style={{
              padding: "12px 14px",
              minWidth: 260,
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#eaffff",
            }}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
            }}
          >
            <option value="num">Sort by Number</option>
            <option value="progress">Sort by Progress</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
            }}
          >
            <option value="all">All difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={showCompleted}
            onChange={(e) => setShowCompleted(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>

          <Link
            to={`/courses/${category}/${tool}/lesson1`}
            style={{
              marginLeft: "auto",
              padding: "10px 16px",
              borderRadius: 10,
              background: "#00eaff",
              color: "#001",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            ▶ Start
          </Link>
        </div>

        {/* LESSON GRID */}
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          }}
        >
          {filtered.map((l) => {
            const prog = progressMap[l.num] || 0;
            const done = prog >= 100;

            return (
              <div
                key={l.num}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 14,
                  padding: 18,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>
                      {l.title}
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.7 }}>
                      {l.description}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                      {l.difficulty} • {l.duration}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontWeight: 700,
                        color: done ? "#00ffb8" : "#ffd36b",
                      }}
                    >
                      {prog}%
                    </div>
                  </div>
                </div>

                {/* progress bar */}
                <div
                  style={{
                    marginTop: 10,
                    height: 10,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${prog}%`,
                      background: "linear-gradient(90deg,#00eaff,#00ffb8)",
                      borderRadius: 10,
                    }}
                  />
                </div>

                {/* buttons */}
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <Link
                    to={`/courses/${category}/${tool}/${l.name}`}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "#001824",
                      color: "#00eaff",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    Open
                  </Link>

                  <button
                    onClick={() => updateProgress(l.num, prog + 20)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.04)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                    }}
                  >
                    +Progress
                  </button>

                  <button
                    onClick={() => updateProgress(l.num, 0)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "rgba(255,0,100,0.06)",
                      color: "#ff9fb7",
                      border: "1px solid rgba(255,0,100,0.1)",
                      cursor: "pointer",
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 34,
            opacity: 0.5,
            fontSize: 13,
          }}
        >
          Tip: Search, filters & sorting help you navigate. Progress is saved locally.
        </div>
      </div>
    </div>
  );
}
