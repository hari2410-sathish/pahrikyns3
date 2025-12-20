module.exports = (req, res, next) => {
  try {
    const user = req.user; // from authMiddleware

    if (!user) {
      return res.status(401).json({
        message: "Login required",
      });
    }

    // ✅ Admin can always bypass
    if (user.role === "ADMIN") {
      return next();
    }

    // ✅ Subscription check
    if (!user.subscriptionActive) {
      return res.status(403).json({
        message: "Active subscription required to access this feature",
        code: "SUBSCRIPTION_REQUIRED",
      });
    }

    next();
  } catch (err) {
    console.error("Subscription Guard Error:", err);
    res.status(500).json({
      message: "Subscription check failed",
    });
  }
};
