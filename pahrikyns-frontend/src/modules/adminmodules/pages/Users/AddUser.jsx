// src/pages/Admin/Users/AddUser.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { useNavigate } from "react-router-dom";
import { addUser } from "../../Adminapi/users";


const ROLES = [
  { value: "student", label: "Student" },
  { value: "admin", label: "Admin" },
  { value: "staff", label: "Staff / Support" },
];

export default function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "student",
    password: "",
    confirmPassword: "",
    isActive: true,
    sendWelcomeEmail: true,
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      newErrors.email = "Enter a valid email";

    if (form.phone && !/^[0-9+\-()\s]{7,20}$/.test(form.phone))
      newErrors.phone = "Enter a valid phone";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Min 6 characters required";

    if (!form.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm your password";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    if (!form.role) newErrors.role = "Select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || undefined,
        role: form.role,
        password: form.password,
        isActive: form.isActive,
        sendWelcomeEmail: form.sendWelcomeEmail,
        notes: form.notes.trim() || undefined,
      };

     await addUser(payload);


      showToast("User created successfully", "success");

      // small delay so user can see toast
      setTimeout(() => {
        navigate("/admin/users");
      }, 800);
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create user";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Top Bar */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            onClick={() => navigate("/admin/users")}
            sx={{
              borderRadius: 2,
              border: "1px solid rgba(148,163,184,0.4)",
              mr: 0.5,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.2 }}>
              Add New User
            </Typography>
            <Typography sx={{ opacity: 0.75, fontSize: 14 }}>
              Create a new user account, assign role & access.
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          onClick={() => navigate("/admin/users")}
          sx={{
            borderRadius: 2,
            borderColor: "rgba(148,163,184,0.7)",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          View All Users
        </Button>
      </Box>

      {/* Form Card */}
      <Paper
        sx={{
          p: 3,
          background: "rgba(223, 226, 235, 0.98)",
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.35)",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          {/* Left - Basic Info */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 2, textTransform: "uppercase", opacity: 0.8 }}
            >
              Basic Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  fullWidth
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  fullWidth
                  value={form.email}
                  onChange={handleChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={form.phone}
                  onChange={handleChange("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone || "Optional"}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Role"
                  fullWidth
                  value={form.role}
                  onChange={handleChange("role")}
                  error={!!errors.role}
                  helperText={errors.role || "Choose permission level"}
                >
                  {ROLES.map((r) => (
                    <MenuItem key={r.value} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Account Status"
                  fullWidth
                  value={form.isActive ? "active" : "blocked"}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      isActive: e.target.value === "active",
                    }))
                  }
                  helperText={
                    form.isActive
                      ? "User can login normally"
                      : "User will be blocked from logging in"
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="blocked">Blocked</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          {/* Right - Security & Meta */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 2, textTransform: "uppercase", opacity: 0.8 }}
            >
              Security & Access
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={form.password}
                  onChange={handleChange("password")}
                  error={!!errors.password}
                  helperText={errors.password || "Minimum 6 characters"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type={showConfirm ? "text" : "password"}
                  fullWidth
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirm((s) => !s)}
                          edge="end"
                        >
                          {showConfirm ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.sendWelcomeEmail}
                      onChange={handleChange("sendWelcomeEmail")}
                    />
                  }
                  label="Send welcome email with login details"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Admin Notes"
                  fullWidth
                  multiline
                  minRows={3}
                  value={form.notes}
                  onChange={handleChange("notes")}
                  helperText="Internal notes (only admins can see this)"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            type="button"
            variant="text"
            onClick={() => navigate("/admin/users")}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={!loading && <PersonAddAlt1Icon />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
            }}
          >
            {loading ? <CircularProgress size={22} /> : "Create User"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.type}
          variant="filled"
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
