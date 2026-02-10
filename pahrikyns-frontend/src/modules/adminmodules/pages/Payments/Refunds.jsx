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
import FilterListIcon from "@mui/icons-material/FilterList";

import { useNavigate } from "react-router-dom";
import { fetchAllPayments } from "../../Adminapi/paymentsAdmin";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function Refunds() {
  const navigate = useNavigate();

  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FILTER STATES */
  const [search, setSearch] = useState("");
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

  /* ================= LOAD REFUNDS ================= */
  const loadRefunds = async () => {
    try {
      setLoading(true);

      const res = await fetchAllPayments({
        status: "REFUNDED",
        search,
        startDate,
        endDate,
        page,
        limit: 10,
      });

      setRefunds(res.payments || []);
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

  /* ================= HANDLERS ================= */
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadRefunds();
  };

  const handleClearFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    setTimeout(loadRefunds, 100);
  };

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Refunds
          </Typography>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            Refunded payments overview
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
            placeholder="Search Order / ID / User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, opacity: 0.5 }} /> }}
            sx={{ flex: 1, minWidth: 200 }}
          />

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

          <Tooltip title="Apply filter">
            <IconButton type="submit" sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } }}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          {(search || startDate || endDate) && (
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
                <TableCell>Payment ID</TableCell>
                <TableCell>Order / User</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Refunded</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {refunds.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No refunds found
                  </TableCell>
                </TableRow>
              )}

              {refunds.map((p) => {
                const id = p.id;

                return (
                  <TableRow key={id}>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 13 }}>
                      {id.slice(0, 8)}...
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography fontSize={13} fontWeight={600}>
                          {p.order?.invoiceNumber || p.orderId || "-"}
                        </Typography>
                        <Typography fontSize={11} sx={{ opacity: 0.7 }}>
                          {p.user?.email}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>{formatCurrency(p.amount)}</TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        icon={<ReplayIcon />}
                        label="REFUNDED"
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <Box p={2} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, val) => setPage(val)}
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
