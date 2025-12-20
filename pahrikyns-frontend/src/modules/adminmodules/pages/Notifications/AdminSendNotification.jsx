import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
} from "@mui/material";
import API from "../../../api/axios";

export default function AdminNotifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("system");
  const [userId, setUserId] = useState("");

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ LOAD ALL NOTIFICATIONS
  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/notifications"); // admin route
      setList(res.data.notifications || []);
    } catch (e) {
      console.error("Load notifications error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // ✅ SEND NOTIFICATION
  const handleSend = async () => {
    if (!title || !message) {
      alert("Title and message required");
      return;
    }

    try {
      await API.post("/api/notifications", {
        title,
        message,
        type,
        userId: userId || null, // null = broadcast
      });

      setTitle("");
      setMessage("");
      setUserId("");
      setType("system");

      loadNotifications();
      alert("Notification sent ✅");
    } catch (e) {
      console.error("Send failed", e);
      alert("Send failed ❌");
    }
  };

  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Typography variant="h4" fontWeight={800} mb={2}>
        Admin Notifications
      </Typography>

      {/* ================= SEND BOX ================= */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: "#020617",
          border: "1px solid #1e293b",
        }}
      >
        <Typography fontWeight={700} mb={2}>
          Send Notification
        </Typography>

        <Box sx={{ display: "grid", gap: 2, maxWidth: 500 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="payment">Payment</MenuItem>
            <MenuItem value="course">Course</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <TextField
            label="User ID (Optional – for single user)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
          >
            Send Notification
          </Button>
        </Box>
      </Paper>

      {/* ================= HISTORY ================= */}
      <Typography fontWeight={700} mb={1}>
        Notification History
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <CircularProgress />
      ) : list.length === 0 ? (
        <Typography color="#94a3b8">No notifications yet</Typography>
      ) : (
        <Paper
          sx={{
            background: "#020617",
            border: "1px solid #1e293b",
          }}
        >
          <List>
            {list.map((n) => (
              <ListItem key={n.id} divider>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <strong>{n.title}</strong>
                      <Chip label={n.type} size="small" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography fontSize={13} color="#cbd5e1">
                        {n.message}
                      </Typography>
                      <Typography fontSize={11} color="#64748b">
                        {new Date(n.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
