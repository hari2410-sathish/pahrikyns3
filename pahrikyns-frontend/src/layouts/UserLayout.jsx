// src/layouts/UserLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNavbar from "../components/global/MainNavbar";
import Footer from "../components/global/Footer";

export default function UserLayout() {
  const location = useLocation();

  /**
   * Pages where footer should NOT appear
   * (dashboard full-height experience)
   */
  const hideFooterRoutes = ["/dashboard"];

  const hideFooter = hideFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <MainNavbar />

      {/* ================= PAGE CONTENT ================= */}
      <main
        style={{
          minHeight: "calc(100vh - 120px)",
          paddingTop: "72px", // navbar height safety
          background: "#040a16",
        }}
      >
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      {!hideFooter && <Footer />}
    </>
  );
}
