import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useNavigate } from "react-router-dom";
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
    case "SUCCESS":
      return "success";
    case "FAILED":
      return "error";
    case "REFUNDED":
      return "warning";
    default:
      return "default";
  }
};

export default function AllPayments() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  /* FILTER STATES */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  /* ================= LOAD ================= */
  const loadPayments = async () => {
    try {
      setLoading(true);
      const res = await fetchAllPayments({
        page,
        limit: 10,
        search,
        status,
        startDate,
        endDate,
      });

      setPayments(res.payments || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      showToast("Failed to load payments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
    // eslint-disable-next-line
  }, [page]); // Reload on page change only

  /* ================= HANDLERS ================= */
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadPayments();
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    setTimeout(loadPayments, 100); // Small delay to ensure state update
  };

  /* ================= VISUALS ================= */
  const chartData = useMemo(() => {
    const map = {};
    payments.forEach((p) => {
      if (p.status !== "PAID" && p.status !== "SUCCESS") return;
      const d = new Date(p.createdAt);
      const key = `${d.getDate()}/${d.getMonth() + 1}`;
      map[key] = (map[key] || 0) + Number(p.amount || 0);
    });

    return Object.entries(map).map(([k, v]) => ({
      date: k,
      revenue: v,
    }));
  }, [payments]);

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Payments
          </Typography>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            Overview of all transactions
          </Typography>
        </Box>

        <IconButton onClick={loadPayments}>
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* ================= CHARTS ================= */}
      {/* Only show chart if we have data to avoid empty ugly block */}
      {chartData.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, height: 280 }}>
          <Typography mb={1} fontWeight={600}>Revenue Trend (Current Page)</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}


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
            placeholder="Search ID, email, name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, opacity: 0.5 }} /> }}
            sx={{ flex: 1, minWidth: 200 }}
          />

          <TextField
            select
            size="small"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PAID">Paid</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="FAILED">Failed</MenuItem>
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
          <Box p={4} textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    No payments found
                  </TableCell>
                </TableRow>
              )}

              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: 13 }}>
                    {p.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography fontSize={13} fontWeight={600}>{p.user?.name || "Guest"}</Typography>
                      <Typography fontSize={11} sx={{ opacity: 0.7 }}>{p.user?.email}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {p.course ? "Course" : p.order ? "Order" : "Other"}
                  </TableCell>
                  <TableCell>{formatCurrency(p.amount)}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={p.status}
                      color={statusColor(p.status)}
                      variant={p.status === "PENDING" ? "outlined" : "filled"}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => navigate(`/admin/payments/${p.id}`)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {p.order && (
                        <Tooltip title="Download Invoice">
                          <IconButton size="small" onClick={() => generateInvoicePDF(p.order)}>
                            <ReceiptLongIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
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
