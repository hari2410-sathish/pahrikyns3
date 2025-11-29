import QRCode from "qrcode";

export async function modernTemplate(pdf, c) {
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setFillColor(30, 136, 229);
  pdf.rect(0, 0, 20, 210, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.text("Certificate of Completion", 150, 55, { align: "center" });

  pdf.setFontSize(28);
  pdf.text(c.studentName, 150, 98, { align: "center" });

  pdf.setFontSize(24);
  pdf.text(c.course, 150, 140, { align: "center" });

  const qr = await QRCode.toDataURL(`https://your-domain.com/verify/${c.id}`);
  pdf.addImage(qr, "PNG", 250, 20, 40, 40);
}
