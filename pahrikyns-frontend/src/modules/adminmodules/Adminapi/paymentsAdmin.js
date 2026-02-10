import api from "../../../api/axios";

// ==========================
// ✅ ALL PAYMENTS (ADMIN)
// ==========================
export const fetchAllPayments = async (params = {}) => {
  const res = await api.get("/payment/admin", { params });
  return res.data;
};

// ==========================
// ✅ SINGLE PAYMENT BY ID (ADMIN)
// ==========================
export const fetchPaymentById = async (paymentId) => {
  const res = await api.get(`/payment/admin/${paymentId}`);
  return res.data;
};

// ==========================
// ✅ REFUND PAYMENT (ADMIN)
// ==========================
export const refundPayment = async (paymentId) => {
  const res = await api.post(`/payment/admin/refund/${paymentId}`);
  return res.data;
};

// ==========================
// ✅ DASHBOARD TRANSACTIONS
// ==========================
export const fetchDashboardTransactions = async (params = {}) => {
  const res = await api.get("/admin/dashboard/transactions", { params });
  return res.data;
};

// ==========================
// ✅ INVOICES (ADMIN) ✅✅✅ FIX ADDED
// ==========================
export const fetchInvoices = async (params = {}) => {
  const res = await api.get("/admin/orders", {
    params: { ...params, hasInvoice: true },
  });
  return res.data;
};
