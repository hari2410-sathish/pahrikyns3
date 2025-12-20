import React from "react";
import { Button } from "@mui/material";
import { fetchOrders } from "../../Adminapi/ordersAdmin";

export default function ExportOrders() {
  const exportCSV = async () => {
    const res = await fetchOrders();
    const orders = res.orders || [];

    const csv = [
      ["Invoice", "Customer", "Status", "Total"],
      ...orders.map(o => [
        o.invoiceNumber,
        o.customer,
        o.status,
        o.grandTotal || o.totalAmount,
      ]),
    ]
      .map(r => r.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  return (
    <Button variant="contained" onClick={exportCSV}>
      Export Orders CSV
    </Button>
  );
}
