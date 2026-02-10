import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Tooltip,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import { useChat } from "../../context/ChatContext";
import { usePresence } from "../../hooks/usePresence";
import { useEffect, useState } from "react";

/**
 * =====================================================
 * SLACK-LEVEL CHAT HEADER
 * =====================================================
 */

export default function ChatHeader() {
  const { activeChat } = useChat();
  const [onlineCount, setOnlineCount] = useState(0);
  const { onlineUsers } = usePresence(activeChat?.id);

  useEffect(() => {
    if (!onlineUsers) return;
    setOnlineCount(onlineUsers.length);
  }, [onlineUsers]);

  if (!activeChat)
    return (
      <Box p={2} borderBottom="1px solid rgba(255,255,255,0.08)" color="rgba(255,255,255,0.5)">
        Select a chat
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
        borderBottom: "1px solid #e2e8f0", // Light border
        bgcolor: "background.paper",
        height: 60,
      }}
    >
      {/* LEFT */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography fontWeight="900" fontSize={18} color="#1e293b">
          {activeChat.type === "channel" ? "#" : ""}
          {activeChat.name}
        </Typography>

        {activeChat.type === "channel" && (
          <Box display="flex" alignItems="center" gap={0.5} sx={{ cursor: "pointer", "&:hover": { bgcolor: "#f1f5f9" }, px: 1, borderRadius: 1 }}>
            <Typography fontSize={13} color="#64748b">
              {onlineCount} members
            </Typography>
          </Box>
        )}
      </Box>

      {/* RIGHT */}
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ width: 28, height: 28, bgcolor: "#f8f8f8", color: "black", border: "1px solid #e2e8f0" }}>
          <SearchIcon sx={{ fontSize: 18, color: "#64748b" }} />
        </Avatar>

        <Tooltip title="View Channel Details">
          <InfoIcon sx={{ color: "#64748b", cursor: "pointer" }} />
        </Tooltip>
      </Box>
    </Box>
  );
}
