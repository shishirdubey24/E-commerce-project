import { useState, useCallback } from "react";
import Topbar from "../components/Admin/Topbar";
import Sidebar from "../components/Admin/Sidebar";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import Products from "../components/Admin/Hook/Products";
export default function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => setIsSidebarOpen((s) => !s), []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Products/>
      <Topbar onToggleSidebar={toggleSidebar} />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="flex-1 lg:pl-72 p-6 lg:p-10">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
