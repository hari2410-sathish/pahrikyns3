import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import LinkIcon from "@mui/icons-material/Link";
import BlockIcon from "@mui/icons-material/Block";

import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCertificateById,
  revokeCertificate
} from "../../Adminapi/certificatesAdmin";

import { generateCertificatePDF } 
  from "../../../../utils/certificates/generateCertificatePDF";

import CertificateViewer 
  from "../../components/certificates/CertificateViewer";

export default function CertificateDetails() {
  const { certId } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ---------------- LOAD CERTIFICATE ----------------
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCertificateById(certId);
        // data { certificate: {...} } OR direct object
        setCertificate(data.certificate || data || null);
      } catch (err) {
        console.error("Failed to load certificate", err);
        showToast("Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [certId]);

  const verifyUrl = useMemo(() => {
    if (!certificate) return "";
    const code = certificate.code || certificate.publicId || certId;
    return `${window.location.origin}/verify/${code}`;
  }, [certificate, certId]);

  const statusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "issued" || s === "active") return "success";
    if (s === "revoked") return "error";
    if (s === "expired") return "warning";
    return "default";
  };

  const formatDate = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
    }
  };

  // ---------------- ACTIONS ----------------
  const handleDownload = async () => {
    if (!certificate) return;
    try {
      // util should open PDF download
      await generateCertificatePDF(certificate);
    } catch (err) {
      console.error("Download failed", err);
      showToast("Download failed – check PDF generator setup");
    }
  };

  const handlePrint = () => {
    // simplest: open public verify page in new tab (print from there)
    if (verifyUrl) {
      window.open(verifyUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl);
      showToast("Verify link copied", "success");
    } catch {
      showToast("Copy failed");
    }
  };

  const handleRevoke = async () => {
    if (!certificate) return;
    const ok = window.confirm(
      "Are you sure you want to revoke this certificate?"
    );
    if (!ok) return;

    try {
      setRevoking(true);
      const updated = await revokeCertificate(certificate._id || certId);
      // backend can return updated certificate or message
      if (updated.certificate) {
        setCertificate(updated.certificate);
      } else {
        setCertificate({
          ...(certificate || {}),
          status: "revoked",
        });
      }
      showToast("Certificate revoked", "success");
    } catch (err) {
      console.error("Revoke failed", err);
      showToast("Failed to revoke certificate");
    } finally {
      setRevoking(false);
    }
  };

  // ---------------- RENDER ----------------
  if (loading) {
    return (
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!certificate) {
    return (
      <Box sx={{ mt: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/certificates")}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography color="error">Certificate not found</Typography>
      </Box>
    );
  }

  const user = certificate.user || certificate.student || {};
  const course = certificate.course || {};

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
            onClick={() => navigate("/admin/certificates")}
            sx={{
              bgcolor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              Certificate Details
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip
                size="small"
                label={certificate.status || "Unknown"}
                color={statusColor(certificate.status)}
                variant="outlined"
              />
              {certificate.code && (
                <Chip
                  size="small"
                  label={`Code: ${certificate.code}`}
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* ACTION BUTTONS */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Tooltip title="Copy verify link">
            <span>
              <IconButton
                onClick={handleCopyLink}
                sx={{
                  bgcolor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(148,163,184,0.4)",
                }}
              >
                <LinkIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Print / browser print">
            <span>
              <IconButton
                onClick={handlePrint}
                sx={{
                  bgcolor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(148,163,184,0.4)",
                }}
              >
                <PrintIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Download as PDF">
            <span>
              <IconButton
                onClick={handleDownload}
                sx={{
                  bgcolor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(148,163,184,0.4)",
                }}
              >
                <DownloadIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Revoke certificate">
            <span>
              <Button
                variant="outlined"
                color="error"
                startIcon={<BlockIcon />}
                onClick={handleRevoke}
                disabled={revoking || certificate.status === "revoked"}
              >
                {revoking ? "Revoking..." : "Revoke"}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* MAIN CONTENT */}
      <Grid container spacing={3}>
        {/* LEFT: META INFO */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: 3,
              background: "rgba(15,23,42,0.95)",
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.25)",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Recipient
            </Typography>
            <Divider sx={{ mb: 1.5, borderColor: "rgba(51,65,85,0.8)" }} />
            <Typography sx={{ fontSize: 14 }}>
              <b>Name:</b> {user.name || user.fullName || "-"}
            </Typography>
            <Typography sx={{ fontSize: 14, mt: 0.5 }}>
              <b>Email:</b> {user.email || "-"}
            </Typography>
            {user.phone && (
              <Typography sx={{ fontSize: 14, mt: 0.5 }}>
                <b>Phone:</b> {user.phone}
              </Typography>
            )}
          </Paper>

          <Paper
            sx={{
              p: 3,
              background: "rgba(15,23,42,0.95)",
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.25)",
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Course
            </Typography>
            <Divider sx={{ mb: 1.5, borderColor: "rgba(51,65,85,0.8)" }} />
            <Typography sx={{ fontSize: 14 }}>
              <b>Title:</b> {course.title || course.name || "-"}
            </Typography>
            {course.category && (
              <Typography sx={{ fontSize: 14, mt: 0.5 }}>
                <b>Category:</b> {course.category}
              </Typography>
            )}
            {certificate.grade && (
              <Typography sx={{ fontSize: 14, mt: 0.5 }}>
                <b>Grade:</b> {certificate.grade}
              </Typography>
            )}
          </Paper>

          <Paper
            sx={{
              p: 3,
              background: "rgba(15,23,42,0.95)",
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.25)",
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Certificate Meta
            </Typography>
            <Divider sx={{ mb: 1.5, borderColor: "rgba(51,65,85,0.8)" }} />
            <Typography sx={{ fontSize: 14 }}>
              <b>Issued At:</b> {formatDate(certificate.issuedAt)}
            </Typography>
            <Typography sx={{ fontSize: 14, mt: 0.5 }}>
              <b>Expires At:</b> {formatDate(certificate.expiresAt)}
            </Typography>
            <Typography sx={{ fontSize: 14, mt: 0.5 }}>
              <b>Template:</b> {certificate.template || "default"}
            </Typography>
            {certificate.remarks && (
              <Typography sx={{ fontSize: 14, mt: 0.5 }}>
                <b>Remarks:</b> {certificate.remarks}
              </Typography>
            )}
            {verifyUrl && (
              <Typography
                sx={{
                  fontSize: 12,
                  mt: 1.5,
                  opacity: 0.8,
                  wordBreak: "break-all",
                }}
              >
                <b>Public Verify URL:</b> {verifyUrl}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* RIGHT: PREVIEW */}
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 2,
              background: "rgba(15,23,42,0.95)",
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.25)",
              height: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1.5 }}>
              Live Preview
            </Typography>
            <Divider sx={{ mb: 2, borderColor: "rgba(51,65,85,0.8)" }} />

            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 360,
              }}
            >
              {/* CertificateViewer – your existing component */}
              <CertificateViewer certificate={certificate} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

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
