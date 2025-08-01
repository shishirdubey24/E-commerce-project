import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const bagItems = useSelector((state) => state.bag);
  const CONVENIENCE_FEES = 99;
  let totalMRP = 0;
  let totalDiscount = 0;
  let totalItems = bagItems.length;

  bagItems.forEach((item) => {
    totalMRP += item.original_price || item.price;
    totalDiscount += (item.original_price || item.price) - (item.current_price || item.price - 10);
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <div style={styles.checkoutContainer}>
      <h2 style={styles.heading}>Checkout</h2>

      <div style={styles.itemList}>
        {bagItems.length > 0 ? (
          bagItems.map((item) => (
            <div key={item.id} style={styles.itemBox}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <p style={styles.itemName}>{item.name}</p>
                <p style={styles.itemPrice}>₹{item.current_price || item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items in cart.</p>
        )}
      </div>

      <div style={styles.summaryBox}>
        <h3 style={styles.sectionTitle}>Order Summary</h3>
        <p>Total Items: <strong>{totalItems}</strong></p>
        <p>Total MRP: ₹{totalMRP}</p>
        <p>Discount: -₹{totalDiscount}</p>
        <p>Convenience Fee: ₹{CONVENIENCE_FEES}</p>
        <hr />
        <h3>Total Payable: ₹{finalPayment}</h3>
      </div>
      <button style={styles.payButton} onClick={handlePayment}>Proceed to Pay</button>
    </div>
  );
};
// Inline styles
const styles = {
  checkoutContainer: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  itemList: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  itemBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  itemImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "5px",
    marginRight: "10px",
  },
  itemDetails: {
    flex: 1,
    textAlign: "left",
  },
  itemName: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: "14px",
    color: "green",
  },
  summaryBox: {
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "8px",
    marginBottom: "15px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  userInfo: {
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "8px",
    marginBottom: "15px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  loginMessage: {
    color: "red",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  payButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default Checkout;
