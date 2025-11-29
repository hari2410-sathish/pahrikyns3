// ===============================
// CERTIFICATES PRO – FINAL CLEANED VERSION
// ===============================

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Button,
  IconButton,
  Chip,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Stack,
  Divider,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import html2canvas from "html2canvas";
import { saveAs } from "file-saver";       // ✔ FIXED

import CertificatePreview from "../../components/admin/CertificatePreview";

// ✔ FIXED PATH
import { generateCertificatePDF } from "../../utils/certificates/generateCertificatePDF";


// ===============================
// DEMO CERTIFICATE LOADER
// ===============================
function loadCertificates() {
  return [
    {
      id: "CERT1001",
      studentName: "Hari Sathish",
      email: "hari@gmail.com",
      course: "DevOps Mastery",
      date: "2025-02-14",
      score: 94,
      status: "issued",
    },
    {
      id: "CERT1002",
      studentName: "Arun Kumar",
      email: "arun@gmail.com",
      course: "Docker Fundamentals",
      date: "2025-02-10",
      score: 88,
      status: "issued",
    },
    {
      id: "CERT1003",
      studentName: "Priya Devi",
      email: "priya@gmail.com",
      course: "AWS Cloud Practitioner",
      date: "2025-02-06",
      score: 79,
      status: "pending",
    },
  ];
}


// ===============================
// DEFAULT TEMPLATE + ASSETS
// ===============================
const DEFAULT_TEMPLATE = "gold";
const DEFAULT_ASSETS = {
  logo: "/src/assets/cert/logo.png",
  signature: "/src/assets/cert/signature.png",
  seal: "/src/assets/cert/seal.png",
};


// ===============================
// MAIN COMPONENT
// ===============================
export default function CertificatesPro() {
  const [certs, setCerts] = useState([]);
  const [selected, setSelected] = useState(null);

  const [template, setTemplate] = useState(
    () => localStorage.getItem("cert_template") || DEFAULT_TEMPLATE
  );

  const [assets, setAssets] = useState(() => {
    try {
      const saved = localStorage.getItem("cert_assets");
      return saved ? JSON.parse(saved) : DEFAULT_ASSETS;
    } catch {
      return DEFAULT_ASSETS;
    }
  });

  const [editorOpen, setEditorOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const previewRef = useRef(null);

  // Load list
  useEffect(() => setCerts(loadCertificates()), []);

  // Save template
  useEffect(() => {
    localStorage.setItem("cert_template", template);
  }, [template]);

  // Save assets
  useEffect(() => {
    localStorage.setItem("cert_assets", JSON.stringify(assets));
  }, [assets]);

  // Upload logo/signature/seal
  function handleAssetUpload(file, key) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAssets((s) => ({ ...s, [key]: url }));
  }

  // Capture preview image
  async function capturePreview() {
    const el = document.getElementById("certificate-preview-root");
    if (!el) return null;
    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const blob = await new Promise((res) =>
      canvas.toBlob(res, "image/png", 0.92)
    );
    return blob;
  }

  async function downloadPreviewImage() {
    const blob = await capturePreview();
    if (blob) saveAs(blob, `${selected.studentName}-preview.png`);
  }

  // Update status
  function issueCertificate() {
    setCerts((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? {
              ...c,
              status: "issued",
              date: new Date().toISOString().slice(0, 10),
            }
          : c
      )
    );
    setSelected(null);
  }


  // ===============================
  // PREVIEW COMPONENT
  // ===============================
  const previewInner = (
    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
      <div
        style={{
          boxShadow: "0 10px 40px rgba(2,6,23,0.6)",
          borderRadius: 8,
          transform: "scale(0.98)",
          transition: "transform 220ms ease",
        }}
        ref={previewRef}
      >
        <CertificatePreview
          template={template}
          cert={
            selected || {
              studentName: "Preview Name",
              course: "Course",
              score: 100,
              date: new Date().toISOString().slice(0, 10),
              id: "PREVIEW-1",
            }
          }
          assets={assets}
        />
      </div>
    </Box>
  );


  // ===============================
  // UI
  // ===============================
  return (
    <Box sx={{ color: "white", p: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        Certificates — Pro Admin
      </Typography>

      {/* TOP BAR */}
      <Paper sx={{ p: 2, mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel sx={{ color: "gray" }}>Template</InputLabel>
          <Select
            value={template}
            label="Template"
            onChange={(e) => setTemplate(e.target.value)}
            sx={{ color: "white" }}
          >
            <MenuItem value="gold">Gold Premium</MenuItem>
            <MenuItem value="modern">Modern Blue</MenuItem>
            <MenuItem value="minimal">Minimal Clean</MenuItem>
            <MenuItem value="dark">Neon Dark</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            Logo
            <input hidden type="file" accept="image/*"
              onChange={(e) => handleAssetUpload(e.target.files?.[0], "logo")} />
          </Button>

          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            Signature
            <input hidden type="file" accept="image/*"
              onChange={(e) => handleAssetUpload(e.target.files?.[0], "signature")} />
          </Button>

          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            Seal
            <input hidden type="file" accept="image/*"
              onChange={(e) => handleAssetUpload(e.target.files?.[0], "seal")} />
          </Button>
        </Stack>

        <Box sx={{ flex: 1 }} />

        <Button variant="contained" onClick={() => setEditorOpen(true)}>
          Open Editor
        </Button>
      </Paper>

      {/* TABLE */}
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Student</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Course</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Score</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ color: "cyan", fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {certs.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ bgcolor: "#00bcd4" }}>{c.studentName[0]}</Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{c.studentName}</Typography>
                      <Typography variant="caption">{c.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>{c.course}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{c.score}%</TableCell>

                <TableCell>
                  <Chip
                    label={c.status}
                    color={c.status === "issued" ? "success" : "warning"}
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelected(c);
                      setPreviewOpen(true);
                    }}
                  >
                    <VisibilityIcon sx={{ color: "cyan" }} />
                  </IconButton>

                  {c.status === "issued" && (
                    <IconButton onClick={() => generateCertificatePDF(c, template)}>
                      <DownloadIcon sx={{ color: "yellow" }} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* PREVIEW DIALOG */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="xl" fullWidth>
        <DialogTitle>Certificate Preview</DialogTitle>
        <DialogContent dividers>{previewInner}</DialogContent>

        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          <Button onClick={downloadPreviewImage} startIcon={<DownloadIcon />}>
            Download Preview Image
          </Button>

          {selected?.status === "pending" && (
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={issueCertificate}
            >
              Issue Certificate
            </Button>
          )}

          <Button
            variant="contained"
            onClick={() =>
              generateCertificatePDF(
                selected ||
                  {
                    id: "PREVIEW-1",
                    studentName: "Preview Name",
                    course: "Course",
                    score: 100,
                    date: new Date().toISOString().slice(0, 10),
                  },
                template
              )
            }
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDITOR DIALOG */}
      <Dialog open={editorOpen} onClose={() => setEditorOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Certificate Editor</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Preview (Live)
              </Typography>

              <Paper sx={{ p: 1 }}>
                <CertificatePreview
                  template={template}
                  cert={{
                    studentName: "Editor Preview",
                    course: "Example Course",
                    score: 100,
                    date: new Date().toISOString().slice(0, 10),
                    id: "PREVIEW-ED",
                  }}
                  assets={assets}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Editor Controls</Typography>

              <Box sx={{ display: "grid", gap: 1, mt: 1 }}>
                <TextField
                  label="Default Course Name"
                  value={assets.defaultCourse || ""}
                  onChange={(e) =>
                    setAssets((s) => ({ ...s, defaultCourse: e.target.value }))
                  }
                />

                <TextField
                  label="Default Issuer"
                  value={assets.issuer || ""}
                  onChange={(e) =>
                    setAssets((s) => ({ ...s, issuer: e.target.value }))
                  }
                />

                <FormControl sx={{ minWidth: 160 }}>
                  <InputLabel>Default Template</InputLabel>
                  <Select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                  >
                    <MenuItem value="gold">Gold</MenuItem>
                    <MenuItem value="modern">Modern</MenuItem>
                    <MenuItem value="minimal">Minimal</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                  </Select>
                </FormControl>

                <Divider />

                <Typography variant="caption">Upload / Replace Assets</Typography>

                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" component="label">
                    Logo
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleAssetUpload(e.target.files?.[0], "logo")
                      }
                    />
                  </Button>

                  <Button variant="outlined" component="label">
                    Signature
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleAssetUpload(e.target.files?.[0], "signature")
                      }
                    />
                  </Button>

                  <Button variant="outlined" component="label">
                    Seal
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleAssetUpload(e.target.files?.[0], "seal")
                      }
                    />
                  </Button>
                </Stack>

                <Typography variant="caption" sx={{ mt: 1 }}>
                  Actions
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      localStorage.setItem(
                        "cert_assets",
                        JSON.stringify(assets)
                      );
                      localStorage.setItem("cert_template", template);
                      alert("Saved.");
                    }}
                  >
                    Save
                  </Button>

                  <Button
                    onClick={() => {
                      localStorage.removeItem("cert_assets");
                      localStorage.removeItem("cert_template");
                      setAssets(DEFAULT_ASSETS);
                      setTemplate(DEFAULT_TEMPLATE);
                      alert("Restored defaults.");
                    }}
                  >
                    Restore Defaults
                  </Button>

                  <Button
                    onClick={async () => {
                      const sample = {
                        id: `SAMPLE-${Date.now()}`,
                        studentName: "Sample User",
                        course: assets.defaultCourse || "Sample Course",
                        score: 100,
                        date: new Date().toISOString().slice(0, 10),
                      };
                      await generateCertificatePDF(sample, template);
                    }}
                  >
                    Sample PDF
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditorOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
