import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ChatAvatar from "../common/ChatAvatar";
import ChatTooltip from "../common/ChatTooltip";

import { useChat } from "../../context/ChatContext";

/**
 * =====================================================
 * SLACK-LEVEL MESSAGE ROW
 * =====================================================
 */

import { usePresence } from "../../hooks/usePresence";

export default function MessageItem({ message, isThreadView = false }) {
  const { setActiveThread } = useChat();
  const [hover, setHover] = useState(false);
  const [reactions, setReactions] = useState(message.reactions || []);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(message.text);

  const { isOnline } = usePresence(message.senderId);

  const addReaction = (emoji) => {
    setReactions([...reactions, emoji]);
  };

  const saveEdit = () => {
    // update message in Firestore
    setEditing(false);
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        display: "flex",
        gap: 1.5,
        px: 2.5,
        py: 0.5, // Compact slack rows
        "&:hover": { bgcolor: "action.hover" }, // Theme aware hover
        position: "relative",
      }}
    >
      <ChatAvatar
        src={message.userAvatar}
        name={message.senderName || message.user}
        size={36}
        isOnline={isOnline}
        showStatus={false} // Messages usually don't show dot, just the image. Change to true if desired.
      />

      <Box flex={1}>
        {/* HEADER */}
        <Box display="flex" alignItems="baseline" gap={1}>
          <Typography fontWeight="900" fontSize={15} color="text.primary">
            {message.senderName || message.user}
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {new Date(message.createdAt || message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>

        {/* MESSAGE CONTENT */}
        {editing ? (
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={saveEdit}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 4,
              border: "1px solid #ccc"
            }}
          />
        ) : (
          <Box>
            {message.type === "image" && message.fileUrl ? (
              <Box mt={0.5} mb={0.5}>
                <img
                  src={message.fileUrl}
                  alt="attachment"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0"
                  }}
                />
              </Box>
            ) : message.type === "file" && message.fileUrl ? (
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                p={1}
                mt={0.5}
                mb={0.5}
                border="1px solid #e2e8f0"
                borderRadius={2}
                bgcolor="background.paper"
                sx={{ width: "fit-content", cursor: "pointer", "&:hover": { bgcolor: "#f1f5f9" } }}
                onClick={() => window.open(message.fileUrl, "_blank")}
              >
                <Box
                  bgcolor="#f0fdf4"
                  p={1}
                  borderRadius={1}
                  color="#16a34a"
                  display="flex"
                >
                  <Typography fontWeight="bold" fontSize={12}>FILE</Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" fontSize={14} color="text.primary">{message.content}</Typography>
                  <Typography fontSize={12} color="text.secondary">Click to download</Typography>
                </Box>
              </Box>
            ) : (
              <Typography fontSize={15} color="text.primary" sx={{ lineHeight: 1.5 }}>
                {message.text || message.content}
              </Typography>
            )}
          </Box>
        )}

        {/* REACTIONS */}
        {reactions.length > 0 && (
          <Box mt={0.5} display="flex" gap={0.5}>
            {reactions.map((r, i) => (
              <Box
                key={i}
                sx={{
                  px: 0.8,
                  bgcolor: "action.selected",
                  borderRadius: 10,
                  fontSize: 12,
                  border: "1px solid transparent",
                  cursor: "pointer",
                  "&:hover": { borderColor: "#ccc" }
                }}
              >
                {r}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* ACTION BAR (Floating Top Right) */}
      {hover && !isThreadView && (
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: 20,
            display: "flex",
            gap: 0,
            bgcolor: "background.paper",
            border: "1px solid #e2e8f0",
            borderRadius: 2,
            p: 0.5,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <ChatTooltip title="React">
            <IconButton size="small" onClick={() => addReaction("❤️")}>
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </ChatTooltip>

          <ChatTooltip title="Reply in thread">
            <IconButton size="small" onClick={() => setActiveThread(message)}>
              <ReplyIcon fontSize="small" />
            </IconButton>
          </ChatTooltip>

          <ChatTooltip title="Edit">
            <IconButton size="small" onClick={() => setEditing(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </ChatTooltip>

          <ChatTooltip title="Delete">
            <IconButton size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ChatTooltip>
        </Box>
      )}

      {/* THREAD INFO (Footer) */}
      {!isThreadView && message.replyCount > 0 && (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mt={0.5}
          onClick={() => setActiveThread(message)}
          sx={{ cursor: "pointer", "&:hover .reply-text": { textDecoration: "underline" } }}
        >
          <Box display="flex" gap={0.5}>
            <Avatar src={message.userAvatar} sx={{ width: 16, height: 16, fontSize: 10 }} />
            {/* Could show multiple avatars here */}
          </Box>
          <Typography variant="caption" className="reply-text" color="primary" fontWeight="bold">
            {message.replyCount} replies
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last reply {new Date(message.lastReplyAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
