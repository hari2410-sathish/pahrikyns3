import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import useMessages from "../../hooks/useMessages";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";

/**
 * =====================================================
 * SLACK-LEVEL MESSAGE FEED
 * =====================================================
 */

export default function MessageList() {
  // Use Context Messages (Real-time)
  const { activeChat, messages } = useChat();
  const loading = false;

  const bottomRef = useRef();

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!activeChat)
    return (
      <Box p={3} color="#94a3b8">
        Select a channel or DM to start chatting
      </Box>
    );

  if (loading) return <Box p={3}>Loading messages…</Box>;

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        px: 0, // Slack has no side padding on container, handled by interactions
        py: 0,
      }}
    >
      }}
    >
      {messages
        .filter(msg => !msg.threadId) // Hide Thread Replies
        .map((msg, index, filteredArray) => {
          const prev = filteredArray[index - 1];
          const showDate =
            !prev ||
            new Date(prev.createdAt).toDateString() !==
            new Date(msg.createdAt).toDateString();

          return (
            <Box key={msg.id}>
              {showDate && (
                <Box
                  sx={{
                    textAlign: "center",
                    my: 2,
                    fontSize: 11,
                    color: "#64748b",
                  }}
                >
                  {new Date(msg.createdAt).toDateString()}
                </Box>
              )}

              <MessageItem message={msg} />
            </Box>
          );
        })}

      {/* typing */}
      <TypingIndicator />

      <div ref={bottomRef} />
    </Box>
  );
}
