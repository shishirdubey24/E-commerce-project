// routes/Account.jsx

import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { account } from "../components/AUTH/lib/appwrite";
import { User as UserIcon, Package, Heart, HelpCircle, LogOut } from "lucide-react";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth || {});
  const user = authState.user || authState;
  const isAuthenticated = !!(user && (user.id || user.$id || user.email));

  const handleLogout = useCallback(async () => {
    try {
      await account.deleteSession("current");
    } catch (err) {
      console.error("Logout error:", err);
    }
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <main className="bg-[#f5f5f6] min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-[1100px] mx-auto space-y-4">
        {/* PAGE HEADER */}
        <header className="flex flex-col gap-1">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            My Account
          </h1>
          <p className="text-[12px] text-gray-600">
            Manage your profile, orders, wishlist and more from one place.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="bg-white border border-gray-200 rounded-sm shadow-sm">
            {/* User header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#ffebf0] flex items-center justify-center">
                <UserIcon size={18} className="text-[#ff3f6c]" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-500">Welcome</p>
                {isAuthenticated ? (
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name || user.email || "User"}
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-gray-900">
                    Sign in to access your account
                  </p>
                )}
              </div>
            </div>

            {/* Menu sections */}
            <div className="px-5 py-4 space-y-4 text-sm">
              <section>
                <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  Overview
                </p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-gray-900 font-semibold text-[13px] bg-[#fff3f6] px-2 py-1.5 rounded-sm">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ff3f6c] text-[10px] text-white">
                      •
                    </span>
                    <span>Account Overview</span>
                  </li>
                </ul>
              </section>

              <section>
                <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  Orders
                </p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-gray-800 hover:text-[#ff3f6c] cursor-pointer">
                    <Package size={14} />
                    <span>Orders & Returns</span>
                  </li>
                </ul>
              </section>

              <section>
                <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  Account
                </p>
                <ul className="space-y-1">
                  <li className="text-gray-800 hover:text-[#ff3f6c] cursor-pointer">
                    Profile
                  </li>
                  <li className="text-gray-800 hover:text-[#ff3f6c] cursor-pointer">
                    Saved Addresses
                  </li>
                  <li className="text-gray-800 hover:text-[#ff3f6c] cursor-pointer">
                    Payments
                  </li>
                </ul>
              </section>

              <section>
                <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                  More
                </p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-gray-800 hover:text-[#ff3f6c] cursor-pointer">
                    <Heart size={14} />
                    <span>Wishlist</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-800 hover:text-[#ff3f6c] cursor-pointer">
                    <HelpCircle size={14} />
                    <span>Help & Support</span>
                  </li>
                </ul>
              </section>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-sm border border-gray-300 px-3 py-2 text-[11px] font-semibold text-gray-800 hover:border-red-500 hover:text-red-600 transition w-full"
                >
                  <LogOut size={14} />
                  <span>LOG OUT</span>
                </button>
              )}
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="space-y-4">
            {/* CARD: Auth / overview */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 sm:p-6">
              {isAuthenticated ? (
                <>
                  {/* Profile summary */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-[16px] sm:text-[18px] font-bold text-gray-900">
                        Account Overview
                      </h2>
                      <p className="text-[12px] text-gray-600">
                        Manage your profile, orders, and saved items.
                      </p>
                    </div>
                    <div className="border border-gray-100 rounded-sm px-3 py-2 text-[11px] text-gray-600">
                      <p className="mb-0.5">Logged in as</p>
                      <p className="text-[13px] font-semibold text-gray-900">
                        {user.name || "Myntra Shopper"}
                      </p>
                      {user.email && (
                        <p className="text-[11px] text-gray-600">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="border border-gray-100 rounded-sm p-3 sm:p-4">
                      <p className="font-semibold text-gray-900 mb-1">
                        Orders & Returns
                      </p>
                      <p className="text-[11px] text-gray-600 mb-3">
                        Track your orders, manage returns, or reorder your
                        favourites.
                      </p>
                      <button
                        type="button"
                        className="text-[#ff3f6c] font-semibold hover:text-[#ff1654] text-[11px]"
                      >
                        VIEW ORDERS
                      </button>
                    </div>

                    <div className="border border-gray-100 rounded-sm p-3 sm:p-4">
                      <p className="font-semibold text-gray-900 mb-1">
                        Wishlist
                      </p>
                      <p className="text-[11px] text-gray-600 mb-3">
                        See all the products you&apos;ve saved for later.
                      </p>
                      <Link
                        to="/admin" // placeholder route for now
                        className="text-[#ff3f6c] font-semibold hover:text-[#ff1654] text-[11px]"
                      >
                        VIEW WISHLIST
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-[16px] sm:text-[18px] font-bold text-gray-900 mb-1">
                    Welcome to Trend-Wired
                  </h2>
                  <p className="text-[12px] text-gray-600 mb-4">
                    Sign in to access your orders, wishlist, and personalized
                    recommendations.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="border border-gray-100 rounded-sm p-4">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                        Existing User
                      </p>
                      <p className="text-[12px] text-gray-700 mb-3">
                        Login to view your profile, track orders and more.
                      </p>
                      <Link
                        to="/User/login"
                        className="inline-flex items-center justify-center w-full bg-[#ff3f6c] hover:bg-[#ff1654] text-white text-xs font-semibold py-2.5 rounded-sm uppercase tracking-wide"
                      >
                        Login
                      </Link>
                    </div>

                    <div className="border border-gray-100 rounded-sm p-4">
                      <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                        New to Trend-Wired?
                      </p>
                      <p className="text-[12px] text-gray-700 mb-3">
                        Create your account to save addresses, wishlist items
                        and more.
                      </p>
                      <Link
                        to="/User/register"
                        className="inline-flex items-center justify-center w-full border border-[#ff3f6c] text-[#ff3f6c] hover:border-[#ff1654] hover:text-[#ff1654] text-xs font-semibold py-2.5 rounded-sm uppercase tracking-wide"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* CARD: Help / support */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5 sm:p-6 text-xs">
              <div className="flex items-start gap-2">
                <HelpCircle size={16} className="mt-0.5 text-gray-700" />
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-1">
                    Need help with something?
                  </h2>
                  <p className="text-[12px] text-gray-600 mb-2">
                    For order related queries, returns, or account assistance,
                    you can refer to our Help Center.
                  </p>
                  <button
                    type="button"
                    className="text-[#ff3f6c] font-semibold hover:text-[#ff1654] text-[11px]"
                  >
                    GO TO HELP CENTER
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Account;
