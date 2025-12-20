const prisma = require("../config/prismaClient");

// PRISMA ERROR CODES:
// P2002 → Unique constraint (duplicate email)
// P2025 → Record not found

// ============================
// CREATE STUDENT
// ============================
exports.createStudent = async (req, res) => {
  try {
    const { name, email, course, status, progress } = req.body;

    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        course: course.trim(),
        status: status || "active",
        progress: Number(progress || 0),
      },
    });

    res.status(201).json({ success: true, student });
  } catch (err) {
    console.log(err);

    if (err.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Try another.",
      });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ============================
// GET ALL STUDENTS (Search + Filter + Pagination)
// ============================
exports.getStudents = async (req, res) => {
  try {
    let { search = "", status = "all", page = 1 } = req.query;

    page = Number(page);
    const limit = 20;
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
        status !== "all" ? { status } : {},
      ],
    };

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { certificates: true },
          },
        },
      }),
      prisma.student.count({ where }),
    ]);

    res.json({
      success: true,
      students,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ============================
// ✅ GET STUDENT FULL PROFILE (PREMIUM ANALYTICS)
// ============================
exports.getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        certificates: true,
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Progress Timeline
    const progressTimeline = await prisma.userProgress.findMany({
      where: { userId: student.userId },
      orderBy: { updatedAt: "asc" },
    });

    // Analytics Summary
    const totalPaid = student.payments
      .filter((p) => p.status === "SUCCESS")
      .reduce((sum, p) => sum + p.amount, 0);

    const analytics = {
      totalPayments: student.payments.length,
      totalPaid,
      certificatesIssued: student.certificates.length,
      currentProgress: student.progress,
    };

    res.json({
      success: true,
      student,
      progressTimeline,
      analytics,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student profile",
    });
  }
};

// ============================
// UPDATE STUDENT
// ============================
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course, status, progress } = req.body;

    const exists = await prisma.student.findUnique({ where: { id } });
    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const updated = await prisma.student.update({
      where: { id },
      data: {
        name: name.trim(),
        email: email.trim(),
        course: course.trim(),
        status,
        progress: Number(progress),
      },
    });

    res.json({ success: true, student: updated });
  } catch (err) {
    console.log(err);

    if (err.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ============================
// SAFE DELETE STUDENT (PREMIUM)
// ============================
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await prisma.student.findUnique({
      where: { id },
      include: { payments: true },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (exists.payments.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Student has payment history. Cannot delete permanently.",
      });
    }

    await prisma.student.delete({ where: { id } });

    res.json({ success: true, message: "Student removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
