const { Server } = require("socket.io");

let io;
const onlineUsers = new Map(); // userId -> Set(socketIds)

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a specific chat room (channel or DM)
    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    // Leave a room
    socket.on("leave_room", (room) => {
      socket.leave(room);
      console.log(`User ${socket.id} left room: ${room}`);
    });

    // Handle typing events
    socket.on("typing", ({ room, userId, isTyping }) => {
      // Broadcast to everyone in the room EXCEPT the sender
      socket.to(room).emit("typing_update", { userId, isTyping });
    });

    // Handle new messages
    socket.on("chat_message", async (data) => {
      try {
        const { room, content, type, senderId, senderName, fileUrl, threadId } = data;

        const timestamp = new Date().toISOString();
        const messageData = {
          room,
          content,
          type: type || "text",
          senderId,
          senderName: senderName || "Unknown",
          fileUrl: fileUrl || null,
          threadId: threadId || null,
          createdAt: timestamp,
          reactions: []
        };

        // 1. Save to Firestore
        const admin = require("./src/config/firebaseAdmin");
        const db = admin.firestore();

        const docRef = await db.collection("messages").add(messageData);
        messageData.id = docRef.id;

        // 2. Handle Thread Updates
        if (threadId) {
          const parentRef = db.collection("messages").doc(threadId);
          await parentRef.update({
            replyCount: admin.firestore.FieldValue.increment(1),
            lastReplyAt: timestamp
          });

          // Also emit update to room so parent message updates in real-time
          io.to(room).emit("message_updated", {
            id: threadId,
            replyCount: admin.firestore.FieldValue.increment(1), // optimistically, though UI might need actual number
            lastReplyAt: timestamp
          });
        }

        // 3. Broadcast
        io.to(room).emit("receive_message", messageData);

      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    // Presence State

    // Handle user coming online
    socket.on("register_presence", (userId) => {
      if (!userId) return;

      socket.userId = userId; // Store on socket instance for disconnect handling

      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId).add(socket.id);

      // Broadcast online status
      io.emit("user_online", { userId });

      // Send current online list to this user
      const onlineList = Array.from(onlineUsers.keys());
      socket.emit("online_users", onlineList);

      console.log(`User ${userId} is online`);
    });

    socket.on("disconnect", () => {
      const userId = socket.userId;
      if (userId && onlineUsers.has(userId)) {
        const userSockets = onlineUsers.get(userId);
        userSockets.delete(socket.id);

        if (userSockets.size === 0) {
          onlineUsers.delete(userId);
          io.emit("user_offline", { userId });
          console.log(`User ${userId} went offline`);
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });
}

module.exports = { initSocket };
