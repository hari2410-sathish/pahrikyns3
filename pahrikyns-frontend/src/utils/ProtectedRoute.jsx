import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../modules/adminmodules/context/AdminAuthContext";
import { Box, CircularProgress } from "@mui/material";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // =========================================
  // ✅ 1. STILL LOADING AUTH STATE
  // =========================================
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // =========================================
  // ✅ 2. ADMIN PROTECTED ROUTES
  // =========================================
  if (isAdminRoute) {
    const token = localStorage.getItem("ADMIN_TOKEN");

    if (!admin || !token) {
      return (
        <Navigate
          to="/admin/login"
          replace
          state={{ from: location.pathname }}
        />
      );
    }
  }

  // =========================================
  // ✅ 3. USER PROTECTED ROUTES
  // =========================================
  if (!isAdminRoute) {
    const token = localStorage.getItem("USER_TOKEN");

    if (!token) {
      return (
        <Navigate
          to="/login"
          replace
          state={{ from: location.pathname }}
        />
      );
    }
  }

  return children;
}
