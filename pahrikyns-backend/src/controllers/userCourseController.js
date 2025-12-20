const prisma = require("../config/prismaClient");

/* ================= SUBSCRIPTION STATUS =================
   NOTE: You DO NOT have a Subscription model in Prisma.
   So we infer ACTIVE status from SUCCESS payments.
======================================================== */
exports.subscriptionStatus = async (req, res) => {
  try {
    const lastSuccessPayment = await prisma.payment.findFirst({
      where: {
        userId: req.user.id,
        status: "SUCCESS",
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      active: !!lastSuccessPayment,
      plan: lastSuccessPayment ? "DEFAULT" : null,
      expiresAt: null, // No subscription table in schema
    });
  } catch (err) {
    console.error("subscriptionStatus error:", err);
    res.status(500).json({ error: "Failed to fetch subscription status" });
  }
};

/* ================= MY COURSES ================= */
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        status: "Published", // ✅ Matches your schema
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ courses });
  } catch (err) {
    console.error("getMyCourses error:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

/* ================= COURSE PROGRESS =================
   NOTE: You DO NOT have userProgress model in schema.
   So returning SAFE empty array for now.
==================================================== */
exports.getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID required" });
    }

    // ✅ SAFE MODE: Until userProgress model is added
    return res.json({ progress: [] });
  } catch (err) {
    console.error("getCourseProgress error:", err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

/* ================= UPDATE PROGRESS =================
   NOTE: userProgress model NOT present in schema.
   So we prevent crash and return informative response.
==================================================== */
exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, lessonId, completed } = req.body;

    if (!courseId || !lessonId) {
      return res
        .status(400)
        .json({ error: "courseId and lessonId are required" });
    }

    // ✅ SAFE MODE – Prevent Prisma crash
    return res.json({
      success: false,
      message:
        "Progress tracking is disabled (userProgress model not found in schema)",
    });
  } catch (err) {
    console.error("updateCourseProgress error:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
};
