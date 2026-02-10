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
import { useAdminAuth } from "../context/AdminAuthContext";
import axios from "../../../api/axios";

export function AdminTopbar({ notifyCount = 0, onToggleSidebar }) {
  const navigate = useNavigate();
  const { logout, admin } = useAdminAuth();

  const [anchorQuick, setAnchorQuick] = useState(null);
  const [anchorProfile, setAnchorProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // NOTIFICATION STATE
  const [openNotify, setOpenNotify] = useState(false);
  const [notifyTitle, setNotifyTitle] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [sendToAll, setSendToAll] = useState(true);
  const [targetUserId, setTargetUserId] = useState("");
  const [sending, setSending] = useState(false);

  // LIVE SEARCH
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        setLoadingSearch(true);
        const res = await fetch(`http://localhost:5000/api/admin/search?q=${search}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("ADMIN_TOKEN") },
        });
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

  // SEND NOTIFICATION
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
        { headers: { Authorization: "Bearer " + localStorage.getItem("ADMIN_TOKEN") } }
      );
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
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(2, 6, 23, 0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Toolbar sx={{ minHeight: 70 }}>
          <IconButton sx={{ color: "#fff", mr: 2, display: { md: 'none' } }} onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>

          {/* SEARCH BAR */}
          <Box sx={{ position: "relative", width: { xs: 200, md: 400 } }}>
            <TextField
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users, orders, courses..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&.Mui-focused fieldset": { borderColor: "#00eaff" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.4)" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* SEARCH RESULTS DROPDOWN */}
            {search && (
              <Paper sx={{
                position: "absolute", top: 48, width: "100%", bgcolor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)", zIndex: 2000,
                maxHeight: 300, overflowY: "auto", borderRadius: "10px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
              }}>
                {loadingSearch ? (
                  <Box sx={{ p: 2, textAlign: "center" }}><CircularProgress size={20} /></Box>
                ) : results.length === 0 ? (
                  <Typography sx={{ p: 2, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>No results found.</Typography>
                ) : (
                  <List dense>
                    {results.map((u) => (
                      <ListItemButton key={u._id} onClick={() => { navigate(`/admin/users/${u._id}`); setSearch(""); }}>
                        <ListItemText primary={u.name} secondary={u.email}
                          primaryTypographyProps={{ color: "#fff" }} secondaryTypographyProps={{ color: "rgba(255,255,255,0.5)" }} />
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </Paper>
            )}
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* ACTIONS */}
          <IconButton onClick={(e) => setAnchorQuick(e.currentTarget)} sx={{ color: "rgba(255,255,255,0.7)", mr: 1, "&:hover": { color: "#00eaff" } }}>
            <AddIcon />
          </IconButton>

          <IconButton sx={{ color: "rgba(255,255,255,0.7)", mr: 2, "&:hover": { color: "#00eaff" } }}>
            <Badge badgeContent={notifyCount} color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* PROFILE DROPDOWN */}
          <Avatar
            onClick={(e) => setAnchorProfile(e.currentTarget)}
            sx={{
              width: 38, height: 38,
              bgcolor: "transparent",
              border: "1px solid rgba(0, 234, 255, 0.5)",
              color: "#00eaff",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": { boxShadow: "0 0 10px rgba(0, 234, 255, 0.5)" }
            }}
          >
            {admin?.email?.[0]?.toUpperCase() || "A"}
          </Avatar>

          {/* MENUS */}
          <Menu
            anchorEl={anchorQuick}
            open={Boolean(anchorQuick)}
            onClose={() => setAnchorQuick(null)}
            PaperProps={{ sx: { bgcolor: "#0f172a", color: "white", border: "1px solid rgba(255,255,255,0.1)" } }}
          >
            <MenuItem onClick={() => { navigate("/admin/users/add"); setAnchorQuick(null); }}>
              <PersonIcon fontSize="small" sx={{ mr: 1, color: "#00eaff" }} /> Add User
            </MenuItem>
            <MenuItem onClick={() => { navigate("/admin/courses/add"); setAnchorQuick(null); }}>
              <AddIcon fontSize="small" sx={{ mr: 1, color: "#00eaff" }} /> Add Course
            </MenuItem>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
            <MenuItem onClick={() => { setOpenNotify(true); setAnchorQuick(null); }}>
              <SendIcon fontSize="small" sx={{ mr: 1, color: "#00eaff" }} /> Send Notification
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={anchorProfile}
            open={Boolean(anchorProfile)}
            onClose={() => setAnchorProfile(null)}
            PaperProps={{ sx: { bgcolor: "#0f172a", color: "white", border: "1px solid rgba(255,255,255,0.1)" } }}
          >
            <MenuItem onClick={() => navigate("/admin/settings")}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={logout} sx={{ color: "#ef4444" }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      {/* NOTIFICATION DIALOG */}
      <Dialog open={openNotify} onClose={() => setOpenNotify(false)} fullWidth PaperProps={{ sx: { bgcolor: "#0f172a", color: "white", border: "1px solid rgba(255,255,255,0.1)" } }}>
        <DialogTitle>Send Notification</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" margin="dense" value={notifyTitle} onChange={(e) => setNotifyTitle(e.target.value)}
            sx={{ "& .MuiInputBase-root": { color: "white" }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } }} />
          <TextField fullWidth multiline rows={3} label="Message" margin="dense" value={notifyMessage} onChange={(e) => setNotifyMessage(e.target.value)}
            sx={{ "& .MuiInputBase-root": { color: "white" }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } }} />
          <TextField fullWidth label="Redirect URL (optional)" margin="dense" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)}
            sx={{ "& .MuiInputBase-root": { color: "white" }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } }} />
          <FormControlLabel control={<Switch checked={sendToAll} onChange={(e) => setSendToAll(e.target.checked)} sx={{ "& .MuiSwitch-thumb": { color: "#00eaff" }, "& .MuiSwitch-track": { bgcolor: "rgba(255,255,255,0.3)" } }} />} label="Broadcast to all users" />
          {!sendToAll && (
            <TextField fullWidth label="Target User ID" margin="dense" value={targetUserId} onChange={(e) => setTargetUserId(e.target.value)}
              sx={{ "& .MuiInputBase-root": { color: "white" }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNotify(false)} sx={{ color: "rgba(255,255,255,0.5)" }}>Cancel</Button>
          <Button variant="contained" onClick={handleSendNotification} disabled={sending} sx={{ bgcolor: "#00eaff", color: "black", fontWeight: "bold", "&:hover": { bgcolor: "#00c4d6" } }}>
            {sending ? "Sending..." : "Send"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
