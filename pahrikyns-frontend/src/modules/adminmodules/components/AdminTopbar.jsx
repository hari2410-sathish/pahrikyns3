import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Divider,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";

import { useNavigate } from "react-router-dom";

// ✅ CORRECT IMPORT
import { AdminAuthContext } from "../context/AdminAuthContext";

import axios from "../../../api/axios";

export function AdminTopbar({ notifyCount = 0, onToggleSidebar }) {
  const navigate = useNavigate();
  const { logout, admin } = useContext(AdminAuthContext);

  const [anchorQuick, setAnchorQuick] = useState(null);
  const [anchorProfile, setAnchorProfile] = useState(null);

  // 🔍 LIVE SEARCH
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // 🔔 NOTIFICATION MODAL
  const [openNotify, setOpenNotify] = useState(false);
  const [notifyTitle, setNotifyTitle] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [sendToAll, setSendToAll] = useState(true);
  const [targetUserId, setTargetUserId] = useState("");
  const [sending, setSending] = useState(false);

  // ✅ LIVE SEARCH EFFECT
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoadingSearch(true);

        const res = await fetch(
          `http://localhost:5000/api/admin/search?q=${search}`,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("ADMIN_TOKEN"),
            },
          }
        );

        const data = await res.json();
        setResults(data?.users || []);
      } catch (err) {
        console.error("Search error", err);
        setResults([]);
      } finally {
        setLoadingSearch(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ SEND NOTIFICATION (ADMIN)
  const handleSendNotification = async () => {
    if (!notifyTitle.trim() || !notifyMessage.trim()) return;

    try {
      setSending(true);

      await axios.post(
        "/api/notifications",
        {
          userId: sendToAll ? null : targetUserId || null,
          title: notifyTitle,
          message: notifyMessage,
          type: "admin",
          meta: redirectUrl ? { redirectUrl } : null,
        },
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("ADMIN_TOKEN"),
          },
        }
      );

      // reset
      setNotifyTitle("");
      setNotifyMessage("");
      setRedirectUrl("");
      setTargetUserId("");
      setSendToAll(true);
      setOpenNotify(false);
    } catch (err) {
      console.error("Notification send error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(2,6,23,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          {/* LEFT */}
          <IconButton sx={{ color: "#60a5fa", mr: 1 }} onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>

          <Typography
            fontWeight={900}
            sx={{
              background: "linear-gradient(90deg,#60a5fa,#38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 0.8,
            }}
          >
            Admin Panel
          </Typography>

          <Box sx={{ flex: 1 }} />

          {/* 🔍 SEARCH */}
          <Box sx={{ position: "relative", mr: 2 }}>
            <TextField
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user..."
              sx={{
                width: { xs: 150, md: 260 },
                input: { color: "white", fontSize: 13 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />

            {search && (
              <Paper
                sx={{
                  position: "absolute",
                  top: 42,
                  width: "100%",
                  bgcolor: "#020617",
                  border: "1px solid #1e293b",
                  zIndex: 2000,
                  maxHeight: 280,
                  overflowY: "auto",
                }}
              >
                {loadingSearch ? (
                  <Box sx={{ p: 1.5, display: "flex", justifyContent: "center" }}>
                    <CircularProgress size={20} />
                  </Box>
                ) : results.length === 0 ? (
                  <Typography sx={{ p: 1.5 }} fontSize={12} color="#94a3b8">
                    No users found
                  </Typography>
                ) : (
                  <List dense>
                    {results.map((u) => (
                      <ListItemButton
                        key={u._id}
                        onClick={() => {
                          navigate(`/admin/users/${u._id}`);
                          setSearch("");
                          setResults([]);
                        }}
                      >
                        <ListItemText
                          primary={u.name}
                          secondary={u.email}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </Paper>
            )}
          </Box>

          {/* ➕ QUICK ADD */}
          <IconButton
            onClick={(e) => setAnchorQuick(e.currentTarget)}
            sx={{ color: "white", mr: 1 }}
          >
            <AddIcon />
          </IconButton>

          <Menu
            anchorEl={anchorQuick}
            open={Boolean(anchorQuick)}
            onClose={() => setAnchorQuick(null)}
          >
            <MenuItem
              onClick={() => {
                navigate("/admin/users/add");
                setAnchorQuick(null);
              }}
            >
              <PersonIcon fontSize="small" style={{ marginRight: 8 }} />
              Add User
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/admin/courses/add");
                setAnchorQuick(null);
              }}
            >
              <AddIcon fontSize="small" style={{ marginRight: 8 }} />
              Add Course
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                setOpenNotify(true);
                setAnchorQuick(null);
              }}
            >
              <SendIcon fontSize="small" style={{ marginRight: 8 }} />
              Send Notification
            </MenuItem>
          </Menu>

          {/* 🔔 NOTIFICATIONS ICON */}
          <IconButton sx={{ color: "white", mr: 1 }}>
            <Badge badgeContent={notifyCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* 👤 PROFILE */}
          <Avatar
            sx={{
              bgcolor: "#2563eb",
              color: "white",
              ml: 1,
              cursor: "pointer",
            }}
            onClick={(e) => setAnchorProfile(e.currentTarget)}
          >
            {admin?.email?.[0]?.toUpperCase() || "A"}
          </Avatar>

          <Menu
            anchorEl={anchorProfile}
            open={Boolean(anchorProfile)}
            onClose={() => setAnchorProfile(null)}
          >
            <MenuItem onClick={() => navigate("/admin/settings")}>
              <SettingsIcon fontSize="small" style={{ marginRight: 8 }} />
              Settings
            </MenuItem>

            <MenuItem
              onClick={() => {
                logout();
                setAnchorProfile(null);
              }}
              sx={{ color: "#f87171" }}
            >
              <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* ✅ ADMIN SEND NOTIFICATION MODAL */}
      <Dialog open={openNotify} onClose={() => setOpenNotify(false)} fullWidth>
        <DialogTitle>Send Notification</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={notifyTitle}
            onChange={(e) => setNotifyTitle(e.target.value)}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Message"
            margin="dense"
            value={notifyMessage}
            onChange={(e) => setNotifyMessage(e.target.value)}
          />

          <TextField
            fullWidth
            label="Redirect URL (optional)"
            margin="dense"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
          />

          <FormControlLabel
            control={
              <Switch
                checked={sendToAll}
                onChange={(e) => setSendToAll(e.target.checked)}
              />
            }
            label="Broadcast to all users"
          />

          {!sendToAll && (
            <TextField
              fullWidth
              label="Target User ID"
              margin="dense"
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenNotify(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSendNotification}
            disabled={sending}
            startIcon={<SendIcon />}
          >
            {sending ? "Sending..." : "Send"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
