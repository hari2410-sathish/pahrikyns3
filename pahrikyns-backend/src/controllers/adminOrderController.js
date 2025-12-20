const prisma = require("../config/prismaClient");
const generateInvoiceNumber = require("../helpers/generateInvoiceNumber");
const { generateInvoicePDF } = require("../utils/generateInvoicePDF");
const sendEmail = require("../config/email");
const path = require("path");
const fs = require("fs");

/* ================================
   CREATE ORDER
================================ */
exports.createOrder = async (req, res) => {
  try {
    const {
      customerType,
      customer,
      customerEmail,
      fulfillment,
      address,
      paymentMethod,
      totalAmount,
      gstAmount,
      grandTotal,
      items,
    } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const invoiceNumber = await generateInvoiceNumber();

    const order = await prisma.order.create({
      data: {
        customerType,
        customer,
        customerEmail: customerEmail || null,
        fulfillment,
        address: fulfillment === "delivery" ? address : null,
        paymentMethod,
        totalAmount,
        gstAmount,
        grandTotal,
        invoiceNumber,
        status: "CREATED",
        paymentStatus: "PENDING",
        items: {
          create: items.map((i) => ({
            product: i.product,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
      include: { items: true },
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

/* ================================
   FETCH ALL ORDERS
================================ */
exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* ================================
   FETCH SINGLE ORDER
================================ */
exports.getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

/* ================================
   UPDATE ORDER STATUS
================================ */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* ================================
   CANCEL ORDER
================================ */
exports.cancelOrder = async (req, res) => {
  try {
    await prisma.order.update({
      where: { id: req.params.id },
      data: {
        status: "CANCELLED",
        paymentStatus: "FAILED",
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

/* ================================
   EMAIL / RESEND INVOICE ✅
================================ */
/* ================================
   EMAIL / RESEND INVOICE
================================ */
exports.emailInvoice = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.customerEmail) {
      return res
        .status(400)
        .json({ message: "Customer email not available" });
    }

    const invoiceDir = path.join(__dirname, "../uploads/invoices");
    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const invoicePath = path.join(
      invoiceDir,
      `${order.invoiceNumber}.pdf`
    );

    // ✅ Generate again (overwrite safe)
    await generateInvoicePDF(order, invoicePath);

    // ✅ SEND / RESEND EMAIL
    await sendEmail({
      to: order.customerEmail,
      subject: `Invoice ${order.invoiceNumber}`,
      text: `
Hi ${order.customer},

Please find attached your invoice.

Invoice Number: ${order.invoiceNumber}
Amount: ₹${order.grandTotal || order.totalAmount}

Thank you,
Pahrikyns Team
      `,
      attachments: [
        {
          filename: `${order.invoiceNumber}.pdf`,
          path: invoicePath,
        },
      ],
    });

    return res.json({
      success: true,
      message: "Invoice email sent successfully",
    });
  } catch (err) {
    console.error("Email invoice error:", err);
    return res.status(500).json({
      message: "Failed to send invoice email",
    });
  }
};
exports.resendInvoice = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.customerEmail) {
      return res.status(400).json({ message: "Customer email missing" });
    }

    const invoiceDir = path.join(__dirname, "../uploads/invoices");
    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const invoicePath = path.join(
      invoiceDir,
      `${order.invoiceNumber}.pdf`
    );

    // 🔁 regenerate just to be safe
    await generateInvoicePDF(order, invoicePath);

    await sendEmail({
      to: order.customerEmail,
      subject: `Invoice ${order.invoiceNumber} (Resent)`,
      text: `Invoice ${order.invoiceNumber} is attached.`,
      html: `
        <h3>Invoice Resent</h3>
        <p>Hello ${order.customer},</p>
        <p>Please find your invoice <b>${order.invoiceNumber}</b> attached.</p>
        <p>— PAHRIKYNS</p>
      `,
      attachments: [
        {
          filename: `${order.invoiceNumber}.pdf`,
          path: invoicePath,
        },
      ],
    });

    res.json({ success: true, message: "Invoice email resent" });
  } catch (err) {
    console.error("Resend invoice error:", err);
    res.status(500).json({ message: "Failed to resend invoice" });
  }
};
