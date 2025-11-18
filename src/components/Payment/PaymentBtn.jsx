import { load } from "@cashfreepayments/cashfree-js";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const AVAILABLE_COUPONS = {
  SAVE10: { type: "percent", value: 10 },   // 10% off
  FLAT100: { type: "flat", value: 100 },    // ₹100 off
};

export default function PaymentBtn() {
  const location = useLocation();
  const {
    amount = 0,
    userData: userFromState = null,
    totalItems = 0,
    totalMRP = 0,
    discount = 0,
    items = [],
  } = location.state || {};

  // fallback to localStorage if userData not provided
  const [userData, setUserData] = useState(userFromState);
  useEffect(() => {
    if (!userFromState) {
      try {
        const raw = localStorage.getItem("userData");
        const parsed = raw ? JSON.parse(raw) : null;
        setUserData(parsed);
      } catch {
        setUserData(null);
      }
    }
  }, [userFromState]);

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");

  const CONVENIENCE_FEES = 99;

  const numeric = (v) => Number(v || 0);

  // compute values (MRP, baseDiscountFromState, coupon discount, final)
  const computed = useMemo(() => {
    const baseMRP = numeric(totalMRP);
    const baseDiscount = numeric(discount); // existing discount in state
    const subtotal = Math.max(0, numeric(amount)); // amount passed (current price total)
    let couponDisc = 0;

    if (couponApplied) {
      if (couponApplied.type === "percent") {
        couponDisc = Math.round((subtotal * couponApplied.value) / 100);
      } else if (couponApplied.type === "flat") {
        couponDisc = couponApplied.value;
      }
    }

    const payable = Math.max(0, subtotal - couponDisc + CONVENIENCE_FEES);

    return {
      baseMRP,
      baseDiscount,
      subtotal,
      couponDisc,
      payable,
    };
  }, [totalMRP, discount, amount, couponApplied]);

  // apply coupon code if valid
  const handleApplyCoupon = () => {
    setError("");
    const code = (couponCode || "").trim().toUpperCase();
    if (!code) {
      setError("Enter coupon code");
      return;
    }
    const rule = AVAILABLE_COUPONS[code];
    if (!rule) {
      setError("Invalid coupon");
      return;
    }
    setCouponApplied(rule);
    setError("");
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponCode("");
    setError("");
  };

  const copyOrderId = async () => {
    if (!orderId) return;
    try {
      await navigator.clipboard.writeText(orderId);
      // optional: give quick feedback
      alert("Order ID copied");
    } catch {
      alert("Copy failed");
    }
  };

  const getSession = async () => {
    setError("");
    if (!computed.payable || computed.payable <= 0) {
      setError("Invalid amount. Please go back to checkout.");
      return;
    }
    setIsLoading(true);

    try {
      const payload = {
        order_amount: computed.payable,
        items: items,
        customer_id: (userData?.email || "guest001")
          .split("@")[0]
          .replace(/[^A-Za-z0-9_-]/g, "_")
          .slice(0, 64),
        customer_email: userData?.email || "guest@example.com",
        customer_phone: userData?.phone || "9999999999",
        customer_name: userData?.name || "Guest User",
        meta: {
          coupon: couponApplied ? couponCode.toUpperCase() : null,
          original_amount: numeric(amount),
          base_mrp: numeric(totalMRP),
        },
      };

      const response = await fetch(
        "https://e-commerce-project-76em.onrender.com/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server ${response.status}: ${text}`);
      }

      const data = await response.json();

      if (!data.paymentSessionId) {
        throw new Error("Payment session not returned by server");
      }

      if (data.orderId) {
        setOrderId(data.orderId);
        try {
          sessionStorage.setItem("latestOrderId", data.orderId);
        } catch(e) {
             console.log(e)
        }
      }

      const cashfree = await load({ mode: "sandbox" });
      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-5">
        {/* User */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Payer</h3>
          <div className="mt-2 text-sm text-gray-700">
            <div>
              <span className="font-medium">Name: </span>
              <span>{userData?.name || "Guest User"}</span>
            </div>
            <div>
              <span className="font-medium">Email: </span>
              <span>{userData?.email || "guest@example.com"}</span>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Payment Summary</h3>

          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Items ({totalItems})</span>
              <span>₹{numeric(amount).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{numeric(totalMRP).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-amber-600">-₹{numeric(discount).toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span>Convenience Fee</span>
              <span>₹{CONVENIENCE_FEES.toLocaleString("en-IN")}</span>
            </div>

            {couponApplied && (
              <div className="flex justify-between text-sm text-green-700">
                <span>Coupon ({couponCode.toUpperCase()})</span>
                <span>-₹{numeric(computed.couponDisc).toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="border-t pt-2 flex justify-between items-center">
              <span className="text-base font-semibold">Total</span>
              <span className="text-xl font-bold">₹{numeric(computed.payable).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Have a coupon?</label>
          <div className="flex gap-2">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300"
            />
            {!couponApplied ? (
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-60"
              >
                Apply
              </button>
            ) : (
              <button onClick={handleRemoveCoupon} className="px-4 py-2 bg-gray-200 rounded-md">
                Remove
              </button>
            )}
          </div>
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          {couponApplied && (
            <div className="mt-2 text-sm text-green-700">Coupon applied: {couponCode.toUpperCase()}</div>
          )}
        </div>

        {/* Order ID */}
        {orderId && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md flex items-center justify-between text-sm">
            <div>
              <div className="text-xs text-gray-500">Order reference</div>
              <div className="font-mono text-sm">{orderId}</div>
            </div>
            <button onClick={copyOrderId} className="ml-4 px-3 py-1 border rounded-md text-sm">
              Copy
            </button>
          </div>
        )}

        {/* Pay button */}
        <div className="text-center">
          <button
            onClick={getSession}
            disabled={isLoading || numeric(computed.payable) <= 0}
            className={`inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md text-white font-semibold
              ${isLoading || numeric(computed.payable) <= 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : null}
            Pay ₹{numeric(computed.payable).toLocaleString("en-IN")}
          </button>
        </div>
      </div>
    </div>
  );
}
