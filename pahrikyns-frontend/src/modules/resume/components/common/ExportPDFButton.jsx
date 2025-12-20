import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/** ========================================================
 * EXPORT PDF BUTTON — PRO VERSION (v1)
 * Stable PDF Export
 * - High quality output
 * - Auto scale A4
 * - Loading state
 * ======================================================== */

export default function ExportPDFButton() {
  const [loading, setLoading] = useState(false);

  const exportPDF = async () => {
    try {
      setLoading(true);

      const preview = document.getElementById("resume-preview");
      if (!preview) return alert("Preview not found!");

      const canvas = await html2canvas(preview, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
      pdf.save("resume.pdf");
    } catch (e) {
      console.error("PDF export error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={exportPDF}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} /> : null}
    >
      {loading ? "Exporting..." : "Export PDF"}
    </Button>
  );
}
