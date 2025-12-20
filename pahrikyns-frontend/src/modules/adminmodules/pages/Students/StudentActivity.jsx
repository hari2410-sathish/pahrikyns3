import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Chip,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, fetchStudentActivity } from "../../../api/users";

export default function StudentActivity() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [activity, setActivity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ---------- LOAD USER ----------
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoadingUser(true);
        const data = await getStudentById(studentId);
        setStudent(data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load student");
      } finally {
        setLoadingUser(false);
      }
    };
    loadUser();
  }, [studentId]);

  // ---------- LOAD ACTIVITY ----------
  useEffect(() => {
    const loadActivity = async () => {
      try {
        setLoading(true);
        const data = await fetchStudentActivity(studentId);
        // expecting { activity: [] } or []
        setActivity(data.activity || data || []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load activity");
      } finally {
        setLoading(false);
      }
    };
    loadActivity();
  }, [studentId]);

  // ---------- FILTER + SEARCH ----------
  const filteredActivity = useMemo(() => {
    let list = [...activity];

    if (typeFilter !== "all") {
      list = list.filter(
        (a) => (a.type || "").toLowerCase() === typeFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((a) => {
        const fields = [
          a.title,
          a.description,
          a.courseTitle,
          a.meta?.device,
          a.meta?.ip,
        ]
          .filter(Boolean)
          .map(String)
          .map((v) => v.toLowerCase());
        return fields.some((f) => f.includes(q));
      });
    }

    // newest first
    return list.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [activity, typeFilter, search]);

  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
    }
  };

  const typeChipColor = (type) => {
    const t = (type || "").toLowerCase();
    if (["login", "logout", "device"].includes(t)) return "info";
    if (["payment", "subscription"].includes(t)) return "success";
    if (["course", "lesson"].includes(t)) return "primary";
    if (["security", "blocked"].includes(t)) return "error";
    return "default";
  };

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              Student Activity
            </Typography>
            {loadingUser ? (
              <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
                Loading student…
              </Typography>
            ) : student ? (
              <Typography sx={{ opacity: 0.8, fontSize: 14 }}>
                {student.name} • {student.email}
              </Typography>
            ) : (
              <Typography sx={{ opacity: 0.7, fontSize: 14, color: "salmon" }}>
                Student not found
              </Typography>
            )}
          </Box>
        </Box>

        {/* FILTERS */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Select
            size="small"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={{
              minWidth: 150,
              bgcolor: "rgba(15,23,42,0.9)",
              color: "white",
            }}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="login">Login / Device</MenuItem>
            <MenuItem value="course">Course / Lesson</MenuItem>
            <MenuItem value="payment">Payments</MenuItem>
            <MenuItem value="certificate">Certificates</MenuItem>
            <MenuItem value="security">Security</MenuItem>
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
              placeholder="Search activity / course / device"
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

      {/* TIMELINE */}
      <Paper
        sx={{
          p: 2.5,
          borderRadius: 3,
          background: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(148,163,184,0.25)",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <Typography sx={{ fontWeight: 600, mb: 1 }}>Timeline</Typography>
        <Divider sx={{ mb: 2, borderColor: "rgba(51,65,85,0.9)" }} />

        {loading ? (
          <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : filteredActivity.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center", opacity: 0.8 }}>
            <Typography>No activity found</Typography>
          </Box>
        ) : (
          <Box sx={{ position: "relative" }}>
            {/* vertical line */}
            <Box
              sx={{
                position: "absolute",
                left: 16,
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: "rgba(51,65,85,0.9)",
              }}
            />

            {filteredActivity.map((a) => (
              <Box
                key={a._id || a.id}
                sx={{
                  display: "flex",
                  position: "relative",
                  pl: 5,
                  mb: 2.5,
                }}
              >
                {/* dot */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 11,
                    top: 6,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "cyan",
                    boxShadow: "0 0 0 4px rgba(34,211,238,0.15)",
                  }}
                />

                <Box
                  sx={{
                    flex: 1,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(75,85,99,0.6)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 600, mr: 1 }}
                    >
                      {a.title || a.type || "Activity"}
                    </Typography>

                    <Chip
                      size="small"
                      label={a.type || "other"}
                      color={typeChipColor(a.type)}
                      variant="outlined"
                    />
                  </Box>

                  {a.courseTitle && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        opacity: 0.85,
                        mb: a.description ? 0.5 : 0,
                      }}
                    >
                      Course: {a.courseTitle}
                    </Typography>
                  )}

                  {a.description && (
                    <Typography sx={{ fontSize: 12, opacity: 0.9 }}>
                      {a.description}
                    </Typography>
                  )}

                  {/* meta row */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      mt: 1,
                      fontSize: 11,
                      opacity: 0.7,
                    }}
                  >
                    <span>{formatDateTime(a.createdAt)}</span>
                    {a.meta?.device && <span>• {a.meta.device}</span>}
                    {a.meta?.ip && <span>• IP: {a.meta.ip}</span>}
                    {a.meta?.location && <span>• {a.meta.location}</span>}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
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
