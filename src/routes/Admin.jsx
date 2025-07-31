import { useState, useCallback } from 'react';
import "../components/Admin/admin.css"
import Topbar from '../components/Admin/Topbar';
import Sidebar from '../components/Admin/Sidebar';

import Dashboard from '../components/Admin/Dashboard/Dashboard';
function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="admin-page">
    <div className="grid-container">

      <Topbar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <Dashboard />
    </div>
     </div>
  );
}

export default Admin;

