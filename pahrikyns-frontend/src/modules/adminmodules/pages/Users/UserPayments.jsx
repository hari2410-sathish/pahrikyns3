import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Chip,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  Stack,
  Pagination,
  Tooltip,
  Divider,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useParams } from "react-router-dom";
import { fetchUserPayments, getUserById } from "../../Adminapi/users";
const ROWS_PER_PAGE = 10;

export default function UserPayments() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ---------------- USER LOAD ----------------
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoadingUser(true);
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        console.error("Failed to load user", err);
        showToast("Failed to load user details");
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [userId]);

  // ---------------- PAYMENTS LOAD ----------------
  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);
        const data = await fetchUserPayments(userId);
        // expecting { payments: [...] } OR direct array
        setPayments(data.payments || data || []);
      } catch (err) {
        console.error("Failed to load payments", err);
        showToast("Failed to load payments");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [userId]);

  // ---------------- FILTER + SEARCH ----------------
  const filteredPayments = useMemo(() => {
    let list = [...payments];

    if (statusFilter !== "all") {
      list = list.filter((p) =>
        (p.status || "").toLowerCase() === statusFilter
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => {
        const fields = [
          p.orderId,
          p.paymentId,
          p.invoiceId,
          p.courseTitle,
          p.courseName,
          p.method,
        ]
          .filter(Boolean)
          .map(String.toLowerCase);

        return fields.some((f) => f.includes(q));
      });
    }

    return list;
  }, [payments, statusFilter, search]);

  // ---------------- PAGINATION (CLIENT SIDE) ----------------
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayments.length / ROWS_PER_PAGE)
  );

  const paginatedPayments = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredPayments.slice(start, start + ROWS_PER_PAGE);
  }, [filteredPayments, page]);

  useEffect(() => {
    // reset page when filter/search changes
    setPage(1);
  }, [statusFilter, search]);

  // ---------------- STATS (CARDS) ----------------
  const stats = useMemo(() => {
    if (!payments.length) {
      return {
        totalPaid: 0,
        successful: 0,
        failed: 0,
        refunded: 0,
        lastPaymentAt: null,
      };
    }

    let totalPaid = 0;
    let successful = 0;
    let failed = 0;
    let refunded = 0;
    let lastPaymentAt = null;

    payments.forEach((p) => {
      const status = (p.status || "").toLowerCase();
      const amt = Number(p.amount) || 0;

      if (status === "success" || status === "paid") {
        successful += 1;
        totalPaid += amt;
      } else if (status === "failed") {
        failed += 1;
      }

      if ((p.refundStatus || "").toLowerCase() === "refunded") {
        refunded += 1;
      }

      if (p.createdAt) {
        const t = new Date(p.createdAt).getTime();
        if (!lastPaymentAt || t > lastPaymentAt) lastPaymentAt = t;
      }
    });

    return {
      totalPaid,
      successful,
      failed,
      refunded,
      lastPaymentAt,
    };
  }, [payments]);

  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
    }
  };

  const formatAmount = (amount, currency = "INR") => {
    const num = Number(amount) || 0;
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(num / (currency === "INR" && num > 1000 ? 100 : 1));
    } catch {
      return `${currency} ${num}`;
    }
  };

  const statusChipColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "success" || s === "paid") return "success";
    if (s === "pending") return "warning";
    if (s === "failed") return "error";
    return "default";
  };

  const refundChipColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "refunded") return "success";
    if (s === "requested") return "warning";
    if (s === "failed") return "error";
    return "default";
  };

  // ---------------- RENDER ----------------

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              User Payments
            </Typography>
            {loadingUser ? (
              <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
                Loading user details…
              </Typography>
            ) : user ? (
              <Typography sx={{ opacity: 0.8, fontSize: 14 }}>
                {user.name || user.fullName} • {user.email}
              </Typography>
            ) : (
              <Typography sx={{ opacity: 0.7, fontSize: 14, color: "salmon" }}>
                User not found
              </Typography>
            )}
          </Box>
        </Box>

        {/* FILTERS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              minWidth: 140,
              bgcolor: "rgba(15,23,42,0.9)",
              color: "white",
            }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
          </Select>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(15,23,42,0.9)",
              borderRadius: 2,
              px: 1,
            }}
          >
            <SearchIcon
              sx={{ fontSize: 20, opacity: 0.6, mr: 0.5 }}
            />
            <TextField
              variant="standard"
              placeholder="Search order / course / invoice"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: { color: "white", fontSize: 14 },
              }}
              sx={{ minWidth: 260 }}
            />
          </Box>
        </Box>
      </Box>

      {/* STATS CARDS */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(8,47,73,0.9), rgba(12,74,110,0.9))",
              border: "1px solid rgba(125,211,252,0.6)",
            }}
          >
            <Typography sx={{ fontSize: 13, opacity: 0.8 }}>
              Total Collected
            </Typography>
            <Typography
              sx={{ fontSize: 22, fontWeight: 800, mt: 1 }}
            >
              {formatAmount(stats.totalPaid, "INR")}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.7, mt: 0.5 }}>
              Success payments only
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(22,101,52,0.9), rgba(21,128,61,0.9))",
              border: "1px solid rgba(74,222,128,0.7)",
            }}
          >
            <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
              Successful
            </Typography>
            <Typography
              sx={{ fontSize: 22, fontWeight: 800, mt: 1 }}
            >
              {stats.successful}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 0.5 }}>
              Paid / Success transactions
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(185,28,28,0.9), rgba(239,68,68,0.9))",
              border: "1px solid rgba(248,113,113,0.7)",
            }}
          >
            <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
              Failed
            </Typography>
            <Typography
              sx={{ fontSize: 22, fontWeight: 800, mt: 1 }}
            >
              {stats.failed}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.85, mt: 0.5 }}>
              Failed / error transactions
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(30,64,175,0.9), rgba(79,70,229,0.9))",
              border: "1px solid rgba(129,140,248,0.7)",
            }}
          >
            <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
              Refunded
            </Typography>
            <Typography
              sx={{ fontSize: 22, fontWeight: 800, mt: 1 }}
            >
              {stats.refunded}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.85, mt: 0.5 }}>
              Marked as refunded
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* TABLE */}
      <Paper
        sx={{
          background: "rgba(15,23,42,0.95)",
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.25)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            pt: 2,
            pb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ReceiptLongIcon sx={{ opacity: 0.8 }} />
            <Typography sx={{ fontWeight: 600 }}>Payment History</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
            Showing {filteredPayments.length} of {payments.length} records
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(51,65,85,0.9)" }} />

        {loading ? (
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Course
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Amount
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Refund
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Method
                </TableCell>
                <TableCell sx={{ color: "rgba(148,163,184,1)" }}>
                  Order / Payment ID
                </TableCell>
                <TableCell
                  sx={{ color: "rgba(148,163,184,1)" }}
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedPayments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    sx={{ py: 4, opacity: 0.8 }}
                  >
                    No payments found
                  </TableCell>
                </TableRow>
              )}

              {paginatedPayments.map((p) => (
                <TableRow key={p._id || p.id}>
                  <TableCell>{formatDateTime(p.createdAt)}</TableCell>

                  <TableCell sx={{ maxWidth: 220 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {p.courseTitle || p.courseName || "—"}
                    </Typography>
                    {p.planName && (
                      <Typography
                        sx={{ fontSize: 11, opacity: 0.7, mt: 0.3 }}
                      >
                        {p.planName}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      {formatAmount(p.amount, p.currency || "INR")}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={p.status || "Unknown"}
                      size="small"
                      color={statusChipColor(p.status)}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    {p.refundStatus ? (
                      <Chip
                        label={p.refundStatus}
                        size="small"
                        color={refundChipColor(p.refundStatus)}
                        variant="outlined"
                      />
                    ) : (
                      <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                        —
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontSize: 13 }}>
                      {p.method || p.paymentMode || "—"}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ maxWidth: 240 }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {p.orderId || "No Order ID"}
                    </Typography>
                    {p.paymentId && (
                      <Typography
                        sx={{
                          fontSize: 11,
                          opacity: 0.7,
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {p.paymentId}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    {p.invoiceUrl && (
                      <Tooltip title="Open invoice">
                        <IconButton
                          size="small"
                          component="a"
                          href={p.invoiceUrl}
                          target="_blank"
                          rel="noreferrer"
                          sx={{ color: "#fbbf24" }}
                        >
                          <OpenInNewIcon fontSize="small" />
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

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}

      {/* TOAST */}
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
