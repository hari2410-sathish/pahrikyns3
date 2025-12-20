import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigate, useParams } from "react-router-dom";

import { fetchStudentPayments, getStudentById } from "../../../api/users";
import { refundPayment } from "../../../api/paymentsAdmin";

export default function StudentRefunds() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStudent, setLoadingStudent] = useState(true);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoadingStudent(true);
        const s = await getStudentById(studentId);
        setStudent(s);
      } catch (err) {
        console.error(err);
        showToast("Failed to load student");
      } finally {
        setLoadingStudent(false);
      }
    };
    loadStudent();
  }, [studentId]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await fetchStudentPayments(studentId);
      setPayments(data.payments || data || []);
    } catch (err) {
      console.error(err);
      showToast("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, [studentId]);

  const refundablePayments = useMemo(
    () =>
      payments.filter((p) => {
        const status = (p.status || "").toLowerCase();
        const refundStatus = (p.refundStatus || "").toLowerCase();
        return (
          (status === "success" || status === "paid") &&
          refundStatus !== "refunded"
        );
      }),
    [payments]
  );

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

  const handleRefund = async (payment) => {
    if (
      !window.confirm(
        `Refund payment ${payment.orderId || payment.paymentId}?`
      )
    )
      return;

    try {
      await refundPayment(payment._id || payment.id);
      showToast("Refund initiated", "success");
      await loadPayments();
    } catch (err) {
      console.error(err);
      showToast("Refund failed");
    }
  };

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
              Student Refunds
            </Typography>
            {loadingStudent ? (
              <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
                Loading student…
              </Typography>
            ) : student ? (
              <Typography sx={{ opacity: 0.8, fontSize: 14 }}>
                {student.name} • {student.email}
              </Typography>
            ) : (
              <Typography sx={{ opacity: 0.7, fontSize: 14, color: "salmon" }}>
                Student not found
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* TABLE */}
      <Paper
        sx={{
          p: 2.5,
          borderRadius: 3,
          background: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(148,163,184,0.25)",
        }}
      >
        <Box
          sx={{
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>
            Refundable Payments ({refundablePayments.length})
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, borderColor: "rgba(51,65,85,0.9)" }} />

        {loading ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : refundablePayments.length === 0 ? (
          <Typography sx={{ opacity: 0.8 }}>
            No refundable payments found
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Refund</TableCell>
                <TableCell>Order / Payment ID</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refundablePayments.map((p) => (
                <TableRow key={p._id || p.id}>
                  <TableCell>{formatDateTime(p.createdAt)}</TableCell>
                  <TableCell>{p.courseTitle || p.courseName || "—"}</TableCell>
                  <TableCell>
                    {formatAmount(p.amount, p.currency || "INR")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={p.status}
                      color="success"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={p.refundStatus || "Not Refunded"}
                      color={
                        (p.refundStatus || "").toLowerCase() === "refunded"
                          ? "success"
                          : "warning"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 12 }}>
                      {p.orderId || "No Order ID"}
                    </Typography>
                    {p.paymentId && (
                      <Typography sx={{ fontSize: 11, opacity: 0.7 }}>
                        {p.paymentId}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleRefund(p)}
                      sx={{ color: "#fbbf24" }}
                    >
                      <ReplayIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
