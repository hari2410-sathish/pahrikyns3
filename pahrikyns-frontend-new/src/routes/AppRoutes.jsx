import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

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

        {/* ---------------- USER ROUTES ---------------- */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/*" element={<CourseRoutes />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------------- ADMIN PUBLIC AUTH ROUTES ---------------- */}
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
          {/* Default admin page */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Admin pages */}
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* ---------------- 404 FALLBACK ---------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
