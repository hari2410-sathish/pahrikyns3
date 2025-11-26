import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/generateToken.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Only these emails allowed
  const allowedEmails = [
    process.env.ADMIN_EMAIL1,
    process.env.ADMIN_EMAIL2
  ];

  if (!allowedEmails.includes(email)) {
    return res.status(400).json({ message: "Access denied: Not an admin" });
  }

  // Hardcoded admin password
  if (password !== "Admin@123") {
    return res.status(400).json({ message: "Invalid admin credentials" });
  }

  const token = generateToken(email);

  res.json({
    message: "Admin login success",
    token,
    admin: {
      email,
      name: "Super Admin",
      role: "admin"
    }
  });
};
