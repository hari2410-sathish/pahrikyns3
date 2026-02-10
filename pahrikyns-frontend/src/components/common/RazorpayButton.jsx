import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import axios from "../../api/axios"; // ✅ your axios instance

export default function RazorpayButton({
  courseId,
  courseTitle,
  user,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create payment + order (BACKEND)
      const { data } = await axios.post(
        "/payments/course/create",
        { courseId }
      );

      const { orderId, amount, currency, key } = data;

      // 2️⃣ Razorpay options
      const options = {
        key,
        amount,
        currency,
        name: "PAHRIKYNS",
        description: courseTitle,
        image: "/logo.png",

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment (BACKEND)
            await axios.post("/payments/course/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("✅ Payment Successful! Course Unlocked");
            onSuccess && onSuccess();
          } catch (err) {
            console.error(err);
            alert("❌ Payment verification failed");
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
        },

        theme: {
          color: "#7b3fe4",
        },
      };

      // 4️⃣ Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed");
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
        fontWeight: 700,
        px: 4,
      }}
    >
      {loading ? <CircularProgress size={22} /> : "Buy Course"}
    </Button>
  );
}
