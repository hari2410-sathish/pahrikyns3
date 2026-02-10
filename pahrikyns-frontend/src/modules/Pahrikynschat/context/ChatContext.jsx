import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSocket } from "../../../contexts/SocketContext";
import { useAuth } from "../../../contexts/AuthContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { socket } = useSocket();
  const { user } = useAuth();

  const [activeChat, setActiveChat] = useState(null);
  // activeChat = { type: "channel" | "dm", id: "general" }

  const [activeThread, setActiveThread] = useState(null); // { id: "msgId", ...msgData }

  const [messages, setMessages] = useState([]);

  // Presence State
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  // Helper: Generate consistent DM room ID
  const getDmRoomId = useCallback((otherUserId) => {
    if (!user) return null;
    const uid1 = user.uid;
    const uid2 = otherUserId;
    // Sort to ensure same room ID regardless of who starts chat
    return [uid1, uid2].sort().join("_");
  }, [user]);

  // 1. Join Room on Active Chat Change
  useEffect(() => {
    if (!socket || !activeChat) return;

    // Close thread when switching channels
    setActiveThread(null);

    setActiveThread(null);

    let roomId;
    if (activeChat.type === 'channel') {
      roomId = activeChat.id;
    } else {
      // For DMs, generate the sorted room ID
      roomId = `dm:${getDmRoomId(activeChat.id)}`;
    }

    socket.emit("join_room", roomId);

    // Clear messages on switch (or fetch history from API in PROD)
    setMessages([]);

    return () => {
      socket.emit("leave_room", roomId);
    };
  }, [socket, activeChat]);

  // 2. Presence & Messages
  useEffect(() => {
    if (!socket || !user) return;

    // Register Presence
    socket.emit("register_presence", user.uid);

    // Presence Handlers
    const handleOnlineList = (list) => {
      setOnlineUsers(new Set(list));
    };
    const handleUserOnline = ({ userId }) => {
      setOnlineUsers((prev) => new Set(prev).add(userId));
    };
    const handleUserOffline = ({ userId }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    };

    const handleMessage = (msg) => {
      // Always add to list (MessageList needs to filter replies out)
      setMessages((prev) => [...prev, msg]);

      // If it's a thread reply, ALSO update the parent message metadata
      if (msg.threadId) {
        setMessages((prev) =>
          prev.map(m => m.id === msg.threadId
            ? { ...m, replyCount: (m.replyCount || 0) + 1, lastReplyAt: msg.createdAt }
            : m
          )
        );
      }
    };

    const handleUpdate = (updatedMsg) => {
      setMessages((prev) =>
        prev.map(m => m.id === updatedMsg.id ? { ...m, ...updatedMsg } : m)
      );
    };

    socket.on("online_users", handleOnlineList);
    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);
    socket.on("receive_message", handleMessage);
    socket.on("message_updated", handleUpdate);

    return () => {
      socket.off("online_users", handleOnlineList);
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
      socket.off("receive_message", handleMessage);
      socket.off("message_updated", handleUpdate);
    };
  }, [socket, user]);

  // 3. Send Message Action
  const sendMessage = useCallback((content, type = "text", fileUrl = null, threadId = null) => {
    if (!socket || !activeChat || !content) return;

    let roomId;
    if (activeChat.type === 'channel') {
      roomId = activeChat.id;
    } else {
      roomId = `dm:${getDmRoomId(activeChat.id)}`;
    }

    const messageData = {
      room: roomId,
      content,
      type,
      fileUrl,
      threadId, // Thread support
      senderId: user?.uid,
      senderName: user?.displayName || "User",
      timestamp: new Date().toISOString()
    };

    // Optimistic update for thread replies handled in component or waiting for socket echo
    socket.emit("chat_message", messageData);

  }, [socket, activeChat, user, getDmRoomId]);

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, activeThread, setActiveThread, messages, sendMessage, user, getDmRoomId, onlineUsers }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
