import React from "react";
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const statusColor = (status) => {
  switch (status) {
    case "COMPLETED": return "success";
    case "PAID": return "primary";
    case "CANCELLED": return "error";
    default: return "warning";
  }
};

export default function OrdersList({ orders }) {
  const navigate = useNavigate();

  if (!orders.length) {
    return <p>No orders</p>;
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map(o => (
            <TableRow
              key={o.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/admin/orders/${o.id}`)}
            >
              <TableCell>{o.invoiceNumber || o.id.slice(0, 8)}</TableCell>
              <TableCell>{o.customer}</TableCell>
              <TableCell>
                <Chip
                  label={o.status}
                  size="small"
                  color={statusColor(o.status)}
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
  );
}
