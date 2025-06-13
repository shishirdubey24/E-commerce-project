import PropTypes from 'prop-types';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function Sidebar({ isOpen, onToggleSidebar }) {
  return (
    <aside id="sidebar" className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-hidden={!isOpen}>
      <div className="sidebar-title">
        <div className="brand">
          <BsCart3 className="icon-header" /> SHOP
        </div>
        <button className="close-button" onClick={onToggleSidebar} aria-label="Close Menu">
          ×
        </button>
      </div>
      <nav className="sidebar-nav">
        <a href="/admin/dashboard" className="nav-item">
          <BsGrid1X2Fill className="icon" /> Dashboard
        </a>
        <a href="/admin/products" className="nav-item">
          <BsFillArchiveFill className="icon" /> Products
        </a>
        <a href="/admin/categories" className="nav-item">
          <BsFillGrid3X3GapFill className="icon" /> Categories
        </a>
        <a href="/admin/customers" className="nav-item">
          <BsPeopleFill className="icon" /> Customers
        </a>
        <a href="/admin/inventory" className="nav-item">
          <BsListCheck className="icon" /> Inventory
        </a>
        <a href="/admin/reports" className="nav-item">
          <BsMenuButtonWideFill className="icon" /> Reports
        </a>
        <a href="/admin/settings" className="nav-item">
          <BsFillGearFill className="icon" /> Settings
        </a>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;