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
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { generateInvoicePDF } from "../../utils/generateInvoicePDF";

// Simple fake dataset
function loadPayments() {
  return [
    {
      id: "TXN10231",
      studentName: "Hari Sathish",
      email: "hari@gmail.com",
      course: "DevOps",
      amount: 999,
      status: "paid",
      date: "2025-02-12",
      reference: "REF-ABC123",
    },
    {
      id: "TXN10244",
      studentName: "Arun Kumar",
      email: "arun@gmail.com",
      course: "Docker",
      amount: 499,
      status: "failed",
      date: "2025-02-10",
      reference: "REF-ARG782",
    },
    {
      id: "TXN10255",
      studentName: "Priya Devi",
      email: "priya@gmail.com",
      course: "AWS",
      amount: 1499,
      status: "pending",
      date: "2025-02-08",
      reference: "REF-MNB678",
    },
  ];
}

const currency = (n) => `₹${n.toLocaleString()}`;

export default function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [confirmRefund, setConfirmRefund] = useState(false);

  useEffect(() => {
    setPayments(loadPayments());
  }, []);

  const handleRefund = () => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === selected.id ? { ...p, status: "refunded" } : p
      )
    );
    setConfirmRefund(false);
    setSelected(null);
    alert("Refund Successful!");
  };

  return (
    <Box sx={{ color: "white", p: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        Student Payments
      </Typography>

      <Paper
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          background: "rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Txn ID</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Student</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Course</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id} sx={{ "&:hover": { background: "rgba(0,255,255,0.05)" } }}>
                <TableCell>{p.id}</TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ bgcolor: "#00bcd4" }}>{p.studentName[0]}</Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{p.studentName}</Typography>
                      <Typography variant="caption">{p.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>{p.course}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{currency(p.amount)}</TableCell>

                <TableCell>
                  <Chip
                    label={p.status}
                    color={
                      p.status === "paid"
                        ? "success"
                        : p.status === "pending"
                        ? "warning"
                        : p.status === "failed"
                        ? "error"
                        : "info"
                    }
                    sx={{ textTransform: "capitalize" }}
                  />
                </TableCell>

                <TableCell>
                  <IconButton onClick={() => setSelected(p)}>
                    <VisibilityIcon sx={{ color: "cyan" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* =========================
           PAYMENT DETAILS MODAL
      ========================== */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Box display="grid" gap={2}>
              <Typography><b>Student:</b> {selected.studentName}</Typography>
              <Typography><b>Email:</b> {selected.email}</Typography>
              <Typography><b>Course:</b> {selected.course}</Typography>
              <Typography><b>Amount:</b> {currency(selected.amount)}</Typography>
              <Typography><b>Status:</b> {selected.status}</Typography>
              <Typography><b>Txn ID:</b> {selected.id}</Typography>
              <Typography><b>Reference:</b> {selected.reference}</Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>

          {/* PDF Download */}
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => generateInvoicePDF(selected)}
          >
            Invoice PDF
          </Button>

          {/* REFUND */}
          {selected?.status === "paid" && (
            <Button
              variant="contained"
              color="error"
              startIcon={<AutorenewIcon />}
              onClick={() => setConfirmRefund(true)}
            >
              Refund
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* =========================
           REFUND CONFIRMATION
      ========================== */}
      <Dialog open={confirmRefund} onClose={() => setConfirmRefund(false)}>
        <DialogTitle>Confirm Refund</DialogTitle>
        <DialogContent>
          Are you sure you want to refund this payment?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmRefund(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleRefund}>
            Confirm Refund
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
