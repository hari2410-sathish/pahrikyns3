import { Routes, Route, Navigate } from "react-router-dom";

/* ================= LAYOUTS ================= */
import UserLayout from "../layouts/UserLayout";
import UserDashboardLayout from "../layouts/UserDashboard";
import AdminLayout from "../layouts/AdminLayout";
import ChatRoutes from "../modules/Pahrikynschat/routes/ChatRoutes";


/* ================= PUBLIC ================= */
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResumePublic from "../modules/resume/pages/ResumePublic";


/* ================= USER ================= */
import UserProfile from "../pages/User/UserProfile";
import ChangePassword from "../pages/User/ChangePassword";
import MyCourses from "../pages/User/MyCourses";
import ProgressDashboard from "../pages/User/ProgressDashboard";

/* ================= COURSES ================= */
import CourseRoutes from "./CourseRoutes";

/* ================= ADMIN AUTH ================= */
import AdminLogin from "../pages/Auth/AdminLogin";
import AdminOTPVerify from "../pages/Auth/AdminOTPVerify";

/* ================= ADMIN CORE ================= */
import AdminDashboard from "../pages/Admin/AdminDashboard";

/* ================= ADMIN – USERS ================= */
import AllUsers from "../pages/Admin/Users/AllUsers";
import AddUser from "../pages/Admin/Users/AddUser";
import AdminUserProfile from "../pages/Admin/Users/UserProfile";
import UserPayments from "../pages/Admin/Users/UserPayments";
import UserActivity from "../pages/Admin/Users/UserActivity";

/* ================= ADMIN – STUDENTS ================= */
import ManageStudents from "../pages/Admin/ManageStudents";
import StudentProfile from "../pages/Admin/Students/StudentProfile";
import PremiumStudents from "../pages/Admin/Students/PremiumStudents";
import StudentProgress from "../pages/Admin/Students/StudentProgress";
import StudentActivity from "../pages/Admin/Students/StudentActivity";
import StudentCertificates from "../pages/Admin/Students/StudentCertificates";
import StudentRefunds from "../pages/Admin/Students/StudentRefunds";

/* ================= ADMIN – COURSES ================= */
import AllCourses from "../pages/Admin/Courses/AllCourses";
import AddCourse from "../pages/Admin/Courses/AddCourse";
import EditCourse from "../pages/Admin/Courses/EditCourse";
import CoursePrice from "../pages/Admin/Courses/CoursePrice";

/* ================= ADMIN – PAYMENTS ================= */
import AllPayments from "../pages/Admin/Payments/AllPayments";
import PaymentDetails from "../pages/Admin/Payments/PaymentDetails";
import Refunds from "../pages/Admin/Payments/Refunds";
import Invoices from "../pages/Admin/Payments/Invoices";

/* ================= ADMIN – CERTIFICATES ================= */
import AllCertificates from "../pages/Admin/Certificates/AllCertificates";
import IssueCertificate from "../pages/Admin/Certificates/IssueCertificate";
import CertificateDetails from "../pages/Admin/Certificates/CertificateDetails";


/* ================= ADMIN – SETTINGS ================= */
import SettingsHome from "../pages/Admin/Settings/SettingsHome";
import AdminProfile from "../pages/Admin/Settings/AdminProfile";
import AdminChangePassword from "../pages/Admin/Settings/ChangePassword";
import TwoFA from "../pages/Admin/Settings/TwoFA";
import Sessions from "../pages/Admin/Settings/Sessions";
import SecurityLogs from "../pages/Admin/Settings/SecurityLogs";

/* ================= ADMIN – RESUME ================= */
import ResumeHome from "../pages/Admin/Resume/ResumeHome";
import ResumeBuilder from "../pages/Admin/Resume/ResumeBuilder";
import TemplateSimple from "../pages/Admin/Resume/templates/TemplateSimple";
import TemplateMedium from "../pages/Admin/Resume/templates/TemplateMedium";
import TemplatePro from "../pages/Admin/Resume/templates/TemplatePro";
import TemplateMaster from "../pages/Admin/Resume/templates/TemplateMaster";
import TemplateUltraPro from "../pages/Admin/Resume/templates/TemplateUltraPro";

/* ================= ADMIN – ORDERS (🔥 MASTER ROUTER) ================= */
import AdminOrdersRoutes from "../modules/adminmodules/routes/AdminOrdersRoutes";

/* ================= ADMIN – PRODUCTS ================= */
import AllProducts from "../modules/adminmodules/pages/Products/AllProducts";
import AddProduct from "../modules/adminmodules/pages/Products/AddProduct";
import Categories from "../modules/adminmodules/pages/Products/Categories";
import Brands from "../modules/adminmodules/pages/Products/Brands";
import Reviews from "../modules/adminmodules/pages/Products/Reviews";
import ImportProducts from "../modules/adminmodules/pages/Products/ImportProducts";
import ExportProducts from "../modules/adminmodules/pages/Products/ExportProducts";
import ProductOptions from "../modules/adminmodules/pages/Products/ProductOptions";
import ProductFiltering from "../modules/adminmodules/pages/Products/ProductFiltering";
import ImportSKUs from "../modules/adminmodules/pages/Products/ImportSKUs";
import ExportSKUs from "../modules/adminmodules/pages/Products/ExportSKUs";

/* ================= PROTECTION ================= */
import AdminProtectedRoute from "../utils/AdminProtectedRoute";
import UserProtectedRoute from "../utils/UserProtectedRoute";

import ResumeLayout from "../modules/resume/layouts/ResumeLayout";
import ResumeHome from "../modules/resume/pages/ResumeHome";
import ResumeTemplates from "../modules/resume/pages/ResumeTemplates";
import ResumeBuilder from "../modules/resume/pages/ResumeBuilder";
import ResumePreview from "../modules/resume/pages/ResumePreview";
import ResumePublic from "../modules/resume/pages/ResumePublic";


export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ===== */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses/*" element={<CourseRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume/:resumeId" element={<ResumePublic />} />
      </Route>

      {/* ===== USER DASHBOARD ===== */}
      <Route
        path="/dashboard"
        element={
          <UserProtectedRoute>
            <UserDashboardLayout />
          </UserProtectedRoute>
        }
      >
        <Route index element={<ProgressDashboard />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<ChangePassword />} />
      </Route>
      <Route
        path="/chat/*"
        element={
          <UserProtectedRoute>
            <ChatRoutes />
          </UserProtectedRoute>
        }
      />


      {/* ===== ADMIN AUTH ===== */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/otp" element={<AdminOTPVerify />} />

      {/* ===== ADMIN PANEL ===== */}
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

        {/* USERS */}
        <Route path="users" element={<AllUsers />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/:userId" element={<AdminUserProfile />} />
        <Route path="users/:userId/payments" element={<UserPayments />} />
        <Route path="users/:userId/activity" element={<UserActivity />} />

        {/* STUDENTS */}
        <Route path="students" element={<ManageStudents />} />
        <Route path="students/premium" element={<PremiumStudents />} />
        <Route path="students/:studentId" element={<StudentProfile />} />
        <Route path="students/:studentId/progress" element={<StudentProgress />} />
        <Route path="students/:studentId/activity" element={<StudentActivity />} />
        <Route path="students/certificates" element={<StudentCertificates />} />
        <Route path="students/refunds" element={<StudentRefunds />} />

        {/* COURSES */}
        <Route path="courses" element={<AllCourses />} />
        <Route path="courses/add" element={<AddCourse />} />
        <Route path="courses/:courseId/edit" element={<EditCourse />} />
        <Route path="courses/:courseId/price" element={<CoursePrice />} />

        {/* PAYMENTS */}
        <Route path="payments" element={<AllPayments />} />
        <Route path="payments/refunds" element={<Refunds />} />
        <Route path="payments/invoices" element={<Invoices />} />
        <Route path="payments/:paymentId" element={<PaymentDetails />} />

        {/* SETTINGS */}
        <Route path="settings" element={<SettingsHome />} />
        <Route path="settings/profile" element={<AdminProfile />} />
        <Route path="settings/password" element={<AdminChangePassword />} />
        <Route path="settings/2fa" element={<TwoFA />} />
        <Route path="settings/sessions" element={<Sessions />} />
        <Route path="settings/security-logs" element={<SecurityLogs />} />

        {/* RESUME */}
        <Route path="resume" element={<ResumeHome />} />
        <Route path="resume/builder" element={<ResumeBuilder />} />
        <Route path="resume/simple" element={<TemplateSimple />} />
        <Route path="resume/medium" element={<TemplateMedium />} />
        <Route path="resume/pro" element={<TemplatePro />} />
        <Route path="resume/master" element={<TemplateMaster />} />
        <Route path="resume/ultra-pro" element={<TemplateUltraPro />} />

        {/* 🔥 ORDERS (ONLY THIS LINE) */}
        <Route path="orders/*" element={<AdminOrdersRoutes />} />

        {/* PRODUCTS */}
        <Route path="products" element={<AllProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/categories" element={<Categories />} />
        <Route path="products/brands" element={<Brands />} />
        <Route path="products/reviews" element={<Reviews />} />
        <Route path="products/import" element={<ImportProducts />} />
        <Route path="products/export" element={<ExportProducts />} />
        <Route path="products/options" element={<ProductOptions />} />
        <Route path="products/filtering" element={<ProductFiltering />} />
        <Route path="products/import-sku" element={<ImportSKUs />} />
        <Route path="products/export-sku" element={<ExportSKUs />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
