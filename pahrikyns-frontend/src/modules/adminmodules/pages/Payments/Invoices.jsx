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
  MenuItem,
  Pagination,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import { fetchInvoices } from "../../Adminapi/paymentsAdmin";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Invoices() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FILTER STATES */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

      const res = await fetchInvoices({
        page,
        limit: 10,
        search,
        status, // paymentStatus
        startDate,
        endDate,
      });

      setOrders(res.orders || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      showToast("Failed to load invoices", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
    // eslint-disable-next-line
  }, [page]);

  /* ================= HANDLERS ================= */
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadInvoices();
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    setTimeout(loadInvoices, 100);
  };

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

  const handlePrint = (invoiceNumber) => {
    if (!invoiceNumber) {
      showToast("Invoice not available", "error");
      return;
    }
    const url = `${API_BASE}/uploads/invoices/${invoiceNumber}.pdf`;
    const win = window.open(url, "_blank");
    if (win) {
      win.focus();
      setTimeout(() => win.print(), 800);
    }
  };

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Invoices
          </Typography>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            Generated order invoices
          </Typography>
        </Box>
      </Box>

      {/* ================= FILTERS ================= */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack
          direction="row"
          component="form"
          onSubmit={handleFilterSubmit}
          spacing={2}
          flexWrap="wrap"
          alignItems="center"
        >
          <TextField
            size="small"
            placeholder="Search Invoice #, Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, opacity: 0.5 }} /> }}
            sx={{ flex: 1, minWidth: 200 }}
          />

          <TextField
            select
            size="small"
            label="Payment Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PAID">Paid</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="REFUNDED">Refunded</MenuItem>
          </TextField>

          <TextField
            type="date"
            size="small"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            type="date"
            size="small"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Tooltip title="Filter">
            <IconButton type="submit" sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } }}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          {(search || status || startDate || endDate) && (
            <IconButton onClick={handleClearFilters} size="small">
              <Typography fontSize={12}>Clear</Typography>
            </IconButton>
          )}
        </Stack>
      </Paper>

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
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    No invoices found
                  </TableCell>
                </TableRow>
              )}

              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{o.invoiceNumber}</TableCell>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <Box p={2} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, v) => setPage(v)}
              color="primary"
            />
          </Box>
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
