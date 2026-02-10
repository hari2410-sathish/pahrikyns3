import React, { useEffect, useState } from "react";
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
  Button,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPaymentById,
  refundPayment,
} from "../../Adminapi/paymentsAdmin";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0, currency = "INR") =>
  `${currency === "INR" ? "₹" : ""}${Number(amount || 0).toLocaleString(
    "en-IN"
  )}`;

export default function PaymentDetails() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refundLoading, setRefundLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  /* ================= LOAD PAYMENT ================= */
  const loadPayment = async () => {
    try {
      setLoading(true);
      const res = await fetchPaymentById(paymentId);
      setPayment(res.payment || res);
    } catch (err) {
      console.error(err);
      showToast("Failed to load payment", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayment();
    // eslint-disable-next-line
  }, [paymentId]);

  /* ================= REFUND ================= */
  const handleRefund = async () => {
    if (!payment) return;

    if (payment.status !== "PAID" && payment.status !== "SUCCESS") {
      showToast("Only PAID payments can be refunded", "info");
      return;
    }

    if (!window.confirm("Confirm refund for this payment?")) return;

    try {
      setRefundLoading(true);
      await refundPayment(payment.id);
      showToast("Refund successful");
      loadPayment();
    } catch (err) {
      console.error(err);
      showToast("Refund failed", "error");
    } finally {
      setRefundLoading(false);
    }
  };

  /* ================= STATUS CHIP ================= */
  const renderStatus = (status) => {
    const s = String(status || "").toLowerCase();

    if (s === "paid" || s === "success")
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="PAID"
          color="success"
          variant="filled"
        />
      );

    if (s === "refunded")
      return (
        <Chip
          icon={<ReplayIcon />}
          label="REFUNDED"
          color="warning"
          variant="filled"
        />
      );

    if (s === "failed")
      return (
        <Chip
          icon={<ErrorIcon />}
          label="FAILED"
          color="error"
          variant="filled"
        />
      );

    return <Chip label={status || "UNKNOWN"} variant="outlined" />;
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!payment) {
    return <Typography>Payment not found</Typography>;
  }

  const {
    id,
    amount,
    currency,
    status,
    orderId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    createdAt,
    user,
    course,
    order
  } = payment;

  return (
    <Box>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={800}>
          Payment Details
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* LEFT COLUMN: DETAILS */}
        <Grid item xs={12} md={8}>
          {/* SUMMARY CARD */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography fontSize={13} sx={{ opacity: 0.6, mb: 0.5 }}>TOTAL AMOUNT</Typography>
                <Typography variant="h3" fontWeight={800} color="primary">
                  {formatCurrency(amount, currency)}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography fontSize={13} sx={{ opacity: 0.6, mb: 1 }}>STATUS</Typography>
                {renderStatus(status)}
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography fontSize={13} sx={{ opacity: 0.6 }}>Date</Typography>
                <Typography fontWeight={500}>{new Date(createdAt).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography fontSize={13} sx={{ opacity: 0.6 }}>Payment ID</Typography>
                <Typography fontFamily="monospace" fontSize={13}>{id.slice(0, 12)}...</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography fontSize={13} sx={{ opacity: 0.6 }}>Product</Typography>
                <Typography fontWeight={500}>
                  {course ? `Course: ${course.title}` : order ? "Order" : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* GATEWAY INFO */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Gateway Information</Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: 'text.secondary' }}>Razorpay Payment ID</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{razorpayPaymentId || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: 'text.secondary' }}>Razorpay Order ID</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{razorpayOrderId || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: 'text.secondary' }}>Internal Order ID</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{orderId || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: 'text.secondary' }}>Signature</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', wordBreak: "break-all", fontSize: 11 }}>
                    {razorpaySignature || "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: USER & ACTIONS */}
        <Grid item xs={12} md={4}>
          {/* USER INFO */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Customer</Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                {user?.name?.[0] || <PersonIcon />}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{user?.name || "Guest User"}</Typography>
                <Typography fontSize={13} sx={{ opacity: 0.7 }}>User ID: {user?.id?.slice(0, 8)}</Typography>
              </Box>
            </Stack>

            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon fontSize="small" sx={{ opacity: 0.6 }} />
                <Typography fontSize={14}>{user?.email || "N/A"}</Typography>
              </Stack>
            </Stack>
          </Paper>

          {/* ORDER INFO (If Order) */}
          {order && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Order Details</Typography>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontSize={14} sx={{ opacity: 0.7 }}>Invoice #</Typography>
                  <Typography fontWeight={600}>{order.invoiceNumber || "-"}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontSize={14} sx={{ opacity: 0.7 }}>Items</Typography>
                  <Typography fontWeight={600}>{order.items?.length || 0}</Typography>
                </Stack>
              </Stack>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ReceiptIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/admin/orders')} // Or direct to order details if page exists
              >
                View Order
              </Button>
            </Paper>
          )}

          {/* ACTIONS */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Actions</Typography>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              startIcon={<ReplayIcon />}
              disabled={refundLoading || (status !== "PAID" && status !== "SUCCESS")}
              onClick={handleRefund}
            >
              Refund Payment
            </Button>

            <Typography fontSize={12} sx={{ mt: 1, opacity: 0.6, textAlign: 'center' }}>
              Refunds are processed immediately via Razorpay.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

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
