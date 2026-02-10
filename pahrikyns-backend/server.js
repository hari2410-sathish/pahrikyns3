// =======================================
// 🔥 FINAL CLEAN & WORKING SERVER.JS
// =======================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

// ============================
// ROUTES
// ============================
const adminRoutes = require("./src/routes/adminRoutes");
const userRoutes = require("./src/routes/userRoutes");
const resumeRoutes = require("./src/routes/resumes");
const studentRoutes = require("./src/routes/studentRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");

// ============================
// APP
// ============================
const app = express();

// ============================
// CORS (🔥 IMPORTANT FIX)
// ============================
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// preflight
app.options("*", cors());

// ============================
// BODY PARSERS
// ============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ============================
// STATIC FILES
// ============================
app.use("/uploads", express.static("uploads"));

// ============================
// SESSION
// ============================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret_session_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ============================
// 🔥 HEALTH CHECK (VERY IMPORTANT)
// ============================
app.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// ============================
// API ROUTES (🔥 ORDER MATTERS)
// ============================
app.use("/auth/user", userRoutes);
app.use("/admin", adminRoutes);
const courseAccessRoutes = require("./src/routes/courseAccessRoutes");
app.use("/api/students", studentRoutes);
app.use("/courses", courseAccessRoutes); // ✅ Access Check
app.use("/courses", require("./src/routes/courseRoutes")); // ✅ Public Course Info
app.use("/api/notifications", notificationRoutes);
app.use("/payments", require("./src/routes/paymentRoutes")); // ✅ Payments Route
app.use("/api/chat", require("./src/routes/chatRoutes")); // ✅ Chat Routes



// ============================
// GLOBAL ERROR HANDLER
// ============================
app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

// ============================
// CREATE HTTP SERVER
// ============================
const server = http.createServer(app);

// ============================
// SOCKET.IO
// ============================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);

// ============================
// SOCKET AUTH
// ============================
io.use((socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) return next(new Error("Auth token missing"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Socket Auth Error:", err.message);
    next(new Error("Invalid token"));
  }
});

// ============================
// SOCKET EVENTS
// ============================
io.on("connection", (socket) => {
  const userId = socket.user?.id;

  console.log(`🔌 Socket Connected: ${socket.id} | User: ${userId}`);

  if (userId) socket.join(`user:${userId}`);

  // -------------------------
  // 💬 CHAT EVENTS
  // -------------------------

  // Join a Room (Channel or DM)
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${userId} joined room: ${room}`);
  });

  // Leave a Room
  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(`User ${userId} left room: ${room}`);
  });

  // Send Message
  socket.on("chat_message", ({ room, content, type = "text" }) => {
    // Ideally save to DB here (omitted for brevity in this session)

    // Broadcast to room (including sender for optimistic UI update confirmation if needed, but usually we exclude sender. 
    // Actually, usually easier to broadcast to ALL in room so sender gets consistency with server timestamp)
    io.to(room).emit("receive_message", {
      id: Date.now().toString(), // Temp ID
      senderId: userId,
      senderName: socket.user?.name || "User",
      content,
      type,
      timestamp: new Date(),
    });
  });

  // Typing Indicator
  socket.on("typing", ({ room, isTyping }) => {
    socket.to(room).emit("user_typing", { userId, isTyping });
  });

  // -------------------------

  socket.on("disconnect", () => {
    if (userId) socket.leave(`user:${userId}`);
    console.log(`❌ Socket Disconnected: ${socket.id}`);
  });
});

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ============================
// BACKGROUND JOBS
// ============================
const startEmailRetryJob = require("./src/jobs/emailRetryJob");
startEmailRetryJob();
