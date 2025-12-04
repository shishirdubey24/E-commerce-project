import PropTypes from "prop-types";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function Topbar({ onToggleSidebar }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            <BsJustify className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center bg-gray-100 rounded-md px-3 py-1 gap-2">
            <BsSearch className="w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search admin..."
              className="bg-transparent outline-none text-sm placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
            aria-label="Notifications"
          >
            <BsFillBellFill className="w-5 h-5" />
          </button>

          <button
            className="p-2 rounded-md hover:bg-gray-100 text-gray-700"
            aria-label="Messages"
          >
            <BsFillEnvelopeFill className="w-5 h-5" />
          </button>

          <button
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
            aria-label="Profile"
          >
            <BsPersonCircle className="w-6 h-6 text-gray-700" />
            <div className="hidden md:block text-sm">
              <div className="font-medium">Admin</div>
              <div className="text-xs text-gray-500">admin@store.com</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

Topbar.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Topbar;
