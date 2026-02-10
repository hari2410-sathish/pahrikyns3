import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Tooltip,
  Pagination,
  Stack,
  Avatar
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";

import { fetchUsers } from "../../Adminapi/users";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function AllCustomers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* FILTERS */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line
  }, [page]);

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await fetchUsers({
        page,
        limit: 10,
        search // Passing search query to backend
      });
      setCustomers(data.users || []);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUsers || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }

  const handleSearchKeys = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      loadCustomers();
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>Customers</Typography>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            {totalUsers} registered users
          </Typography>
        </Box>

        {/* SEARCH & ADD */}
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeys}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ opacity: 0.5 }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 250 }}
          />
          <Button variant="contained" component={Link} to="/admin/customers/add">
            + Add Customer
          </Button>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* TABLE */}
      <Paper sx={{ overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
        {loading ? (
          <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead sx={{ bgcolor: "rgba(0,0,0,0.02)" }}>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Orders</TableCell>
                <TableCell>Total Spent</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No customers found
                  </TableCell>
                </TableRow>
              )}
              {customers.map((cust) => (
                <TableRow key={cust.id} hover>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>
                        {cust.name?.[0]?.toUpperCase() || <PersonIcon />}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600} fontSize={14}>{cust.name}</Typography>
                        <Typography fontSize={12} color="text.secondary">{cust.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={`${cust.coursesCount || 0} Orders`}
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600} color="success.main">
                      {formatCurrency(cust.totalSpent)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={cust.isActive ? "Active" : "Inactive"}
                      color={cust.isActive ? "success" : "default"}
                      size="small"
                      sx={{ height: 24 }}
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(cust.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/users/${cust.id}`)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Orders">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/users/${cust.id}/payments`)}
                      >
                        <ReceiptIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Box p={2} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, v) => setPage(v)}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
