const prisma = require("../config/prismaClient");
const razorpay = require("../utils/razorpay");
const { generateInvoiceNumber } = require("../helpers/generateInvoiceNumber");
const sendEmail = require("../config/email");
const { generateInvoicePDF } = require("../utils/generateInvoicePDF");
const path = require("path");
const crypto = require("crypto");
const { queueEmail } = require("../services/emailQueueService");

/* ===============================
   CREATE RAZORPAY ORDER
================================ */
exports.createOrderPayment = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus === "PAID") {
      return res.status(400).json({ message: "Order already paid" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.totalAmount * 100), // paise
      currency: "INR",
      receipt: order.id,
    });

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "INITIATED",
        razorpayOrderId: razorpayOrder.id,
      },
    });

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      razorpayOrder,
      amount: order.totalAmount,
      currency: "INR",
    });
  } catch (err) {
    console.error("Create payment error:", err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};

/* ===============================
   VERIFY RAZORPAY PAYMENT
================================ */
exports.verifyOrderPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    /* 🔐 VERIFY SIGNATURE */
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    /* ✅ FIND ORDER */
    const order = await prisma.order.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus === "PAID") {
      return res.json({ success: true, message: "Already verified" });
    }

    /* 🧾 INVOICE + GST */
    const invoiceNumber =
      order.invoiceNumber || (await generateInvoiceNumber());

    const gstAmount = +(order.totalAmount * 0.18).toFixed(2);
    const grandTotal = +(order.totalAmount + gstAmount).toFixed(2);

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        status: "COMPLETED",
        razorpayPaymentId: razorpay_payment_id,
        invoiceNumber,
        gstAmount,
        grandTotal,
      },
    });

    /* 📄 GENERATE INVOICE PDF */
    const invoicePath = path.join(
      __dirname,
      `../uploads/invoices/${invoiceNumber}.pdf`
    );

    await generateInvoicePDF(
      { ...updatedOrder, items: order.items },
      invoicePath
    );

    /* 📧 QUEUE EMAIL (BEST PRACTICE) */
    await queueEmail({
      to: order.customerEmail || "admin@pahrikyns.com",
      subject: `Invoice ${invoiceNumber}`,
      body: "Thank you for your payment. Invoice attached.",
      attachment: invoicePath,
    });

    /* 📧 OPTIONAL: IMMEDIATE EMAIL (can remove if needed) */
    await sendEmail({
      to: order.customerEmail || "admin@pahrikyns.com",
      subject: `Invoice ${invoiceNumber}`,
      text: "Thank you for your payment. Invoice attached.",
      attachments: [
        {
          filename: `${invoiceNumber}.pdf`,
          path: invoicePath,
        },
      ],
    });

    res.json({
      success: true,
      invoiceNumber,
    });
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
