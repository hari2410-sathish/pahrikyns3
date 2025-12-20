import React from "react";
import { Routes, Route } from "react-router-dom";

/* ===================== CONTEXT ===================== */
import { ResumeProvider } from "./context/ResumeContext";

/* ===================== GUARDS ===================== */
import ResumeAccessGuard from "./guards/ResumeAccessGuard";

/* ===================== LAYOUT ===================== */
import ResumeLayout from "./layouts/ResumeLayout";

/* ===================== PAGES ===================== */
import ResumeHome from "./pages/ResumeHome";
import ResumeTemplates from "./pages/ResumeTemplates";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumePreview from "./pages/ResumePreview";
import ResumePublic from "./pages/ResumePublic";
import ResumeAdmin from "./pages/ResumeAdmin";

/* =====================================================
   FINAL RESUME APP ROUTER (resume.io style)
===================================================== */

export default function ResumeApp() {
  return (
    <ResumeProvider>
      <Routes>

        {/* -------------------------------------------------
            1️⃣ PUBLIC PAGES  
            (NO layout, NO navbar, NO guard)
        --------------------------------------------------- */}

        <Route path="/resume" element={<ResumeHome />} />
        <Route path="/resume/templates" element={<ResumeTemplates />} />

        {/* Public shareable resume */}
        <Route path="/resume/public/:slug" element={<ResumePublic />} />


        {/* -------------------------------------------------
            2️⃣ BUILDER + PREVIEW  
            (With ResumeLayout + Access Guard)
        --------------------------------------------------- */}

        <Route element={<ResumeLayout />}>
          
          {/* Builder MUST use /* to support step routes */}
          <Route
            path="/resume/builder/*"
            element={
              <ResumeAccessGuard requireAuth>
                <ResumeBuilder />
              </ResumeAccessGuard>
            }
          />

          {/* Preview Page */}
          <Route
            path="/resume/preview"
            element={
              <ResumeAccessGuard requireAuth>
                <ResumePreview />
              </ResumeAccessGuard>
            }
          />
        </Route>


        {/* -------------------------------------------------
            3️⃣ ADMIN RESUME PANEL  
            (Admin only protected)
        --------------------------------------------------- */}
        <Route
          path="/resume/admin"
          element={
            <ResumeAccessGuard requireAdmin>
              <ResumeAdmin />
            </ResumeAccessGuard>
          }
        />

      </Routes>
    </ResumeProvider>
  );
}
