import { Box, Typography, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function AllCustomers() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Customers</Typography>
        <Button variant="contained" href="/admin/customers/add">+ Add customer</Button>
      </Box>

      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Total spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>John Doe</TableCell>
              <TableCell>john@mail.com</TableCell>
              <TableCell>5</TableCell>
              <TableCell>₹12,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
