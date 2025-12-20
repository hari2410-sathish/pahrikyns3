import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

/**
 * ✅ Generate Invoice PDF (Orders + Payments compatible)
 */
export async function generateInvoicePDF(order) {
  const pdf = new jsPDF();

  const {
    id,
    customer,
    items = [],
    totalAmount,
    status,
    paymentStatus,
    paymentMethod,
    razorpayPaymentId,
    createdAt,
  } = order;

  const invoiceDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : new Date().toLocaleDateString();

  /* =========================
     HEADER
  ========================= */
  pdf.setFontSize(20);
  pdf.setTextColor(40, 199, 255);
  pdf.text("PAHRIKYNS", 14, 18);

  pdf.setFontSize(12);
  pdf.setTextColor(150);
  pdf.text("INVOICE", 14, 26);

  pdf.setDrawColor(40, 199, 255);
  pdf.line(14, 30, 196, 30);

  pdf.setTextColor(80);
  pdf.text(`Invoice ID : INV-${id.slice(0, 8)}`, 14, 40);
  pdf.text(`Order ID : ${id}`, 14, 48);
  pdf.text(`Date : ${invoiceDate}`, 14, 56);

  /* =========================
     QR CODE (Order ID)
  ========================= */
  const qr = await QRCode.toDataURL(id);
  pdf.addImage(qr, "PNG", 155, 38, 35, 35);

  /* =========================
     CUSTOMER INFO
  ========================= */
  autoTable(pdf, {
    startY: 80,
    head: [["CUSTOMER INFORMATION", ""]],
    body: [
      ["Customer", customer || "N/A"],
      ["Payment Method", paymentMethod || "N/A"],
      ["Payment Status", paymentStatus || "N/A"],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: 255,
    },
  });

  /* =========================
     ORDER ITEMS
  ========================= */
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    head: [["Item", "Qty", "Price", "Total"]],
    body:
      items.length > 0
        ? items.map((i) => [
            i.product,
            i.quantity,
            `₹${i.price}`,
            `₹${i.quantity * i.price}`,
          ])
        : [["N/A", "-", "-", "-"]],
    theme: "striped",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: 255,
    },
  });

  /* =========================
     PAYMENT SUMMARY
  ========================= */
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    body: [
      ["Sub Total", `₹${totalAmount}`],
      ["GST (0%)", "₹0"],
      ["TOTAL PAID", `₹${totalAmount}`],
      ["Transaction ID", razorpayPaymentId || "N/A"],
      ["Order Status", status || "N/A"],
    ],
    theme: "grid",
    styles: { fontStyle: "bold" },
  });

  /* =========================
     FOOTER
  ========================= */
  pdf.setFontSize(10);
  pdf.setTextColor(120);
  pdf.text(
    "Thank you for choosing PAHRIKYNS.",
    14,
    pdf.internal.pageSize.height - 20
  );
  pdf.text(
    "This is a system generated invoice.",
    14,
    pdf.internal.pageSize.height - 14
  );

  pdf.save(`Invoice-${id}.pdf`);
}
