import { db } from "../../../firebase";
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";

export const sendReply = (parentId, data) => {
  return addDoc(collection(db, "threads"), {
    parentId,
    ...data,
    createdAt: Date.now(),
  });
};

export const listenReplies = (parentId, cb) => {
  const q = query(
    collection(db, "threads"),
    where("parentId", "==", parentId)
  );

  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

// /modules/Pahrikynschat/api/readReceiptApi.js
import api from "./chatApi";

export const markChannelRead = (channelId) => {
  return api.post(`/channels/${channelId}/read`);
};

export const markMessageRead = (messageId) => {
  return api.post(`/messages/${messageId}/read`);
};
