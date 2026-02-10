const prisma = require("../config/prismaClient");

/* ================= SUBSCRIPTION STATUS =================
   NOTE: You DO NOT have a Subscription model in Prisma.
   So we infer ACTIVE status from SUCCESS payments.
======================================================== */
exports.subscriptionStatus = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.id },
    });

    res.json({
      active: subscription?.status === "ACTIVE",
      plan: subscription?.plan || null,
      expiresAt: subscription?.expiresAt || null,
    });

  } catch (err) {
    console.error("subscriptionStatus error:", err);
    res.status(500).json({ error: "Failed to fetch subscription status" });
  }
};

/* ================= MY COURSES ================= */
exports.getMyCourses = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from auth middleware

    // 1. Fetch all published courses
    const allCourses = await prisma.course.findMany({
      where: { status: "Published" },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { lessons: true } } // Get total lessons count
      }
    });

    // 2. Fetch User's Ownership (Enrolled Courses)
    const userCourses = await prisma.userCourse.findMany({
      where: { userId },
    });

    // 3. Fetch User's Progress
    const userProgress = await prisma.userProgress.findMany({
      where: { userId },
    });

    // 4. Map & Format Response
    // Structure expected by Frontend: { course: {...}, isPaid: boolean, progress: number }
    const formattedCourses = allCourses.map((course) => {
      const enrollment = userCourses.find((uc) => uc.courseId === course.id);
      const isPaid = enrollment?.paid || false;

      // Calculate Progress
      const totalLessons = course.lessons || 1; // Avoid division by zero
      const completedLessons = userProgress.filter(
        (p) => p.courseId === course.id && p.completed
      ).length;
      const progress = Math.round((completedLessons / totalLessons) * 100);

      return {
        course,
        isPaid,
        progress,
      };
    });

    // Return ARRAY directly (matches setCourses(res.data))
    res.json(formattedCourses);
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
