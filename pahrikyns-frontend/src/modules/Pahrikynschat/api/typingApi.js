import { db } from "@/firebase";
import { doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

/**
 * =====================================================
 * SLACK TYPING ENGINE
 * =====================================================
 */

export const setTyping = async (chatId, userId, isTyping) => {
  const ref = doc(db, "typing", chatId, "users", userId);

  if (isTyping) {
    await setDoc(ref, { isTyping: true });
  } else {
    await deleteDoc(ref);
  }
};

export const subscribeTyping = (chatId, callback) => {
  const ref = doc(db, "typing", chatId);

  return onSnapshot(ref, (snap) => {
    callback(snap.data()?.users || {});
  });
};
