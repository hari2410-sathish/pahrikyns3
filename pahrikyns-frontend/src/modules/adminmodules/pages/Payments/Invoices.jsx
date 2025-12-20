import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  Stack,
  Tooltip,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";

import api from "../../../../api/axios";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Invoices() {
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  /* ================= LOAD INVOICES ================= */
  const loadInvoices = async () => {
    try {
      setLoading(true);

      // 🔥 invoices = orders with invoiceNumber
      const res = await api.get("/admin/orders");
      const list = res.data?.orders || [];

      const invoicedOrders = list.filter(
        (o) => Boolean(o.invoiceNumber)
      );

      setOrders(invoicedOrders);
    } catch (err) {
      console.error(err);
      showToast("Failed to load invoices", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  /* ================= SEARCH ================= */
  const filtered = useMemo(() => {
    if (!q) return orders;

    const query = q.toLowerCase();
    return orders.filter(
      (o) =>
        o.invoiceNumber?.toLowerCase().includes(query) ||
        o.customer?.toLowerCase().includes(query) ||
        o.customerEmail?.toLowerCase().includes(query)
    );
  }, [q, orders]);

  /* ================= DOWNLOAD ================= */
  const handleDownload = (invoiceNumber) => {
    if (!invoiceNumber) {
      showToast("Invoice not available", "error");
      return;
    }

    const url = `${API_BASE}/uploads/invoices/${invoiceNumber}.pdf`;

    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Invoice downloaded");
  };

  /* ================= PRINT ================= */
  const handlePrint = (invoiceNumber) => {
    if (!invoiceNumber) {
      showToast("Invoice not available", "error");
      return;
    }

    const url = `${API_BASE}/uploads/invoices/${invoiceNumber}.pdf`;
    const win = window.open(url, "_blank");

    if (!win) return;

    win.focus();
    setTimeout(() => win.print(), 800);
  };

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Invoices
          </Typography>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            Generated order invoices
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <SearchIcon sx={{ opacity: 0.7 }} />
          <TextField
            size="small"
            placeholder="Search invoice / customer / email"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{ minWidth: 260 }}
          />
        </Stack>
      </Box>

      {/* ================= TABLE ================= */}
      <Paper>
        {loading ? (
          <Box p={5} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    No invoices found
                  </TableCell>
                </TableRow>
              )}

              {filtered.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>{o.invoiceNumber}</TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell>{o.customerEmail || "-"}</TableCell>
                  <TableCell>{formatCurrency(o.grandTotal)}</TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={o.paymentStatus}
                      color={
                        o.paymentStatus === "PAID"
                          ? "success"
                          : o.paymentStatus === "REFUNDED"
                          ? "warning"
                          : "default"
                      }
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Download Invoice">
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleDownload(o.invoiceNumber)
                        }
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Print Invoice">
                      <IconButton
                        size="small"
                        onClick={() => handlePrint(o.invoiceNumber)}
                      >
                        <PrintIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
