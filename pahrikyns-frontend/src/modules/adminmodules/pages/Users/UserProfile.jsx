import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  Stack,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  CircularProgress,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Snackbar,
  Alert,
  Badge,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockResetIcon from "@mui/icons-material/LockReset";
import TimelineIcon from "@mui/icons-material/Timeline";
import PaymentIcon from "@mui/icons-material/Payment";
import SchoolIcon from "@mui/icons-material/School";
import HistoryIcon from "@mui/icons-material/History";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

import { useParams, useNavigate } from "react-router-dom";
import { getUserById, fetchUserPayments, fetchUserActivity } from "../../Adminapi/users";

// ===================================================================
// SMALL HELPER: TabPanel
// ===================================================================
function TabPanel({ children, value, index }) {
  if (value !== index) return null;
  return (
    <Box sx={{ mt: 2 }}>
      {children}
    </Box>
  );
}

// ===================================================================
// MAIN COMPONENT
// ===================================================================
export default function AdminUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);

  const [payments, setPayments] = useState([]);
  const [activity, setActivity] = useState([]);

  const [tab, setTab] = useState(0);
  const [toast, setToast] = useState({ open: false, msg: "", type: "info" });

  const showToast = (msg, type = "info") =>
    setToast({ open: true, msg, type });

  // --------------------------------------------------------------
  // LOAD USER
  // --------------------------------------------------------------
  const loadUser = async () => {
    try {
      setLoadingUser(true);
      const data = await getUserById(userId);
      setUser(data.user || data); // flexible shape
    } catch (err) {
      console.error("Failed to load user:", err);
      showToast("Failed to load user details", "error");
    } finally {
      setLoadingUser(false);
    }
  };

  // --------------------------------------------------------------
  // LOAD PAYMENTS
  // --------------------------------------------------------------
  const loadPayments = async () => {
    try {
      setLoadingPayments(true);
      if (!userId) return;
      const data = await fetchUserPayments(userId);
      setPayments(data.payments || data || []);
    } catch (err) {
      console.error("Failed to load user payments:", err);
      showToast("Failed to load payments", "error");
    } finally {
      setLoadingPayments(false);
    }
  };

  // --------------------------------------------------------------
  // LOAD ACTIVITY
  // --------------------------------------------------------------
  const loadActivity = async () => {
    try {
      setLoadingActivity(true);
      if (!userId) return;
      const data = await fetchUserActivity(userId);
      setActivity(data.activity || data || []);
    } catch (err) {
      console.error("Failed to load user activity:", err);
      showToast("Failed to load activity", "error");
    } finally {
      setLoadingActivity(false);
    }
  };

  // --------------------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------------------
  useEffect(() => {
    loadUser();
    loadPayments();
    loadActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // --------------------------------------------------------------
  // DERIVED STATS
  // --------------------------------------------------------------
  const stats = useMemo(() => {
    const totalPayments = payments.length;
    const totalAmount = payments.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );

    const successfulPayments = payments.filter(
      (p) => p.status === "success" || p.status === "captured"
    );

    const lastPayment = payments[0] || null; // assuming API sorted desc; if not, you can sort

    const lastActivity = activity[0] || null;

    const enrolledCourses = user?.courses || user?.enrolledCourses || [];

    return {
      totalPayments,
      totalAmount,
      successfulCount: successfulPayments.length,
      lastPayment,
      lastActivity,
      enrolledCoursesCount: enrolledCourses.length,
    };
  }, [payments, activity, user]);

  // --------------------------------------------------------------
  // LOADING STATE
  // --------------------------------------------------------------
  const globalLoading = loadingUser && !user;

  if (globalLoading) {
    return (
      <Box
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography color="error" sx={{ mb: 2 }}>
          User not found
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
    );
  }

  const isActive = user.isActive !== false; // default true if undefined
  const isAdmin = user.role === "admin";

  const displayName = user.name || user.fullName || "Unnamed User";
  const initials = displayName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // ===================================================================
  // RENDER
  // ===================================================================
  return (
    <Box>
      {/* HEADER BAR */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/admin/users")}
            sx={{
              borderRadius: 2,
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              {displayName}
            </Typography>
            <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
              User overview · profile · payments · activity
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            icon={isAdmin ? <AdminPanelSettingsIcon /> : <PersonIcon />}
            label={isAdmin ? "Admin" : "Student"}
            size="small"
            color={isAdmin ? "warning" : "info"}
            variant="outlined"
          />
          <Chip
            icon={isActive ? <CheckCircleIcon /> : <BlockIcon />}
            label={isActive ? "Active" : "Blocked"}
            size="small"
            color={isActive ? "success" : "error"}
            variant={isActive ? "outlined" : "filled"}
          />
        </Stack>
      </Box>

      {/* TOP SECTION: PROFILE CARD + STATS */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* LEFT: PROFILE CARD */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              background: "rgba(15,23,42,0.95)",
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.35)",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: "2px solid #020617",
                      backgroundColor: isActive ? "#22c55e" : "#ef4444",
                    }}
                  />
                }
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    fontWeight: 700,
                    bgcolor: "primary.main",
                  }}
                  src={user.avatar || user.profileImage || ""}
                >
                  {initials}
                </Avatar>
              </Badge>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {displayName}
                </Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.8 }}>
                  {user.title || user.designation || "Learner"}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* BASIC INFO */}
            <Stack spacing={1.2} sx={{ fontSize: 14 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                <Typography sx={{ fontSize: 13 }}>
                  {user.email || "-"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                <Typography sx={{ fontSize: 13 }}>
                  {user.phone || user.mobile || "-"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarMonthIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                <Typography sx={{ fontSize: 13 }}>
                  Joined:{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <LockOpenIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                <Typography sx={{ fontSize: 13 }}>
                  Last login:{" "}
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleString()
                    : "No login records"}
                </Typography>
              </Stack>
            </Stack>

            {/* EXTRA INFO */}
            <Divider sx={{ my: 2 }} />
            <Typography
              sx={{ fontSize: 12, textTransform: "uppercase", opacity: 0.6 }}
            >
              Meta
            </Typography>
            <Stack spacing={0.8} sx={{ mt: 1 }}>
              <Typography sx={{ fontSize: 12, opacity: 0.8 }}>
                ID: <b>{user._id || user.id}</b>
              </Typography>
              {user.country && (
                <Typography sx={{ fontSize: 12, opacity: 0.8 }}>
                  Country: <b>{user.country}</b>
                </Typography>
              )}
              {user.timezone && (
                <Typography sx={{ fontSize: 12, opacity: 0.8 }}>
                  Timezone: <b>{user.timezone}</b>
                </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>

        {/* RIGHT: STATS CARDS */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* TOTAL SPENT */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  background:
                    "linear-gradient(135deg, rgba(8,47,73,0.9), rgba(15,23,42,0.95))",
                  borderRadius: 3,
                  border: "1px solid rgba(125,211,252,0.4)",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
                    Total Spent
                  </Typography>
                  <PaymentIcon sx={{ fontSize: 18, opacity: 0.9 }} />
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  ₹{stats.totalAmount.toLocaleString("en-IN")}
                </Typography>
                <Typography sx={{ fontSize: 11, opacity: 0.7, mt: 0.5 }}>
                  {stats.totalPayments} payments ·{" "}
                  {stats.successfulCount} successful
                </Typography>

                {loadingPayments && (
                  <LinearProgress
                    sx={{ mt: 1.5, borderRadius: 9999 }}
                  />
                )}
              </Paper>
            </Grid>

            {/* COURSES */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  background:
                    "linear-gradient(135deg, rgba(30,64,175,0.9), rgba(15,23,42,0.95))",
                  borderRadius: 3,
                  border: "1px solid rgba(129,140,248,0.5)",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
                    Enrolled Courses
                  </Typography>
                  <SchoolIcon sx={{ fontSize: 18, opacity: 0.9 }} />
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {stats.enrolledCoursesCount}
                </Typography>
                <Typography sx={{ fontSize: 11, opacity: 0.7, mt: 0.5 }}>
                  Active learning journey
                </Typography>

                {/* small fake progress */}
                <LinearProgress
                  variant="determinate"
                  value={
                    stats.enrolledCoursesCount
                      ? Math.min(100, stats.enrolledCoursesCount * 10)
                      : 10
                  }
                  sx={{ mt: 1.5, borderRadius: 9999 }}
                />
              </Paper>
            </Grid>

            {/* LAST ACTIVITY / PAYMENT */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  background:
                    "linear-gradient(135deg, rgba(22,101,52,0.9), rgba(15,23,42,0.95))",
                  borderRadius: 3,
                  border: "1px solid rgba(74,222,128,0.4)",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
                    Recent Activity
                  </Typography>
                  <TimelineIcon sx={{ fontSize: 18, opacity: 0.9 }} />
                </Stack>

                <Typography
                  sx={{
                    fontSize: 12,
                    opacity: 0.9,
                    minHeight: 32,
                  }}
                >
                  {stats.lastActivity
                    ? stats.lastActivity.description ||
                      stats.lastActivity.type ||
                      "Recent event"
                    : "No recent activity"}
                </Typography>
                <Typography sx={{ fontSize: 11, opacity: 0.7, mt: 0.5 }}>
                  {stats.lastActivity?.createdAt
                    ? new Date(
                        stats.lastActivity.createdAt
                      ).toLocaleString()
                    : "-"}
                </Typography>

                {stats.lastPayment && (
                  <Typography
                    sx={{ fontSize: 11, opacity: 0.75, mt: 1 }}
                  >
                    Last payment: ₹
                    {(stats.lastPayment.amount || 0).toLocaleString(
                      "en-IN"
                    )}{" "}
                    •{" "}
                    {stats.lastPayment.status || "unknown"}
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* TABS */}
      <Paper
        sx={{
          background: "rgba(15,23,42,0.98)",
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.25)",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid rgba(51,65,85,0.9)",
            px: 2,
            pt: 1,
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Profile" />
            <Tab label="Courses" />
            <Tab label="Payments" />
            <Tab label="Activity" />
            <Tab label="Security" />
          </Tabs>
        </Box>

        <Box sx={{ p: 2.5 }}>
          {/* PROFILE TAB */}
          <TabPanel value={tab} index={0}>
            <Grid container spacing={3}>
              {/* LEFT - Details */}
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: 15,
                  }}
                >
                  Personal Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1.5} sx={{ fontSize: 14 }}>
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ width: 120, opacity: 0.7 }}>
                      Full name
                    </Typography>
                    <Typography>{displayName}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ width: 120, opacity: 0.7 }}>
                      Email
                    </Typography>
                    <Typography>{user.email || "-"}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ width: 120, opacity: 0.7 }}>
                      Phone
                    </Typography>
                    <Typography>
                      {user.phone || user.mobile || "-"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ width: 120, opacity: 0.7 }}>
                      Role
                    </Typography>
                    <Typography>{user.role || "student"}</Typography>
                  </Stack>

                  {user.city || user.state || user.country ? (
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{ width: 120, opacity: 0.7 }}>
                        Location
                      </Typography>
                      <Typography>
                        {[user.city, user.state, user.country]
                          .filter(Boolean)
                          .join(", ") || "-"}
                      </Typography>
                    </Stack>
                  ) : null}

                  {user.company || user.organization ? (
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{ width: 120, opacity: 0.7 }}>
                        Company
                      </Typography>
                      <Typography>
                        {user.company || user.organization}
                      </Typography>
                    </Stack>
                  ) : null}
                </Stack>
              </Grid>

              {/* RIGHT - Meta / Preferences */}
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: 15,
                  }}
                >
                  Account & Preferences
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ width: 140, opacity: 0.7 }}>
                      Status
                    </Typography>
                    <Chip
                      size="small"
                      icon={
                        isActive ? <CheckCircleIcon /> : <BlockIcon />
                      }
                      label={isActive ? "Active" : "Blocked"}
                      color={isActive ? "success" : "error"}
                      variant={isActive ? "outlined" : "filled"}
                    />
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ width: 140, opacity: 0.7 }}>
                      2FA enabled
                    </Typography>
                    <Chip
                      size="small"
                      icon={<LockResetIcon />}
                      label={user.is2FAEnabled ? "Enabled" : "Disabled"}
                      color={user.is2FAEnabled ? "success" : "default"}
                      variant={
                        user.is2FAEnabled ? "outlined" : "outlined"
                      }
                    />
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ width: 140, opacity: 0.7 }}>
                      Last password reset
                    </Typography>
                    <Typography sx={{ fontSize: 13 }}>
                      {user.passwordChangedAt
                        ? new Date(
                            user.passwordChangedAt
                          ).toLocaleString()
                        : "No record"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Typography sx={{ width: 140, opacity: 0.7 }}>
                      Last login IP
                    </Typography>
                    <Typography sx={{ fontSize: 13 }}>
                      {user.lastLoginIp || "-"}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>

          {/* COURSES TAB */}
          <TabPanel value={tab} index={1}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: 15,
              }}
            >
              Courses
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {stats.enrolledCoursesCount === 0 ? (
              <Typography sx={{ opacity: 0.8, fontSize: 14 }}>
                This user has not enrolled in any course yet.
              </Typography>
            ) : (
              <List dense>
                {(user.courses || user.enrolledCourses || []).map(
                  (course) => (
                    <ListItem
                      key={course._id || course.id}
                      sx={{
                        borderRadius: 2,
                        mb: 0.7,
                        border: "1px solid rgba(51,65,85,0.8)",
                        background: "rgba(15,23,42,0.9)",
                      }}
                    >
                      <ListItemIcon>
                        <SchoolIcon sx={{ fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontSize: 14 }}>
                            {course.title || course.name}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                            Progress:{" "}
                            {course.progress != null
                              ? `${course.progress}%`
                              : "N/A"}{" "}
                            · Enrolled on{" "}
                            {course.enrolledAt
                              ? new Date(
                                  course.enrolledAt
                                ).toLocaleDateString()
                              : "-"}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )
                )}
              </List>
            )}
          </TabPanel>

          {/* PAYMENTS TAB */}
          <TabPanel value={tab} index={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Payments
              </Typography>

              <Tooltip title="Refresh payments">
                <IconButton size="small" onClick={loadPayments}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {loadingPayments ? (
              <Box
                sx={{
                  py: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={24} />
              </Box>
            ) : payments.length === 0 ? (
              <Typography sx={{ opacity: 0.8, fontSize: 14 }}>
                No payments found for this user.
              </Typography>
            ) : (
              <Box
                sx={{
                  maxHeight: 360,
                  overflow: "auto",
                  pr: 1,
                }}
              >
                <List dense>
                  {payments.map((p) => (
                    <ListItem
                      key={p._id || p.id}
                      sx={{
                        borderRadius: 2,
                        mb: 0.7,
                        border: "1px solid rgba(51,65,85,0.9)",
                        background: "rgba(15,23,42,0.95)",
                      }}
                    >
                      <ListItemIcon>
                        <PaymentIcon sx={{ fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography sx={{ fontSize: 14 }}>
                              ₹{(p.amount || 0).toLocaleString("en-IN")}
                            </Typography>
                            <Chip
                              size="small"
                              label={p.status || "unknown"}
                              color={
                                p.status === "success" ||
                                p.status === "captured"
                                  ? "success"
                                  : p.status === "failed"
                                  ? "error"
                                  : "warning"
                              }
                              variant="outlined"
                            />
                          </Stack>
                        }
                        secondary={
                          <Typography sx={{ fontSize: 11, opacity: 0.75 }}>
                            Order: {p.orderId || "-"} · Razorpay:{" "}
                            {p.razorpayPaymentId || "-"} ·{" "}
                            {p.createdAt
                              ? new Date(
                                  p.createdAt
                                ).toLocaleString()
                              : "-"}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </TabPanel>

          {/* ACTIVITY TAB */}
          <TabPanel value={tab} index={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Activity Timeline
              </Typography>

              <Tooltip title="Refresh activity">
                <IconButton size="small" onClick={loadActivity}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {loadingActivity ? (
              <Box
                sx={{
                  py: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={24} />
              </Box>
            ) : activity.length === 0 ? (
              <Typography sx={{ opacity: 0.8, fontSize: 14 }}>
                No activity events recorded for this user.
              </Typography>
            ) : (
              <Box
                sx={{
                  maxHeight: 360,
                  overflow: "auto",
                  pr: 1,
                }}
              >
                <List dense>
                  {activity.map((a) => (
                    <ListItem
                      key={a._id || a.id}
                      sx={{
                        borderRadius: 2,
                        mb: 0.7,
                        border: "1px solid rgba(51,65,85,0.9)",
                        background: "rgba(15,23,42,0.95)",
                      }}
                    >
                      <ListItemIcon>
                        <HistoryIcon sx={{ fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontSize: 14 }}>
                            {a.description ||
                              a.event ||
                              a.type ||
                              "Activity"}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ fontSize: 11, opacity: 0.75 }}>
                            {a.createdAt
                              ? new Date(
                                  a.createdAt
                                ).toLocaleString()
                              : "-"}
                            {a.ip && ` · IP ${a.ip}`}
                            {a.userAgent && ` · ${a.userAgent}`}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </TabPanel>

          {/* SECURITY TAB */}
          <TabPanel value={tab} index={4}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: 15,
              }}
            >
              Security & Sessions
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(51,65,85,0.9)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  >
                    Account Security
                  </Typography>

                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1}>
                      <Typography
                        sx={{ width: 140, opacity: 0.7, fontSize: 13 }}
                      >
                        2FA Status
                      </Typography>
                      <Chip
                        size="small"
                        icon={<LockResetIcon />}
                        label={
                          user.is2FAEnabled ? "Enabled" : "Disabled"
                        }
                        color={
                          user.is2FAEnabled ? "success" : "default"
                        }
                        variant="outlined"
                      />
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Typography
                        sx={{ width: 140, opacity: 0.7, fontSize: 13 }}
                      >
                        Last Login IP
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {user.lastLoginIp || "-"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Typography
                        sx={{ width: 140, opacity: 0.7, fontSize: 13 }}
                      >
                        Last Login Device
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {user.lastLoginDevice || "Unknown"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Typography
                        sx={{ width: 140, opacity: 0.7, fontSize: 13 }}
                      >
                        Password Changed
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {user.passwordChangedAt
                          ? new Date(
                              user.passwordChangedAt
                            ).toLocaleString()
                          : "Never"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(51,65,85,0.9)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  >
                    Session Summary
                  </Typography>

                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1}>
                      <Typography
                        sx={{ width: 140, opacity: 0.7, fontSize: 13 }}
                      >
                        Current Status
                      </Typography>
                      <Chip
                        size="small"
                        icon={
                          isActive ? <CheckCircleIcon /> : <BlockIcon />
                        }
                        label={isActive ? "Allowed" : "Blocked"}
                        color={isActive ? "success" : "error"}
                        variant="outlined"
                      />
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Typography
                        sx={{ width: 140, opacity: 0.7, fontSize: 13 }}
                      >
                        Sessions Count
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {user.sessionsCount != null
                          ? user.sessionsCount
                          : "N/A"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Typography
                        sx={{ width: 140, opacity: 0.7, fontSize: 13 }}
                      >
                        Last Active
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {user.lastActiveAt
                          ? new Date(
                              user.lastActiveAt
                            ).toLocaleString()
                          : "-"}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      sx={{ fontSize: 11, opacity: 0.6, mb: 0.5 }}
                    >
                      Note
                    </Typography>
                    <Typography sx={{ fontSize: 11, opacity: 0.7 }}>
                      In a real system, you can add actions here like:
                      force logout all sessions, reset password, block
                      account, etc. For now this is a read-only view.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Paper>

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      >
        <Alert
          severity={toast.type}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
