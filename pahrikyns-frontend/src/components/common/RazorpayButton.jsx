import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { createPayment, updatePaymentStatus } from "../../api/payment";

export default function RazorpayButton({
  amount,
  course = "General Course",
  user,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create Payment in Backend
      const res = await createPayment(amount);
      if (!res.ok) {
        alert(res.error);
        return;
      }

      const payment = res.data.payment;

      // 2️⃣ Razorpay Popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // ✅ Frontend env key
        amount: payment.amount * 100, // in paise
        currency: "INR",
        name: "PAHRIKYNS",
        description: course,
        image: "/logo.png",

        handler: async function (response) {
          // 3️⃣ Verify with Backend
          const verify = await updatePaymentStatus(
            payment.id,
            "SUCCESS"
          );

          if (verify.ok) {
            alert("✅ Payment Successful!");
            onSuccess && onSuccess();
          } else {
            alert("Verification Failed");
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
        },

        theme: {
          color: "#00e5ff",
        },

        modal: {
          ondismiss: async () => {
            await updatePaymentStatus(payment.id, "FAILED");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handlePay}
      disabled={loading}
      sx={{
        background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
        fontWeight: 800,
        px: 3,
      }}
    >
      {loading ? <CircularProgress size={22} /> : `Pay ₹${amount}`}
    </Button>
  );
}
