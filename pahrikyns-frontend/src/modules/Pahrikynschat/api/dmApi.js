import { db } from "@/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export const getOrCreateDM = async (uidA, uidB) => {
  const q = query(
    collection(db, "dms"),
    where("users", "array-contains", uidA)
  );
  const snap = await getDocs(q);

  const existing = snap.docs.find((d) =>
    d.data().users.includes(uidB)
  );
  if (existing) return existing.id;

  const doc = await addDoc(collection(db, "dms"), {
    users: [uidA, uidB],
    createdAt: serverTimestamp(),
  });

  return doc.id;
};
