import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function GiftCertificates() {
  const certificates = []; // future API data

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Gift certificates
        </Typography>

        <Button variant="contained">
          + Issue gift certificate
        </Button>
      </Box>

      {/* TABLE / EMPTY STATE */}
      <Paper>
        {certificates.length === 0 ? (
          <Box
            sx={{
              p: 6,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Typography fontSize={15}>
              You don’t have any gift certificates yet.
            </Typography>
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Issued to</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {certificates.map((g) => (
                <TableRow key={g.code}>
                  <TableCell>{g.code}</TableCell>
                  <TableCell>{g.email}</TableCell>
                  <TableCell>{g.balance}</TableCell>
                  <TableCell>{g.status}</TableCell>
                  <TableCell>{g.createdAt}</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}
