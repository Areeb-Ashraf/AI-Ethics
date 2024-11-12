import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillDashboard,
  AiOutlineProfile,
  AiOutlineInfoCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaBook, FaTrophy } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../firebase"; // Import auth for logout functionality
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import "../styles/sidebar.css";

const Sidebar = ({ setIsLoggedIn }) => {
  // For Mobile View
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenubarClick = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleRouteClick = () => {
    setSidebarVisible(false);
  };

  const Alert = withReactContent(Swal);

  const handleLogout = async () => {
    try {
      Alert.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0056D1",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!"
      }).then((result) => {
        if (result.isConfirmed) {
          auth.signOut(); // Sign out the user
          setIsLoggedIn(false); // Update the logged-in state
          navigate("/login"); // Redirect to login after logout
          Alert.fire({
            title: "Logged Out!",
            text: "You have been logged out",
            icon: "success"
          });
        }
      });
      // await auth.signOut(); // Sign out the user
      // setIsLoggedIn(false); // Update the logged-in state
      // navigate("/login"); // Redirect to login after logout
    } catch (err) {
      console.error("Logout error:", err.message);
      Alert.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: err.message
      });
    }
  };

  // Define a mapping from pathnames to route names
  const routeNames = {
    "/": "Homepage",
    "/dashboard": "Dashboard",
    "/modules": "Modules",
    "/leaderboard": "Leaderboard",
    "/profile": "Profile",
    "/help": "Help",
    "/information": "Information",
    "/ai-term-glossary": "AI Glossary",
  };

  const currentRouteName = routeNames[location.pathname] || "Unknown Route";

  return (
    <>
      <div className="navbar-container">
        <div className="menubar" onClick={handleMenubarClick}>
          &#9776;
        </div>
        <div className="route-name">{currentRouteName}</div>
      </div>

      <div
        className={`sidebar-container ${
          isSidebarVisible ? "sidebar-visible" : ""
        }`}
      >
        {/* <div className="sidebar-item-logo" onClick={() => navigate('/')}>
          <div className="sidebar-item-icon"><GiArtificialIntelligence /></div>
          <div className="sidebar-item-name">AI</div>
        </div> */}

        <NavLink
          to="/dashboard"
          className="sidebar-item"
          activeClassName="active"
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon">
            <AiFillDashboard />
          </div>
          <div className="sidebar-item-name">Dashboard</div>
        </NavLink>

        <NavLink
          to="/modules"
          className="sidebar-item"
          activeClassName="active"
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon">
            <FaBook />
          </div>
          <div className="sidebar-item-name">Modules</div>
        </NavLink>

        <NavLink
          to="/leaderboard"
          className="sidebar-item"
          activeClassName="active"
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon">
            <FaTrophy />
          </div>
          <div className="sidebar-item-name">Leaderboard</div>
        </NavLink>

        <NavLink
          to="/profile"
          className="sidebar-item"
          activeClassName="active"
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon">
            <FaUserCircle />
          </div>
          <div className="sidebar-item-name">Profile</div>
        </NavLink>

        <NavLink
          to="/ai-term-glossary"
          className="sidebar-item"
          activeClassName="active"
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon">
            <AiOutlineProfile />
          </div>
          <div className="sidebar-item-name">AI Glossary</div>
        </NavLink>

        <NavLink
          to="/help"
          className="sidebar-item"
          id="info"
          activeClassName="active"
          onClick={handleRouteClick}
        >
          <div className="sidebar-item-icon">
            <AiOutlineInfoCircle />
          </div>
          <div className="sidebar-item-name">Help</div>
        </NavLink>

        {/* Logout button */}
        <div className="sidebar-item" onClick={handleLogout}>
          <div className="sidebar-item-icon">
            <AiOutlineLogout />
          </div>
          <div className="sidebar-item-name">Logout</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
