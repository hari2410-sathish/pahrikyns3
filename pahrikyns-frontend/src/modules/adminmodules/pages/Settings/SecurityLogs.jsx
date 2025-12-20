import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { fetchSecurityLogs } from "../../Adminapi/settingsAdmin";


export default function SecurityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchSecurityLogs().then((d) => setLogs(d.logs || []));
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
        Security Logs
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((l, i) => (
              <TableRow key={i}>
                <TableCell>{l.event}</TableCell>
                <TableCell>{l.ip}</TableCell>
                <TableCell>
                  {new Date(l.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
