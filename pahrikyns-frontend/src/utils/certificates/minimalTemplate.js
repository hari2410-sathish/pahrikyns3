import QRCode from "qrcode";

export async function minimalTemplate(pdf, c) {
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, 300, 210, "F");

  pdf.setDrawColor(0);
  pdf.setLineWidth(1.2);
  pdf.rect(15, 15, 270, 180);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(30);
  pdf.text("CERTIFICATE", 150, 50, { align: "center" });

  pdf.setFontSize(26);
  pdf.text(c.studentName, 150, 100, { align: "center" });

  pdf.setFontSize(20);
  pdf.text(`Course: ${c.course}`, 150, 130, { align: "center" });

  const qr = await QRCode.toDataURL(`https://your-domain.com/verify/${c.id}`);
  pdf.addImage(qr, "PNG", 250, 20, 40, 40);
}
