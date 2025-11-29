require("dotenv").config();
const express = require("express");
const cors = require("cors");

// ROUTES
const adminRoutes = require("./src/routes/adminRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());  // <-- SUPER IMPORTANT
app.use(express.urlencoded({ extended: true })); // optional but recommended

// ADMIN ROUTES
app.use("/admin", adminRoutes);

// USER ROUTES
app.use("/auth/user", userRoutes);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Server error" });
});

// SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
