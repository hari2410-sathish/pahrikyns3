// ==========================================
// FULL CERTIFICATE PDF GENERATOR (FIXED)
// ==========================================

import jsPDF from "jspdf";
import QRCode from "qrcode";

// ================= IMAGE PATHS =================
const logoPath = "/src/assets/cert/logo.png";
const signaturePath = "/src/assets/cert/signature.png";
const sealPath = "/src/assets/cert/seal.png";

// ================= HELPER =================
async function loadImg(path) {
  try {
    return path;
  } catch {
    console.warn("Image missing:", path);
    return null;
  }
}

// ======================================================
// GOLD TEMPLATE (DEFAULT)
// ======================================================
async function gold(pdf, c) {
  const logo = await loadImg(logoPath);
  const signature = await loadImg(signaturePath);
  const seal = await loadImg(sealPath);

  pdf.setFillColor(255, 249, 230);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setDrawColor(212, 175, 55);
  pdf.setLineWidth(4);
  pdf.rect(8, 8, 284, 194);

  pdf.setDrawColor(255, 215, 0);
  pdf.setLineWidth(1.2);
  pdf.rect(14, 14, 272, 182);

  if (logo) pdf.addImage(logo, "PNG", 120, 12, 60, 25);

  pdf.setFont("times", "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(180, 140, 30);
  pdf.text("Certificate of Excellence", 150, 55, { align: "center" });

  pdf.setFontSize(16);
  pdf.setTextColor(120, 90, 40);
  pdf.text(
    "This certificate is proudly presented to",
    150,
    80,
    { align: "center" }
  );

  pdf.setFont("times", "bold");
  pdf.setFontSize(30);
  pdf.setTextColor(20, 20, 20);
  pdf.text(c.studentName || "Student Name", 150, 105, {
    align: "center",
  });

  pdf.setFont("times", "italic");
  pdf.setFontSize(18);
  pdf.text(
    "for successfully completing the course",
    150,
    125,
    { align: "center" }
  );

  pdf.setFont("times", "bold");
  pdf.setFontSize(22);
  pdf.text(c.course || "Course Name", 150, 145, {
    align: "center",
  });

  pdf.setFontSize(14);
  pdf.text(
    `Awarded on: ${c.date || new Date().toDateString()}`,
    150,
    162,
    { align: "center" }
  );

  const qr = await QRCode.toDataURL(
    `https://your-domain.com/cert/${c.id || "CERT-ID"}`
  );
  pdf.addImage(qr, "PNG", 245, 25, 35, 35);

  if (signature)
    pdf.addImage(signature, "PNG", 70, 165, 50, 25);

  pdf.setFontSize(12);
  pdf.text("Instructor Signature", 95, 192, {
    align: "center",
  });

  if (seal) pdf.addImage(seal, "PNG", 220, 155, 45, 45);

  pdf.setFont("courier", "bold");
  pdf.setFontSize(12);
  pdf.text(`Certificate No: ${c.id || "XXXXXX"}`, 20, 195);
}

// ======================================================
// MODERN TEMPLATE
// ======================================================
async function modern(pdf, c) {
  pdf.setFillColor(240, 240, 255);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setDrawColor(100, 120, 255);
  pdf.setLineWidth(3);
  pdf.rect(10, 10, 280, 190);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.text("Certificate of Completion", 150, 55, {
    align: "center",
  });

  pdf.setFontSize(26);
  pdf.text(c.studentName || "Student Name", 150, 100, {
    align: "center",
  });

  pdf.setFontSize(20);
  pdf.text(c.course || "Course Name", 150, 130, {
    align: "center",
  });
}

// ======================================================
// MINIMAL TEMPLATE
// ======================================================
async function minimal(pdf, c) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.text("CERTIFICATE", 150, 50, { align: "center" });

  pdf.setFontSize(24);
  pdf.text(c.studentName || "Student Name", 150, 100, {
    align: "center",
  });

  pdf.setFontSize(18);
  pdf.text(c.course || "Course Name", 150, 130, {
    align: "center",
  });
}

// ======================================================
// DARK TEMPLATE
// ======================================================
async function dark(pdf, c) {
  pdf.setFillColor(10, 10, 25);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(30);
  pdf.setTextColor(0, 255, 255);
  pdf.text("NEON CERTIFICATE", 150, 55, {
    align: "center",
  });

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(26);
  pdf.text(c.studentName || "Student Name", 150, 100, {
    align: "center",
  });

  pdf.setFontSize(20);
  pdf.text(c.course || "Course Name", 150, 130, {
    align: "center",
  });
}

// ======================================================
// ✅ MAIN EXPORT (ONLY ONE – FIXED)
// ======================================================
export async function generateCertificatePDF(
  certificateData,
  template = "gold"
) {
  const pdf = new jsPDF("landscape");

  const templates = {
    gold,
    modern,
    minimal,
    dark,
  };

  const selectedTemplate =
    templates[template] || templates.gold;

  await selectedTemplate(pdf, certificateData);

  pdf.save(
    `${certificateData.studentName || "certificate"}.pdf`
  );
}
