import api from "../../../api/axios";

/* =========================================
   ADMIN ORDERS API (FINAL)
========================================= */

/**
 * ✅ CREATE ORDER
 */
export const createOrder = async (data) => {
  const res = await api.post("/admin/orders", data);
  return res.data;
};

/**
 * ✅ FETCH ALL ORDERS
 * params: { page, status, search }
 */
export const fetchOrders = async (params = {}) => {
  const res = await api.get("/admin/orders", { params });
  return res.data;
};

/**
 * ✅ FETCH SINGLE ORDER
 */
export const fetchOrderById = async (orderId) => {
  const res = await api.get(`/admin/orders/${orderId}`);
  return res.data;
};

/**
 * ✅ UPDATE ORDER STATUS
 */
export const updateOrderStatus = async (orderId, status) => {
  const res = await api.patch(`/admin/orders/${orderId}/status`, {
    status,
  });
  return res.data;
};

/**
 * ✅ CANCEL ORDER
 */
export const cancelOrder = async (orderId) => {
  const res = await api.delete(`/admin/orders/${orderId}`);
  return res.data;
};

/**
 * ✅ INIT RAZORPAY PAYMENT
 */
export const initOrderPayment = async (orderId) => {
  const res = await api.post(`/admin/orders/${orderId}/pay`);
  return res.data;
};

/**
 * ✅ VERIFY RAZORPAY PAYMENT
 */
export const verifyOrderPayment = async (data) => {
  const res = await api.post("/admin/orders/verify-payment", data);
  return res.data;
};

/**
 * ✅ EMAIL INVOICE
 */
export const emailInvoice = async (orderId) => {
  const res = await api.post(`/admin/orders/${orderId}/email-invoice`);
  return res.data;
};
export const resendInvoice = async (orderId) => {
  const res = await api.post(`/admin/orders/${orderId}/resend-invoice`);
  return res.data;
};
