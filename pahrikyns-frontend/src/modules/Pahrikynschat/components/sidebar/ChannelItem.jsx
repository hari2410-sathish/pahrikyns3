import {
  ListItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext";
import { useEffect, useMemo, useState } from "react";
import { listenLastMessage } from "../../api/messageApi";
import ChatBadge from "../common/ChatBadge";
import ChatTooltip from "../common/ChatTooltip";

/**
 * ==========================================================
 * SLACK-LEVEL CHANNEL ITEM
 *  - Active glow
 *  - Unread count
 *  - @mention
 *  - Mute
 *  - Pin
 *  - Last message preview
 *  - Presence glow
 * ==========================================================
 */

export default function ChannelItem({ channel, readReceipt }) {
  const navigate = useNavigate();
  const { activeChat, setActiveChat } = useChat();

  const [lastMessage, setLastMessage] = useState(null);
  const [hover, setHover] = useState(false);
  const [muted, setMuted] = useState(channel.muted || false);
  const [pinned, setPinned] = useState(channel.pinned || false);

  const isActive = activeChat?.id === channel.id;
  const lastReadAt = readReceipt?.lastReadAt || 0;

  // 🔴 unread calculation
  const unread = lastMessage && lastMessage.createdAt > lastReadAt;

  // 🔵 mention detect
  const mentioned = useMemo(() => {
    if (!lastMessage) return false;
    return lastMessage.text?.includes("@me");
  }, [lastMessage]);

  // 🔁 Live last message
  useEffect(() => {
    return listenLastMessage("channel", channel.id, setLastMessage);
  }, [channel.id]);

  const openChannel = () => {
    setActiveChat({
      type: "channel",
      id: channel.id,
      name: channel.name,
    });

    navigate(`/chat/channel/${channel.id}`);
  };

  // 🎨 Slack Colors
  const bg = isActive ? "#1164A3" : "transparent";
  const color = isActive ? "white" : "#cfc3cf";

  return (
    <ListItem
      onClick={openChannel}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        cursor: "pointer",
        px: 2,
        py: 0.5,
        mb: 0.5,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "none", // Slack is instant
        "&:hover": {
          background: isActive ? "#1164A3" : "#350d36",
        },
      }}
    >
      {/* LEFT SIDE */}
      <Box display="flex" alignItems="center" gap={1} flex={1}>
        <Typography
          fontSize={15}
          fontWeight={unread ? "bold" : "normal"}
          color={color}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            opacity: isActive ? 1 : 0.8
          }}
        >
          # {channel.name}
        </Typography>

        {mentioned && (
          <Box
            sx={{
              bgcolor: "#ef4444",
              px: 1,
              py: "2px",
              borderRadius: 10,
              fontSize: 10,
              color: "white",
            }}
          >
            @
          </Box>
        )}
      </Box>

      {/* RIGHT SIDE */}
      <Box display="flex" alignItems="center" gap={0.5}>
        {unread && !muted && (
          <ChatBadge count={1} /> // Simplified count for now
        )}

        {hover && (
          <>
            <ChatTooltip title={muted ? "Unmute" : "Mute"}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setMuted(!muted);
                }}
              >
                {muted ? (
                  <VolumeOffIcon sx={{ fontSize: 16 }} />
                ) : (
                  <VolumeUpIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </ChatTooltip>

            <ChatTooltip title={pinned ? "Unpin" : "Pin"}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setPinned(!pinned);
                }}
              >
                <PushPinIcon
                  sx={{
                    fontSize: 16,
                    color: pinned ? "#facc15" : "#64748b",
                  }}
                />
              </IconButton>
            </ChatTooltip>
          </>
        )}
      </Box>
    </ListItem>
  );
}
