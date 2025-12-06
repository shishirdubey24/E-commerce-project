// src/features/auth/pages/RegisterUser.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { account, ID, databases } from "../lib/appwrite";
import { loginSuccess } from "../../../store/authSlice";

const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [errormsg, setErrormsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return "All fields are required.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (phone.length < 8) {
      return "Please enter a valid phone number.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    if (!acceptTerms) {
      return "You must accept the terms to continue.";
    }

    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrormsg(null);

    const validationError = validateForm();
    if (validationError) {
      setErrormsg(validationError);
      return;
    }

    try {
      setLoading(true);

      // Create Appwrite account with name
      const response = await account.create(
        ID.unique(),
        email,
        password,
        fullName
      );

      // Optional: extra metadata document
      const verificationToken = Math.random().toString(36).substr(2, 10);
      const documentId = ID.unique();

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        documentId,
        {
          userId: response?.$id || "fallback-user-id",
          email,
          phone,
          name: fullName,
          isVerified: false,
          verificationToken,
        }
      );

      // Auto-login after signup
      await account.createEmailPasswordSession(email, password);
      const userSession = await account.get();

      const authPayload = {
        id: userSession.$id,
        name: userSession.name || "",
        email: userSession.email || "",
      };

      dispatch(loginSuccess(authPayload));

      navigate("/");
    } catch (error) {
      console.error(error);
      setErrormsg(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#f5f5f6] px-4">
      <div className="mt-16 w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        {/* Offer strip similar to Myntra */}
        <div className="bg-[#fff3f6] border-b border-gray-200 px-6 py-3">
          <p className="text-sm font-semibold text-gray-800">
            JOIN & GET EXCLUSIVE OFFERS
          </p>
          <p className="text-[11px] text-gray-600">
            Get updates on latest trends, offers and more.
          </p>
        </div>

        <div className="px-6 py-6">
          {/* Myntra logo + brand text */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <span className="text-lg font-semibold tracking-wide text-gray-900">
              Myntra
            </span>
          </div>

          <h1 className="text-base font-semibold text-gray-900 mb-1">
            Register
          </h1>
          <p className="text-xs text-gray-600 mb-4">
            Create your Myntra account to shop faster and track your orders.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Full name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Mobile number
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mt-1 text-[11px] text-gray-500">
                  Minimum 6 characters.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 h-3 w-3 border border-gray-400 rounded-sm"
              />
              <p className="text-[11px] text-gray-600 leading-snug">
                By creating an account, you agree to Myntra&apos;s{" "}
                <button
                  type="button"
                  className="text-pink-500 font-semibold hover:text-pink-600"
                >
                  Terms of Use
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-pink-500 font-semibold hover:text-pink-600"
                >
                  Privacy Policy
                </button>
                .
              </p>
            </div>

            {errormsg && (
              <p className="text-[11px] text-red-600 text-center">
                {errormsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff3f6c] hover:bg-[#ff1654] text-white text-sm font-semibold py-3 rounded-sm uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-4 text-[11px] text-gray-600">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
