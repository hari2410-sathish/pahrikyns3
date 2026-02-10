import { db } from "@/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

/* Send message */
export const sendMessage = async ({
  chatId,
  type,
  senderId,
  senderName,
  text,
  fileUrl,
  fileName,
}) => {
  await addDoc(collection(db, "messages"), {
    chatId,
    type,
    senderId,
    senderName,
    text,
    fileUrl,
    fileName,
    createdAt: serverTimestamp(),
  });
};

/* Listen last message for sidebar */
export const listenLastMessage = (type, chatId, callback) => {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    where("type", "==", type),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  return onSnapshot(q, (snap) => {
    if (!snap.empty) {
      callback(snap.docs[0].data());
    }
  });
};
