const prisma = require("../config/prismaClient");

/**
 * Generate Invoice Number
 * Format: INV/YYYY/MM/XXXX
 * Example: INV/2025/12/0001
 */
async function generateInvoiceNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  // Month start & end
  const startOfMonth = new Date(year, now.getMonth(), 1);
  const endOfMonth = new Date(year, now.getMonth() + 1, 0, 23, 59, 59);

  // 🔐 Use latest invoice number instead of count (race-condition safe)
  const lastOrder = await prisma.order.findFirst({
    where: {
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
      invoiceNumber: { not: null },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      invoiceNumber: true,
    },
  });

  let nextSeq = 1;

  if (lastOrder?.invoiceNumber) {
    const parts = lastOrder.invoiceNumber.split("/");
    const lastSeq = parseInt(parts[3], 10);
    nextSeq = lastSeq + 1;
  }

  const seq = String(nextSeq).padStart(4, "0");

  return `INV/${year}/${month}/${seq}`;
}

module.exports = { generateInvoiceNumber };
