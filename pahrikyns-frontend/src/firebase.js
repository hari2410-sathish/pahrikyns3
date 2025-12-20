import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAgFJse-e4UGejrX3ZYnSYoa3tFAL61eTY",
  authDomain: "pahrikyns-app.firebaseapp.com",
  projectId: "pahrikyns-app",
  storageBucket: "pahrikyns-app.firebasestorage.app",
  messagingSenderId: "888703375126",
  appId: "1:888703375126:web:351f6bac4f43c6cfc6e237",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
