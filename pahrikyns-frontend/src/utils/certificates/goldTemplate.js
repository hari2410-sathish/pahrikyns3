import QRCode from "qrcode";

export async function goldTemplate(pdf, c) {
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setDrawColor(212, 175, 55);
  pdf.setLineWidth(6);
  pdf.rect(5, 5, 287, 200);

  pdf.setFont("times", "bold");
  pdf.setFontSize(36);
  pdf.setTextColor(120, 90, 10);
  pdf.text("CERTIFICATE OF ACHIEVEMENT", 150, 45, { align: "center" });

  pdf.setFontSize(28);
  pdf.setTextColor(0, 0, 0);
  pdf.text(c.studentName, 150, 90, { align: "center" });

  pdf.setFontSize(22);
  pdf.text(c.course, 150, 133, { align: "center" });

  const qr = await QRCode.toDataURL(`https://your-domain.com/verify/${c.id}`);
  pdf.addImage(qr, "PNG", 250, 20, 40, 40);
}
