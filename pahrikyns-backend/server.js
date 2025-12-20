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
app.use("/api/resumes", resumeRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/notifications", notificationRoutes);

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
