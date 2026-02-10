import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadChatFile = async (file, channelId) => {
  const fileRef = ref(
    storage,
    `chat/${channelId}/${Date.now()}-${file.name}`
  );

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return {
    name: file.name,
    url,
    type: file.type,
  };
};
