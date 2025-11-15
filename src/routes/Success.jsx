// frontend/src/pages/Success.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const [order, setOrder] = useState(null);
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const orderId = params.get("orderId");

  useEffect(() => {
    if (!orderId) return;

    (async () => {
      try {
        const res = await fetch(
          `https://e-commerce-project-76em.onrender.com/orders/${orderId}`
        );

        if (!res.ok) throw new Error("Failed to fetch order");

        const json = await res.json();
        setOrder(json.order);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [orderId]);

  if (!order) return <div>Loading order details...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>Order {order.orderId}</h2>
      <p>Status: {order.status}</p>

      <h3>Customer</h3>
      <p>{order.customer.name}</p>
      <p>{order.customer.email}</p>
      <p>{order.customer.phone}</p>

      <h3>Items</h3>
      <ul>
        {order.items.map((it, idx) => (
          <li key={idx}>
            {it.name} — {it.qty} × ₹{it.price}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{order.amount}</h3>
    </div>
  );
}
