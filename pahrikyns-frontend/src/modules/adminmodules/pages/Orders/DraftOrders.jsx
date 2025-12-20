import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchOrders } from "../../Adminapi/ordersAdmin";
import OrdersList from "./OrdersList";

export default function DraftOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(res => {
      setOrders((res.orders || []).filter(o => o.status === "CREATED"));
    });
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Draft Orders
      </Typography>

      <OrdersList orders={orders} />
    </Box>
  );
}
