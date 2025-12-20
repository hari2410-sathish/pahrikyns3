const prisma = require("../config/prismaClient");

/* =======================
   ADMIN DASHBOARD SUMMARY
======================= */
exports.getAdminSummary = async (req, res) => {
  try {
    // ✅ Correct role based on schema (student)
    const totalStudents = await prisma.user.count({
      where: { role: "student" },
    });

    // ✅ From Student table
    const activeStudents = await prisma.student.count({
      where: { status: "active" },
    });

    const totalCourses = await prisma.course.count();

    const revenueAgg = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" },
    });

    const revenue = revenueAgg._sum.amount || 0;

    res.json({
      totalStudents,
      activeStudents,
      totalCourses,
      revenue,
    });
  } catch (err) {
    console.error("getAdminSummary error:", err);
    res.status(500).json({ error: "Dashboard summary failed" });
  }
};

/* =======================
   MONTHLY ENROLLMENTS
======================= */
exports.getMonthlyEnrollments = async (req, res) => {
  try {
    const data = await prisma.student.findMany({
      select: { createdAt: true },
    });

    const monthly = {};

    data.forEach((item) => {
      const month = item.createdAt.toISOString().slice(0, 7);
      monthly[month] = (monthly[month] || 0) + 1;
    });

    const result = Object.keys(monthly).map((m) => ({
      month: m,
      count: monthly[m],
    }));

    res.json(result);
  } catch (err) {
    console.error("getMonthlyEnrollments error:", err);
    res.status(500).json({ error: "Enrollment stats failed" });
  }
};

/* =======================
   USER ACTIVITY (SAFE MODE)
   userProgress MODEL NOT IN SCHEMA
======================= */
exports.getUserActivity = async (req, res) => {
  try {
    // ✅ SAFE MODE: userProgress model missing
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().slice(0, 10);
    });

    const activity = last7Days.reverse().map((d) => ({
      date: d,
      value: 0,
    }));

    res.json(activity);
  } catch (err) {
    console.error("getUserActivity error:", err);
    res.status(500).json({ error: "Activity failed" });
  }
};

/* =======================
   COMPLETION PERCENTAGE (SAFE MODE)
   userProgress MODEL NOT IN SCHEMA
======================= */
exports.getCompletionStats = async (req, res) => {
  try {
    // ✅ SAFE MODE until userProgress model is added
    res.json({ percentage: 0 });
  } catch (err) {
    console.error("getCompletionStats error:", err);
    res.status(500).json({ error: "Completion stat failed" });
  }
};

/* =======================
   TRANSACTIONS (PAGINATION + SEARCH)
======================= */
exports.getAdminTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const search = req.query.search || "";

    const where = search
      ? {
          OR: [
            { razorpayOrderId: { contains: search } }, // ✅ Correct field
            {
              user: {
                name: { contains: search, mode: "insensitive" },
              },
            },
            {
              user: {
                email: { contains: search, mode: "insensitive" },
              },
            },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.payment.count({ where }),
    ]);

    res.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getAdminTransactions error:", err);
    res.status(500).json({ error: "Transactions fetch failed" });
  }
};

/* =======================
   MONTHLY REVENUE (FOR CHARTS)
======================= */
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { status: "SUCCESS" },
      select: { amount: true, createdAt: true },
    });

    const monthly = {};

    payments.forEach((p) => {
      const month = p.createdAt.toISOString().slice(0, 7);
      monthly[month] = (monthly[month] || 0) + p.amount;
    });

    const result = Object.keys(monthly).map((m) => ({
      month: m,
      revenue: monthly[m],
    }));

    res.json(result);
  } catch (err) {
    console.error("getMonthlyRevenue error:", err);
    res.status(500).json({ error: "Monthly revenue failed" });
  }
};
