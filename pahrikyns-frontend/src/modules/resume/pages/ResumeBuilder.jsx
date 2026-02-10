import React from "react";
import { Box, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import ResumeLayout from "../layouts/ResumeLayout";
import ResumeForm from "../components/forms/ResumeForm";
import ResumePreview from "../components/preview/ResumePreview";

/** ========================================================
 * RESUME BUILDER — PRO VERSION (v1)
 * The main workspace for building resumes
 * - Layout + Navbar wrapper
 * - Form (left) + Live Preview (right)
 * - True resume.io split-pane builder
 * ======================================================== */

export default function ResumeBuilder() {
  return (
    <ResumeLayout>
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Form Controller */}
        <Box className="bg-white p-6 rounded-xl shadow-md border h-fit">
          <ResumeForm />
        </Box>

        {/* RIGHT: Live Resume Preview */}
        <Box className="flex flex-col gap-4">
          {/* TOOLBAR */}
          <Box className="flex justify-end bg-white p-3 rounded-xl shadow-sm border">
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                try {
                  const html2canvas = (await import("html2canvas")).default;
                  const jsPDF = (await import("jspdf")).default;

                  const element = document.getElementById("resume-preview");
                  if (!element) return alert("Preview not ready");

                  const canvas = await html2canvas(element, { scale: 2 });
                  const imgData = canvas.toDataURL("image/png");

                  const pdf = new jsPDF("p", "mm", "a4");
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                  pdf.save("resume.pdf");
                } catch (e) {
                  console.error(e);
                  alert("Download failed");
                }
              }}
            >
              Download PDF
            </Button>
          </Box>

          <Box className="bg-white p-6 rounded-xl shadow-md border overflow-auto max-h-[85vh]">
            <ResumePreview />
          </Box>
        </Box>
      </Box>

      {/* Nested routes support if needed */}
      <Outlet />
    </ResumeLayout>
  );
}
