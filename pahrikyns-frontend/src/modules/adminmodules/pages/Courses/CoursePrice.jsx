// src/pages/Admin/Courses/CoursePrice.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
  Stack,
  Button,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAdminCourseById,
  updateAdminCoursePrice,
} from "../../Adminapi/coursesAdmin";

const toNumber = (v) => {
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
};

const formatINR = (val) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);

export default function CoursePrice() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [course, setCourse] = useState(null);

  const [pricing, setPricing] = useState({
    basePrice: "",
    discountType: "flat", // flat | percent
    discountValue: "",
    taxPercent: 18,
    emiMonths: 3,
    showOnLanding: true,
    highlightTag: "Best value",
  });

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // =========================
  // LOAD COURSE
  // =========================
  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminCourseById(courseId);
        const c = data.course || data;

        setCourse(c);

        const price = c.price || 0;
        const discounted = c.discountPrice || 0;

        let discountType = "flat";
        let discountValue = "";

        if (discounted && discounted < price) {
          // try % calculation
          const diff = price - discounted;
          const pct = Math.round((diff / price) * 100);
          if (pct === 0 || pct === 100) {
            discountType = "flat";
            discountValue = diff;
          } else {
            discountType = "percent";
            discountValue = pct;
          }
        }

        setPricing((prev) => ({
          ...prev,
          basePrice: price || "",
          discountType,
          discountValue: discountValue || "",
          // fallback defaults if backend doesn't have these fields yet
          taxPercent: c.taxPercent ?? prev.taxPercent,
          emiMonths: c.emiMonths ?? prev.emiMonths,
          showOnLanding:
            typeof c.showOnLanding === "boolean" ? c.showOnLanding : prev.showOnLanding,
          highlightTag: c.highlightTag || prev.highlightTag,
        }));
      } catch (err) {
        console.error(err);
        showToast("Failed to load course", "error");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  // =========================
  // PRICING CALCULATIONS
  // =========================
  const derived = useMemo(() => {
    const base = toNumber(pricing.basePrice);
    const discountVal = toNumber(pricing.discountValue);
    const taxPct = toNumber(pricing.taxPercent);
    const emiMonths = toNumber(pricing.emiMonths) || 1;

    if (!base) {
      return {
        discountAmount: 0,
        discountedPrice: 0,
        taxAmount: 0,
        finalPrice: 0,
        emiPerMonth: 0,
        discountLabel: "",
      };
    }

    let discountAmount = 0;

    if (pricing.discountType === "flat") {
      discountAmount = Math.min(discountVal, base);
    } else if (pricing.discountType === "percent") {
      discountAmount = Math.min((base * discountVal) / 100, base);
    }

    const discountedPrice = Math.max(base - discountAmount, 0);
    const taxAmount = Math.round((discountedPrice * taxPct) / 100);
    const finalPrice = discountedPrice + taxAmount;
    const emiPerMonth = Math.round(finalPrice / emiMonths);

    let discountLabel = "";
    if (discountAmount > 0) {
      if (pricing.discountType === "percent") {
        discountLabel = `${discountVal}% OFF`;
      } else {
        const pct = Math.round((discountAmount / base) * 100);
        discountLabel = `${pct}% OFF`;
      }
    }

    return {
      discountAmount,
      discountedPrice,
      taxAmount,
      finalPrice,
      emiPerMonth,
      discountLabel,
    };
  }, [pricing]);

  // =========================
  // HANDLERS
  // =========================
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setPricing((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => (e) => {
    setPricing((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const validate = () => {
    if (!pricing.basePrice || toNumber(pricing.basePrice) <= 0) {
      return "Base price is required";
    }

    const base = toNumber(pricing.basePrice);
    const discountVal = toNumber(pricing.discountValue);

    if (pricing.discountType === "flat" && discountVal > base) {
      return "Flat discount cannot be greater than base price";
    }

    if (pricing.discountType === "percent" && discountVal > 90) {
      return "Discount percentage looks too high (max 90%)";
    }

    return null;
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      showToast(error, "error");
      return;
    }

    const base = toNumber(pricing.basePrice);
    const payload = {
      // These keys you can adjust on backend – but safe defaults:
      price: base,
      discountPrice: derived.discountedPrice, // final price before tax
      taxPercent: toNumber(pricing.taxPercent),
      emiMonths: toNumber(pricing.emiMonths) || 1,
      showOnLanding: pricing.showOnLanding,
      highlightTag: pricing.highlightTag || null,
      discountType: pricing.discountType,
      discountValue: pricing.discountValue ? toNumber(pricing.discountValue) : 0,
    };

    try {
      setSubmitting(true);
      await updateAdminCoursePrice(courseId, payload);
      showToast("Pricing updated successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to update course pricing", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetFromCourse = () => {
    if (!course) return;
    const price = course.price || 0;
    const discounted = course.discountPrice || 0;

    let discountType = "flat";
    let discountValue = "";

    if (discounted && discounted < price) {
      const diff = price - discounted;
      const pct = Math.round((diff / price) * 100);
      if (pct === 0 || pct === 100) {
        discountType = "flat";
        discountValue = diff;
      } else {
        discountType = "percent";
        discountValue = pct;
      }
    }

    setPricing((prev) => ({
      ...prev,
      basePrice: price || "",
      discountType,
      discountValue: discountValue || "",
      taxPercent: course.taxPercent ?? prev.taxPercent,
      emiMonths: course.emiMonths ?? prev.emiMonths,
      showOnLanding:
        typeof course.showOnLanding === "boolean"
          ? course.showOnLanding
          : prev.showOnLanding,
      highlightTag: course.highlightTag || prev.highlightTag,
    }));
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h6">Course not found</Typography>
      </Box>
    );
  }

  // =========================
  // RENDER
  // =========================
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
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Course Pricing
          </Typography>
          <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
            Configure base price, discounts, taxes & EMI options
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel
            control={
              <Switch
                checked={pricing.showOnLanding}
                onChange={handleToggle("showOnLanding")}
                color="success"
              />
            }
            label={pricing.showOnLanding ? "Show offer on landing" : "Hide offer"}
          />

          <Button
            variant="outlined"
            size="small"
            onClick={handleResetFromCourse}
          >
            Reset from stored price
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* LEFT = FORM */}
        <Grid item xs={12} md={7}>
          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 3,
              background: "rgba(15,23,42,0.95)",
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.25)",
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 2 }}>
              Base Price & Discount
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Base Price (₹) *"
                  fullWidth
                  type="number"
                  value={pricing.basePrice}
                  onChange={handleChange("basePrice")}
                  InputProps={{ inputProps: { min: 0 } }}
                  helperText="Original course price (before discount & tax)"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Discount Type</InputLabel>
                  <Select
                    label="Discount Type"
                    value={pricing.discountType}
                    onChange={handleChange("discountType")}
                  >
                    <MenuItem value="flat">Flat (₹)</MenuItem>
                    <MenuItem value="percent">Percentage (%)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label={
                    pricing.discountType === "flat"
                      ? "Discount Amount (₹)"
                      : "Discount (%)"
                  }
                  fullWidth
                  type="number"
                  value={pricing.discountValue}
                  onChange={handleChange("discountValue")}
                  InputProps={{ inputProps: { min: 0 } }}
                  helperText={
                    derived.discountAmount > 0
                      ? `You are giving ${derived.discountLabel || ""}`
                      : "Leave empty for no discount"
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tax (GST %) "
                  fullWidth
                  type="number"
                  value={pricing.taxPercent}
                  onChange={handleChange("taxPercent")}
                  InputProps={{ inputProps: { min: 0, max: 50 } }}
                  helperText={`Estimated GST: ${formatINR(derived.taxAmount)}`}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              EMI / Installments
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Slider
                  value={pricing.emiMonths}
                  onChange={(_, val) =>
                    setPricing((prev) => ({ ...prev, emiMonths: val }))
                  }
                  min={1}
                  max={12}
                  step={1}
                  marks={[
                    { value: 1, label: "1m" },
                    { value: 3, label: "3m" },
                    { value: 6, label: "6m" },
                    { value: 9, label: "9m" },
                    { value: 12, label: "12m" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography sx={{ textAlign: "right" }}>
                  {pricing.emiMonths} months •{" "}
                  <b>{formatINR(derived.emiPerMonth)}/month</b>
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography sx={{ fontWeight: 600, mb: 1 }}>Labeling</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Highlight Tag"
                  placeholder="Best value / Limited offer"
                  fullWidth
                  value={pricing.highlightTag}
                  onChange={handleChange("highlightTag")}
                  helperText="Shown as a small chip on course card"
                />
              </Grid>
            </Grid>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 4 }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/admin/courses")}
                disabled={submitting}
              >
                Back to courses
              </Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? "Saving..." : "Save Pricing"}
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* RIGHT = LIVE PREVIEW */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: 3,
              background:
                "radial-gradient(circle at top, rgba(56,189,248,0.2), transparent 60%), rgba(15,23,42,0.98)",
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.35)",
              height: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Live Pricing Preview
            </Typography>
            <Typography sx={{ opacity: 0.7, fontSize: 13, mb: 2 }}>
              How this course looks on the landing page
            </Typography>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(148,163,184,0.35)",
                bgcolor: "rgba(15,23,42,0.9)",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Chip
                  size="small"
                  label={course.level || "All levels"}
                  variant="outlined"
                />
                {pricing.highlightTag && (
                  <Chip
                    size="small"
                    color="primary"
                    label={pricing.highlightTag}
                  />
                )}
                {derived.discountLabel && (
                  <Chip
                    size="small"
                    color="success"
                    label={derived.discountLabel}
                  />
                )}
              </Stack>

              <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 0.5 }}>
                {course.title}
              </Typography>
              <Typography
                sx={{
                  opacity: 0.75,
                  fontSize: 13,
                  mb: 2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {course.shortDescription}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="baseline"
                sx={{ mb: 1 }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
                  {formatINR(derived.finalPrice)}
                </Typography>

                {derived.discountAmount > 0 && (
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      opacity: 0.6,
                      fontSize: 14,
                    }}
                  >
                    {formatINR(toNumber(pricing.basePrice))}
                  </Typography>
                )}

                {derived.discountAmount > 0 && (
                  <Typography
                    sx={{
                      fontSize: 12,
                      opacity: 0.8,
                    }}
                  >
                    + GST incl.
                  </Typography>
                )}
              </Stack>

              {pricing.emiMonths > 1 && derived.emiPerMonth > 0 && (
                <Typography sx={{ fontSize: 13, opacity: 0.9, mb: 1 }}>
                  Or EMI from{" "}
                  <b>{formatINR(derived.emiPerMonth)}/month</b> for{" "}
                  {pricing.emiMonths} months
                </Typography>
              )}

              <Typography sx={{ fontSize: 12, opacity: 0.7, mt: 1 }}>
                You receive ~{" "}
                <b>{formatINR(Math.round(derived.discountedPrice * 0.9))}</b>{" "}
                after platform fees (approx 10%).
              </Typography>
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
