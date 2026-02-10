const prisma = require("../config/prismaClient");

/* ============================
   GET ALL USERS (PAGINATION)
============================ */
exports.getUsers = async (req, res) => {
  try {
    let { search = "", status = "all", page = 1 } = req.query;

    page = Number(page);
    const limit = 20;
    const skip = (page - 1) * limit;

    // Filters
    const where = {
      role: { not: "admin" }, // Exclude admins from the list if desired, or keep them
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    // Status filter
    // Frontend sends "all", "active", "blocked"
    // User model has `isVerified` (boolean) but frontend thinks in terms of Active/Blocked.
    // There isn't a direct "blocked" status in the User model shown in schema.
    // We will approximate:
    // "active" -> isVerified: true (or just all users?)
    // "blocked" -> No field for this?
    // User model: id, name, email, password, isVerified, createdAt, role, avatar...
    // Schema doesn't show `isActive` or `status` on User model.
    // We will just ignore status filter for "blocked" if the field is missing, or map to isVerified.

    if (status === "active") {
      where.isVerified = true;
    } else if (status === "blocked") {
      // where.isActive = false; // Model doesn't have this.
      // For now, we'll return empty or ignore.
      // Let's check if 'isVerified' is false?
      where.isVerified = false;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isVerified: true,
          createdAt: true,
          avatar: true,
          lastLoginAt: true,
          lastLoginIp: true,
          lastDevice: true,
          // We can't select courses count easily without relation.

          // Including payments to count?
          _count: {
            select: { payments: true }
          }
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Map to frontend expectation
    const mappedUsers = users.map(u => ({
      ...u,
      // TODO: Schema update required. 'isVerified' is used as a proxy for 'isActive'.
      // Consider adding a dedicated 'status' enum to the User model (ACTIVE, BLOCKED, PENDING).
      isActive: u.isVerified,

      // TODO: 'UserCourse' relation is missing in this controller.
      // We need to fetch the count of enrolled courses for this user.
      // E.g., const count = await prisma.userCourse.count({ where: { userId: u.id } });
      coursesCount: 0,

      paymentsCount: u._count.payments
    }));

    res.json({
      success: true,
      users: mappedUsers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalUsers: total
    });

  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

/* ============================
   GET USER BY ID
============================ */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
        _count: {
          select: { payments: true }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Since we lack direct courses relation, we might fetch UserCourse manually if needed
    // But for now, returning user details
    const userData = {
      ...user,
      isActive: user.isVerified,
      courses: [], // Placeholder, or fetch if UserCourse accessible
    };

    res.json({ success: true, user: userData });

  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user details" });
  }
};

/* ============================
   GET USER PAYMENTS
============================ */
exports.fetchUserPayments = async (req, res) => {
  try {
    const { id } = req.params;

    const payments = await prisma.payment.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, payments });
  } catch (err) {
    console.error("fetchUserPayments error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch payments" });
  }
};
