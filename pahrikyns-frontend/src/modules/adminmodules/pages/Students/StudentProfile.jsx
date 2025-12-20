import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { generateInvoicePDF } from "../../../utils/generateInvoicePDF";

export default function StudentProfile() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [studentId]);

  async function loadProfile() {
    try {
      setLoading(true);
      const res = await api.get(`/students/${studentId}/profile`);

      setStudent(res.data.student);
      setPayments(res.data.student?.payments || []);
      setTimeline(res.data.progressTimeline || []);
      setAnalytics(res.data.analytics || null);
    } catch (err) {
      console.error("Profile load failed", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!student) return <Typography>Student not found</Typography>;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Student Profile</Typography>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/admin/students/${studentId}/progress`)}
        >
          View Progress
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={card}>
            <Typography variant="h6">Basic Info</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography><b>Name:</b> {student.name}</Typography>
            <Typography><b>Email:</b> {student.email}</Typography>
            <Typography><b>Course:</b> {student.course}</Typography>
            <Typography><b>Progress:</b> {student.progress}%</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={card}>
            <Typography variant="h6">Analytics</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>Total Paid: ₹{analytics?.totalPaid || 0}</Typography>
            <Typography>Total Payments: {analytics?.totalPayments || 0}</Typography>
            <Typography>Certificates Issued: {analytics?.certificatesIssued || 0}</Typography>
            <Typography>Current Progress: {analytics?.currentProgress || 0}%</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={card}>
            <Typography variant="h6">Certificates</Typography>
            <Divider sx={{ my: 1 }} />
            {student.certificates?.length ? (
              student.certificates.map((c) => (
                <Chip key={c.id} label={c.title || "Certificate"} sx={{ mr: 1, mb: 1 }} />
              ))
            ) : (
              <Typography>No certificates</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ ...card, mt: 3 }}>
        <Typography variant="h6">Payments</Typography>
        <Divider sx={{ my: 1 }} />
        {payments.length ? (
          payments.map((p) => (
            <Box
              key={p.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr auto",
                py: 1,
                borderBottom: "1px solid #eee",
                alignItems: "center",
                fontSize: 13,
              }}
            >
              <span>{new Date(p.createdAt).toLocaleDateString()}</span>
              <span>₹{p.amount}</span>
              <span>{p.status}</span>
              <Chip
                size="small"
                label="PDF"
                onClick={() => generateInvoicePDF(p)}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          ))
        ) : (
          <Typography>No payments</Typography>
        )}
      </Paper>
    </Box>
  );
}

const card = {
  p: 3,
  borderRadius: 2,
};
