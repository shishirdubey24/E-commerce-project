
import { load } from "@cashfreepayments/cashfree-js";
import { useLocation } from "react-router-dom";
const PaymentBtn = () => {
  // ✅ Access the state passed from Checkout page
  const location = useLocation();
  const { 
    amount, 
    userData, 
    
    totalItems,
    totalMRP,
    discount 
  } = location.state || {};  // Add fallback for undefined state

  const getSession = async () => {
    // ✅ Validate that amount exists
    if (!amount) {
      alert("Payment amount not found. Please go back to checkout.");
      return;
    }

    try {
      const response = await fetch("https://e-commerce-project-76em.onrender.com/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_amount: amount,  // ✅ Send dynamic amount from checkout
         customer_id: (userData?.email || "guest001")
               .split("@")[0]
               .replace(/[^A-Za-z0-9_-]/g, "_")
               .slice(0, 64),
          customer_email: userData?.email || "test@gmail.com",
          customer_phone: userData?.phone || "9999999999",
          customer_name: userData?.name || "Guest User",
        }),
      });
     // ✅ Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      alert(`Server error: ${response.status}`);
      return;
    }

    // ✅ Check content type before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Expected JSON but got:", text);
      alert("Server returned invalid response");
      return;
    }
      const data = await response.json();

      if (!data.paymentSessionId) {
        console.error("No paymentSessionId received:", data);
        alert("Payment session creation failed");
        return;
      }

      const cashfree = await load({ mode: "sandbox" });

      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* ✅ Display order summary */}
      <div style={{ 
        maxWidth: "400px", 
        margin: "0 auto", 
        padding: "20px", 
        backgroundColor: "#f8f9fa", 
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ marginBottom: "15px" }}>Payment Summary</h3>
        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <p><strong>Total Items:</strong> {totalItems || 0}</p>
          <p><strong>Total MRP:</strong> ₹{totalMRP || 0}</p>
          <p><strong>Discount:</strong> -₹{discount || 0}</p>
          <hr />
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            <strong>Total Amount:</strong> ₹{amount || 0}
          </p>
        </div>
      </div>

      <button
        onClick={getSession}
        disabled={!amount}  // ✅ Disable if no amount
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: amount ? "#0A5FFF" : "#cccccc",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: amount ? "pointer" : "not-allowed",
        }}
      >
        Pay ₹{amount || 0}
      </button>
    </div>
  );
};

export default PaymentBtn;
