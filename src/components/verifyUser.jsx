{/*import  { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // For URL params
import { account } from "../lib/appwrite";
const VerificationPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // 'loading', 'success', or 'error'
  const [message, setMessage] = useState(""); // Message to display to the user

  useEffect(() => {
    const verifyToken = async () => {
      // Get the token from the URL query parameters
      const userId = searchParams.get("userId");
      const secret = searchParams.get("secret");
      
      if (!userId || !secret) {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        // Appwrite's method for verifying the email
        await account.updateVerification(userId, secret);
        setStatus("success");
        setMessage("Your email has been successfully verified!");
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
        setMessage("Verification failed. The token may be invalid or expired.");
      }
    };

    verifyToken();
  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
    {/*   <h2>Email Verification</h2>
      {status === "idle" && (
        <form onSubmit={handleVerification}>
          <p>Please enter your email and password to verify your account.</p>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Verify Email</button>
        </form>
      )}
      */}
    {/*
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && (
        <div>
          <h2>✅ Verification Successful!</h2>
          <p>{message}</p>
          <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
            Go to Homepage
          </a>
        </div>
      )}
      {status === "error" && (
        <div>
          <h2>❌ Verification Failed</h2>
          <p>{message}</p>
          <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
            Go back to Homepage
          </a>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
*/}