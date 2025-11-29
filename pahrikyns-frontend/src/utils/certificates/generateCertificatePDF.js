// ==========================================
// FULL PRO CERTIFICATE GENERATOR
// ==========================================
import jsPDF from "jspdf";
import QRCode from "qrcode";

// Image paths
const logoPath = "/src/assets/cert/logo.png";
const signaturePath = "/src/assets/cert/signature.png";
const sealPath = "/src/assets/cert/seal.png";

// Helper to load image
async function loadImg(path) {
  try {
    return path;
  } catch {
    console.warn("Image missing:", path);
    return null;
  }
}

// ======================================================
//  GOLD TEMPLATE — PREMIUM
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

  pdf.setLineWidth(0.7);
  pdf.line(80, 62, 220, 62);

  pdf.setFont("times", "italic");
  pdf.setFontSize(16);
  pdf.setTextColor(120, 90, 40);
  pdf.text("This certificate is proudly presented to", 150, 80, { align: "center" });

  pdf.setFont("times", "bold");
  pdf.setFontSize(30);
  pdf.setTextColor(20, 20, 20);
  pdf.text(c.studentName, 150, 105, { align: "center" });

  pdf.setFont("times", "italic");
  pdf.setFontSize(18);
  pdf.text("for successfully completing the course", 150, 123, { align: "center" });

  pdf.setFont("times", "bold");
  pdf.setFontSize(22);
  pdf.text(c.course, 150, 145, { align: "center" });

  pdf.setFontSize(14);
  pdf.text(`Awarded on: ${c.date}`, 150, 162, { align: "center" });

  const qr = await QRCode.toDataURL(`https://your-domain.com/cert/${c.id}`);
  pdf.addImage(qr, "PNG", 245, 25, 35, 35);

  // Signature
  if (signature) pdf.addImage(signature, "PNG", 70, 165, 50, 25);
  pdf.setFont("times", "italic");
  pdf.setFontSize(12);
  pdf.text("Instructor Signature", 95, 192, { align: "center" });

  // Hologram Seal
  if (seal) pdf.addImage(seal, "PNG", 220, 155, 45, 45);

  // Serial Number
  pdf.setFont("courier", "bold");
  pdf.setFontSize(12);
  pdf.text(`Certificate No: ${c.id}`, 20, 195);

  // Watermark
  pdf.setTextColor(240, 225, 170);
  pdf.setFont("times", "bold");
  pdf.setFontSize(60);
  pdf.text("PAHRIKYNS", 150, 120, { align: "center", opacity: 0.08 });
}

// ======================================================
// MODERN TEMPLATE — Smooth, Clean
// ======================================================
async function modern(pdf, c) {
  pdf.setFillColor(240, 240, 255);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setDrawColor(100, 120, 255);
  pdf.setLineWidth(3);
  pdf.rect(10, 10, 280, 190);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(34);
  pdf.setTextColor(50, 60, 120);
  pdf.text("Certificate of Completion", 150, 45, { align: "center" });

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(16);
  pdf.text("Presented to", 150, 70, { align: "center" });

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(28);
  pdf.text(c.studentName, 150, 95, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(18);
  pdf.text(c.course, 150, 130, { align: "center" });

  const qr = await QRCode.toDataURL(`https://your-domain.com/cert/${c.id}`);
  pdf.addImage(qr, "PNG", 245, 25, 35, 35);
}

// ======================================================
// MINIMAL TEMPLATE — Clean, simple
// ======================================================
async function minimal(pdf, c) {
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.text("CERTIFICATE", 150, 50, { align: "center" });

  pdf.setFontSize(24);
  pdf.text(c.studentName, 150, 100, { align: "center" });

  pdf.setFontSize(18);
  pdf.text(c.course, 150, 130, { align: "center" });
}

// ======================================================
// DARK TEMPLATE — Neon Cyber look
// ======================================================
async function dark(pdf, c) {
  pdf.setFillColor(10, 10, 25);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(0, 255, 255);
  pdf.text("NEON CERTIFICATE", 150, 55, { align: "center" });

  pdf.setFontSize(26);
  pdf.setTextColor(255, 255, 255);
  pdf.text(c.studentName, 150, 100, { align: "center" });

  pdf.setFontSize(22);
  pdf.text(c.course, 150, 130, { align: "center" });
}

// ======================================================
// MAIN EXPORT — SELECT TEMPLATE
// ======================================================
export async function generateCertificatePDF(c, template = "gold") {
  const pdf = new jsPDF("landscape");

  const templates = { gold, modern, minimal, dark };

  if (!templates[template]) template = "gold";

  await templates[template](pdf, c);

  pdf.save(`${c.studentName}-${template}.pdf`);
}
