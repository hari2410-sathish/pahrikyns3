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
  Tooltip,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

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

      // ✅ backend safe mapping
      const data = res.payment || res;
      setPayment(data);
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

    if (payment.status !== "PAID") {
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

    if (s === "paid")
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="PAID"
          color="success"
          variant="outlined"
        />
      );

    if (s === "refunded")
      return (
        <Chip
          icon={<ReplayIcon />}
          label="REFUNDED"
          color="warning"
          variant="outlined"
        />
      );

    if (s === "failed")
      return (
        <Chip
          icon={<ErrorIcon />}
          label="FAILED"
          color="error"
          variant="outlined"
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
    method,
    orderId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    createdAt,
  } = payment;

  return (
    <Box>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <IconButton onClick={() => navigate("/admin/payments")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={800}>
          Payment Details
        </Typography>
      </Stack>

      {/* SUMMARY */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography fontSize={13} opacity={0.7}>
              Amount
            </Typography>
            <Typography variant="h5" fontWeight={900}>
              {formatCurrency(amount, currency)}
            </Typography>
            <Stack mt={1}>{renderStatus(status)}</Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography fontSize={13} opacity={0.7}>
              Created
            </Typography>
            <Typography>
              {createdAt ? new Date(createdAt).toLocaleString() : "-"}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography fontSize={13} opacity={0.7}>
              Actions
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              startIcon={<ReplayIcon />}
              disabled={refundLoading || status !== "PAID"}
              onClick={handleRefund}
            >
              Refund
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* GATEWAY DETAILS */}
      <Paper sx={{ p: 2 }}>
        <Typography fontWeight={600} mb={1}>
          Gateway Details
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Typography fontSize={13}>
          <b>Order ID:</b> {orderId || "-"}
        </Typography>
        <Typography fontSize={13}>
          <b>Razorpay Order:</b> {razorpayOrderId || "-"}
        </Typography>
        <Typography fontSize={13}>
          <b>Payment ID:</b> {razorpayPaymentId || "-"}
        </Typography>
        <Typography fontSize={13} sx={{ wordBreak: "break-all" }}>
          <b>Signature:</b> {razorpaySignature || "-"}
        </Typography>
      </Paper>

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
