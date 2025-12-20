import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Select,
  CircularProgress,
  Stack,
  Pagination,
  Snackbar,
  Alert,
  Tooltip,
  Divider,
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BlockIcon from "@mui/icons-material/Block";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import {
  fetchAllCertificates,
  revokeCertificate,
} from "../../Adminapi/certificatesAdmin";

const ROWS_PER_PAGE = 10;

export default function AllCertificates() {
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [revokingId, setRevokingId] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ---------------- LOAD CERTIFICATES ----------------
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCertificates();
        // support both { certificates: [] } and direct []
        setCertificates(Array.isArray(data) ? data : data.certificates || []);
      } catch (err) {
        console.error("Failed to load certificates", err);
        showToast("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  // ---------------- FILTER + SEARCH ----------------
  const filteredCertificates = useMemo(() => {
    let list = [...certificates];

    if (statusFilter !== "all") {
      list = list.filter(
        (c) =>
          (c.status || "").toLowerCase().trim() ===
          statusFilter.toLowerCase().trim()
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => {
        const fields = [
          c.userName,
          c.userEmail,
          c.courseTitle,
          c.certificateCode,
          c.code,
          c.publicId,
          c.certificateId,
        ]
          .filter(Boolean)
          .map(String)
          .map((v) => v.toLowerCase());

        return fields.some((f) => f.includes(q));
      });
    }

    return list;
  }, [certificates, statusFilter, search]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCertificates.length / ROWS_PER_PAGE)
  );

  const paginatedCertificates = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredCertificates.slice(start, start + ROWS_PER_PAGE);
  }, [filteredCertificates, page]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  // ---------------- HELPERS ----------------
  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
    }
  };

  const statusChipColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "issued") return "success";
    if (s === "revoked") return "error";
    return "default";
  };

  // ---------------- REVOKE ----------------
  const handleRevoke = async (id) => {
    if (!window.confirm("Are you sure you want to revoke this certificate?"))
      return;

    try {
      setRevokingId(id);
      await revokeCertificate(id);
      showToast("Certificate revoked", "success");

      const data = await fetchAllCertificates();
      setCertificates(Array.isArray(data) ? data : data.certificates || []);
    } catch (err) {
      console.error(err);
      showToast("Failed to revoke certificate");
    } finally {
      setRevokingId(null);
    }
  };

  // ---------------- RENDER ----------------
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
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
            Certificates
          </Typography>
          <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
            Issued & revoked certificates
          </Typography>
        </Box>

        {/* FILTERS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              minWidth: 140,
              bgcolor: "rgba(15,23,42,0.9)",
              color: "white",
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="issued">Issued</MenuItem>
            <MenuItem value="revoked">Revoked</MenuItem>
          </Select>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(15,23,42,0.9)",
              borderRadius: 2,
              px: 1,
            }}
          >
            <SearchIcon sx={{ fontSize: 20, opacity: 0.6, mr: 0.5 }} />
            <TextField
              variant="standard"
              placeholder="Search user / course / code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: { color: "white", fontSize: 14 },
              }}
              sx={{ minWidth: 260 }}
            />
          </Box>
        </Box>
      </Box>

      {/* TABLE */}
      <Paper
        sx={{
          background: "rgba(15,23,42,0.95)",
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.25)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
          <Typography sx={{ fontWeight: 600 }}>Certificates Listing</Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(51,65,85,0.9)" }} />

        {loading ? (
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Certificate Code</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Issued At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedCertificates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    No certificates found
                  </TableCell>
                </TableRow>
              )}

              {paginatedCertificates.map((c) => {
                const certId = c._id || c.id;

                return (
                  <TableRow key={certId}>
                    <TableCell>
                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        {c.userName || "—"}
                      </Typography>
                      <Typography sx={{ fontSize: 11, opacity: 0.7 }}>
                        {c.userEmail}
                      </Typography>
                    </TableCell>

                    <TableCell>{c.courseTitle || "—"}</TableCell>

                    <TableCell>{c.certificateCode || c.code || "—"}</TableCell>

                    <TableCell>
                      <Chip
                        label={c.status || "—"}
                        size="small"
                        color={statusChipColor(c.status)}
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell>{formatDateTime(c.createdAt)}</TableCell>

                    <TableCell align="right">
                      {certId && (
                        <Tooltip title="View Certificate">
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(`/admin/certificates/${certId}`)
                            }
                            sx={{ color: "cyan" }}
                          >
                            <OpenInNewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}

                      {c.status !== "revoked" && certId && (
                        <Tooltip title="Revoke Certificate">
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => handleRevoke(certId)}
                              disabled={revokingId === certId}
                              sx={{ color: "#f87171" }}
                            >
                              <BlockIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}

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
