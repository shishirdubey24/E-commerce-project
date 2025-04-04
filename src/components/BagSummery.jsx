import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const BagSummary = () => {
  const navigate = useNavigate();
  
  // Get bag items and authentication state
  const bagItemIds = useSelector((state) => state.bag);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  console.log("Received bag item IDs: ", bagItemIds);

  const CONVENIENCE_FEES = 99;
  let totalItem = bagItemIds.length;
  console.log("Total items:", totalItem);

  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemIds.forEach((bagItem) => {
    totalMRP += bagItem.original_price || bagItem.price;
    totalDiscount += (bagItem.original_price || bagItem.price) - (bagItem.current_price || bagItem.price - 10);
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  const handleOrder = () => {
    if (!isAuthenticated) {
      // Redirect to login page if not logged in
      navigate("/User");
    } else {
      // Proceed to checkout or order placement page
      navigate("/checkout");
    }
  };

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItem} Items)</div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order" onClick={handleOrder}>
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};

export default BagSummary;
