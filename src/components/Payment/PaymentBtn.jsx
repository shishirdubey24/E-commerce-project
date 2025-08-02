
import { load } from "@cashfreepayments/cashfree-js";

const PaymentBtn = () => {
  const getSession = async () => {
    try {
      const response = await fetch("https://e-commerce-project-76em.onrender.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!data.paymentSessionId) {
        console.error("No paymentSessionId received:", data);
        return;
      }

      const cashfree = await load({ mode: "sandbox" });

      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Payment initiation error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={getSession}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#0A5FFF",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentBtn;
