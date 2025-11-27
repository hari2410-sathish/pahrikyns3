import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";

export default function AdminProtectedRoute({ children }) {
  const { admin } = useAdminAuth();
  const location = useLocation();

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} />;
  }

  return children;
}
