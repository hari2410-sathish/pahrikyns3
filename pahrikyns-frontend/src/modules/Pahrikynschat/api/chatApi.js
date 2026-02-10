import { db } from "@/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const basePath = (chat) =>
  chat.type === "channel"
    ? ["channels", chat.id, "messages"]
    : ["dms", chat.id, "messages"];

export const sendMessage = async (chat, message) => {
  const ref = collection(db, ...basePath(chat));
  await addDoc(ref, {
    ...message,
    createdAt: serverTimestamp(),
  });
};

export const subscribeMessages = (chat, cb) => {
  if (!chat?.id) return () => {};

  const q = query(
    collection(db, ...basePath(chat)),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snap) => {
    const msgs = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    cb(msgs);
  });
};
