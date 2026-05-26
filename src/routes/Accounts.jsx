/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { LogOut, ShoppingBag, Heart, User, MapPin, CreditCard, HelpCircle } from "lucide-react";

const NAV_ITEMS = [
  { label: "Orders & Returns", icon: ShoppingBag },
  { label: "Profile", icon: User },
  { label: "Saved Addresses", icon: MapPin },
  { label: "Payments", icon: CreditCard },
  { label: "Wishlist", icon: Heart },
  { label: "Help & Support", icon: HelpCircle },
];

const QUICK_ACTIONS = [
  { title: "Orders & Returns", description: "Track, return or reorder your items.", cta: "VIEW ORDERS", to: null },
  { title: "Wishlist", description: "Browse items you've saved for later.", cta: "VIEW WISHLIST", to: "/admin" },
  { title: "Saved Addresses", description: "Manage your delivery locations.", cta: "MANAGE", to: null },
  { title: "Payments", description: "Cards, UPI, and saved payment methods.", cta: "VIEW", to: null },
];

const STATS = [
  { value: "3", label: "Active Orders" },
  { value: "12", label: "Wishlist Items" },
  { value: "2", label: "Saved Addresses" },
];

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth);
  const isAuthenticated = !!authData.email;

  const handleLogout = useCallback(async () => {
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <main className="bg-[#f5f5f6] min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-[1100px] mx-auto space-y-4">

        {/* PAGE HEADER */}
        <header className="pb-2">
          <h1 className="text-xl font-bold text-[#282c3f]">Account</h1>
          <p className="text-[13px] text-[#696e79] mt-0.5">
            {isAuthenticated
              ? authData.username || authData.email
              : "Manage your profile, orders, wishlist and more"}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-5">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="bg-white border border-[#eaeaec] rounded-sm shadow-sm self-start">

            {/* User info */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#eaeaec]">
              <div className="h-10 w-10 shrink-0 rounded-full border-2 border-[#ff3f6c] bg-[#fff0f4] flex items-center justify-center text-[14px] font-bold text-[#ff3f6c] select-none">
                {isAuthenticated
                  ? (authData.username || authData.email || "U")
                      .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
                  : "?"}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#696e79] font-semibold uppercase tracking-wide">Welcome</p>
                <p className="text-sm font-bold text-[#282c3f] truncate">
                  {isAuthenticated ? authData.username || authData.email : "Sign in to access"}
                </p>
              </div>
            </div>

            {/* Nav */}
            <nav className="py-2 text-[13px]">
              <div className="px-5 py-2.5 border-l-4 border-[#ff3f6c] bg-[#fff3f6]/50">
                <span className="font-bold text-[#ff3f6c]">Account Overview</span>
              </div>

              <hr className="border-[#eaeaec] mx-5 my-1" />

              {NAV_ITEMS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="w-full flex items-center gap-3 px-5 py-2.5 text-left text-[#696e79] border-l-4 border-transparent hover:text-[#ff3f6c] hover:font-bold hover:border-[#ff3f6c] transition-colors"
                >
                  <Icon size={14} className="shrink-0 opacity-70" />
                  {label}
                </button>
              ))}

              {isAuthenticated && (
                <>
                  <hr className="border-[#eaeaec] mx-5 my-1" />
                  <div className="px-5 py-3">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-sm border border-[#eaeaec] px-4 py-2 text-[12px] font-bold text-[#ff3f6c] hover:border-[#ff3f6c] transition"
                    >
                      <LogOut size={14} />
                      LOG OUT
                    </button>
                  </div>
                </>
              )}
            </nav>
          </aside>

          {/* ── RIGHT CONTENT ── */}
          <div className="space-y-4">

            {isAuthenticated ? (
              <AccountDetails authData={authData} />
            ) : (
              /* ── GUEST VIEW ── */
              <div className="bg-white border border-[#eaeaec] rounded-sm shadow-sm overflow-hidden">

                {/* Hero banner */}
                <div className="flex flex-col items-center gap-2 px-6 py-10 border-b border-[#eaeaec] text-center">
                  <div className="h-16 w-16 rounded-full border-2 border-[#ff3f6c] bg-[#fff0f4] flex items-center justify-center mb-2">
                    <User size={28} className="text-[#ff3f6c]" />
                  </div>
                  <h2 className="text-[20px] font-bold text-[#282c3f]">Welcome to Myntra</h2>
                  <p className="text-[13px] text-[#696e79] max-w-sm">
                    Login or sign up to access your orders, wishlist, and personalised recommendations.
                  </p>
                </div>

                {/* Auth options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#eaeaec]">
                  {/* Existing user */}
                  <div className="flex flex-col items-center gap-4 px-8 py-8 text-center">
                    <div>
                      <p className="text-[15px] font-bold text-[#282c3f] mb-1">Existing User</p>
                      <p className="text-[13px] text-[#696e79] leading-relaxed">
                        Login to view your profile, track orders and more.
                      </p>
                    </div>
                    <Link
                      to="/User/SignIn"
                      className="w-full inline-flex items-center justify-center bg-[#ff3f6c] hover:bg-[#ff1654] text-white text-[13px] font-bold py-3 px-6 rounded-sm uppercase tracking-wide transition-colors"
                    >
                      Login
                    </Link>
                  </div>

                  {/* New user */}
                  <div className="flex flex-col items-center gap-4 px-8 py-8 text-center">
                    <div>
                      <p className="text-[15px] font-bold text-[#282c3f] mb-1">New to Myntra?</p>
                      <p className="text-[13px] text-[#696e79] leading-relaxed">
                        Create your account to save addresses, wishlist items and more.
                      </p>
                    </div>
                    <Link
                      to="/User/SignUp"
                      className="w-full inline-flex items-center justify-center bg-white border border-[#ff3f6c] text-[#ff3f6c] hover:bg-[#fff0f4] text-[13px] font-bold py-3 px-6 rounded-sm uppercase tracking-wide transition-colors"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>

                {/* Perks strip */}
                <div className="grid grid-cols-3 divide-x divide-[#eaeaec] border-t border-[#eaeaec] text-center bg-[#fafafa]">
                  {[
                    { icon: ShoppingBag, text: "Track Orders" },
                    { icon: Heart, text: "Save Wishlist" },
                    { icon: MapPin, text: "Saved Addresses" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex flex-col items-center gap-1.5 py-4 px-2">
                      <Icon size={16} className="text-[#696e79]" />
                      <p className="text-[11px] text-[#696e79] font-medium">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── HELP CARD ── */}
            <div className="bg-white border border-[#eaeaec] rounded-sm shadow-sm px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <h2 className="text-[14px] font-bold text-[#282c3f]">Need help with something?</h2>
                <p className="text-[13px] text-[#696e79] mt-0.5">
                  For order queries, returns, or account assistance — visit our Help Center.
                </p>
              </div>
              <button
                type="button"
                className="whitespace-nowrap rounded-sm border border-[#eaeaec] bg-white px-5 py-2.5 text-[12px] font-bold text-[#282c3f] hover:border-[#282c3f] transition-colors"
              >
                GO TO HELP CENTER
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

const AccountDetails = ({ authData }) => {
  const displayName = authData.username || "Myntra Shopper";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-[#eaeaec] rounded-sm shadow-sm overflow-hidden">

      {/* Profile header */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-[#eaeaec]">
        <div className="h-13 w-13 shrink-0 rounded-full border-2 border-[#ff3f6c] bg-[#fff0f4] flex items-center justify-center text-[18px] font-bold text-[#ff3f6c] select-none">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wide font-semibold text-[#696e79]">Logged in as</p>
          <p className="text-[16px] font-bold text-[#282c3f] truncate">{displayName}</p>
          {authData.email && (
            <p className="text-[12px] text-[#696e79] mt-0.5 truncate">{authData.email}</p>
          )}
        </div>
        <span className="shrink-0 text-[11px] font-bold text-[#ff3f6c] bg-[#fff0f4] px-2.5 py-1 rounded-sm tracking-wide">
          INSIDER
        </span>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 divide-x divide-[#eaeaec] border-b border-[#eaeaec] text-center">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="py-4 px-2 cursor-pointer hover:bg-[#fff8f9] transition-colors"
          >
            <p className="text-[20px] font-bold text-[#282c3f]">{value}</p>
            <p className="text-[11px] text-[#696e79] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* 2x2 quick-action grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-[#eaeaec] sm:[&>*:nth-child(odd)]:border-r sm:[&>*:nth-child(odd)]:border-[#eaeaec]">
        {QUICK_ACTIONS.map(({ title, description, cta, to }) => (
          <div
            key={title}
            className="group flex flex-col justify-between p-5 hover:bg-[#fff8f9] transition-colors cursor-pointer"
          >
            <div>
              <p className="text-[13px] font-bold text-[#282c3f] mb-1">{title}</p>
              <p className="text-[12px] text-[#696e79] leading-relaxed">{description}</p>
            </div>
            {to ? (
              <Link
                to={to}
                className="mt-3 text-[11px] font-bold text-[#ff3f6c] group-hover:text-[#ff1654] tracking-wide"
              >
                {cta} →
              </Link>
            ) : (
              <button
                type="button"
                className="mt-3 text-left text-[11px] font-bold text-[#ff3f6c] group-hover:text-[#ff1654] tracking-wide"
              >
                {cta} →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;