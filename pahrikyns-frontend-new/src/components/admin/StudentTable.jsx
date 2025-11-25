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

export default function StudentTable({ students, onRemove, isMobile }) {
  const theme = useTheme();
  const reallyMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mobileMode = isMobile ?? reallyMobile;

  if (mobileMode) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {students.map((s) => (
          <Box
            key={s.id}
            sx={{
              p: 2,
              borderRadius: 3,
              background: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(148,163,184,0.5)",
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>{s.name}</Typography>
            <Typography sx={{ opacity: 0.7 }}>{s.email}</Typography>
            <Typography sx={{ mt: 0.5, opacity: 0.8 }}>
              Courses: {s.enrolled} • {s.status}
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <Button sx={{ color: "#00eaff", mr: 1 }}>View</Button>
              <Button sx={{ color: "#f97373" }} onClick={() => onRemove(s.id)}>
                Remove
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

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
          <TableCell sx={{ color: "#00eaff", fontWeight: 800 }}>Name</TableCell>
          <TableCell sx={{ color: "white" }}>Email</TableCell>
          <TableCell sx={{ color: "white" }}>Courses</TableCell>
          <TableCell sx={{ color: "white" }}>Status</TableCell>
          <TableCell sx={{ color: "white" }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((s) => (
          <TableRow key={s.id}>
            <TableCell sx={{ color: "white" }}>{s.name}</TableCell>
            <TableCell sx={{ color: "white" }}>{s.email}</TableCell>
            <TableCell sx={{ color: "white" }}>{s.enrolled}</TableCell>
            <TableCell sx={{ color: "white" }}>{s.status}</TableCell>
            <TableCell>
              <Button sx={{ color: "#00eaff", mr: 1 }}>View</Button>
              <Button sx={{ color: "#f97373" }} onClick={() => onRemove(s.id)}>
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
