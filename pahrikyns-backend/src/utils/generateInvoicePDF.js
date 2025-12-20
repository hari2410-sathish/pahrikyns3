const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports.generateInvoicePDF = async (order, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: "A4" });

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      const pageWidth = doc.page.width;
      const left = 50;
      const right = pageWidth - 50;

      /* =====================================================
         HEADER (LOGO + COMPANY)
      ===================================================== */
      const logoPath = path.join(
        __dirname,
        "../assets/logo.png" // 🔁 change path if needed
      );

      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, left, 40, { width: 80 });
      }

      doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .text("PAHRIKYNS", 140, 45);

      doc
        .fontSize(9)
        .font("Helvetica")
        .text("Professional Learning Platform", 140, 68)
        .text("Email: support@pahrikyns.com", 140, 82)
        .text("GSTIN: 33AAAAA0000A1Z5", 140, 96);

      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .text("INVOICE", right - 120, 50, { align: "right" });

      doc
        .font("Helvetica")
        .fontSize(9)
        .text(`Invoice No: ${order.invoiceNumber}`, right - 200, 75)
        .text(
          `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
          right - 200,
          90
        );

      doc.moveDown(4);

      /* =====================================================
         CUSTOMER DETAILS BOX
      ===================================================== */
      const boxTop = doc.y;

      doc
        .roundedRect(left, boxTop, right - left, 70, 6)
        .stroke("#CBD5E1");

      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("BILLED TO", left + 10, boxTop + 10);

      doc
        .font("Helvetica")
        .fontSize(10)
        .text(order.customer, left + 10, boxTop + 28);

      if (order.customerEmail) {
        doc.text(order.customerEmail, left + 10, boxTop + 43);
      }

      if (order.address) {
        doc.text(order.address, left + 260, boxTop + 28);
      }

      doc.moveDown(5);

      /* =====================================================
         ITEMS TABLE
      ===================================================== */
      const tableTop = doc.y + 10;

      const col = {
        product: left,
        qty: left + 260,
        price: left + 330,
        total: left + 420,
      };

      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .rect(left, tableTop, right - left, 25)
        .fill("#0F172A");

      doc.fillColor("white");
      doc.text("Product", col.product + 5, tableTop + 7);
      doc.text("Qty", col.qty + 5, tableTop + 7);
      doc.text("Price", col.price + 5, tableTop + 7);
      doc.text("Total", col.total + 5, tableTop + 7);

      doc.fillColor("black");
      let y = tableTop + 30;

      order.items.forEach((item, index) => {
        if (index % 2 === 0) {
          doc
            .rect(left, y - 2, right - left, 22)
            .fill("#F8FAFC");
          doc.fillColor("black");
        }

        doc.fontSize(10);
        doc.text(item.product, col.product + 5, y);
        doc.text(item.quantity, col.qty + 5, y);
        doc.text(`₹${item.price}`, col.price + 5, y);
        doc.text(`₹${item.quantity * item.price}`, col.total + 5, y);

        y += 22;
      });

      doc.moveDown(3);

      /* =====================================================
         TOTALS + GST TABLE
      ===================================================== */
      const totalsTop = y + 10;

      const gst = order.gstAmount || 0;
      const halfGST = gst / 2;

      doc.fontSize(10);

      doc.text("Subtotal", col.price, totalsTop);
      doc.text(`₹${order.totalAmount}`, col.total, totalsTop);

      doc.text("CGST (9%)", col.price, totalsTop + 18);
      doc.text(`₹${halfGST.toFixed(2)}`, col.total, totalsTop + 18);

      doc.text("SGST (9%)", col.price, totalsTop + 36);
      doc.text(`₹${halfGST.toFixed(2)}`, col.total, totalsTop + 36);

      doc
        .font("Helvetica-Bold")
        .text("Grand Total", col.price, totalsTop + 60);
      doc.text(
        `₹${order.grandTotal || order.totalAmount}`,
        col.total,
        totalsTop + 60
      );

      doc.moveDown(6);

      /* =====================================================
         FOOTER
      ===================================================== */
      const footerY = doc.page.height - 80;

      doc
        .fontSize(9)
        .font("Helvetica")
        .text(
          "This is a system generated invoice. No signature required.",
          left,
          footerY,
          { align: "center", width: right - left }
        );

      doc
        .fontSize(9)
        .text(
          "PAHRIKYNS • www.pahrikyns.com • support@pahrikyns.com",
          left,
          footerY + 15,
          { align: "center", width: right - left }
        );

      /* =====================================================
         PAGE NUMBER
      ===================================================== */
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        doc
          .fontSize(8)
          .text(
            `Page ${i + 1} of ${pages.count}`,
            left,
            doc.page.height - 30,
            { align: "center", width: right - left }
          );
      }

      doc.end();
      stream.on("finish", resolve);
    } catch (err) {
      reject(err);
    }
  });
};
