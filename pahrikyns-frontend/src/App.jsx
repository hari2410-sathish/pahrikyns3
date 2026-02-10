import { Routes, Route, Navigate } from "react-router-dom";
import CookieBanner from "./components/global/CookieBanner";

/* ================= LAYOUTS ================= */
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./modules/adminmodules/layouts/AdminLayout";
import UserDashboard from "./layouts/UserDashboard";

/* ================= USER PUBLIC ================= */
import HomePage from "./pages/Home/HomePage";
import CategoryPage from "./pages/Courses/CategoryPage";
import ToolPage from "./pages/Courses/ToolPage";
import LessonViewer from "./pages/Courses/LessonViewer";
import MyCourses from "./pages/User/MyCourses"; // ✅ Added Import

/* ================= USER AUTH ================= */
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

/* ================= ADMIN AUTH ================= */
import AdminLogin from "./pages/Auth/AdminLogin";
import AdminForgotPassword from "./pages/Auth/AdminForgotPassword";
import AdminResetPassword from "./pages/Auth/AdminResetPassword";
import AdminOTPVerify from "./pages/Auth/AdminOTPVerify";
import AdminTOTPSetup from "./pages/Auth/AdminTOTPSetup";

/* ================= RESUME ================= */
import ResumeHome from "./modules/resume/pages/ResumeHome";
import ResumeBuilder from "./modules/resume/pages/ResumeBuilder";
import ResumeTemplates from "./modules/resume/pages/ResumeTemplates";
import ResumeLayout from "./modules/resume/layouts/ResumeLayout";
import ResumeAccessGuard from "./modules/resume/guards/ResumeAccessGuard";



/* ================= PROTECTED ================= */
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminProtectedRoute from "./modules/adminmodules/utils/AdminProtectedRoute";

/* ================= ADMIN DASHBOARD ================= */
import AdminDashboard from "./modules/adminmodules/pages/Admin/AdminDashboard";

/* ================= USERS ================= */
import AllUsers from "./modules/adminmodules/pages/Users/AllUsers";
import AddUser from "./modules/adminmodules/pages/Users/AddUser";
import AdminUserProfile from "./modules/adminmodules/pages/Users/UserProfile";
import UserPayments from "./modules/adminmodules/pages/Users/UserPayments";
import UserActivity from "./modules/adminmodules/pages/Users/UserActivity";
import ChatRoutes from "./modules/Pahrikynschat/routes/ChatRoutes";

/* ================= COURSES ================= */
import AllCourses from "./modules/adminmodules/pages/Courses/AllCourses";
import AddCourse from "./modules/adminmodules/pages/Courses/AddCourse";
import EditCourse from "./modules/adminmodules/pages/Courses/EditCourse";
import CoursePrice from "./modules/adminmodules/pages/Courses/CoursePrice";

/* ================= PAYMENTS ================= */
import AllPayments from "./modules/adminmodules/pages/Payments/AllPayments";
import PaymentDetails from "./modules/adminmodules/pages/Payments/PaymentDetails";
import Refunds from "./modules/adminmodules/pages/Payments/Refunds";
import Invoices from "./modules/adminmodules/pages/Payments/Invoices";

/* ================= CERTIFICATES ================= */
import AllCertificates from "./modules/adminmodules/pages/Certificates/AllCertificates";
import IssueCertificate from "./modules/adminmodules/pages/Certificates/IssueCertificate";
import CertificateDetails from "./modules/adminmodules/pages/Certificates/CertificateDetails";

/* ================= SETTINGS ================= */
import SettingsHome from "./modules/adminmodules/pages/Settings/SettingsHome";
import AdminProfile from "./modules/adminmodules/pages/Settings/AdminProfile";
import AdminChangePassword from "./modules/adminmodules/pages/Settings/ChangePassword";
import TwoFA from "./modules/adminmodules/pages/Settings/TwoFA";
import Sessions from "./modules/adminmodules/pages/Settings/Sessions";
import SecurityLogs from "./modules/adminmodules/pages/Settings/SecurityLogs";


/* ================= ORDERS ================= */
import AllOrders from "./modules/adminmodules/pages/Orders/AllOrders";
import AddOrder from "./modules/adminmodules/pages/Orders/AddOrder";
import ExportOrders from "./modules/adminmodules/pages/Orders/ExportOrders";
import SearchOrders from "./modules/adminmodules/pages/Orders/SearchOrders";
import Shipments from "./modules/adminmodules/pages/Orders/Shipments";
import DraftOrders from "./modules/adminmodules/pages/Orders/DraftOrders";
import GiftCertificates from "./modules/adminmodules/pages/Orders/GiftCertificates";

/* ================= PRODUCTS ================= */
import AllProducts from "./modules/adminmodules/pages/Products/AllProducts";
import AddProduct from "./modules/adminmodules/pages/Products/AddProduct";
import Categories from "./modules/adminmodules/pages/Products/Categories";
import Brands from "./modules/adminmodules/pages/Products/Brands";
import Reviews from "./modules/adminmodules/pages/Products/Reviews";
import ImportProducts from "./modules/adminmodules/pages/Products/ImportProducts";
import ExportProducts from "./modules/adminmodules/pages/Products/ExportProducts";
import ProductOptions from "./modules/adminmodules/pages/Products/ProductOptions";
import ProductFiltering from "./modules/adminmodules/pages/Products/ProductFiltering";
import ImportSKUs from "./modules/adminmodules/pages/Products/ImportSKUs";
import ExportSKUs from "./modules/adminmodules/pages/Products/ExportSKUs";
import AdminOrdersRoutes from "./modules/adminmodules/routes/AdminOrdersRoutes";

/* ================= ANALYTICS ================= */
import AnalyticsOverview from "./modules/adminmodules/pages/Analytics/AnalyticsOverview";
import AnalyticsInsight from "./modules/adminmodules/pages/Analytics/AnalyticsInsight";
import AnalyticsRealtime from "./modules/adminmodules/pages/Analytics/AnalyticsRealtime";
import AnalyticsMarketing from "./modules/adminmodules/pages/Analytics/AnalyticsMarketing";
import AnalyticsOrders from "./modules/adminmodules/pages/Analytics/AnalyticsOrders";
import AnalyticsCustomers from "./modules/adminmodules/pages/Analytics/AnalyticsCustomers";
import PurchaseFunnel from "./modules/adminmodules/pages/Analytics/PurchaseFunnel";
import AbandonedCarts from "./modules/adminmodules/pages/Analytics/AbandonedCarts";
import SalesTaxReports from "./modules/adminmodules/pages/Analytics/SalesTaxReports";

/*==================Customers===================*/
import AddCustomer from "./modules/adminmodules/pages/Customers/AddCustomer";
import AllCustomers from "./modules/adminmodules/pages/Customers/AllCustomers";
import CustomerDetails from "./modules/adminmodules/pages/Customers/CustomerDetails";
import CustomerGroups from "./modules/adminmodules/pages/Customers/CustomerGroups"

/* ================= STOREFRONT ================= */
import WebPages from "./modules/adminmodules/pages/Storefront/WebPages";
import Blog from "./modules/adminmodules/pages/Storefront/Blog";
import ImageManager from "./modules/adminmodules/pages/Storefront/ImageManager";

/* ================= PUBLIC ================= */
import VerifyCertificate from "./pages/Public/VerifyCertificate";

export default function App() {
  return (
    <Routes>
      {/* ===== USER PUBLIC ===== */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses/:category" element={<CategoryPage />} />
        <Route path="/courses/:category/:tool" element={<ToolPage />} />
        <Route path="/courses/:category/:tool/:lessonId" element={<LessonViewer />} />
        <Route path="/my-courses" element={<MyCourses />} /> {/* ✅ New Route */}
      </Route>

      {/* 🔥 CHAT */}
      <Route
        path="/chat/*"
        element={
          <ProtectedRoute>
            <ChatRoutes />
          </ProtectedRoute>
        }
      />
      {/* ✅ USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />


      {/* USER AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* ADMIN AUTH */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot" element={<AdminForgotPassword />} />
      <Route path="/admin/reset/:token" element={<AdminResetPassword />} />
      <Route path="/admin/otp" element={<AdminOTPVerify />} />
      <Route path="/admin/setup-totp" element={<AdminTOTPSetup />} />

      {/* PUBLIC VERIFY */}
      <Route path="/verify/:certId" element={<VerifyCertificate />} />

      {/* ===== ADMIN PANEL ===== */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <>
              <AdminLayout />
              <CookieBanner />
            </>
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

        {/* CERTIFICATES */}
        <Route path="certificates" element={<AllCertificates />} />
        <Route path="certificates/issue" element={<IssueCertificate />} />
        <Route path="certificates/:certId" element={<CertificateDetails />} />

        {/* SETTINGS */}
        <Route path="settings" element={<SettingsHome />} />
        <Route path="settings/profile" element={<AdminProfile />} />
        <Route path="settings/password" element={<AdminChangePassword />} />
        <Route path="settings/2fa" element={<TwoFA />} />
        <Route path="settings/sessions" element={<Sessions />} />
        <Route path="settings/security-logs" element={<SecurityLogs />} />

        {/* ORDERS */}
        <Route path="orders" element={<AllOrders />} />

        <Route path="orders/add" element={<AddOrder />} />
        <Route path="orders/export" element={<ExportOrders />} />
        <Route path="orders/search" element={<SearchOrders />} />
        <Route path="orders/shipments" element={<Shipments />} />
        <Route path="orders/drafts" element={<DraftOrders />} />
        <Route path="orders/gift-certificates" element={<GiftCertificates />} />

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

        {/* ANALYTICS */}
        <Route path="analytics" element={<AnalyticsOverview />} />
        <Route path="analytics/insight" element={<AnalyticsInsight />} />
        <Route path="analytics/realtime" element={<AnalyticsRealtime />} />
        <Route path="analytics/marketing" element={<AnalyticsMarketing />} />
        <Route path="analytics/orders" element={<AnalyticsOrders />} />
        <Route path="analytics/customers" element={<AnalyticsCustomers />} />
        <Route path="analytics/purchase-funnel" element={<PurchaseFunnel />} />
        <Route path="analytics/carts" element={<AbandonedCarts />} />
        <Route path="analytics/tax" element={<SalesTaxReports />} />

        {/*Customers*/}
        <Route path="Customers/AddCustomer" element={<AddCustomer />} />
        <Route path="Customers/AllCustomers" element={<AllCustomers />} />
        <Route path="Customers/CustomerDetails" element={<CustomerDetails />} />
        <Route path="Customers/CustomerGroups" element={<CustomerGroups />} />


        {/* STOREFRONT */}
        <Route path="storefront/webpages" element={<WebPages />} />
        <Route path="storefront/blog" element={<Blog />} />
        <Route path="storefront/images" element={<ImageManager />} />
      </Route>


      <Route path="/admin" element={<AdminLayout />}>
        {/* other admin routes */}

        <Route path="orders/*" element={<AdminOrdersRoutes />} />
      </Route>
      {/* ================= RESUME MODULE ================= */}
      <Route
        path="/resume"
        element={
          <ResumeAccessGuard requireAuth>
            <ResumeLayout />
          </ResumeAccessGuard>
        }
      >
        {/* /resume */}
        <Route index element={<ResumeHome />} />

        {/* /resume/templates */}
        <Route path="templates" element={<ResumeTemplates />} />

        {/* /resume/builder/... */}
        <Route path="builder/*" element={<ResumeBuilder />} />
      </Route>


      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
