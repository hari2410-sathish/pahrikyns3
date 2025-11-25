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
  const reallyMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mobileMode = isMobile ?? reallyMobile;

  if (mobileMode) {
    // Card-style list on mobile
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {courses.map((c) => (
          <Box
            key={c.id}
            sx={{
              p: 2,
              borderRadius: 3,
              background: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(148,163,184,0.5)",
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>{c.title}</Typography>
            <Typography sx={{ opacity: 0.7, mt: 0.5 }}>
              {c.category} • {c.level}
            </Typography>
            <Typography sx={{ opacity: 0.7, mt: 0.5 }}>
              {c.lessons} lessons • {c.students} students • {c.status}
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <Button sx={{ color: "#00eaff", mr: 1 }}>Edit</Button>
              <Button
                sx={{ color: "#f97373" }}
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

  // Desktop table
  return (
    <Table
      sx={{
        background: "rgba(10,20,40,0.7)",
        borderRadius: 3,
        overflow: "hidden",
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
          <TableRow key={c.id}>
            <TableCell sx={{ color: "white" }}>{c.title}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.category}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.level}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.lessons}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.students}</TableCell>
            <TableCell sx={{ color: "white" }}>{c.status}</TableCell>
            <TableCell>
              <Button sx={{ color: "#00eaff", mr: 1 }}>Edit</Button>
              <Button
                sx={{ color: "#f97373" }}
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
