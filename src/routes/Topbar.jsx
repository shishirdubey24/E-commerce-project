import PropTypes from 'prop-types';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Topbar({ onToggleSidebar }) {
  return (
    <header className="header">
      <button className="menu-button" onClick={onToggleSidebar} aria-label="Toggle Menu">
        <BsJustify className="icon" />
      </button>
      <div className="topbar-search">
        <button className="icon-button" aria-label="Search">
          <BsSearch className="icon" />
        </button>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications">
          <BsFillBellFill className="icon" />
        </button>
        <button className="icon-button" aria-label="Messages">
          <BsFillEnvelopeFill className="icon" />
        </button>
        <button className="icon-button" aria-label="Profile">
          <BsPersonCircle className="icon" />
        </button>
      </div>
    </header>
  );
}

Topbar.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Topbar;