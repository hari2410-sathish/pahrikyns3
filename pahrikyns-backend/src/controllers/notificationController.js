const prisma = require("../config/prismaClient");
const admin = require("../config/firebaseAdmin"); // ✅ Firebase Admin

/**
 * ✅ CREATE NOTIFICATION (ADMIN ONLY)
 * Admin -> User OR Broadcast
 * + SOCKET + FCM PUSH
 */
exports.createNotification = async (req, res) => {
  try {
    // ✅ ADMIN SECURITY CHECK
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can send notifications",
      });
    }

    const {
      userId = null,
      title,
      message,
      type = "system",
      meta = {},
    } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required",
      });
    }

    // ✅ SAVE TO DB
    const note = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });

    // ✅ SOCKET EMIT (REAL-TIME)
    const io = req.app.get("io");
    if (io) {
      if (userId) {
        io.to(`user:${userId}`).emit("notification", note);
      } else {
        io.emit("notification", note); // broadcast
      }
    }

    // ✅ FIREBASE PUSH NOTIFICATION
    try {
      const where = userId ? { userId } : {};

      const tokens = await prisma.fcmToken.findMany({
        where,
        select: { token: true },
      });

      if (tokens.length > 0) {
        await admin.messaging().sendEachForMulticast({
          tokens: tokens.map((t) => t.token),
          notification: {
            title,
            body: message,
          },
          data: {
            type: String(type || "system"),
            notificationId: String(note.id),
            redirectUrl: meta?.redirectUrl
              ? String(meta.redirectUrl)
              : "",
          },
        });
      }
    } catch (pushErr) {
      console.error("🔥 FCM PUSH ERROR:", pushErr.message);
    }

    res.status(201).json({
      success: true,
      notification: note,
    });
  } catch (err) {
    console.error("Create Notification Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * ✅ SAVE / UPDATE FCM TOKEN
 * (Called from frontend after login)
 */
exports.saveFcmToken = async (req, res) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({
        success: false,
        message: "userId and token are required",
      });
    }

    await prisma.fcmToken.upsert({
      where: { token },
      update: { userId },
      create: { userId, token },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Save FCM Token Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * ✅ LIST NOTIFICATIONS
 * - ADMIN → GET ALL
 * - USER → GET OWN ONLY
 */
exports.listNotifications = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;

    // ✅ ADMIN VIEW → ALL NOTIFICATIONS
    if (req.user?.role === "admin") {
      const notifications = await prisma.notification.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
      });

      const total = await prisma.notification.count();

      return res.json({
        success: true,
        notifications,
        pagination: {
          total,
          page,
          totalPages: Math.ceil(total / limit),
        },
        unread: 0,
        adminView: true,
      });
    }

    // ✅ USER VIEW → OWN NOTIFICATIONS ONLY
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const where = { userId };

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    });

    const total = await prisma.notification.count({ where });

    const unread = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    res.json({
      success: true,
      notifications,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      unread,
    });
  } catch (err) {
    console.error("List Notification Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * ✅ MARK NOTIFICATION AS READ
 */
exports.markRead = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    // ✅ SOCKET EMIT
    const io = req.app.get("io");
    if (io && updated.userId) {
      io.to(`user:${updated.userId}`).emit("notification_read", {
        id: updated.id,
      });
    }

    res.json({
      success: true,
      notification: updated,
    });
  } catch (err) {
    console.error("Mark Read Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * ✅ DELETE NOTIFICATION
 * - ADMIN → DELETE ANY
 * - USER → DELETE OWN ONLY
 */
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await prisma.notification.findUnique({
      where: { id },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // ✅ USER CAN DELETE ONLY OWN
    if (req.user?.role !== "admin" && note.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this notification",
      });
    }

    await prisma.notification.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Notification deleted",
    });
  } catch (err) {
    console.error("Delete Notification Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
