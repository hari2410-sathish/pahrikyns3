import { db } from "@/firebase";
import {
  doc, updateDoc, deleteDoc, setDoc, serverTimestamp
} from "firebase/firestore";

export const deleteMessage = async (chat, messageId) => {
  const path =
    chat.type === "channel"
      ? ["channels", chat.data.id, "messages", messageId]
      : ["dms", chat.data.id, "messages", messageId];

  await deleteDoc(doc(db, ...path));
};

export const pinMessage = async (chat, messageId) => {
  const ref =
    chat.type === "channel"
      ? doc(db, "channels", chat.data.id)
      : doc(db, "dms", chat.data.id);

  await updateDoc(ref, { pinnedMessageId: messageId });
};

export const unpinMessage = async (chat) => {
  const ref =
    chat.type === "channel"
      ? doc(db, "channels", chat.data.id)
      : doc(db, "dms", chat.data.id);

  await updateDoc(ref, { pinnedMessageId: null });
};

export const muteUser = async (channelId, userId, minutes) => {
  await setDoc(doc(db, "mutes", `${channelId}_${userId}`), {
    channelId,
    userId,
    until: new Date(Date.now() + minutes * 60 * 1000),
    createdAt: serverTimestamp(),
  });
};
