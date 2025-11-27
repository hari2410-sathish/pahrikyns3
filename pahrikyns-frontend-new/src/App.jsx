// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

/* ============================
   LAYOUTS
============================ */
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserDashboard from "./layouts/UserDashboard";

/* ============================
   USER PAGES
============================ */
import HomePage from "./pages/Home/HomePage";
import CategoryPage from "./pages/Courses/CategoryPage";
import ToolPage from "./pages/Courses/ToolPage";
import LessonViewer from "./pages/Courses/LessonViewer";

/* ============================
   AUTH (USER)
============================ */
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

/* ============================
   AUTH (ADMIN)
============================ */
import AdminLogin from "./pages/Auth/AdminLogin";
import AdminForgotPassword from "./pages/Auth/AdminForgotPassword";
import AdminResetPassword from "./pages/Auth/AdminResetPassword";
import AdminOTPVerify from "./pages/Auth/AdminOTPVerify";
import AdminTOTPSetup from "./pages/Auth/AdminTOTPSetup";

/* ============================
   PROTECTED ROUTES
============================ */
import ProtectedRoute from "./utils/ProtectedRoute";

/* ============================
   ADMIN PAGES
============================ */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageCourses from "./pages/Admin/ManageCourses";
import ManageStudents from "./pages/Admin/ManageStudents";
import AddCourse from "./pages/Admin/AddCourse";
import EditCourse from "./pages/Admin/EditCourse";
import CourseDetails from "./pages/Admin/CourseDetails";
import StudentDetails from "./pages/Admin/StudentDetails";
import AdminSettings from "./pages/Admin/AdminSettings";

/* ============================
   CONTEXT
============================ */
import { AdminAuthProvider } from "./contexts/AdminAuthContext";




export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>

        {/* ============================
            USER PUBLIC AREA
        ============================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/courses/:category" element={<CategoryPage />} />
          <Route path="/courses/:category/:tool" element={<ToolPage />} />
          <Route path="/courses/:category/:tool/:lessonId" element={<LessonViewer />} />
        </Route>

        {/* ============================
            USER AUTH
        ============================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ============================
            USER DASHBOARD (PROTECTED)
        ============================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ============================
            ADMIN AUTH (PUBLIC)
        ============================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot" element={<AdminForgotPassword />} />
        <Route path="/admin/reset/:token" element={<AdminResetPassword />} />
        <Route path="/admin/verify-otp" element={<AdminOTPVerify />} />
        <Route path="/admin/setup-totp" element={<AdminTOTPSetup />} />

        {/* ============================
            ADMIN AREA (PROTECTED)
        ============================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          {/* COURSES */}
          <Route path="courses" element={<ManageCourses />} />
          <Route path="courses/add" element={<AddCourse />} />
          <Route path="courses/edit/:courseId" element={<EditCourse />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />

          {/* STUDENTS */}
          <Route path="students" element={<ManageStudents />} />
          <Route path="students/:studentId" element={<StudentDetails />} />

          {/* SETTINGS */}
          <Route path="settings" element={<AdminSettings />} />
        </Route>

      </Routes>
    </AdminAuthProvider>
  );
}
