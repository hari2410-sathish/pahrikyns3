import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from "@mui/material";

export default function CSVImportModal({ open, onClose, onImport, type }) {
  const [csvText, setCsvText] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCsvText(event.target.result);
    };
    reader.readAsText(file);
  };

  const parseCSV = () => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());

    const data = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      let obj = {};
      headers.forEach((h, i) => (obj[h] = values[i]));
      return obj;
    });

    onImport(data);
    onClose();
    setCsvText("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "rgba(10,20,40,0.95)",
          border: "1px solid rgba(0,255,255,0.3)",
          borderRadius: 3,
          p: 2,
          color: "white",
        },
      }}
    >
      <DialogTitle sx={{ color: "#00eaff", fontWeight: 800 }}>
        Import {type} from CSV
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Button
            component="label"
            sx={{
              textTransform: "none",
              background: "rgba(0,255,255,0.1)",
              border: "1px solid rgba(0,255,255,0.3)",
              color: "#00eaff",
              borderRadius: "999px",
              "&:hover": { background: "rgba(0,255,255,0.2)" },
            }}
          >
            Upload CSV File
            <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
          </Button>

          <Typography sx={{ opacity: 0.7 }}>
            CSV Columns must match:
            <br />
            {type === "Courses" && (
              <>
                <b>title, category, level, lessons, students, status</b>
              </>
            )}
            {type === "Students" && (
              <>
                <b>name, email, enrolled, status</b>
              </>
            )}
          </Typography>

          {csvText && (
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              style={{
                width: "100%",
                minHeight: "180px",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid rgba(0,255,255,0.2)",
              }}
            />
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#94a3b8" }}>
          Cancel
        </Button>

        <Button
          onClick={parseCSV}
          disabled={!csvText}
          sx={{
            textTransform: "none",
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "#020617",
            fontWeight: 700,
            px: 3,
            borderRadius: "999px",
          }}
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}
