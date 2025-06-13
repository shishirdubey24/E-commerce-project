import { useState, useCallback } from 'react';
import './admin.css';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

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

