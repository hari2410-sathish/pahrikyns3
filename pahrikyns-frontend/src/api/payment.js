import API from "./axios"; // ✅ CENTRAL AXIOS WITH TOKEN

/* =========================================
   ✅ CREATE PAYMENT + RAZORPAY ORDER (USER)
========================================= */
export const createPayment = async (amount, course) => {
  try {
    const res = await API.post("/payment/create", {
      amount,
      course,
    });

    return { ok: true, data: res.data };
  } catch (err) {
    console.error("createPayment error:", err);
    return {
      ok: false,
      error: err.response?.data?.error || err.message,
    };
  }
};

/* =========================================
   ✅ VERIFY RAZORPAY PAYMENT (SIGNATURE)
========================================= */
export const verifyPayment = async (payload) => {
  try {
    const res = await API.post("/payment/verify", payload);
    return { ok: true, data: res.data };
  } catch (err) {
    console.error("verifyPayment error:", err);
    return {
      ok: false,
      error: err.response?.data?.error || err.message,
    };
  }
};

/* =========================================
   ✅ GET MY PAYMENTS (USER)
========================================= */
export const getMyPayments = async () => {
  try {
    const res = await API.get("/payment/my");
    return { ok: true, data: res.data };
  } catch (err) {
    console.error("getMyPayments error:", err);
    return {
      ok: false,
      error: err.response?.data?.error || err.message,
    };
  }
};

/* =========================================
   ✅ GET ALL PAYMENTS (ADMIN)
========================================= */
export const getAllPayments = async () => {
  try {
    const res = await API.get("/payment/admin");
    return { ok: true, data: res.data };
  } catch (err) {
    console.error("getAllPayments error:", err);
    return {
      ok: false,
      error: err.response?.data?.error || err.message,
    };
  }
};

/* =========================================
   ✅ REFUND PAYMENT (ADMIN)
========================================= */
export const refundPayment = async (id) => {
  try {
    const res = await API.post(`/payment/refund/${id}`);
    return { ok: true, data: res.data };
  } catch (err) {
    console.error("refundPayment error:", err);
    return {
      ok: false,
      error: err.response?.data?.error || err.message,
    };
  }
};
