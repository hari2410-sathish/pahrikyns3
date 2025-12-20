import React, { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { fetchOrders } from "../../Adminapi/ordersAdmin";
import OrdersList from "./OrdersList";

export default function SearchOrders() {
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchOrders().then(res => setOrders(res.orders || []));
  }, []);

  const filtered = orders.filter(o =>
    o.customer?.toLowerCase().includes(q.toLowerCase()) ||
    o.invoiceNumber?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Search Orders
      </Typography>

      <TextField
        fullWidth
        placeholder="Search by customer or invoice"
        value={q}
        onChange={e => setQ(e.target.value)}
        sx={{ mb: 2 }}
      />

      <OrdersList orders={filtered} />
    </Box>
  );
}
