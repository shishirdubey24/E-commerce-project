import { useState, useRef, useEffect } from "react";
import { User, Heart, ShoppingBag, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const itemsInBag = useSelector((store) => store.bag || []);
  const bagCount = Array.isArray(itemsInBag) ? itemsInBag.length : 0;

  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => setSearchInput(e.target.value);

  const submitSearch = () => {
    const q = (searchInput || "").trim();
    if (q.length) {
      navigate("/search", { state: { query: q } });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") submitSearch();
  };

  useEffect(() => {
    const handler = (ev) => {
      if (!headerRef.current?.contains(ev.target)) {
        // placeholder for future behavior (menu close, etc.)
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const navItems = [
    { id: "men", label: "MEN" },
    { id: "women", label: "WOMEN" },
    { id: "kids", label: "KIDS" },
    { id: "home", label: "HOME & LIVING" },
    { id: "beauty", label: "BEAUTY" },
    { id: "studio", label: "STUDIO", isNew: true },
  ];

  return (
    <header
      ref={headerRef}
      className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-[#e5e5e5]"
      aria-label="Top navigation"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex items-center h-20 pl-10 pr-10 gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="inline-flex items-center no-underline hover:opacity-90 transition-opacity"
              aria-label="Homepage"
            >
              <h1 className="text-2xl lg:text-3xl font-bold text-black whitespace-nowrap">
                Trend-Wired
              </h1>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center flex-shrink-0">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative px-4 py-2 text-sm font-semibold text-black uppercase tracking-wide transition-colors duration-200 whitespace-nowrap"
                style={{ textDecoration: "none", letterSpacing: "0.3px" }}
              >
                {item.label}
                {item.isNew && (
                  <sup className="ml-1 text-[10px] font-normal text-[#ff3f6c]">
                    NEW
                  </sup>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#f54e77] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Search (expands) */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center bg-[#f5f5f6] rounded-md overflow-hidden border border-[#e9e9e9]">
              <button
                aria-label="Search"
                onClick={submitSearch}
                className="flex-shrink-0 px-4 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors bg-[whitesmoke]"
                title="Search"
              >
                <Search size={18} />
              </button>

              <input
                ref={inputRef}
                value={searchInput}
                onChange={handleSearch}
                onKeyDown={onKeyDown}
                placeholder="Search for products, brands and more"
                className="w-full flex-1 h-10 px-3 text-sm bg-[#f5f5f6] focus:outline-none text-gray-800 placeholder:text-gray-500 min-w-0"
                aria-label="Search products"
              />
            </div>
          </div>

          {/* Actions (profile, wishlist, bag) */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link
              to="/User"
              className="flex flex-col items-center gap-0.5 text-black transition-colors"
              aria-label="Profile"
            >
              <User size={20} className="group-hover:scale-105 transition-transform" />
              <span className="text-xs font-medium hidden sm:block">Profile</span>
            </Link>

            <Link
              to="/admin"
              className="flex flex-col items-center gap-0.5 text-black transition-colors"
              aria-label="Admin"
            >
              <Heart size={20} className="group-hover:scale-105 transition-transform" />
              <span className="text-xs font-medium hidden sm:block">Wishlist</span>
            </Link>

            <Link
              to="/bag"
              className="relative flex flex-col items-center gap-0.5 text-black hover:text-gray-900 transition-colors"
              aria-label="Bag"
            >
              <ShoppingBag size={20} className="group-hover:scale-105 transition-transform" />
              <span className="text-xs font-medium hidden sm:block">Bag</span>

              {bagCount > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center h-5 min-w-[20px] px-1 rounded-full bg-[#f16565] text-white text-xs font-semibold">
                  {bagCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-2">
          <nav className="flex gap-2 justify-start overflow-x-auto">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex-shrink-0 text-xs font-semibold uppercase px-3 py-2 whitespace-nowrap text-gray-700 hover:text-gray-900 transition-colors"
                style={{ textDecoration: "none", letterSpacing: "0.3px" }}
              >
                {item.label}
                {item.isNew && (
                  <sup className="ml-1 text-[9px] font-normal text-[#ff3f6c]">
                    NEW
                  </sup>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3 border-t border-gray-100">
          <div className="flex items-center w-full bg-[#f5f5f6] rounded overflow-hidden border border-[#e9e9e9] mt-2">
            <button
              aria-label="Search"
              onClick={submitSearch}
              className="flex-shrink-0 px-3 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800"
            >
              <Search size={18} />
            </button>

            <input
              value={searchInput}
              onChange={handleSearch}
              onKeyDown={onKeyDown}
              placeholder="Search for products, brands and more"
              className="flex-1 h-10 px-2 text-sm bg-[#f5f5f6] focus:outline-none text-gray-800 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
