import { useParams } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import { useEffect } from "react";
import MessageList from "../components/messages/MessageList";

export default function DirectMessage() {
  const { userId } = useParams();
  const { setActiveChat } = useChat();

  useEffect(() => {
    setActiveChat({ type: "dm", id: userId });
  }, [userId]);

  return <MessageList />;
}
