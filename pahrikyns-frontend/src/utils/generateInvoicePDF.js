import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

export async function generateInvoicePDF(payment) {
  const pdf = new jsPDF();

  // Header
  pdf.setFontSize(22);
  pdf.setTextColor(0, 255, 255);
  pdf.text("PAHRIKYNS - PAYMENT INVOICE", 14, 18);

  pdf.setFontSize(12);
  pdf.setTextColor(120);
  pdf.text(`Invoice ID: INV-${payment.id}`, 14, 30);
  pdf.text(`Date: ${payment.date}`, 14, 38);

  // QR Code (Transaction ID)
  const qr = await QRCode.toDataURL(payment.transactionId);
  pdf.addImage(qr, "PNG", 150, 10, 45, 45);

  // Student Info
  autoTable(pdf, {
    startY: 50,
    head: [["STUDENT INFORMATION", ""]],
    body: [
      ["Name", payment.studentName],
      ["Email", payment.email],
      ["Course", payment.course],
    ],
    theme: "grid",
  });

  // Payment Info
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["PAYMENT DETAILS", ""]],
    body: [
      ["Amount", `₹${payment.amount}`],
      ["Status", payment.status.toUpperCase()],
      ["Transaction ID", payment.transactionId],
      ["Mode", payment.mode],
    ],
    theme: "grid",
  });

  // Footer
  pdf.setFontSize(10);
  pdf.setTextColor(150);
  pdf.text("Thank you for learning with Pahrikyns!", 14, pdf.internal.pageSize.height - 10);

  pdf.save(`Invoice-${payment.id}.pdf`);
}
