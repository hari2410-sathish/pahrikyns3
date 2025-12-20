const prisma = require("../config/prismaClient");

/* ============================
   GET MY SUBSCRIPTION STATUS
   ============================ */
exports.getMySubscription = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    res.json({
      active: subscription?.status === "ACTIVE",
      subscription,
    });
  } catch (err) {
    console.error("getMySubscription error:", err);
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
};

/* ============================
   ADMIN – GET ALL SUBSCRIPTIONS
   ============================ */
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subs = await prisma.subscription.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(subs);
  } catch (err) {
    console.error("getAllSubscriptions error:", err);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};

/* ============================
   ADMIN – CANCEL SUBSCRIPTION
   ============================ */
exports.cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const sub = await prisma.subscription.update({
      where: { id },
      data: { status: "INACTIVE" },
    });

    res.json({
      success: true,
      subscription: sub,
    });
  } catch (err) {
    console.error("cancelSubscription error:", err);
    res.status(500).json({ error: "Failed to cancel subscription" });
  }
};
