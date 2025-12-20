import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/** ========================================================
 * MOBILE REDIRECT — PRO VERSION (v1)
 * Auto-detects mobile screen and redirects to mobile builder
 * ======================================================== */

export default function MobileRedirect({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint

    // Only redirect if user is inside the builder
    const insideBuilder = location.pathname.startsWith("/resume/builder");

    if (isMobile && insideBuilder) {
      navigate("/resume/mobile", { replace: true });
    }
  }, [location, navigate]);

  return <>{children}</>;
}
