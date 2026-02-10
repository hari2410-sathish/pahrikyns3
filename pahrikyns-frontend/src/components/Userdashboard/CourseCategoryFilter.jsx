import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
import { motion } from "framer-motion";

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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Box
        sx={{
          /* 🔒 COMPACT STRIP */
          display: "flex",
          gap: 1,
          px: 1.5,
          py: 1,
          mb: 3,
          maxWidth: "100%",
          overflowX: "auto",

          borderRadius: 3,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",

          "&::-webkit-scrollbar": {
            height: 5,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.2)",
            borderRadius: 10,
          },
        }}
      >
        {categories.map((cat) => {
          const selected = active === cat;

          return (
            <motion.div key={cat} whileHover={{ y: -1 }}>
              <Chip
                label={cat}
                size="small"
                onClick={() => handleSelect(cat)}
                sx={{
                  height: 26,                 // 🔒 fixed height
                  fontSize: 11.5,
                  fontWeight: 600,
                  px: 1.2,
                  cursor: "pointer",
                  whiteSpace: "nowrap",

                  background: selected
                    ? "rgba(125,211,252,0.25)"
                    : "rgba(255,255,255,0.06)",

                  color: selected ? "#e0f2fe" : "#cbd5e1",

                  border: selected
                    ? "1px solid rgba(125,211,252,0.45)"
                    : "1px solid rgba(255,255,255,0.12)",

                  boxShadow: selected
                    ? "0 0 8px rgba(125,211,252,0.25)"
                    : "none",

                  "&:hover": {
                    background: selected
                      ? "rgba(125,211,252,0.35)"
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
