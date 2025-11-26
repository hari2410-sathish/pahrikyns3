// src/layouts/UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../components/global/MainNavbar";
import Footer from "../components/global/Footer";

export default function UserLayout() {
  return (
    <>
      {/* Navbar */}
      <MainNavbar />

      {/* Page Content Wrapper */}
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
