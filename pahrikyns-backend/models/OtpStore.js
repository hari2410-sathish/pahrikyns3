import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OtpStore = sequelize.define("OtpStore", {
  email: DataTypes.STRING,
  otp: DataTypes.STRING,
  expiresAt: DataTypes.DATE
});

export default OtpStore;
