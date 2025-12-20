import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";
import axios from "../api/axios";

export const registerFCMToken = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Push permission denied");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BNHn0UKxJyxYZZjeKc_z787tICcdpxcPe1BU2gu0BX4oqNfTf6DfGZDy5KqxO2zjFHTxdl08namIuMS8bV1kQ3E",
    });

    if (token) {
      console.log("FCM TOKEN:", token);

      // ✅ BACKEND-KU SAVE PANROM
      await axios.post("/api/notifications/save-fcm-token", {
        userId,
        token,
      });
    }
  } catch (err) {
    console.error("FCM token error:", err);
  }
};
