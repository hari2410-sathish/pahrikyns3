importScripts("https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAgFJse-e4UGejrX3ZYnSYoa3tFAL61eTY",
  authDomain: "pahrikyns-app.firebaseapp.com",
  projectId: "pahrikyns-app",
  storageBucket: "pahrikyns-app.firebasestorage.app",
  messagingSenderId: "888703375126",
  appId: "1:888703375126:web:351f6bac4f43c6cfc6e237",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background push:", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
