import { useChat } from "../context/ChatContext";

/**
 * =====================================================
 * SLACK-LEVEL PRESENCE HOOK
 * =====================================================
 * Now uses Socket.io real-time state from Context
 */

export function usePresence(userId) {
  const { onlineUsers } = useChat();

  if (!userId) return { isOnline: false };

  const isOnline = onlineUsers.has(userId);

  return { isOnline };
}
