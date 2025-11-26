import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // allowed admin
    const allowedEmails = [process.env.ADMIN_EMAIL1];

    if (!allowedEmails.includes(email)) {
      return res.status(400).json({ message: "Access denied" });
    }

    // Hardcoded password
    if (password !== "Admin@123") {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login success",
      token,
      admin: { email, role: "admin" },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
