import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Button,
  MenuItem,
  Select,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

import {
  fetchOrderById,
  updateOrderStatus,
  initOrderPayment,
  verifyOrderPayment,
  emailInvoice,
} from "../../Adminapi/ordersAdmin";
import { resendInvoice } from "../../Adminapi/ordersAdmin";


const statusColor = (status) => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "CANCELLED":
      return "error";
    default:
      return "warning";
  }
};

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  /* ================= LOAD ORDER ================= */
  const loadOrder = async () => {
    try {
      setLoading(true);
      const res = await fetchOrderById(id);
      setOrder(res.order);
    } catch (err) {
      showToast("Failed to load order", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order || !order.items) return null;

  /* ================= STATUS UPDATE ================= */
  const handleStatusChange = async (status) => {
    try {
      setUpdating(true);
      await updateOrderStatus(order.id, status);
      await loadOrder();
      showToast("Order status updated");
    } catch {
      showToast("Failed to update status", "error");
    } finally {
      setUpdating(false);
    }
  };

  /* ================= PAYMENT ================= */
  const handlePayNow = async () => {
    try {
      const res = await initOrderPayment(order.id);

      const options = {
        key: res.key,
        amount: Math.round(order.totalAmount * 100),
        currency: "INR",
        name: "PAHRIKYNS",
        description: "Order Payment",
        order_id: res.orderId,
        handler: async (response) => {
          await verifyOrderPayment(response);
          showToast("Payment successful");
          loadOrder();
        },
        theme: { color: "#0f172a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      showToast("Payment initiation failed", "error");
    }
  };

  /* ================= EMAIL INVOICE ================= */
  const handleEmailInvoice = async () => {
    try {
      setEmailLoading(true);
      await emailInvoice(order.id);
      showToast("Invoice emailed successfully");
    } catch {
      showToast("Failed to send invoice email", "error");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700}>
        Order Details
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        {/* HEADER */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography fontWeight={600}>
            Order: {order.invoiceNumber || order.id}
          </Typography>

          <Chip
            label={order.status}
            color={statusColor(order.status)}
          />

          <Chip
            label={order.paymentStatus}
            color={order.paymentStatus === "PAID" ? "success" : "warning"}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* INFO */}
        <Typography>Customer: {order.customer}</Typography>
        <Typography>Email: {order.customerEmail || "-"}</Typography>
        <Typography>Payment Method: {order.paymentMethod}</Typography>
        <Typography>
          Fulfillment: {order.fulfillment}
          {order.address ? ` (${order.address})` : ""}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* ITEMS */}
        <Typography fontWeight={600} mb={1}>
          Items
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.product}</TableCell>
                <TableCell>{i.quantity}</TableCell>
                <TableCell>₹{i.price}</TableCell>
                <TableCell>₹{i.quantity * i.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider sx={{ my: 2 }} />

        {/* TOTALS */}
        <Typography>Subtotal: ₹{order.totalAmount}</Typography>
        <Typography>GST: ₹{order.gstAmount || 0}</Typography>
        <Typography fontWeight={700}>
          Grand Total: ₹{order.grandTotal || order.totalAmount}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* ACTIONS */}
        {/* ACTION BUTTONS (Approve / Cancel) */}
        {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
          <>
            <Button
              variant="contained"
              color="success"
              disabled={updating}
              onClick={() => handleStatusChange("COMPLETED")}
            >
              Approve & Complete Order
            </Button>

            <Button
              variant="contained"
              color="error"
              disabled={updating}
              onClick={() => handleStatusChange("CANCELLED")}
            >
              Reject / Cancel Order
            </Button>
          </>
        )}

        {/* Legacy Status Override (Optional) */}
        <Select
          size="small"
          value={order.status}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="CREATED">CREATED</MenuItem>
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="COMPLETED">COMPLETED</MenuItem>
          <MenuItem value="CANCELLED">CANCELLED</MenuItem>
        </Select>

        {order.paymentStatus !== "PAID" && (
          <Button variant="outlined" color="primary" onClick={handlePayNow}>
            Pay Now (Admin)
          </Button>
        )}

        <Button
          variant="outlined"
          color="info"
          onClick={async () => {
            await resendInvoice(order.id);
            showToast("Invoice resent to customer email");
          }}
        >
          Resend Invoice Email
        </Button>
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
