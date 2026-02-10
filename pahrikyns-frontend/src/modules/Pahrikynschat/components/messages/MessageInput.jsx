import { useState, useRef } from "react";
import {
  Box,
  IconButton,
  InputBase,
  CircularProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "../common/EmojiPicker";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../../contexts/AuthContext";
import { sendMessage } from "../../api/messageApi";
import { uploadFile } from "../../utils/uploadFile";
import useTyping from "../../hooks/useTyping";

/**
 * =====================================================
 * SLACK LEVEL MESSAGE INPUT
 * =====================================================
 * - Emoji
 * - Upload files
 * - Typing indicator
 * - Auto focus
 */

export default function MessageInput() {
  const { activeChat } = useChat();
  const { user } = useAuth();
  const { startTyping, stopTyping } = useTyping(
    activeChat?.type,
    activeChat?.id
  );

  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  if (!activeChat) return null;

  const send = async () => {
    if (!text.trim() && !fileRef.current?.files[0]) return;

    let fileUrl = null;
    let fileName = null;

    if (fileRef.current.files[0]) {
      setUploading(true);
      const file = fileRef.current.files[0];
      fileUrl = await uploadFile(file);
      fileName = file.name;
      setUploading(false);
      fileRef.current.value = "";
    }

    await sendMessage({
      chatId: activeChat.id,
      type: activeChat.type,
      senderId: user.uid,
      senderName: user.displayName,
      text,
      fileUrl,
      fileName,
    });

    setText("");
    stopTyping();
  };

  return (
    <Box
      sx={{
        p: 1,
        borderTop: "1px solid #1e293b",
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "#020617",
      }}
    >
      {/* Attach */}
      <IconButton onClick={() => fileRef.current.click()}>
        <AttachFileIcon sx={{ color: "#94a3b8" }} />
      </IconButton>
      <input
        type="file"
        hidden
        ref={fileRef}
      />

      {/* Emoji */}
      <IconButton onClick={() => setShowEmoji(!showEmoji)}>
        <EmojiEmotionsIcon sx={{ color: "#94a3b8" }} />
      </IconButton>

      {showEmoji && (
        <EmojiPicker
          onSelect={(e) => setText((t) => t + e.native)}
        />
      )}

      {/* Text */}
      <InputBase
        fullWidth
        placeholder={`Message ${
          activeChat.type === "channel" ? "#" : ""
        }${activeChat.name}`}
        sx={{ color: "white", px: 2 }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          startTyping();
        }}
        onBlur={stopTyping}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />

      {/* Send */}
      <IconButton onClick={send} disabled={uploading}>
        {uploading ? (
          <CircularProgress size={20} />
        ) : (
          <SendIcon sx={{ color: "#3b82f6" }} />
        )}
      </IconButton>
    </Box>
  );
}
