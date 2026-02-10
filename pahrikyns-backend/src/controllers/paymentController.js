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
| CREATE PAYMENT + RAZORPAY ORDER (COURSE)
|--------------------------------------------------------------------------
*/
exports.createPayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // 1️⃣ Get course & price
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course || course.price <= 0) {
      return res.status(400).json({ error: "Invalid or free course" });
    }

    const amount = course.price;

    // 2️⃣ Create payment record (PENDING)
    const payment = await prisma.payment.create({
      data: {
        userId,
        courseId,
        amount,
        currency: "INR",
        status: "PENDING",
      },
    });

    // 3️⃣ Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: payment.id,
      payment_capture: 1,
    });

    // 4️⃣ Save Razorpay order id
    await prisma.payment.update({
      where: { id: payment.id },
      data: { razorpayOrderId: order.id },
    });

    // 5️⃣ Notify user
    await prisma.notification.create({
      data: {
        userId,
        title: "Payment Initiated 💳",
        message: `Payment started for course: ${course.title}`,
        type: "payment",
      },
    });

    // 6️⃣ ✅ AUTO-CREATE ORDER RECORD
    // so it shows in Admin Panel -> Orders
    try {
      const generateInvoiceNumber = require("../helpers/generateInvoiceNumber");
      const invoiceNumber = await generateInvoiceNumber();

      const user = await prisma.user.findUnique({ where: { id: userId } });

      const newOrder = await prisma.order.create({
        data: {
          customerType: "Student",
          customer: user?.name || "Unknown",
          customerEmail: user?.email,
          fulfillment: "Digital",
          address: "Online",
          paymentMethod: "Razorpay",
          status: "CREATED",
          paymentStatus: "PENDING",
          totalAmount: amount,
          gstAmount: 0,
          grandTotal: amount,
          invoiceNumber,
          items: {
            create: {
              product: course.title,
              quantity: 1,
              price: course.price,
            }
          }
        }
      });

      // Link Payment to Order
      await prisma.payment.update({
        where: { id: payment.id },
        data: { orderId: newOrder.id }
      });

    } catch (ordErr) {
      console.error("Auto-Order Creation Failed", ordErr);
    }

    // 6️⃣ Send data to frontend
    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment.id,
      courseTitle: course.title,
    });
  } catch (err) {
    console.error("createPayment error:", err);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

/*
|--------------------------------------------------------------------------
| VERIFY RAZORPAY PAYMENT + UNLOCK COURSE
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

    // 1️⃣ Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // 2️⃣ Update payment as SUCCESS
    const payment = await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: "SUCCESS",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    // 3️⃣ 🔓 UNLOCK COURSE
    await prisma.userCourse.upsert({
      where: {
        userId_courseId: {
          userId: payment.userId,
          courseId: payment.courseId,
        },
      },
      update: { paid: true },
      create: {
        userId: payment.userId,
        courseId: payment.courseId,
        paid: true,
      },
    });

    // 4️⃣ Notify user
    await prisma.notification.create({
      data: {
        userId: payment.userId,
        title: "Payment Successful ✅",
        message: "Course unlocked successfully. Happy learning! 🚀",
        type: "payment",
      },
    });

    // 5️⃣ ✅ UPDATE LINKED ORDER STATUS
    if (payment.orderId) {
      await prisma.order.update({
        where: { id: payment.orderId },
        data: {
          status: "COMPLETED",
          paymentStatus: "PAID"
        }
      });
    }

    res.json({
      success: true,
      message: "Payment verified & course unlocked",
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
| GET ALL PAYMENTS (ADMIN)
|--------------------------------------------------------------------------
*/
/*
|--------------------------------------------------------------------------
| GET ALL PAYMENTS (ADMIN) - WITH FILTERING & PAGINATION
|--------------------------------------------------------------------------
*/
exports.getAllPayments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status, // PAID, PENDING, FAILED, REFUNDED
      startDate,
      endDate,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // 1️⃣ Build Where Clause
    const where = {};

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    if (search) {
      where.OR = [
        { id: { contains: search, mode: "insensitive" } },
        { razorpayOrderId: { contains: search, mode: "insensitive" } },
        { razorpayPaymentId: { contains: search, mode: "insensitive" } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { user: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    // 2️⃣ Fetch Data
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        take,
        skip,
        include: {
          user: { select: { id: true, name: true, email: true } },
          course: { select: { id: true, title: true } },
          order: { select: { id: true, invoiceNumber: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.payment.count({ where }),
    ]);

    // 3️⃣ Return Response
    res.json({
      success: true,
      payments,
      total,
      totalPages: Math.ceil(total / take),
      currentPage: parseInt(page),
    });
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

    const payment = await prisma.payment.findUnique({ where: { id } });

    if (!payment || !payment.razorpayPaymentId) {
      return res.status(400).json({ error: "Invalid payment" });
    }

    await razorpay.payments.refund(payment.razorpayPaymentId, {
      amount: payment.amount * 100,
    });

    await prisma.payment.update({
      where: { id },
      data: { status: "REFUNDED" },
    });

    res.json({ success: true });
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
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: true,
        order: true,
      },
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
