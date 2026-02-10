import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { markAsRead, listenReadReceipt } from "../api/readReceiptApi";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../../../contexts/AuthContext";

/**
 * =====================================================
 * SLACK-LEVEL MESSAGE ENGINE
 * =====================================================
 * - Real time messages
 * - Mark read on open
 * - Live unread tracking
 */

export default function useMessages(type, chatId) {
  const { activeChat } = useChat();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastReadAt, setLastReadAt] = useState(0);

  // 🔵 listen to read receipt
  useEffect(() => {
    if (!user || !chatId) return;

    return listenReadReceipt(user.uid, type, chatId, (data) => {
      if (data?.lastReadAt) {
        setLastReadAt(data.lastReadAt);
      }
    });
  }, [user, type, chatId]);

  // 🔴 load messages
  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      where("type", "==", type),
      orderBy("createdAt")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
      setLoading(false);
    });

    return unsub;
  }, [type, chatId]);

  // 🟢 mark as read when viewing
  useEffect(() => {
    if (!user || !activeChat) return;
    if (messages.length === 0) return;

    markAsRead(user.uid, activeChat.type, activeChat.id);
  }, [messages, activeChat, user]);

  return { messages, loading, lastReadAt };
}
