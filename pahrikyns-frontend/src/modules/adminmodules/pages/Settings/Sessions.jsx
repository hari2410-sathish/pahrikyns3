import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

function Sessions() {
  // Dummy data for now (backend later)
  const sessions = [
    {
      id: 1,
      device: "Chrome - Windows",
      ip: "192.168.1.10",
      lastActive: "2025-02-14 10:30 AM",
    },
    {
      id: 2,
      device: "Mobile - Android",
      ip: "192.168.1.25",
      lastActive: "2025-02-13 08:12 PM",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Active Sessions
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sessions.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.device}</TableCell>
                <TableCell>{s.ip}</TableCell>
                <TableCell>{s.lastActive}</TableCell>
                <TableCell align="right">
                  <Button color="error" variant="outlined" size="small">
                    Logout
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default Sessions;
