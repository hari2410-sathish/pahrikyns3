const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(401).json({ error: "Invalid token" });
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // ✅ Attach user (future-ready for RBAC)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "student",
    };

    next();
  } catch (err) {
    console.error("Auth Middleware Fatal Error:", err);

    return res.status(401).json({
      error: "Authentication failed",
    });
  }
};
