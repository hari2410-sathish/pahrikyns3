import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CourseTable({ courses, onDeleteCourse, isMobile }) {
  const theme = useTheme();
  const realMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mobileMode = isMobile ?? realMobile;

  /* -------------------- MOBILE CARD MODE -------------------- */
  if (mobileMode) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {courses.map((c) => (
          <Box
            key={c.id}
            sx={{
              p: 2,
              borderRadius: 3,
              background: "rgba(10,20,40,0.95)",
              border: "1px solid rgba(0,255,255,0.25)",
              boxShadow: "0 0 10px rgba(0,255,255,0.15)",
            }}
          >
            <Typography sx={{ fontWeight: 800, color: "#00eaff" }}>
              {c.title}
            </Typography>

            <Typography sx={{ opacity: 0.8, mt: 0.5 }}>
              {c.category} • {c.level}
            </Typography>

            <Typography sx={{ opacity: 0.7, mt: 0.5 }}>
              {c.lessons} lessons • {c.students} students • {c.status}
            </Typography>

            <Box sx={{ mt: 1.5 }}>
              <Button
                sx={{
                  color: "#00eaff",
                  mr: 1,
                  textTransform: "none",
                  "&:hover": {
                    textShadow: "0 0 8px #00eaff",
                  },
                }}
              >
                Edit
              </Button>

              <Button
                sx={{
                  color: "#f97373",
                  textTransform: "none",
                  "&:hover": {
                    textShadow: "0 0 8px #f97373",
                  },
                }}
                onClick={() => onDeleteCourse(c.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  /* -------------------- DESKTOP TABLE MODE -------------------- */
  return (
    <Table
      sx={{
        background: "rgba(10,20,40,0.85)",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(0,255,255,0.25)",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "#00eaff", fontWeight: 800 }}>
            Course Name
          </TableCell>
          <TableCell sx={{ color: "white" }}>Category</TableCell>
          <TableCell sx={{ color: "white" }}>Level</TableCell>
          <TableCell sx={{ color: "white" }}>Lessons</TableCell>
          <TableCell sx={{ color: "white" }}>Students</TableCell>
          <TableCell sx={{ color: "white" }}>Status</TableCell>
          <TableCell sx={{ color: "white" }}>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {courses.map((c) => (
          <TableRow
            key={c.id}
            sx={{
              "&:hover": {
                background: "rgba(0,255,255,0.05)",
                transition: "0.25s",
              },
            }}
          >
            <TableCell sx={{ color: "white" }}>{c.title}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.category}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.level}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.lessons}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.students}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.status}</TableCell>

            <TableCell>
              <Button
                sx={{
                  color: "#00eaff",
                  mr: 1,
                  textTransform: "none",
                  "&:hover": {
                    textShadow: "0 0 6px #00eaff",
                  },
                }}
              >
                Edit
              </Button>

              <Button
                sx={{
                  color: "#f97373",
                  textTransform: "none",
                  "&:hover": {
                    textShadow: "0 0 6px #f97373",
                  },
                }}
                onClick={() => onDeleteCourse(c.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
