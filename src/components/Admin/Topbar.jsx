import PropTypes from "prop-types";
import { Bell, Menu, Settings, User, LogOut, ChevronDown, Package, Grid3x3, Users, FileBarChart } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Grid3x3 },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/reports", label: "Reports", icon: FileBarChart },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function Topbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const location = useLocation();

  const currentPage = navItems.find(item => location.pathname.startsWith(item.to))?.label || "Dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 py-2">
        {/* Left Section - Navigation Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNavMenu(!showNavMenu)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-all group"
          >
            <Menu className="w-5 h-5 text-gray-700" />
            <span className="hidden sm:inline text-sm font-semibold text-gray-900">{currentPage}</span>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showNavMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Navigation Dropdown Menu */}
          {showNavMenu && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setShowNavMenu(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                      active 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-gray-500'}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1.5">
          {/* Notifications */}
          <button className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors group">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Settings */}
          <button className="hidden sm:flex p-1.5 hover:bg-gray-100 rounded-lg transition-colors group">
            <Settings className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 hover:bg-gray-100 rounded-lg transition-all group"
            >
              <div className="w-7 h-7 bg-linear-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-gray-900 leading-none">Admin</p>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@shop.com</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Settings</span>
                </button>
                <hr className="my-2 border-gray-100" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left group">
                  <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                  <span className="text-sm text-gray-700 group-hover:text-red-600">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Topbar.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Topbar;
