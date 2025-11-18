import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const BagSummary = () => {
  const navigate = useNavigate();

  // Get authentication state from Redux
  const user = useSelector((state) => state.auth?.user);
  const bagItems = useSelector((state) => state.bag || []);

  const CONVENIENCE_FEES = 99;
  const totalItem = bagItems.length;

  // compute totals (safely)
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItems.forEach((bagItem) => {
    const mrp = Number(bagItem?.original_price ?? bagItem?.price ?? 0);
    const current = Number(bagItem?.current_price ?? bagItem?.price ?? 0);
    totalMRP += mrp;
    totalDiscount += Math.max(0, mrp - current);
  });

  const finalPayment = Math.max(0, Math.round(totalMRP - totalDiscount + CONVENIENCE_FEES));

  const fmt = (n) => n.toLocaleString("en-IN");

  const handleOrder = () => {
    const isAuthenticated = Boolean(user) || localStorage.getItem("isAuthenticated") === "true";
    const userEmail = localStorage.getItem("userEmail");

    if (!isAuthenticated || !userEmail) {
      navigate("/User");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <aside
      aria-label="Price summary"
      className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 w-full"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Price Details</h3>
        <p className="text-xs text-gray-500 mt-1">Summary for {totalItem} item{totalItem !== 1 ? "s" : ""}</p>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <div className="text-gray-600">Total MRP</div>
          <div className="font-medium text-gray-900">₹{fmt(totalMRP)}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-gray-600">Discount on MRP</div>
          <div className="text-amber-600 font-medium">-₹{fmt(totalDiscount)}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-gray-600">Convenience Fee</div>
          <div className="font-medium text-gray-900">₹{fmt(CONVENIENCE_FEES)}</div>
        </div>
      </div>

      <div className="border-t border-gray-100 my-4" />

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Total Amount</div>
        <div className="text-xl font-bold text-gray-900">₹{fmt(finalPayment)}</div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Inclusive of all taxes. Convenience fee is applied per order.
      </div>

      <button
        onClick={handleOrder}
        disabled={totalItem === 0}
        className={`mt-6 w-full inline-flex items-center justify-center px-4 py-3 rounded-md text-sm font-semibold transition
          ${totalItem === 0 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#ff3f6c] text-white hover:bg-[#e13a66]"}`}
        aria-disabled={totalItem === 0}
        aria-label="Place order"
      >
        PLACE ORDER
      </button>

      {totalItem === 0 && (
        <div className="mt-3 text-center text-sm text-gray-500">
          Your bag is empty — add items to place an order.
        </div>
      )}
    </aside>
  );
};

export default BagSummary;
