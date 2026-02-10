import { useEffect, useState } from "react";
import { useSocket } from "../../../contexts/SocketContext";
import { useAuth } from "../../../contexts/AuthContext";

/**
 * =====================================================
 * SOCKET.IO TYPING HOOK
 * =====================================================
 */

export default function useTyping(type, chatId) {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [isTyping, setIsTyping] = useState(false);

  const startTyping = () => {
    if (!socket || !user || !chatId) return;
    socket.emit("typing", {
      room: type === 'channel' ? chatId : `dm:${chatId}`,
      userId: user.uid,
      isTyping: true
    });
    setIsTyping(true);
  };

  const stopTyping = () => {
    if (!socket || !user || !chatId) return;
    socket.emit("typing", {
      room: type === 'channel' ? chatId : `dm:${chatId}`,
      userId: user.uid,
      isTyping: false
    });
    setIsTyping(false);
  };

  return { startTyping, stopTyping, isTyping };
}

/* Listen who is typing */
export function useTypingUsers(chatId, type = "channel") {
  const { socket } = useSocket();
  const [typingUsers, setTypingUsers] = useState({});

  useEffect(() => {
    if (!socket || !chatId) return;

    const roomId = type === 'channel' ? chatId : `dm:${chatId}`;

    const handleTypingUpdate = ({ userId, isTyping }) => {
      setTypingUsers((prev) => {
        const next = { ...prev };
        if (isTyping) {
          next[userId] = true;
        } else {
          delete next[userId];
        }
        return next;
      });
    };

    socket.on("typing_update", handleTypingUpdate);

    return () => {
      socket.off("typing_update", handleTypingUpdate);
    };
  }, [socket, chatId, type]);

  return typingUsers;
}
