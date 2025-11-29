import QRCode from "qrcode";

export async function darkTemplate(pdf, c) {
  pdf.setFillColor(10, 10, 20);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setDrawColor(0, 255, 255);
  pdf.setLineWidth(3);
  pdf.rect(10, 10, 280, 190);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(0, 255, 255);
  pdf.text("NEON CERTIFICATE", 150, 55, { align: "center" });

  pdf.setFontSize(26);
  pdf.setTextColor(255, 255, 255);
  pdf.text(c.studentName, 150, 100, { align: "center" });

  pdf.setFontSize(22);
  pdf.text(c.course, 150, 135, { align: "center" });

  const qr = await QRCode.toDataURL(`https://your-domain.com/verify/${c.id}`);
  pdf.addImage(qr, "PNG", 250, 20, 40, 40);
}
