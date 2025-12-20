import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(oldPassword, newPassword);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h6" mb={2}>
          Change Password
        </Typography>

        <TextField
          fullWidth
          label="Old Password"
          type="password"
          sx={{ mb: 2 }}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="New Password"
          type="password"
          sx={{ mb: 3 }}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Update Password
        </Button>
      </Paper>
    </Box>
  );
}

export default ChangePassword;
