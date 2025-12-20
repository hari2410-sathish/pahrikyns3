import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { sendNotification } from "../../../api/adminNotifications";

export default function SendNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  const handleSend = async () => {
    if (!title || !message) {
      alert("Title & Message required");
      return;
    }

    try {
      await sendNotification({ title, message, userId });
      alert("✅ Notification sent");
      setTitle("");
      setMessage("");
      setUserId("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>Send Notification</Typography>

      <TextField
        label="User ID (optional for broadcast)"
        fullWidth
        margin="normal"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Message"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSend}
      >
        Send
      </Button>
    </Box>
  );
}
