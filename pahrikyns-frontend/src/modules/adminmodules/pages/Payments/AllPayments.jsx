import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { fetchAllPayments } from "../../Adminapi/paymentsAdmin";

import { generateInvoicePDF } from "../../../../utils/generateInvoicePDF";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ================= HELPERS ================= */
const formatCurrency = (amt = 0) =>
  `₹${Number(amt || 0).toLocaleString("en-IN")}`;

const statusColor = (status) => {
  switch (status) {
    case "PAID":
      return "success";
    case "FAILED":
      return "error";
    default:
      return "warning";
  }
};

export default function AllPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  /* ================= LOAD ================= */
  const loadPayments = async () => {
    try {
      setLoading(true);
      const res = await fetchAllPayments();
      setPayments(res.payments || []);
    } catch (err) {
      console.error(err);
      showToast("Failed to load payments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  /* ================= STATS ================= */
  const revenueData = useMemo(() => {
    const map = {};
    payments.forEach((p) => {
      if (p.status !== "PAID") return;
      const d = new Date(p.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      map[key] = (map[key] || 0) + Number(p.amount || 0);
    });

    return Object.entries(map).map(([k, v]) => ({
      month: k,
      revenue: v,
    }));
  }, [payments]);

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box mb={3} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Payments
          </Typography>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            Payment & revenue overview
          </Typography>
        </Box>

        <IconButton onClick={loadPayments}>
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* ================= CHART ================= */}
      <Paper sx={{ p: 2, mb: 3, height: 280 }}>
        <Typography mb={1}>Monthly Revenue</Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Line dataKey="revenue" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* ================= TABLE ================= */}
      <Paper>
        {loading ? (
          <Box p={4} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Invoice</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    {p.order?.invoiceNumber || p.orderId || "-"}
                  </TableCell>
                  <TableCell>{formatCurrency(p.amount)}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={p.status}
                      color={statusColor(p.status)}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">
                    {p.order && (
                      <Tooltip title="Download Invoice">
                        <IconButton
                          onClick={() => generateInvoicePDF(p.order)}
                        >
                          <ReceiptLongIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* ================= TOAST ================= */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
