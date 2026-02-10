import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const RECOMMENDATION_RULES = [
  { check: (progress) => progress['aws'] > 50, title: "DevOps Fundamentals", tag: "Next Step", img: "https://picsum.photos/300/200?random=1" },
  { check: (progress) => progress['devops'] > 50, title: "Kubernetes Mastery", tag: "Advanced", img: "https://picsum.photos/300/200?random=2" },
  { check: (progress) => true, title: "AWS Cloud Practitioner", tag: "Recommended", img: "https://picsum.photos/300/200?random=3" }
];

// Helper to scan local storage for coarse progress
const getProgressOverview = () => {
  let p = { aws: 0, devops: 0, os: 0 };
  // Scan localstorage keys pahrikyns:progress:CATEGORY:TOOL:lessonX
  // This is expensive to scan fully, so we'll just check a known marker or rely on last visited.
  // Simpler: Check if "pahrikyns:progress:aws:aws:lesson1" exists.
  if (localStorage.getItem("pahrikyns:progress:aws:aws:lesson10")) p.aws = 60;
  if (localStorage.getItem("pahrikyns:progress:devops:devops:lesson10")) p.devops = 60;
  return p;
};

// Start with mock but dynamic
const getRecs = () => {
  const p = getProgressOverview();
  // Filter recommendations
  return RECOMMENDATION_RULES.filter(r => r.check(p)).slice(0, 3);
};

const recommendations = getRecs(); // Static calc on load

export default function AIRecommendation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          /* 🔒 NOT FULL WIDTH */
          maxWidth: "100%",
          mb: 4,
        }}
      >
        {/* HEADER — SMALL */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1.5,
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 18, color: "#7dd3fc" }} />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "#e5f6ff",
            }}
          >
            AI Picks For You
          </Typography>
        </Box>

        {/* SCROLLER */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.15)",
              borderRadius: 10,
            },
          }}
        >
          {recommendations.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  /* 🔒 FIXED CARD SIZE */
                  width: 180,
                  height: 140,
                  borderRadius: 3,
                  overflow: "hidden",

                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",

                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              >
                {/* IMAGE */}
                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: 70,
                    objectFit: "cover",
                  }}
                />

                {/* CONTENT */}
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.6,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#e5e7eb",
                      lineHeight: 1.2,

                      /* 🛑 prevent overflow */
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Chip
                    label={item.tag}
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      height: 20,
                      fontSize: 10,
                      fontWeight: 600,
                      background: "rgba(125,211,252,0.18)",
                      color: "#7dd3fc",
                    }}
                  />
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}
