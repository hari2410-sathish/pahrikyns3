import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Admin = sequelize.define("Admin", {
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "admin" }
});

export default Admin;
