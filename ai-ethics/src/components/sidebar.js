import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AiFillDashboard, AiOutlineProfile, AiOutlineInfoCircle, AiOutlineLogout } from 'react-icons/ai';
import { FaBook, FaTrophy } from 'react-icons/fa'; // Module and Leaderboard icons
import { GiArtificialIntelligence } from 'react-icons/gi'; // AI logo icon
import '../styles/sidebar.css'; // Import the CSS file

const Sidebar = () => {
  // For Mobile View
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleMenubarClick = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleRouteClick = () => {
    setSidebarVisible(false);
  };

  const navigate = useNavigate();

  // For name on navbar
  const location = useLocation();

  // Define a mapping from pathnames to route names
const routeNames = {
  '/': 'Homepage',
  '/Dashboard': 'Dashboard',
  '/modules': 'Modules',
  '/leaderboard': 'Leaderboard',
  '/profile': 'Profile',
  '/information': 'Information',
  '/logout': 'Logout',
};

const currentRouteName = routeNames[location.pathname] || 'Unknown Route';

  return (
    <>
     <div className="navbar-container">
        <div className="menubar" onClick={handleMenubarClick}>&#9776;</div>
        <div className="route-name">{currentRouteName}</div>
      </div>
      
      <div className={`sidebar-container ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
        <div className="sidebar-item-logo" onClick={() => navigate('/')}>
          <div className="sidebar-item-icon"><GiArtificialIntelligence /></div>
          <div className="sidebar-item-name">AI</div>
        </div>
        
        <NavLink 
          to="/Dashboard" 
          className="sidebar-item" 
          activeClassName="active" 
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon"><AiFillDashboard /></div>
          <div className="sidebar-item-name">Dashboard</div>
        </NavLink>

        <NavLink 
          to="/modules" 
          className="sidebar-item" 
          activeClassName="active" 
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon"><FaBook /></div>
          <div className="sidebar-item-name">Modules</div>
        </NavLink>

        <NavLink 
          to="/leaderboard" 
          className="sidebar-item" 
          activeClassName="active" 
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon"><FaTrophy /></div>
          <div className="sidebar-item-name">Leaderboard</div>
        </NavLink>

        <NavLink 
          to="/profile" 
          className="sidebar-item" 
          activeClassName="active" 
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon"><AiOutlineProfile /></div>
          <div className="sidebar-item-name">Profile</div>
        </NavLink>

        <NavLink 
          to="/help" 
          className="sidebar-item" 
          id="info"
          activeClassName="active" 
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon"><AiOutlineInfoCircle /></div>
          <div className="sidebar-item-name">Help</div>
        </NavLink>

        {/*Add proper logout backend*/}
        <div 
          className="sidebar-item" 
          onClick={() => alert('Logged out')}
        >
          <div className="sidebar-item-icon"><AiOutlineLogout /></div>
          <div className="sidebar-item-name">Logout</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
