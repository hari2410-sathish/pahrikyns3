import { Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { sendMessage } from "../../api/chatApi";
import { useAuth } from "@/contexts/AuthContext";
import { uploadChatFile } from "../../utils/uploadFile";
import ChatTooltip from "../common/ChatTooltip";
import EmojiPickerButton from "../common/EmojiPickerButton";

export default function ChatFooter() {
  const [text, setText] = useState("");
  const { activeChat, sendMessage } = useChat(); // Use Context
  const { user } = useAuth();

  const handleSend = async () => {
    if (!text || !activeChat) return;

    // Direct Socket Send
    sendMessage(text, "text");

    setText("");
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeChat) return;

    try {
      // Upload to Firebase Storage
      const { url, type, name } = await uploadChatFile(file, activeChat.id);

      // Determine Msg Type
      const msgType = type.startsWith("image/") ? "image" : "file";

      // Send via Socket
      sendMessage(name, msgType, url);

    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload file");
    }
  };

  return (
    <Box px={2.5} pb={3} pt={1}>
      <Box
        sx={{
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          bgcolor: "white",
          overflow: "hidden",
          "&:focus-within": {
            borderColor: "#64748b",
            boxShadow: "0 0 0 1px #64748b",
          },
        }}
      >
        {/* Toolbar (Fake) */}
        <Box
          display="flex"
          gap={0.5}
          p={0.5}
          bgcolor="#f8fafc"
          borderBottom="1px solid #f1f5f9"
        >
          <ChatTooltip title="Bold (Cmd+B)">
            <IconButton size="small"><Typography fontWeight="bold" fontSize={14}>B</Typography></IconButton>
          </ChatTooltip>
          <ChatTooltip title="Italic (Cmd+I)">
            <IconButton size="small"><Typography fontStyle="italic" fontSize={14}>I</Typography></IconButton>
          </ChatTooltip>
          <ChatTooltip title="Strikethrough (Cmd+Shift+X)">
            <IconButton size="small"><Typography fontSize={14} sx={{ textDecoration: "line-through" }}>S</Typography></IconButton>
          </ChatTooltip>
        </Box>

        <TextField
          fullWidth
          multiline
          minRows={2}
          maxRows={6}
          placeholder={`Message #${activeChat?.name || "chat"}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              p: 1.5,
              fontSize: 15,
              "& fieldset": { border: "none" },
            },
          }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center" p={1} bgcolor="#f8fafc" borderTop="1px solid #f1f5f9">
          <Box display="flex" gap={1}>
            <ChatTooltip title="Attach file">
              <IconButton size="small" component="label">
                <AttachFileIcon fontSize="small" />
                <input hidden type="file" onChange={handleFile} />
              </IconButton>
            </ChatTooltip>

            <ChatTooltip title="Mention someone">
              <IconButton size="small"><Typography fontSize={16}>@</Typography></IconButton>
            </ChatTooltip>

            <EmojiPickerButton onEmojiClick={(emoji) => setText(prev => prev + emoji)} />
          </Box>

          <Box
            onClick={handleSend}
            sx={{
              bgcolor: text.trim() ? "#007a5a" : "#f0f0f0", // Slack Green
              color: text.trim() ? "white" : "#ccc",
              borderRadius: 1,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: text.trim() ? "pointer" : "default",
              transition: "0.2s"
            }}
          >
            <SendIcon fontSize="small" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
