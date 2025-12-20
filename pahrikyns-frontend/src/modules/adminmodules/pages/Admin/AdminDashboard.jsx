import React, { useState, useEffect, useMemo } from "react";

/* ================= API ================= */
import {
  getAdminSummary,
  getAdminEnrollments,
  getAdminActivity,
  getAdminCompletion,
} from "../../Adminapi/admin";
import { fetchDashboardTransactions } from "../../Adminapi/paymentsAdmin";

/* ================= UTILS ================= */
import { generateInvoicePDF } from "../../../../utils/generateInvoicePDF";

/* ================= CHARTS ================= */
import PieMini from "../../components/chart/PieMini";
import LineChart from "../../components/chart/LineChart";
import BarChart from "../../components/chart/BarChart";

/* ================= MUI ================= */
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Skeleton,
  Tooltip,
} from "@mui/material";

/* ================= ICONS ================= */
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

/* =====================================================
   KPI CARD
===================================================== */
function KPI({ title, value, icon, hint, loading }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "#020617",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontSize={12} sx={{ opacity: 0.6 }}>
              {title}
            </Typography>
            {hint && (
              <Tooltip title={hint}>
                <Typography fontSize={11} sx={{ cursor: "help" }}>
                  ⓘ
                </Typography>
              </Tooltip>
            )}
          </Stack>

          {loading ? (
            <Skeleton width={80} height={26} />
          ) : (
            <Typography fontSize={26} fontWeight={800}>
              {value}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(56,189,248,0.12)",
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Paper>
  );
}

/* =====================================================
   ADMIN DASHBOARD
===================================================== */
export default function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [portfolioData, setPortfolioData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const [
          summaryRes,
          enrollmentsRes,
          activityRes,
          completionRes,
          transactionsRes,
        ] = await Promise.all([
          getAdminSummary(),
          getAdminEnrollments(),
          getAdminActivity(),
          getAdminCompletion(),
          fetchDashboardTransactions(),
        ]);

        setSummary(summaryRes || {});
        setPortfolioData(
          (enrollmentsRes || []).map((i) => ({ value: i.count }))
        );
        setVolumeData(
          (activityRes || []).map((i) => ({ value: i.value }))
        );
        setCompletionPercent(completionRes?.percentage || 0);
        setRecentTransactions(transactionsRes?.data?.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  /* ================= HELPERS ================= */
  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const totalTxAmount = useMemo(() => {
    return recentTransactions.reduce(
      (sum, tx) => sum + (tx.amount || 0),
      0
    );
  }, [recentTransactions]);

  /* ================= UI ================= */
  return (
    <Box sx={{ minHeight: "100vh", p: 4, bgcolor: "#020617", color: "#fff" }}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Box>
          <Typography fontSize={24} fontWeight={800}>
            Admin Dashboard
          </Typography>
          <Typography fontSize={12} sx={{ opacity: 0.6 }}>
            Business overview
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Chip label={loading ? "Syncing..." : "Live"} size="small" />
          <IconButton>
            <NotificationsNoneIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
      </Stack>

      {/* KPI */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <KPI
            title="Revenue"
            value={formatCurrency(summary.revenue)}
            icon={<MonetizationOnIcon sx={{ color: "#38bdf8" }} />}
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <KPI
            title="Students"
            value={summary.totalStudents || 0}
            icon={<PeopleIcon sx={{ color: "#22c55e" }} />}
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <KPI
            title="Active"
            value={summary.activeStudents || 0}
            icon={<ShowChartIcon sx={{ color: "#a855f7" }} />}
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <KPI
            title="Completion"
            value={`${completionPercent}%`}
            icon={<TimelineIcon />}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* CHARTS */}
      <Grid container spacing={4} mt={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={700} mb={2}>
              Monthly Enrollments
            </Typography>
            <LineChart data={portfolioData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography fontWeight={700}>Completion</Typography>
            <PieMini value={completionPercent} />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={700}>Daily Activity</Typography>
            <BarChart data={volumeData} />
          </Paper>
        </Grid>
      </Grid>

      {/* TRANSACTIONS */}
      <Paper sx={{ mt: 5, p: 3 }}>
        <Typography fontWeight={700} mb={2}>
          Recent Transactions
        </Typography>

        <List>
          {recentTransactions.map((tx) => (
            <React.Fragment key={tx.id}>
              <ListItem
                secondaryAction={
                  <Button onClick={() => generateInvoicePDF(tx)} size="small">
                    Invoice
                  </Button>
                }
              >
                <ListItemText
                  primary={tx.id}
                  secondary={`${tx.status} • ${formatCurrency(
                    tx.amount
                  )}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
