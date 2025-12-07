import { useState } from "react";
import { User, Heart, ShoppingBag, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const bagItems = useSelector((store) => store.bag || []);
  const bagCount = bagItems.length;
  const auth =useSelector((state)=>state.auth || [])
  const isAdmin = !!auth.isAdmin;
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const submitSearch = () => {
    const q = searchInput.trim();
    if (q) navigate("/search", { state: { query: q } });
  };

  const navItems = [
    "MEN",
    "WOMEN",
    "KIDS",
    "HOME & LIVING",
    "BEAUTY",
    "STUDIO",
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
     <div className="max-w-[1400px] mx-auto h-20 flex items-center gap-10  pr-1">


        {/* LOGO */}
        <Link
          to="/"
         className="shrink-0 hover:opacity-90 transition-opacity no-underline ml-0 lg:ml-2 xl:ml-4 "
          style={{ textDecoration: "none" }}
        >
          <h1 className="text-3xl font-bold text-black">Trend-Wired</h1>
        </Link>

        {/* NAV (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 ">
          {navItems.map((label) => (
            <span
              key={label}
              className="text-sm font-semibold text-black uppercase tracking-wide hover:text-gray-700 cursor-pointer"
            >
              {label}
            </span>
          ))}
        </nav>

        {/* SEARCH */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center bg-[#f5f5f6] border border-gray-300 rounded-md overflow-hidden">
            <button
              aria-label="Search"
              onClick={submitSearch}
              className="px-4 h-10 text-gray-700 hover:text-black"
            >
              <Search size={18} />
            </button>

            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitSearch()}
              placeholder="Search...!"
              className="w-full h-10 px-3 text-sm bg-[#f5f5f6] focus:outline-none text-black placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* ACTION ICONS */}
        <div className="flex items-center gap-6">
  <Link
    to="/Account"
    className="flex flex-col items-center text-black hover:text-gray-700 no-underline"
    style={{ textDecoration: "none" }}
  >
    <User size={20} />
    <span className="text-xs hidden sm:block">Profile</span>
  </Link>

  {/* Admin panel icon – only visible when user is admin */}
  {isAdmin && (
    <Link
      to="/admin"
      className="flex flex-col items-center text-black hover:text-gray-700 no-underline"
      style={{ textDecoration: "none" }}
    >
      <Heart size={20} />
      <span className="text-xs hidden sm:block">Admin</span>
    </Link>
  )}

  <Link
    to="/bag"
    className="relative flex flex-col items-center text-black hover:text-gray-700 no-underline"
    style={{ textDecoration: "none" }}
  >
    <ShoppingBag size={20} />
    <span className="text-xs hidden sm:block">Bag</span>

    {bagCount > 0 && (
      <span className="absolute -top-1 -right-2 h-5 px-1 min-w-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
        {bagCount}
      </span>
    )}
  </Link>
</div>

      </div>

      {/* MOBILE NAV */}
      <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-2">
        <nav className="flex gap-4 overflow-x-auto">
          {navItems.map((label) => (
            <span
              key={label}
              className="text-xs font-semibold uppercase text-black whitespace-nowrap hover:text-gray-700"
            >
              {label}
            </span>
          ))}
        </nav>
      </div>

      {/* MOBILE SEARCH */}
      <div className="lg:hidden px-4 py-3 border-t border-gray-100">
        <div className="flex items-center bg-[#f5f5f6] border border-gray-300 rounded overflow-hidden">
          <button
            className="px-3 h-10 text-gray-700 hover:text-black"
            onClick={submitSearch}
          >
            <Search size={18} />
          </button>

          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            placeholder="Search...!"
            className="flex-1 h-10 px-2 text-sm bg-[#f5f5f6] focus:outline-none text-black"
          />
        </div>
      </div>
    </header>
  );
}
