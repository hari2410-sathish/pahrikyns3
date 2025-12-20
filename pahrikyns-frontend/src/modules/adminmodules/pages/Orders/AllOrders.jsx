import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TextField,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../Adminapi/ordersAdmin";

const statusColor = (status) => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "PAID":
      return "primary";
    case "CANCELLED":
      return "error";
    default:
      return "warning";
  }
};

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders()
      .then((res) => setOrders(res.orders || []))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.customer?.toLowerCase().includes(q) ||
      o.invoiceNumber?.toLowerCase().includes(q)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Orders
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by customer or invoice"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading orders…
                </TableCell>
              </TableRow>
            )}

            {!loading && filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              filteredOrders.map((o) => (
                <TableRow
                  key={o.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/admin/orders/${o.id}`)}
                >
                  <TableCell>
                    {o.invoiceNumber || o.id.slice(0, 8)}
                  </TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell>
                    <Chip
                      label={o.status}
                      color={statusColor(o.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={o.paymentStatus}
                      color={
                        o.paymentStatus === "PAID"
                          ? "success"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    ₹{Number(o.grandTotal || o.totalAmount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
