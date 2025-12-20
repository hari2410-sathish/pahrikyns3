const jwt = require("jsonwebtoken");

module.exports = function adminPreOtpAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    // ✅ ALLOW ONLY PRE-OTP TOKENS
    if (decoded.stage !== "pre-otp") {
      return res.status(401).json({ message: "OTP already verified" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("Admin PRE-OTP auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
