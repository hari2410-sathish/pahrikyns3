import { Box, Typography } from "@mui/material";
import { useChat } from "../../context/ChatContext";
import { useTypingUsers } from "../../hooks/useTyping";

/**
 * =====================================================
 * SOCKET.IO TYPING INDICATOR
 * =====================================================
 */

export default function TypingIndicator() {
  const { activeChat, user } = useChat();

  // Directly use the hook which now returns the object of typing users
  const typingUsers = useTypingUsers(activeChat?.id, activeChat?.type);

  // Filter out self and get names (if we had names, for now just keys/IDs)
  const typingIds = Object.keys(typingUsers || {}).filter(id => id !== user?.uid);

  if (typingIds.length === 0) return null;

  return (
    <Box sx={{ px: 2, py: 0.5 }}>
      <Typography fontSize={12} color="#94a3b8" sx={{ fontStyle: 'italic' }}>
        {typingIds.length === 1 ? "Someone is typing..." : "Several people are typing..."}
      </Typography>
    </Box>
  );
}
