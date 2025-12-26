importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAafXkJwyZ5F7Xuax0VktZ9cpqWD4oCvxU",
  authDomain: "tournament-97743.firebaseapp.com",
  projectId: "tournament-97743",
  storageBucket: "tournament-97743.firebasestorage.app",
  messagingSenderId: "584797187828",
  appId: "1:584797187828:web:4c643f83dfd9b700adb8a1"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Received background message ', payload);

  // Safely get title and body (handles both data and notification payloads)
  const title = payload.notification?.title || payload.data?.title || "G-ZONE ESPORTS";
  const body = payload.notification?.body || payload.data?.body || "New Update!";

  const notificationOptions = {
    body: body,
    // THE ICONS:
    icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233483.png', // Large icon
    badge: '/mono.png', // The monochrome icon (Status bar)
    
    // Extra fixes for reliability:
    tag: 'gzone-update', // Groups notifications so they don't stack infinitely
    vibrate: [100, 50, 100],
    data: {
      url: payload.data?.url || '/app.html' // Helps with clicking the notification
    }
  };

  return self.registration.showNotification(title, notificationOptions);
});