import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Chip,
  Divider,
  Grid,
  Stack,
  Select,
  MenuItem,
  TextField,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TimelineIcon from "@mui/icons-material/Timeline";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PublicIcon from "@mui/icons-material/Public";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate, useParams } from "react-router-dom";
import { fetchUserActivity, getUserById } from "../../Adminapi/users";

// how many events per page (client-side)
const ROWS_PER_PAGE = 25;

export default function UserActivity() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const [range, setRange] = useState("30"); // 7 / 30 / all
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ---------- HELPERS ----------
  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return String(value);
    }
  };

  const normalizeType = (t) => (t || "other").toLowerCase();

  const getTypeLabel = (t) => {
    const s = normalizeType(t);
    if (s === "login") return "Login";
    if (s === "logout") return "Logout";
    if (s === "course") return "Course";
    if (s === "payment") return "Payment";
    if (s === "security") return "Security";
    return "Other";
  };

  const getTypeColor = (t) => {
    const s = normalizeType(t);
    if (s === "login") return "success";
    if (s === "logout") return "default";
    if (s === "course") return "primary";
    if (s === "payment") return "warning";
    if (s === "security") return "error";
    return "default";
  };

  const getDeviceIcon = (deviceType) => {
    const d = (deviceType || "").toLowerCase();
    if (d.includes("mobile") || d.includes("phone")) return <PhoneIphoneIcon fontSize="small" />;
    return <LaptopMacIcon fontSize="small" />;
  };

  const calcRangeStart = () => {
    if (range === "all") return null;
    const days = Number(range) || 30;
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.getTime();
  };

  // ---------- LOAD USER ----------
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoadingUser(true);
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        console.error("Failed to load user", err);
        showToast("Failed to load user details");
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [userId]);

  // ---------- LOAD ACTIVITY ----------
  useEffect(() => {
    const loadActivity = async () => {
      try {
        setLoading(true);
        const data = await fetchUserActivity(userId);
        // expecting { activity: [...] } or direct array
        setActivity(data.activity || data || []);
      } catch (err) {
        console.error("Failed to load user activity", err);
        showToast("Failed to load user activity");
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, [userId]);

  // ---------- FILTER + SEARCH ----------
  const filteredActivity = useMemo(() => {
    let list = [...activity];

    const startTs = calcRangeStart();
    if (startTs) {
      list = list.filter((a) => {
        if (!a.createdAt) return false;
        const ts = new Date(a.createdAt).getTime();
        return ts >= startTs;
      });
    }

    if (typeFilter !== "all") {
      list = list.filter(
        (a) => normalizeType(a.type) === typeFilter
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((a) => {
        const fields = [
          a.title,
          a.action,
          a.description,
          a.courseTitle,
          a.courseName,
          a.ip,
          a.device,
          a.browser,
          a.location,
        ]
          .filter(Boolean)
          .map((v) => String(v).toLowerCase());

        return fields.some((f) => f.includes(q));
      });
    }

    // sort newest -> oldest
    list.sort((a, b) => {
      const ta = new Date(a.createdAt || 0).getTime();
      const tb = new Date(b.createdAt || 0).getTime();
      return tb - ta;
    });

    return list;
  }, [activity, range, typeFilter, search]);

  // ---------- STATS ----------
  const stats = useMemo(() => {
    if (!activity.length) {
      return {
        totalEvents: 0,
        lastActiveAt: null,
        lastLoginAt: null,
        uniqueCourses: 0,
      };
    }

    let lastActiveAt = null;
    let lastLoginAt = null;
    const courseSet = new Set();

    activity.forEach((a) => {
      if (a.createdAt) {
        const t = new Date(a.createdAt).getTime();
        if (!lastActiveAt || t > lastActiveAt) lastActiveAt = t;
      }

      if (normalizeType(a.type) === "login" && a.createdAt) {
        const t = new Date(a.createdAt).getTime();
        if (!lastLoginAt || t > lastLoginAt) lastLoginAt = t;
      }

      if (a.courseId || a.courseTitle || a.courseName) {
        courseSet.add(a.courseId || a.courseTitle || a.courseName);
      }
    });

    return {
      totalEvents: activity.length,
      lastActiveAt,
      lastLoginAt,
      uniqueCourses: courseSet.size,
    };
  }, [activity]);

  // ---------- GROUP BY DATE ----------
  const groupedByDate = useMemo(() => {
    const groups = {};
    filteredActivity.forEach((a) => {
      const key = formatDate(a.createdAt);
      if (!groups[key]) groups[key] = [];
      groups[key].push(a);
    });

    const entries = Object.entries(groups).sort(
      (a, b) =>
        new Date(b[0]).getTime() - new Date(a[0]).getTime()
    );

    return entries;
  }, [filteredActivity]);

  // simple client-side pagination over groups (flatten)
  const flatList = useMemo(() => {
    const list = [];
    groupedByDate.forEach(([dateLabel, items]) => {
      list.push({ _type: "date", dateLabel });
      items.forEach((a) =>
        list.push({ _type: "item", dateLabel, activity: a })
      );
    });
    return list;
  }, [groupedByDate]);

  const totalPages = Math.max(
    1,
    Math.ceil(flatList.length / ROWS_PER_PAGE)
  );

  const paginatedList = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return flatList.slice(start, start + ROWS_PER_PAGE);
  }, [flatList, page]);

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [range, typeFilter, search]);

  // ---------- RENDER ----------
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
              User Activity
            </Typography>
            {loadingUser ? (
              <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
                Loading user details…
              </Typography>
            ) : user ? (
              <Typography sx={{ opacity: 0.8, fontSize: 14 }}>
                {user.name || user.fullName} • {user.email}
              </Typography>
            ) : (
              <Typography sx={{ opacity: 0.7, fontSize: 14, color: "salmon" }}>
                User not found
              </Typography>
            )}
          </Box>
        </Box>

        {/* FILTERS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Select
            size="small"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            sx={{
              minWidth: 120,
              bgcolor: "rgba(15,23,42,0.9)",
              color: "white",
            }}
          >
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="all">All time</MenuItem>
          </Select>

          <Select
            size="small"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={{
              minWidth: 140,
              bgcolor: "rgba(15,23,42,0.9)",
              color: "white",
            }}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="login">Login</MenuItem>
            <MenuItem value="logout">Logout</MenuItem>
            <MenuItem value="course">Course</MenuItem>
            <MenuItem value="payment">Payment</MenuItem>
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
              placeholder="Search course / IP / device"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: { color: "white", fontSize: 14 },
              }}
              sx={{ minWidth: 240 }}
            />
          </Box>
        </Box>
      </Box>

      {/* STATS CARDS */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(37,99,235,0.9))",
              border: "1px solid rgba(129,140,248,0.7)",
            }}
          >
            <Typography sx={{ fontSize: 13, opacity: 0.85 }}>
              Total Events
            </Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 800, mt: 1 }}>
              {stats.totalEvents}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 0.5 }}>
              All recorded log entries
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(5,46,22,0.95), rgba(22,163,74,0.9))",
              border: "1px solid rgba(74,222,128,0.7)",
            }}
          >
            <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
              Last Active
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600, mt: 1 }}>
              {stats.lastActiveAt ? formatDateTime(stats.lastActiveAt) : "—"}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 0.5 }}>
              Latest event across the platform
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(30,64,175,0.95), rgba(56,189,248,0.9))",
              border: "1px solid rgba(56,189,248,0.8)",
            }}
          >
            <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
              Last Login
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600, mt: 1 }}>
              {stats.lastLoginAt ? formatDateTime(stats.lastLoginAt) : "—"}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.8, mt: 0.5 }}>
              Based on login events
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(88,28,135,0.95), rgba(168,85,247,0.9))",
              border: "1px solid rgba(216,180,254,0.8)",
            }}
          >
            <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
              Courses Touched
            </Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 800, mt: 1 }}>
              {stats.uniqueCourses}
            </Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.85, mt: 0.5 }}>
              Unique courses with activity
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* TIMELINE CARD */}
      <Paper
        sx={{
          background: "rgba(15,23,42,0.95)",
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.25)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            pt: 2,
            pb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TimelineIcon sx={{ opacity: 0.9 }} />
            <Typography sx={{ fontWeight: 600 }}>Activity Timeline</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
            Showing {filteredActivity.length} of {activity.length} events
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(51,65,85,0.9)" }} />

        {loading ? (
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <List
            dense
            sx={{
              px: 0,
              py: 1,
              maxHeight: 560,
              overflowY: "auto",
            }}
          >
            {paginatedList.length === 0 && (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography sx={{ opacity: 0.8 }}>
                  No activity found for selected filters
                </Typography>
              </Box>
            )}

            {paginatedList.map((row, index) => {
              if (row._type === "date") {
                return (
                  <ListItem
                    key={`date-${row.dateLabel}-${index}`}
                    sx={{
                      py: 1,
                      px: 2.5,
                      position: "relative",
                      bgcolor: "rgba(15,23,42,1)",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ color: "rgba(148,163,184,0.9)" }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "rgba(56,189,248,0.9)",
                        }}
                      />
                      <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                        {row.dateLabel}
                      </Typography>
                    </Stack>
                  </ListItem>
                );
              }

              const a = row.activity;
              const key = a._id || a.id || index;

              return (
                <ListItem
                  key={key}
                  sx={{
                    px: 2.5,
                    py: 1.3,
                    alignItems: "flex-start",
                    "&:hover": {
                      bgcolor: "rgba(15,23,42,0.9)",
                    },
                  }}
                >
                  {/* timeline bullet + line */}
                  <Box
                    sx={{
                      mr: 2,
                      mt: 0.8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "999px",
                        border: "2px solid rgba(56,189,248,0.9)",
                        bgcolor: "rgba(15,23,42,1)",
                      }}
                    />
                    <Box
                      sx={{
                        flex: 1,
                        width: 2,
                        bgcolor: "rgba(30,64,175,0.7)",
                        mt: 0.5,
                      }}
                    />
                  </Box>

                  {/* main content */}
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip
                            size="small"
                            label={getTypeLabel(a.type)}
                            color={getTypeColor(a.type)}
                            variant="outlined"
                            sx={{ fontSize: 11, height: 22 }}
                          />
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              maxWidth: 420,
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {a.action ||
                              a.title ||
                              a.description ||
                              "Activity"}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 11,
                            opacity: 0.7,
                            minWidth: 150,
                            textAlign: "right",
                          }}
                        >
                          {formatDateTime(a.createdAt)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.7 }}>
                        <Grid container spacing={1}>
                          {/* Course info */}
                          {(a.courseTitle || a.courseName) && (
                            <Grid item xs={12} md={4}>
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  opacity: 0.9,
                                  fontWeight: 500,
                                }}
                              >
                                {a.courseTitle || a.courseName}
                              </Typography>
                              {a.lessonTitle && (
                                <Typography
                                  sx={{ fontSize: 11, opacity: 0.7, mt: 0.2 }}
                                >
                                  Lesson: {a.lessonTitle}
                                </Typography>
                              )}
                            </Grid>
                          )}

                          {/* Device + IP */}
                          <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Tooltip title={a.device || "Device"}>
                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  alignItems="center"
                                >
                                  {getDeviceIcon(a.deviceType || a.device)}
                                  <Typography sx={{ fontSize: 11, opacity: 0.8 }}>
                                    {a.device || a.deviceType || "Unknown device"}
                                  </Typography>
                                </Stack>
                              </Tooltip>

                              <Tooltip title="IP address">
                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  alignItems="center"
                                >
                                  <PublicIcon
                                    sx={{ fontSize: 14, opacity: 0.7 }}
                                  />
                                  <Typography sx={{ fontSize: 11, opacity: 0.8 }}>
                                    {a.ip || "IP —"}
                                  </Typography>
                                </Stack>
                              </Tooltip>
                            </Stack>

                            {a.location && (
                              <Typography
                                sx={{ fontSize: 11, opacity: 0.7, mt: 0.3 }}
                              >
                                Location: {a.location}
                              </Typography>
                            )}
                          </Grid>

                          {/* Extra meta */}
                          <Grid item xs={12} md={4}>
                            {(a.browser || a.os || a.meta) && (
                              <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                              >
                                <InfoOutlinedIcon
                                  sx={{ fontSize: 14, opacity: 0.7 }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: 11,
                                    opacity: 0.8,
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                  }}
                                >
                                  {a.browser && `Browser: ${a.browser} `}
                                  {a.os && `• OS: ${a.os} `}
                                  {a.meta &&
                                    `• ${typeof a.meta === "string"
                                      ? a.meta
                                      : JSON.stringify(a.meta)
                                    }`}
                                </Typography>
                              </Stack>
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>

      {/* SIMPLE PAGE INDICATOR (no big pagination component to keep UI clean) */}
      {totalPages > 1 && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
          sx={{ mt: 2.5, fontSize: 12 }}
        >
          <IconButton
            size="small"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            {"<"}
          </IconButton>
          <Typography sx={{ fontSize: 13 }}>
            Page {page} of {totalPages}
          </Typography>
          <IconButton
            size="small"
            disabled={page === totalPages}
            onClick={() =>
              setPage((p) => Math.min(totalPages, p + 1))
            }
          >
            {">"}
          </IconButton>
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
