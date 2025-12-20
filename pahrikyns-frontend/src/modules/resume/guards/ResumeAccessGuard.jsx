import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/** ========================================================
 *  RESUME ACCESS GUARD — PRO VERSION (v1)
 *  - Handles Login requirement
 *  - Handles Subscription (Pro) requirement
 *  - Handles public vs private resume access
 *  - Clean, predictable routing
 * ======================================================== */

export default function ResumeAccessGuard({
  children,
  requireAuth = false,
  requireSubscription = false,
}) {
  const { user } = useAuth();
  const location = useLocation();

  // ---------------------- AUTH CHECK ----------------------
  if (requireAuth && !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // ---------------------- SUBSCRIPTION CHECK ----------------------
  if (requireSubscription) {
    const isPro = user?.subscription?.status === "active";

    if (!isPro) {
      return (
        <Navigate
          to="/upgrade"
          replace
          state={{ from: location.pathname }}
        />
      );
    }
  }

  return <>{children}</>;
}
