import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function UserProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const [checkingSub, setCheckingSub] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);

  // ✅ Check subscription ONLY after login
  useEffect(() => {
    if (!user) return;

    setCheckingSub(true);

    API.get("/auth/user/subscription-status")

      .then((res) => {
        setHasSubscription(res.data.active);
      })
      .catch(() => {
        setHasSubscription(false);
      })
      .finally(() => {
        setCheckingSub(false);
      });
  }, [user]);

  // ⏳ Still checking auth
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

  // ❌ NOT logged in → go to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // ⏳ Logged in but checking subscription
  if (checkingSub) {
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

  // ❌ Logged in but NO subscription
  if (!hasSubscription) {
    return (
      <Navigate
        to="/subscription"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // ✅ All good
  return children;
}
