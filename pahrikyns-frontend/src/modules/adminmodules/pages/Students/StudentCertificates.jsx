import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import { useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../../../api/users";
import { fetchAllCertificates } from "../../../api/certificatesAdmin";

export default function StudentCertificates() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStudent, setLoadingStudent] = useState(true);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoadingStudent(true);
        const s = await getStudentById(studentId);
        setStudent(s);
      } catch (err) {
        console.error(err);
        showToast("Failed to load student");
      } finally {
        setLoadingStudent(false);
      }
    };
    loadStudent();
  }, [studentId]);

  useEffect(() => {
    const loadCerts = async () => {
      try {
        setLoading(true);
        // backend can filter by userId if supported
        const data = await fetchAllCertificates({ userId: studentId });
        setCerts(data.certificates || data || []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };
    loadCerts();
  }, [studentId]);

  const formatDate = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleDateString();
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

  const issuedCount = useMemo(
    () => certs.filter((c) => (c.status || "").toLowerCase() === "issued").length,
    [certs]
  );

  const handleIssue = () => {
    // send student details via state – IssueCertificate.jsx la useLocation().state la read pannikko
    navigate("/admin/certificates/issue", {
      state: {
        studentId,
        studentName: student?.name,
        studentEmail: student?.email,
      },
    });
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
              Student Certificates
            </Typography>
            {loadingStudent ? (
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

        <Button
          variant="contained"
          startIcon={<WorkspacePremiumIcon />}
          onClick={handleIssue}
        >
          Issue Certificate
        </Button>
      </Box>

      {/* SUMMARY CARD */}
      <Paper
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, rgba(8,47,73,0.9), rgba(56,189,248,0.9))",
        }}
      >
        <Typography sx={{ fontSize: 13, opacity: 0.9 }}>
          Total Certificates Issued
        </Typography>
        <Typography sx={{ fontSize: 24, fontWeight: 800, mt: 1 }}>
          {issuedCount}
        </Typography>
      </Paper>

      {/* TABLE */}
      <Paper
        sx={{
          p: 2.5,
          borderRadius: 3,
          background: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(148,163,184,0.25)",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>Certificates</Typography>
        <Divider sx={{ my: 1.5, borderColor: "rgba(51,65,85,0.9)" }} />

        {loading ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : certs.length === 0 ? (
          <Typography sx={{ opacity: 0.8 }}>
            No certificates issued yet
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Issued At</TableCell>
                <TableCell align="right">Open</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certs.map((c) => (
                <TableRow key={c._id || c.id}>
                  <TableCell>{c.courseTitle || "—"}</TableCell>
                  <TableCell>{c.certificateCode}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={c.status || "—"}
                      color={statusChipColor(c.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{formatDate(c.createdAt)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate(`/admin/certificates/${c._id || c.id}`)
                      }
                      sx={{ color: "cyan" }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
