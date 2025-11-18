// pages/Checkout.jsx
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function Checkout() {
  const navigate = useNavigate();
  const bagItems = useSelector((state) => state.bag || []);

  // Read user info directly from localStorage (no Redux dependency)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("userData");
      const parsed = raw ? JSON.parse(raw) : null;
      setUserData(parsed);
    } catch (e) {
      console.error("Failed to parse userData from localStorage", e);
      setUserData(null);
    }
  }, []);

  const CONVENIENCE_FEES = 99;

  const totals = useMemo(() => {
    let totalMRP = 0;
    let totalCurrent = 0;
    let totalDiscount = 0;

    bagItems.forEach((it) => {
      const mrp = Number(it?.original_price ?? it?.price ?? 0);
      const current = Number(it?.current_price ?? it?.price ?? 0);
      totalMRP += mrp;
      totalCurrent += current;
      totalDiscount += Math.max(0, mrp - current);
    });

    const finalPayment = Math.max(0, Math.round(totalCurrent + CONVENIENCE_FEES));
    return { totalMRP, totalCurrent, totalDiscount, finalPayment, itemCount: bagItems.length };
  }, [bagItems]);

  const fmt = (n) => n.toLocaleString("en-IN");

  const handleProceedToPay = () => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    const localUserRaw = localStorage.getItem("userData");
    const localUser = localUserRaw ? JSON.parse(localUserRaw) : null;

    if (!auth || !localUser) {
      // Not authenticated — send to login / account page
      navigate("/User", { state: { from: "/checkout" } });
      return;
    }

    // Attach user info to each item copy and navigate to payment
    const itemsWithUser = bagItems.map((it) => ({ ...it, buyer: localUser }));

    navigate("/payment", {
      state: {
        amount: totals.finalPayment,
        items: itemsWithUser,
        userData: localUser,
        totalItems: totals.itemCount,
        totalMRP: totals.totalMRP,
        discount: totals.totalDiscount,
        convenienceFee: CONVENIENCE_FEES,
      },
    });
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: user + items */}
        <section className="md:col-span-2 space-y-6">
          {/* User info (from localStorage) */}
          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Shipping / Contact</h2>

            {userData ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-sm text-gray-700">
                <div className="mb-1"><span className="font-medium">Name:</span> {userData.name || "—"}</div>
                <div className="mb-1"><span className="font-medium">Email:</span> {userData.email || "—"}</div>
                {userData.phone !== undefined && (
                  <div className="mb-1"><span className="font-medium">Phone:</span> {userData.phone || "—"}</div>
                )}
                {userData.address && <div className="mt-2 text-xs text-gray-600">{userData.address}</div>}
              </div>
            ) : (
              <div className="bg-yellow-50 rounded-lg border border-yellow-100 p-4 text-sm text-yellow-800">
                No user details found in localStorage. Please complete your profile or login to proceed.
              </div>
            )}
          </div>

          {/* Items list */}
          <div className="space-y-4">
            {bagItems.length > 0 ? (
              bagItems.map((item) => {
                const name = item?.item_name ?? item?.name ?? "Product";
                const image = item?.image ?? "/placeholder-image.jpg";
                const price = item?.current_price ?? item?.price ?? 0;
                const mrp = item?.original_price ?? price;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
                  >
                    <div className="w-20 h-20 flex-shrink-0 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img src={image} alt={name} className="w-full h-full object-contain" loading="lazy" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{name}</div>
                      <div className="text-xs text-gray-500 mt-1">{item?.company ?? item?.brand}</div>
                      <div className="mt-2 flex items-baseline gap-3">
                        <div className="text-sm font-semibold text-gray-900">₹{fmt(price)}</div>
                        {mrp !== price && <div className="text-xs line-through text-gray-400">₹{fmt(mrp)}</div>}
                        {mrp !== price && <div className="text-xs text-amber-500">({Math.round(((mrp - price) / Math.max(1, mrp)) * 100)}% OFF)</div>}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-lg p-6 border border-dashed border-gray-200 text-center text-gray-600">
                No items in cart.
              </div>
            )}
          </div>
        </section>

        {/* Right column: summary */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 md:sticky md:top-24">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Total items</span>
                <span className="font-medium">{totals.itemCount}</span>
              </div>

              <div className="flex justify-between">
                <span>Total MRP</span>
                <span className="font-medium">₹{fmt(totals.totalMRP)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="font-medium text-amber-600">-₹{fmt(totals.totalDiscount)}</span>
              </div>

              <div className="flex justify-between">
                <span>Convenience fee</span>
                <span className="font-medium">₹{fmt(CONVENIENCE_FEES)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Payable Amount</div>
              <div className="text-2xl font-bold text-gray-900">₹{fmt(totals.finalPayment)}</div>
            </div>

            <button
              onClick={handleProceedToPay}
              disabled={bagItems.length === 0}
              className={`mt-6 w-full inline-flex items-center justify-center px-4 py-3 rounded-md text-sm font-semibold transition
                ${bagItems.length === 0 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#ff3f6c] text-white hover:bg-[#e13a66]"}`}
            >
              Proceed to Pay
            </button>

            <p className="mt-3 text-xs text-gray-500">Secure payment • Easy returns • 100% Original</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
