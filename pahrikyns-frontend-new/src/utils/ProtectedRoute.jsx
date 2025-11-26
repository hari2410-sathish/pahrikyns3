import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";

export default function ProtectedRoute({ children, role }) {
  const { admin } = useAdminAuth();
  const location = useLocation();

  // ADMIN PROTECTED ROUTES
  if (role === "admin") {
    if (!admin) {
      return (
        <Navigate
          to="/admin/login"
          state={{ from: location.pathname }}
        />
      );
    }
  }

  return children;
}
