import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

/**
 * =====================================================
 * SLACK-LEVEL READ RECEIPT ENGINE
 * =====================================================
 *
 * Every user + every chat
 * has one record:
 *
 * readReceipts
 *   userId_chatType_chatId
 *     lastReadAt
 */

const getKey = (userId, type, chatId) =>
  `${userId}_${type}_${chatId}`;

// Called when user opens a channel / DM
export const markAsRead = async (userId, type, chatId) => {
  const ref = doc(db, "readReceipts", getKey(userId, type, chatId));

  await setDoc(
    ref,
    {
      userId,
      type,
      chatId,
      lastReadAt: Date.now(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

// Listen to read state
export const listenReadReceipt = (userId, type, chatId, cb) => {
  const ref = doc(db, "readReceipts", getKey(userId, type, chatId));

  return onSnapshot(ref, (snap) => {
    cb(snap.exists() ? snap.data() : null);
  });
};
