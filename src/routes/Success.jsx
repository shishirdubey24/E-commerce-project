// frontend/src/pages/Success.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(Boolean(true));
  const [error, setError] = useState("");
  const loc = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(loc.search);
  const orderId = params.get("orderId");

  useEffect(() => {
    if (!orderId) {
      setError("No order id provided in URL.");
      setLoading(false);
      return;
    }

    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://e-commerce-project-76em.onrender.com/orders/${encodeURIComponent(orderId)}`
        );

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(txt || `Server returned ${res.status}`);
        }

        const json = await res.json();
        if (!mounted) return;

        // backend returns { order: { ... } } in your existing code
        const fetchedOrder = json.order ?? json;
        setOrder(fetchedOrder);
      } catch (e) {
        if (!mounted) return;
        console.error("Failed to load order:", e);
        setError("Unable to load order details. Please try again or contact support.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [orderId]);

  const fmt = (n) =>
    typeof n === "number" ? n.toLocaleString("en-IN") : String(n || "");

  const fmtDate = (iso) => {
    try {
      return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return iso || "-";
    }
  };

  const copyOrderId = async () => {
    if (!order?.orderId) return;
    try {
      await navigator.clipboard.writeText(order.orderId);
      alert("Order ID copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  const downloadReceipt = () => {
    // placeholder — wire to backend endpoint that returns PDF/receipt
    // e.g. window.open(`/orders/${order.orderId}/receipt`, "_blank")
    alert("Download receipt not implemented yet.");
  };

  if (loading) {
    return (
      <main className="max-w-[1000px] mx-auto p-6">
        <div className="w-full rounded-lg p-8 bg-white shadow text-center text-gray-600">Loading order details…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-[1000px] mx-auto p-6">
        <div className="w-full rounded-lg p-6 bg-red-50 border border-red-100 text-red-700">
          <strong>Error:</strong> {error}
        </div>
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Continue shopping
          </button>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="max-w-[1000px] mx-auto p-6">
        <div className="w-full rounded-lg p-8 bg-white shadow text-center text-gray-600">No order data available.</div>
      </main>
    );
  }

  // normalize items array shape
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <main className="max-w-[1100px] mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order confirmed</h1>
            <p className="text-sm text-gray-600 mt-1">Thank you — your order has been placed successfully.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-gray-500">Order placed</div>
              <div className="text-sm font-medium">{fmtDate(order.createdAt ?? order.created_at ?? order.date)}</div>
            </div>

            <div className="px-3 py-2 bg-gray-50 rounded-md text-sm font-mono">{order.orderId}</div>

            <div className="flex gap-2">
              <button
                onClick={copyOrderId}
                className="px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
              >
                Copy ID
              </button>
              <button
                onClick={downloadReceipt}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
              >
                Download receipt
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer & shipping */}
          <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Customer</h2>
            <div className="text-sm text-gray-700">
              <div><span className="font-medium">Name:</span> {order.customer?.name ?? order.customer_name ?? "-"}</div>
              <div className="mt-1"><span className="font-medium">Email:</span> {order.customer?.email ?? order.customer_email ?? "-"}</div>
              {order.customer?.phone || order.customer_phone ? (
                <div className="mt-1"><span className="font-medium">Phone:</span> {order.customer?.phone ?? order.customer_phone}</div>
              ) : null}
              {order.shipping_address && (
                <div className="mt-2 text-sm text-gray-600">
                  <div className="font-medium">Shipping address</div>
                  <div>{order.shipping_address}</div>
                </div>
              )}
            </div>

            <hr className="my-4" />

            <h3 className="text-sm font-semibold text-gray-800 mb-2">Items</h3>
            <div className="divide-y divide-gray-200 border border-gray-100 rounded-md overflow-hidden">
              {items.map((it, i) => {
                const name = it.name ?? it.item_name ?? it.title ?? "Product";
                const qty = it.qty ?? it.quantity ?? it.qtyOrdered ?? 1;
                const price = Number(it.price ?? it.current_price ?? it.amount ?? 0);
                return (
                  <div key={i} className="flex items-center gap-4 p-3">
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-100 flex items-center justify-center">
                      {it.image ? (
                        <img src={it.image} alt={name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-xs text-gray-400">No image</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{name}</div>
                      <div className="text-xs text-gray-500 mt-1">{it.brand ?? it.company ?? ""}</div>
                      <div className="mt-2 text-sm text-gray-700">
                        <span className="font-medium">Qty:</span> {qty} &nbsp; • &nbsp;
                        <span className="font-medium">Price:</span> ₹{fmt(price)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium">₹{fmt(price * qty)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-white border border-gray-100 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Order summary</h2>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">₹{fmt(order.subtotal ?? order.amount_before_tax ?? order.amount ?? 0)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-amber-600 font-medium">-₹{fmt(order.discount ?? 0)}</span>
              </div>

              <div className="flex justify-between">
                <span>Convenience / Fees</span>
                <span className="font-medium">₹{fmt(order.convenience_fee ?? order.convenience ?? 0)}</span>
              </div>

              <div className="border-t border-gray-100 pt-2 flex justify-between items-center">
                <span className="text-sm font-medium">Total paid</span>
                <span className="text-lg font-bold">₹{fmt(order.amount ?? order.total ?? 0)}</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Payment status: <span className="font-medium">{order.status ?? order.payment_status ?? "Unknown"}</span>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigate("/")}
                className="w-full px-3 py-2 bg-[#ff3f6c] text-white rounded-md hover:bg-[#e13a66]"
              >
                Continue shopping
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
