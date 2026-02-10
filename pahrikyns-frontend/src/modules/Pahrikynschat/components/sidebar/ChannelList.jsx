import { useEffect, useState } from "react";
import { List, Box, Typography } from "@mui/material";
import ChannelItem from "./ChannelItem";
import { useAuth } from "../../../../contexts/AuthContext";
import { listenReadReceipt } from "../../api/readReceiptApi";
import useChannels from "../../hooks/useChannels";

/**
 * =====================================================
 * SLACK-LEVEL CHANNEL LIST
 * =====================================================
 * - Live unread
 * - Active channel
 * - Sorted by activity
 */

export default function ChannelList() {
  const { channels, loading } = useChannels();
  const { firebaseUser, user: backendUser } = useAuth();

  // 🛡️ Fallback: Standardized user object
  const currentUser = firebaseUser
    ? { uid: firebaseUser.uid, ...firebaseUser }
    : (backendUser ? { uid: backendUser.id, ...backendUser } : null);

  const [readMap, setReadMap] = useState({});

  useEffect(() => {
    if (!currentUser) return;

    const unsubs = channels.map((ch) =>
      listenReadReceipt(currentUser.uid, "channel", ch.id, (data) => {
        setReadMap((m) => ({
          ...m,
          [ch.id]: data,
        }));
      })
    );

    return () => unsubs.forEach((u) => u && u());
  }, [channels, currentUser]);

  if (loading)
    return <Typography sx={{ px: 2, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Loading channels…</Typography>;

  return (
    <List sx={{ px: 1 }}>
      {channels.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
          readReceipt={readMap[channel.id]}
        />
      ))}
    </List>
  );
}
