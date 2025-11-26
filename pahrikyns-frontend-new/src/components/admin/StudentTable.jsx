import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function StudentTable({ students, onRemove, isMobile }) {
  const theme = useTheme();
  const realMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mobileMode = isMobile ?? realMobile;

  /* --------- MOBILE CARD MODE --------- */
  if (mobileMode) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {students.map((s) => (
          <Box
            key={s.id}
            sx={{
              p: 2,
              borderRadius: 3,
              background: "rgba(10,20,40,0.85)",
              border: "1px solid rgba(0,255,255,0.25)",
            }}
          >
            <Typography sx={{ fontWeight: 800, color: "#00eaff" }}>
              {s.name}
            </Typography>
            <Typography sx={{ opacity: 0.8 }}>{s.email}</Typography>
            <Typography sx={{ opacity: 0.7 }}>
              {s.enrolled} courses • {s.status}
            </Typography>

            <Box sx={{ mt: 1.5 }}>
              <Button
                sx={{
                  color: "#00eaff",
                  mr: 1,
                  textTransform: "none",
                }}
              >
                View
              </Button>
              <Button
                onClick={() => onRemove(s.id)}
                sx={{
                  color: "#ff6b6b",
                  textTransform: "none",
                }}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  /* --------- DESKTOP TABLE MODE --------- */
  return (
    <Table
      sx={{
        background: "rgba(10,20,40,0.85)",
        borderRadius: 3,
        border: "1px solid rgba(0,255,255,0.25)",
        overflow: "hidden",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "#00eaff", fontWeight: 800 }}>
            Name
          </TableCell>
          <TableCell sx={{ color: "white" }}>Email</TableCell>
          <TableCell sx={{ color: "white" }}>Enrolled</TableCell>
          <TableCell sx={{ color: "white" }}>Status</TableCell>
          <TableCell sx={{ color: "white" }}>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {students.map((s) => (
          <TableRow
            key={s.id}
            sx={{
              "&:hover": { background: "rgba(0,255,255,0.05)" },
            }}
          >
            <TableCell sx={{ color: "white" }}>{s.name}</TableCell>
            <TableCell sx={{ color: "white" }}>{s.email}</TableCell>
            <TableCell sx={{ color: "white" }}>{s.enrolled}</TableCell>
            <TableCell sx={{ color: "white" }}>{s.status}</TableCell>

            <TableCell>
              <Button
                sx={{
                  color: "#00eaff",
                  mr: 1,
                  textTransform: "none",
                }}
              >
                View
              </Button>

              <Button
                onClick={() => onRemove(s.id)}
                sx={{
                  color: "#ff6b6b",
                  textTransform: "none",
                }}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
