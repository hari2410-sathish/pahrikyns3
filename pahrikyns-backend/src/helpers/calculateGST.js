module.exports = function calculateGST(amount) {
  const GST_RATE = 0.18; // 18%

  const gst = +(amount * GST_RATE).toFixed(2);
  const total = +(amount + gst).toFixed(2);

  return {
    subTotal: amount,
    gstRate: "18%",
    gstAmount: gst,
    grandTotal: total,
  };
};
