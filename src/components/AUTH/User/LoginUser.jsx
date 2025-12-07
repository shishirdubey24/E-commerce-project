// src/features/auth/pages/LoginUser.jsx

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { account } from "../lib/appwrite"; // adjust path if needed
import { loginSuccess } from "../../../store/authSlice";

const LoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrormsg(null);

    if (!email || !password) {
      setErrormsg("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      // Appwrite stores session in cookies
      await account.createEmailPasswordSession(email, password);
      const userSession = await account.get();
      const isAdmin=userSession.labels.includes('admin') || userSession.prefs?.role === 'admin';
      const authPayload = {
        id: userSession.$id,
        name: userSession.name || "",
        email: userSession.email || "",
        isAdmin
      };

      dispatch(loginSuccess(authPayload));

      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (error) {
      console.error(error);
      setErrormsg("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#f5f5f6] px-4">
      <div className="mt-16 w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        {/* Offer strip like Myntra */}
        <div className="bg-[#fff3f6] border-b border-gray-200 px-6 py-3">
          <p className="text-sm font-semibold text-gray-800">
            FLAT ₹200 OFF + FREE SHIPPING
          </p>
          <p className="text-[11px] text-gray-600">
            On your first order. Use code{" "}
            <span className="font-semibold text-gray-800">MYNTRA200</span>
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
            Login or Signup
          </h1>
          <p className="text-xs text-gray-600 mb-4">
            Welcome to India&apos;s largest fashion store.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
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

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-1 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    className="h-3 w-3 border border-gray-400 rounded-sm"
                  />
                  <span>Keep me signed in</span>
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-pink-500 hover:text-pink-600"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <p className="text-[11px] leading-snug text-gray-600">
              By continuing, you agree to Myntra&apos;s{" "}
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

            {errormsg && (
              <p className="text-[11px] text-red-600 text-center">
                {errormsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 bg-[#ff3f6c] hover:bg-[#ff1654] text-white text-sm font-semibold py-3 rounded-sm uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-[11px] text-gray-600">
            <p>
              New to Myntra?{" "}
              <Link
                to="/User/register"
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Create an account
              </Link>
            </p>
            <p className="mt-1">
              Having trouble logging in?{" "}
              <button
                type="button"
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Get help
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
