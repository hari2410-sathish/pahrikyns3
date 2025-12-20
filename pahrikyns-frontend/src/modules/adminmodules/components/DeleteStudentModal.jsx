import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DeleteStudentModal({
  open,
  onClose,
  onConfirm,
  student,
}) {
  const handleDelete = () => {
    if (!student?.id) return; // safety
    onConfirm(student.id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,0,0,0.3)",
          minWidth: 420,
          borderRadius: 4,
          boxShadow: "0 0 25px rgba(255,0,0,0.3)",
          color: "white",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 900,
          color: "#ff4d4d",
          fontSize: "22px",
          textShadow: "0 0 10px rgba(255,0,0,0.7)",
        }}
      >
        Delete Student
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <Typography sx={{ color: "#e2e8f0", fontSize: "16px" }}>
          Are you sure you want to permanently delete{" "}
          <strong style={{ color: "#ff8080" }}>{student?.name}</strong>?<br />
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#94a3b8",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          sx={{
            textTransform: "none",
            fontWeight: 800,
            background: "linear-gradient(90deg,#ef4444,#b91c1c)",
            color: "white",
            px: 3,
            borderRadius: "999px",
            boxShadow: "0 0 15px rgba(255,0,0,0.45)",
            "&:hover": {
              background: "linear-gradient(90deg,#f87171,#ef4444)",
              boxShadow: "0 0 25px rgba(255,0,0,0.7)",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
