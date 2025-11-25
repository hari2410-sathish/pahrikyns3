import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import HomePage from "./pages/Home/HomePage";
import CategoryPage from "./pages/Courses/CategoryPage";
import ToolPage from "./pages/Courses/ToolPage";
import LessonViewer from "./pages/Courses/LessonViewer";

// auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./utils/ProtectedRoute";

// dashboard
import UserDashboard from "./layouts/UserDashboard";

// admin
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageCourses from "./pages/Admin/ManageCourses";
import ManageStudents from "./pages/Admin/ManageStudents";
import AddCourse from "./pages/Admin/AddCourse";
import EditCourse from "./pages/Admin/EditCourse";
import AdminSettings from "./pages/Admin/AdminSettings";

export default function App() {
  return (
    <Routes>

      {/* USER AREA */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />

        {/* CATEGORY */}
        <Route path="/courses/:category" element={<CategoryPage />} />

        {/* TOOL */}
        <Route path="/courses/:category/:tool" element={<ToolPage />} />

        {/* LESSON */}
        <Route path="/courses/:category/:tool/:lessonId" element={<LessonViewer />} />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="courses/add" element={<AddCourse />} />
        <Route path="courses/edit/:courseId" element={<EditCourse />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

    </Routes>
  );
}
