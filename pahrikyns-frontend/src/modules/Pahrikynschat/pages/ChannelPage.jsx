import { useParams } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import { useEffect } from "react";
import MessageList from "../components/messages/MessageList";
import { markAsRead } from "../api/readReceiptApi";

export default function ChannelPage() {
  const { channelId } = useParams();
  const { setActiveChat, user } = useChat();

  useEffect(() => {
    setActiveChat({ type: "channel", id: channelId });
  }, [channelId]);

  // Mark as read when entering channel
  useEffect(() => {
    if (!channelId || !user) return;
    markAsRead(user.uid, "channel", channelId);
  }, [channelId, user]);

  return <MessageList />;
}
