import { Box, Typography, IconButton, TextField, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import MessageItem from "../messages/MessageItem";
import ChatTooltip from "../common/ChatTooltip";
import EmojiPickerButton from "../common/EmojiPickerButton";

export default function ThreadPanel() {
    const { activeThread, setActiveThread, messages, sendMessage } = useChat();
    const [replyText, setReplyText] = useState("");

    if (!activeThread) return null;

    // Filter replies from global messages (simplification)
    // In a real app, you'd fetch specific thread history here
    const threadReplies = messages.filter((m) => m.threadId === activeThread.id);

    const handleSendReply = () => {
        if (!replyText.trim()) return;
        sendMessage(replyText.trim(), "text", null, activeThread.id);
        setReplyText("");
    };

    return (
        <Box
            sx={{
                width: 350,
                borderLeft: "1px solid #ddd",
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: "-2px 0 5px rgba(0,0,0,0.05)"
            }}
        >
            {/* HEADER */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                borderBottom="1px solid #ddd"
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight="bold" fontSize={16}>
                        Thread
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">
                        #{activeThread.room || "chat"}
                    </Typography>
                </Box>
                <IconButton size="small" onClick={() => setActiveThread(null)}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* BODY */}
            <Box flex={1} overflow="auto" p={0}>
                {/* Parent Message */}
                <Box p={2} pb={1}>
                    <MessageItem message={activeThread} isThreadView={true} />
                </Box>

                <Divider flexItem>
                    <Typography variant="caption" sx={{ color: "text.secondary", px: 1 }}>
                        {threadReplies.length} replies
                    </Typography>
                </Divider>

                {/* Replies */}
                <Box>
                    {threadReplies.map((msg) => (
                        <MessageItem key={msg.id || msg.timestamp} message={msg} isThreadView={true} />
                    ))}
                </Box>
            </Box>

            {/* FOOTER (Reply Input) */}
            <Box p={2} borderTop="1px solid #ddd">
                <Box
                    sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        p: 1,
                        "&:focus-within": { borderColor: "#666" }
                    }}
                >
                    <TextField
                        fullWidth
                        multiline
                        minRows={1}
                        maxRows={4}
                        placeholder="Reply..."
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendReply();
                            }
                        }}
                    />
                        }}
                    />
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                        <EmojiPickerButton onEmojiClick={(emoji) => setReplyText(prev => prev + emoji)} />

                        <ChatTooltip title="Send reply">
                            <IconButton
                                size="small"
                                onClick={handleSendReply}
                                disabled={!replyText.trim()}
                                sx={{
                                    bgcolor: replyText.trim() ? "#007a5a" : "transparent",
                                    color: replyText.trim() ? "white" : "grey.500",
                                    "&:hover": { bgcolor: replyText.trim() ? "#148567" : "transparent" }
                                }}
                            >
                                <SendIcon fontSize="small" />
                            </IconButton>
                        </ChatTooltip>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
