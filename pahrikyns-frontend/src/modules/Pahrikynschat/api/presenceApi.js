import { db } from "@/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

export const setUserOnline = async (userId) => {
  await setDoc(doc(db, "presence", userId), {
    online: true,
    lastSeen: serverTimestamp(),
  });
};

export const setUserOffline = async (userId) => {
  await setDoc(doc(db, "presence", userId), {
    online: false,
    lastSeen: serverTimestamp(),
  });
};

export const subscribePresence = (userId, callback) => {
  return onSnapshot(doc(db, "presence", userId), (snap) => {
    callback(snap.data());
  });
};
