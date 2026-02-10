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
    MenuItem,
    Pagination,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useNavigate } from "react-router-dom";
import { fetchAllPayments } from "../../Adminapi/paymentsAdmin";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

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

export default function Transactions() {
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
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

    /* ================= LOAD ================= */
    const loadTransactions = async () => {
        try {
            setLoading(true);
            // Reusing payments API as it holds transaction records
            const res = await fetchAllPayments({
                page,
                limit: 15, // Denser list
                search,
                status,
                startDate,
                endDate,
            });

            setTransactions(res.payments || []);
            setTotalPages(res.totalPages || 1);
        } catch (err) {
            console.error(err);
            showToast("Failed to load transactions", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions();
        // eslint-disable-next-line
    }, [page]);

    /* ================= HANDLERS ================= */
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        loadTransactions();
    };

    const handleClearFilters = () => {
        setSearch("");
        setStatus("");
        setStartDate("");
        setEndDate("");
        setPage(1);
        setTimeout(loadTransactions, 100);
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        showToast("Copied to clipboard");
    };

    return (
        <Box>
            {/* ================= HEADER ================= */}
            <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap">
                <Box>
                    <Typography variant="h5" fontWeight={800}>
                        Transactions
                    </Typography>
                    <Typography fontSize={14} sx={{ opacity: 0.7 }}>
                        Detailed ledger of all gateway interactions
                    </Typography>
                </Box>

                <IconButton onClick={loadTransactions}>
                    <RefreshIcon />
                </IconButton>
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
                        placeholder="Search Txn ID, Order ID..."
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
                        <MenuItem value="PAID">Success</MenuItem>
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
                                <TableCell>Transaction ID</TableCell>
                                <TableCell>Gateway Ref</TableCell>
                                <TableCell>Order Ref</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {transactions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        No transactions found
                                    </TableCell>
                                </TableRow>
                            )}

                            {transactions.map((t) => (
                                <TableRow key={t.id} hover>
                                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <span>{t.id.slice(0, 12)}...</span>
                                            <IconButton size="small" onClick={() => copyToClipboard(t.id)}>
                                                <ContentCopyIcon sx={{ fontSize: 12 }} />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>

                                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                                        {t.razorpayPaymentId ? (
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <span>{t.razorpayPaymentId}</span>
                                                <IconButton size="small" onClick={() => copyToClipboard(t.razorpayPaymentId)}>
                                                    <ContentCopyIcon sx={{ fontSize: 12 }} />
                                                </IconButton>
                                            </Stack>
                                        ) : (
                                            <span style={{ opacity: 0.5 }}>-</span>
                                        )}
                                    </TableCell>

                                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                                        {t.razorpayOrderId || t.orderId || "-"}
                                    </TableCell>

                                    <TableCell>{formatCurrency(t.amount)}</TableCell>

                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={t.status}
                                            color={statusColor(t.status)}
                                            variant={t.status === "PENDING" ? "outlined" : "filled"}
                                            sx={{ height: 24, fontSize: 11 }}
                                        />
                                    </TableCell>

                                    <TableCell style={{ fontSize: 12 }}>
                                        {new Date(t.createdAt).toLocaleString()}
                                    </TableCell>

                                    <TableCell align="right">
                                        <Tooltip title="View Details">
                                            <IconButton size="small" onClick={() => navigate(`/admin/payments/${t.id}`)}>
                                                <VisibilityIcon fontSize="small" />
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
