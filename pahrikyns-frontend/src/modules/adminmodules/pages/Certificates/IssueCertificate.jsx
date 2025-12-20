import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Autocomplete,
  Divider,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { fetchAllUsers } from "../../Adminapi/users";
import { fetchAdminCourses } from "../../Adminapi/coursesAdmin";
import { issueCertificate } from "../../Adminapi/certificatesAdmin";

export default function IssueCertificate() {
  const navigate = useNavigate();

  // ================= STATE =================
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [certificateCode, setCertificateCode] = useState("");
  const [remarks, setRemarks] = useState("");

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ================= LOAD USERS =================
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoadingUsers(true);
        const data = await fetchAllUsers();
        setUsers(data.users || data || []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  // ================= LOAD COURSES =================
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoadingCourses(true);
        const data = await fetchAdminCourses();
        setCourses(data.courses || data || []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load courses");
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  // ================= AUTO CERTIFICATE CODE =================
  useEffect(() => {
    if (selectedUser && selectedCourse) {
      const code = `CERT-${selectedUser._id?.slice(-5)}-${selectedCourse._id?.slice(
        -5
      )}-${Date.now().toString().slice(-4)}`;
      setCertificateCode(code.toUpperCase());
    }
  }, [selectedUser, selectedCourse]);

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!selectedUser || !selectedCourse) {
      showToast("Select user & course");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        userId: selectedUser._id || selectedUser.id,
        courseId: selectedCourse._id || selectedCourse.id,
        certificateCode,
        remarks,
      };

      await issueCertificate(payload);

      showToast("Certificate issued successfully!", "success");

      setTimeout(() => {
        navigate("/admin/certificates");
      }, 1200);
    } catch (err) {
      console.error(err);
      showToast("Failed to issue certificate");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= RENDER =================
  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
          Issue Certificate
        </Typography>
        <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
          Assign certificate to a student after course completion
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          background: "rgba(15,23,42,0.95)",
          border: "1px solid rgba(148,163,184,0.25)",
          maxWidth: 900,
        }}
      >
        <Grid container spacing={3}>
          {/* ================= USER ================= */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 13, mb: 0.5 }}>
              Select Student
            </Typography>

            {loadingUsers ? (
              <CircularProgress size={26} />
            ) : (
              <Autocomplete
                options={users}
                getOptionLabel={(u) =>
                  `${u.name || u.fullName || "User"} - ${u.email}`
                }
                value={selectedUser}
                onChange={(e, val) => setSelectedUser(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search student by name / email"
                  />
                )}
              />
            )}
          </Grid>

          {/* ================= COURSE ================= */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 13, mb: 0.5 }}>
              Select Course
            </Typography>

            {loadingCourses ? (
              <CircularProgress size={26} />
            ) : (
              <Autocomplete
                options={courses}
                getOptionLabel={(c) => c.title || c.name || "Course"}
                value={selectedCourse}
                onChange={(e, val) => setSelectedCourse(val)}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select course" />
                )}
              />
            )}
          </Grid>

          {/* ================= CERT CODE ================= */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 13, mb: 0.5 }}>
              Certificate Code
            </Typography>
            <TextField
              value={certificateCode}
              fullWidth
              disabled
              placeholder="Auto Generated"
            />
          </Grid>

          {/* ================= STATUS ================= */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontSize: 13, mb: 0.5 }}>
              Certificate Status
            </Typography>
            <TextField value="ISSUED" fullWidth disabled />
          </Grid>

          {/* ================= REMARKS ================= */}
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 13, mb: 0.5 }}>
              Remarks / Notes (optional)
            </Typography>
            <TextField
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              placeholder="Trainer note / admin remark"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* ================= PREVIEW ================= */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            Preview
          </Typography>

          <Paper
            sx={{
              p: 2,
              background: "rgba(2,6,23,0.8)",
              border: "1px dashed rgba(148,163,184,0.4)",
              borderRadius: 2,
            }}
          >
            <Typography sx={{ fontSize: 13 }}>
              Student:
              <Chip
                sx={{ ml: 1 }}
                label={
                  selectedUser
                    ? selectedUser.name || selectedUser.fullName
                    : "Not selected"
                }
                size="small"
              />
            </Typography>

            <Typography sx={{ fontSize: 13, mt: 1 }}>
              Course:
              <Chip
                sx={{ ml: 1 }}
                label={
                  selectedCourse
                    ? selectedCourse.title || selectedCourse.name
                    : "Not selected"
                }
                size="small"
              />
            </Typography>

            <Typography sx={{ fontSize: 13, mt: 1 }}>
              Certificate Code: <b>{certificateCode || "—"}</b>
            </Typography>
          </Paper>
        </Box>

        {/* ================= ACTIONS ================= */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/certificates")}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Issuing..." : "Issue Certificate"}
          </Button>
        </Box>
      </Paper>

      {/* ================= TOAST ================= */}
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
