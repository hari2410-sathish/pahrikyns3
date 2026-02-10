import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
import { motion } from "framer-motion";
import TuneIcon from "@mui/icons-material/Tune";

const categories = [
  "All",
  "Web Dev",
  "Frontend",
  "Backend",
  "Fullstack",
  "UI/UX",
  "Python",
  "AI / ML",
  "DevOps",
  "Data",
];

export default function CourseCategoryFilter({ onChange }) {
  const [active, setActive] = useState("All");

  const handleSelect = (cat) => {
    setActive(cat);
    onChange?.(cat);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.2,
          py: 0.8,
          mb: 3,

          /* 🔒 ONE LINE ONLY */
          overflowX: "auto",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",

          borderRadius: 3,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",

          "&::-webkit-scrollbar": {
            height: 5,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.25)",
            borderRadius: 10,
          },
        }}
      >
        {/* ⚙️ FILTER ICON */}
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <TuneIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
        </Box>

        {/* CHIPS */}
        {categories.map((cat) => {
          const selected = active === cat;
          const isAll = cat === "All";

          return (
            <motion.div key={cat} whileHover={{ y: -1 }}>
              <Chip
                label={cat}
                size="small"
                onClick={() => handleSelect(cat)}
                sx={{
                  height: 26,
                  fontSize: 11.5,
                  fontWeight: 600,
                  px: 1.2,
                  cursor: "pointer",
                  flexShrink: 0,

                  /* 🎯 COLOR LOGIC */
                  background: selected
                    ? isAll
                      ? "linear-gradient(90deg,#facc15,#fde047)" // ALL special
                      : "rgba(125,211,252,0.25)"
                    : "rgba(255,255,255,0.06)",

                  color: selected
                    ? isAll
                      ? "#000"
                      : "#e0f2fe"
                    : "#cbd5e1",

                  border: selected
                    ? isAll
                      ? "1px solid rgba(250,204,21,0.6)"
                      : "1px solid rgba(125,211,252,0.45)"
                    : "1px solid rgba(255,255,255,0.12)",

                  boxShadow: selected
                    ? isAll
                      ? "0 0 10px rgba(250,204,21,0.35)"
                      : "0 0 8px rgba(125,211,252,0.25)"
                    : "none",

                  "&:hover": {
                    background: selected
                      ? undefined
                      : "rgba(255,255,255,0.1)",
                  },
                }}
              />
            </motion.div>
          );
        })}
      </Box>
    </motion.div>
  );
}
