import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

import { verifyPublicCertificate } from "../../modules/adminmodules/Adminapi/certificatesAdmin";

export default function VerifyCertificate() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const data = await verifyPublicCertificate(code);
      setResult(data);
    } catch (err) {
      console.error("Verification failed", err);
      setResult(null);
      alert("Invalid or expired certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 420 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Verify Certificate
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>

        {result && (
          <Box sx={{ mt: 2 }}>
            <Typography>
              <b>User:</b> {result.userName}
            </Typography>
            <Typography>
              <b>Course:</b> {result.courseTitle}
            </Typography>
            <Typography>
              <b>Status:</b> {result.status}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
