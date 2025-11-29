import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import AdminLogin from "../pages/Auth/AdminLogin";
import AdminOTPVerify from "../pages/Auth/AdminOTPVerify";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import CourseRoutes from "./CourseRoutes";
import AdminProtectedRoute from "../utils/AdminProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------- USER LAYOUT ROUTES ---------------- */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/*" element={<CourseRoutes />} />
        </Route>

        {/* ---------------- AUTH FULLSCREEN ROUTES ---------------- */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ---------------- ADMIN AUTH PUBLIC ---------------- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/otp" element={<AdminOTPVerify />} />

        {/* ---------------- ADMIN PROTECTED ROUTES ---------------- */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* ---------------- 404 ---------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
