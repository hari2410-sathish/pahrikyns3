import { useEffect, useState } from "react";
import { fetchOrders } from "../Adminapi/orders";

export default function useOrders(status) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetchOrders({ status })
      .then(setOrders)
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, [status]);

  return { orders, loading, error };
}
