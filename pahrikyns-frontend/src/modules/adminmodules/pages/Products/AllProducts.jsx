import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

// TODO: Replace this mock data with real API call to /api/admin/products
// See AllOrders.jsx for reference on how to fetch data.
const products = [
  {
    id: 1,
    name: "Men’s Cotton Shirt",
    sku: "SH-001",
    price: "₹999",
    status: "Visible",
    stock: 24,
  },
];

export default function AllProducts() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Products
        </Typography>
        <Button variant="contained" href="/admin/products/add">
          + Add product
        </Button>
      </Box>

      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Chip
                    label={p.status}
                    color={p.status === "Visible" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
