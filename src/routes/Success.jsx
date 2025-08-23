// src/routes/Success.jsx
import { useSearchParams } from "react-router-dom";

export default function Success() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id"); 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your purchase.
      </p>
      {orderId && (
        <p className="mt-2 text-gray-500">
          Your Order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Go back to Home
      </a>
    </div>
  );
}
