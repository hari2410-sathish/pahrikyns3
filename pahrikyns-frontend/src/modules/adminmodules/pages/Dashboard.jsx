import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

/* ================= COMPONENT ================= */
export default function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [revenueData, setRevenueData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            try {
                const [sumRes, revRes, txnRes] = await Promise.all([
                    axios.get("/admin/dashboard/summary"),
                    axios.get("/admin/dashboard/revenue"),
                    axios.get("/admin/dashboard/transactions?limit=5"),
                ]);

                setSummary(sumRes.data);
                setRevenueData(revRes.data);
                setTransactions(txnRes.data.data);
            } catch (err) {
                console.error("Dashboard init error", err);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    if (loading) return <Box p={4} color="white">Loading Dashboard...</Box>;

    return (
        <Box sx={{ p: 4, color: "white" }}>
            <Typography variant="h4" fontWeight={800} mb={4} sx={{ background: "linear-gradient(90deg, #00eaff, #7b3fe4)", - webkit - background - clip: "text", -webkit-text-fill-color: "transparent" }}>
            Admin Dashboard
        </Typography>

      {/* 1. STATS CARDS */ }
      <Grid container spacing={3} mb={4}>
        <StatCard 
            title="Total Revenue" 
            value={`₹${summary?.revenue?.toLocaleString("en-IN") || 0}`} 
            icon={<TrendingUpIcon fontSize="large" sx={{ color: "#00eaff" }} />} 
        />
        <StatCard 
            title="Students" 
            value={summary?.totalStudents || 0} 
            icon={<PeopleIcon fontSize="large" sx={{ color: "#7b3fe4" }} />} 
        />
        <StatCard 
            title="Active Courses" 
            value={summary?.totalCourses || 0} 
            icon={<MenuBookIcon fontSize="large" sx={{ color: "#fde68a" }} />} 
        />
      </Grid>

      <Grid container spacing={3}>
        {/* 2. REVENUE CHART */}
        <Grid item xs={12} md={8}>
          <Paper sx={chartPaper}>
            <Typography variant="h6" fontWeight={700} mb={3} color="#00eaff">
              Monthly Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "white" }} 
                    formatter={(val) => `₹${val}`}
                />
                <Bar dataKey="revenue" fill="#00eaff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* 3. RECENT TRANSACTIONS */}
        <Grid item xs={12} md={4}>
          <Paper sx={listPaper}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={700} color="#fde68a">
                  Recent Payments
                </Typography>
                <Button component={Link} to="/admin/payments" size="small" endIcon={<ArrowForwardIcon />}>
                    View All
                </Button>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />
            
            <List>
                {transactions.map((tx) => (
                    <ListItem key={tx.id} disableGutters sx={{ py: 1 }}>
                        <ListItemText 
                            primary={tx.user?.name || "Unknown"}
                            secondary={tx.createdAt?.slice(0, 10)}
                            primaryTypographyProps={{ color: "white", fontWeight: 600, fontSize: 14 }}
                            secondaryTypographyProps={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
                        />
                        <Typography color="#00eaff" fontWeight={600} fontSize={14}>
                            +₹{tx.amount}
                        </Typography>
                    </ListItem>
                ))}
                {transactions.length === 0 && (
                    <Typography color="rgba(255,255,255,0.5)" fontSize={13} textAlign="center" py={4}>
                        No recent transactions
                    </Typography>
                )}
            </List>
          </Paper>
        </Grid>
      </Grid>

    {/* 4. ANNOUNCEMENT WIDGET */ }
    <Box mt={4} mb={4}>
        <Paper sx={{ p: 3, bgcolor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={700} color="white" mb={2}>
                Broadcast Announcement
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                    <input
                        id="announce-title"
                        placeholder="Title (e.g. New Course Alert)"
                        style={{ width: "100%", padding: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid #334155", borderRadius: "8px", color: "white" }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <input
                        id="announce-msg"
                        placeholder="Message (e.g. DevOps Mastery is now live!)"
                        style={{ width: "100%", padding: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid #334155", borderRadius: "8px", color: "white" }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ bgcolor: "#00eaff", color: "black", fontWeight: "bold", py: 1.5 }}
                        onClick={async () => {
                            const title = document.getElementById("announce-title").value;
                            const message = document.getElementById("announce-msg").value;
                            if (!title || !message) return alert("Please enter title and message");

                            try {
                                await axios.post("/admin/notifications", { title, message, type: "info" });
                                alert("Announcement Sent!");
                                document.getElementById("announce-title").value = "";
                                document.getElementById("announce-msg").value = "";
                            } catch (e) {
                                alert("Failed to send");
                            }
                        }}
                    >
                        Send Now
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Box>

    {/* 4. QUICK ACTIONS */ }
    <Box mt={4}>
        <Typography variant="h6" fontWeight={700} mb={2} color="white">
            Quick Actions
        </Typography>
        <Box display="flex" gap={2}>
            <Button variant="outlined" component={Link} to="/admin/courses/add" sx={actionBtn}>
                + Add New Course
            </Button>
            <Button variant="outlined" component={Link} to="/admin/customers" sx={actionBtn}>
                Manage Customers
            </Button>
            <Button variant="outlined" component={Link} to="/admin/payments" sx={actionBtn}>
                View All Payments
            </Button>
        </Box>
    </Box>
    </Box >
  );
}

/* ================= HELPER ================= */
function StatCard({ title, value, icon }) {
    return (
        <Grid item xs={12} sm={4}>
            <Paper sx={cardStyle}>
                <Box>{icon}</Box>
                <Box textAlign="right">
                    <Typography fontSize={14} color="rgba(255,255,255,0.7)">{title}</Typography>
                    <Typography variant="h4" fontWeight={800} color="white">{value}</Typography>
                </Box>
            </Paper>
        </Grid>
    )
}

/* ================= STYLES ================= */
const cardStyle = {
    p: 3,
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

const chartPaper = {
    p: 3,
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    height: "100%"
};

const listPaper = {
    p: 3,
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    height: "100%"
};

const actionBtn = {
    color: "white",
    borderColor: "rgba(255,255,255,0.2)",
    "&:hover": {
        borderColor: "#00eaff",
        background: "rgba(0, 234, 255, 0.05)"
    }
};
