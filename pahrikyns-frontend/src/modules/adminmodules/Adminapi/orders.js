// src/api/orders.js

const mockOrders = [
  {
    id: "240612",
    date: "2025-12-12",
    customer: "Peyton Waycaster",
    status: "awaiting_fulfillment",
    total: 50.98,
  },
  {
    id: "240597",
    date: "2025-12-12",
    customer: "Wendy Oliff",
    status: "awaiting_payment",
    total: 33.17,
  },
  {
    id: "240585",
    date: "2025-12-11",
    customer: "Leigh Gallagher",
    status: "completed",
    total: 100,
  },
];

// ⏳ fake API delay
const wait = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 🔥 GET ALL ORDERS
export async function fetchOrders({ status = "all" } = {}) {
  await wait();

  if (status === "all") return mockOrders;

  return mockOrders.filter((o) => o.status === status);
}

// 🔥 GET SINGLE ORDER
export async function fetchOrderById(orderId) {
  await wait();

  return mockOrders.find((o) => o.id === orderId);
}
