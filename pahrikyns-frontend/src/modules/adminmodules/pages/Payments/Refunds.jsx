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
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  TextField,
  Stack,
  Tooltip,
  Pagination,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useNavigate } from "react-router-dom";
import { fetchAllPayments } from "../../Adminapi/paymentsAdmin";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function Refunds() {
  const navigate = useNavigate();

  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  /* ================= LOAD REFUNDS ================= */
  const loadRefunds = async (params = {}) => {
    try {
      setLoading(true);

      const res = await fetchAllPayments({
        status: "REFUNDED", // ✅ backend aligned
        search: params.search ?? q,
        fromDate: params.fromDate ?? fromDate,
        toDate: params.toDate ?? toDate,
        page: params.page ?? page,
      });

      setRefunds(res.payments || res || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      showToast("Failed to load refunds", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRefunds();
    // eslint-disable-next-line
  }, [page]);

  /* ================= SEARCH ================= */
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadRefunds({ search: q, page: 1 });
  };

  /* ================= DATE FILTER ================= */
  const handleDateFilter = () => {
    setPage(1);
    loadRefunds({ fromDate, toDate, page: 1 });
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
            Refunds
          </Typography>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            Refunded payments overview
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSearch} display="flex" gap={1}>
          <SearchIcon sx={{ opacity: 0.6 }} />
          <TextField
            size="small"
            placeholder="Search order / id"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{ minWidth: 260 }}
          />
        </Box>
      </Box>

      {/* ================= DATE FILTER ================= */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
          <CalendarMonthIcon sx={{ opacity: 0.6 }} />

          <TextField
            label="From"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <TextField
            label="To"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <Tooltip title="Apply filter">
            <IconButton
              onClick={handleDateFilter}
              sx={{ bgcolor: "#22d3ee", color: "#020617" }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
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
                <TableCell>Order / Payment ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Refunded</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {refunds.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    No refunds found
                  </TableCell>
                </TableRow>
              )}

              {refunds.map((p) => {
                const id = p.id || p._id;

                return (
                  <TableRow key={id}>
                    <TableCell
                      sx={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        wordBreak: "break-all",
                      }}
                    >
                      {p.orderId || id}
                    </TableCell>

                    <TableCell>{formatCurrency(p.amount)}</TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        label={formatCurrency(p.amount)}
                        color="warning"
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(
                        p.updatedAt || p.createdAt
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell align="right">
                      <Tooltip title="View Payment">
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(`/admin/payments/${id}`)
                          }
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Refunded">
                        <IconButton size="small" disabled>
                          <ReplayIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
          />
        </Stack>
      )}

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
