import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import {
  BsCart3,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

const nav = [
  { to: "/admin", label: "Overview", icon: BsCart3 },
  { to: "/admin/products", label: "Products", icon: BsFillArchiveFill },
  { to: "/admin/categories", label: "Categories", icon: BsFillGrid3X3GapFill },
  { to: "/admin/customers", label: "Customers", icon: BsPeopleFill },
  { to: "/admin/inventory", label: "Inventory", icon: BsListCheck },
  { to: "/admin/reports", label: "Reports", icon: BsMenuButtonWideFill },
  { to: "/admin/settings", label: "Settings", icon: BsFillGearFill },
];

function Sidebar({ isOpen, onToggleSidebar }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-opacity ${
          isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={onToggleSidebar}
        aria-hidden={!isOpen}
      />

      <aside
        id="sidebar"
        className={`fixed z-40 left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transform transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:top-16 lg:bottom-0 lg:w-64`}
        aria-hidden={!isOpen}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
              <BsCart3 className="w-5 h-5" />
              <span>SHOP ADMIN</span>
            </div>
            <button className="lg:hidden p-1" onClick={onToggleSidebar} aria-label="Close sidebar">
              ×
            </button>
          </div>

          <nav className="px-2 py-4 flex-1 overflow-auto">
            <ul className="space-y-1">
              {nav.map((n) => {
                const Icon = n.icon;
                const active = location.pathname === n.to || (n.to !== "/admin" && location.pathname.startsWith(n.to));
                return (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                        active
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? "text-indigo-600" : "text-gray-500 group-hover:text-gray-700"}`} />
                      <span>{n.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-4 py-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">Quick actions</div>
            <div className="flex gap-2">
              <Link to="/admin/products/new" className="flex-1 inline-flex items-center justify-center gap-2 px-2 py-2 bg-indigo-600 text-white rounded-md text-sm">
                + Add Product
              </Link>
              <Link to="/admin/categories/new" className="inline-flex items-center justify-center px-2 py-2 border rounded-md text-sm">
                + Category
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
