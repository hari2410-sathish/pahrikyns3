const prisma = require("../config/prismaClient");
const Razorpay = require("razorpay");
const crypto = require("crypto");

/*
|--------------------------------------------------------------------------
| RAZORPAY INSTANCE
|--------------------------------------------------------------------------
*/
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/*
|--------------------------------------------------------------------------
| CREATE PAYMENT + RAZORPAY ORDER (USER)
|--------------------------------------------------------------------------
*/
exports.createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    // ✅ 1) Create DB payment (PENDING)
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: Number(amount),
        currency: "INR",
        status: "PENDING",
      },
    });

    // ✅ 2) Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Number(amount) * 100, // paise
      currency: "INR",
      receipt: payment.id,
      payment_capture: 1,
    });

    // ✅ 3) Save order id
    await prisma.payment.update({
      where: { id: payment.id },
      data: { razorpayOrderId: order.id },
    });

    // ✅ 4) Notify user – Payment Initiated
    await prisma.notification.create({
      data: {
        userId,
        title: "Payment Initiated 💳",
        message: `Your payment of ₹${amount} has been initiated.`,
        type: "payment",
      },
    });

    res.json({
      success: true,
      paymentId: payment.id,
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("createPayment error:", err);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

/*
|--------------------------------------------------------------------------
| VERIFY RAZORPAY PAYMENT + ACTIVATE SUBSCRIPTION
|--------------------------------------------------------------------------
*/
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing verification data" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // ✅ 1) Mark payment SUCCESS
    const payment = await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: "SUCCESS",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    // ✅ 2) ACTIVATE / CREATE SUBSCRIPTION
    await prisma.subscription.upsert({
      where: { userId: payment.userId },
      update: {
        status: "ACTIVE",
        lastPaymentId: payment.id,
      },
      create: {
        userId: payment.userId,
        status: "ACTIVE",
        lastPaymentId: payment.id,
        plan: "DEFAULT",
      },
    });

    // ✅ 3) Notify user – Payment Successful
    await prisma.notification.create({
      data: {
        userId: payment.userId,
        title: "Payment Successful ✅",
        message: `Your payment of ₹${payment.amount} was successful.`,
        type: "payment",
      },
    });

    res.json({
      success: true,
      message: "Payment verified & subscription activated",
      payment,
    });
  } catch (err) {
    console.error("verifyPayment error:", err);
    res.status(500).json({ error: "Payment verification failed" });
  }
};

/*
|--------------------------------------------------------------------------
| GET MY PAYMENTS (USER)
|--------------------------------------------------------------------------
*/
exports.getMyPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.json(payments);
  } catch (err) {
    console.error("getMyPayments error:", err);
    res.status(500).json({ error: "Failed to load payments" });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL PAYMENTS (ADMIN - SAFE FILTERS ONLY)
|--------------------------------------------------------------------------
*/
exports.getAllPayments = async (req, res) => {
  try {
    let { status, q, from, to } = req.query;

    const where = { AND: [] };

    if (status && status !== "all") {
      where.AND.push({
        status: { equals: status.toUpperCase() },
      });
    }

    if (from) {
      where.AND.push({
        createdAt: { gte: new Date(from) },
      });
    }

    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      where.AND.push({
        createdAt: { lte: toDate },
      });
    }

    if (q && q.trim()) {
      const search = q.trim();
      where.AND.push({
        OR: [
          { id: { contains: search } },
          { razorpayOrderId: { contains: search } },
          { razorpayPaymentId: { contains: search } },
          {
            user: {
              name: { contains: search, mode: "insensitive" },
            },
          },
          {
            user: {
              email: { contains: search, mode: "insensitive" },
            },
          },
        ],
      });
    }

    const payments = await prisma.payment.findMany({
      where: where.AND.length ? where : undefined,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ payments });
  } catch (err) {
    console.error("getAllPayments error:", err);
    res.status(500).json({ error: "Failed to load admin payments" });
  }
};

/*
|--------------------------------------------------------------------------
| REFUND PAYMENT (ADMIN)
|--------------------------------------------------------------------------
*/
exports.refundPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    if (payment.status === "REFUNDED") {
      return res.status(400).json({ error: "Already refunded" });
    }

    if (!payment.razorpayPaymentId) {
      return res
        .status(400)
        .json({ error: "No Razorpay payment id to refund" });
    }

    // ✅ Razorpay refund
    await razorpay.payments.refund(payment.razorpayPaymentId, {
      amount: payment.amount * 100,
    });

    const updated = await prisma.payment.update({
      where: { id },
      data: {
        status: "REFUNDED",
      },
    });

    // ✅ Notify user – Payment Refunded
    await prisma.notification.create({
      data: {
        userId: payment.userId,
        title: "Payment Refunded 💸",
        message: `₹${payment.amount} refunded to your account.`,
        type: "payment",
      },
    });

    res.json({
      success: true,
      message: "Refund successful",
      payment: updated,
    });
  } catch (err) {
    console.error("refundPayment error:", err);
    res.status(500).json({ error: "Refund failed" });
  }
};

/*
|--------------------------------------------------------------------------
| GET PAYMENT BY ID (ADMIN)
|--------------------------------------------------------------------------
*/
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json(payment);
  } catch (err) {
    console.error("getPaymentById error:", err);
    res.status(500).json({ error: "Failed to fetch payment" });
  }
};

/*
|--------------------------------------------------------------------------
| GET INVOICES (ADMIN)
|--------------------------------------------------------------------------
*/
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await prisma.payment.findMany({
      where: { status: "SUCCESS" },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ invoices });
  } catch (err) {
    console.error("getInvoices error:", err);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};
