import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { auth } from "../firebase"; // Import Firebase auth

// Sidebar items data
const SidebarData = [
  {
    title: "Explore",
    path: "/explore",
    icon: <FaIcons.FaSearch />,
  },
  {
    title: "Lessons",
    path: "/lessons",
    icon: <IoIcons.IoMdBook />,
  },
  {
    title: "Linked Content",
    path: "/linked-content",
    icon: <FaIcons.FaLink />,
  },
  {
    title: "AI Term Glossary",
    path: "/ai-term-glossary",
    icon: <FaIcons.FaBook />,
  },
  {
    title: "Quizzes",
    path: "/quizzes",
    icon: <IoIcons.IoMdSchool />,
  },
  {
    title: "Leaderboard",
    path: "/leaderboard",
    icon: <FaIcons.FaTrophy />,
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen, isLoggedIn, setIsLoggedIn, username }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  const handleLinkClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false); // Update login state
      alert("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      {/* Navbar */}
      <div className="navbar">
        {/* Menubar icon */}
        <NavLink to="#" className="toggle-icons">
          <FaIcons.FaBars className="contactIcon" onClick={toggleSidebar} />
        </NavLink>

        {/* Search bar */}
        <div className={sidebarOpen ? "search-bar expanded" : "search-bar"}>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>

        {/* Auth buttons or Welcome message */}
        {isLoggedIn ? (
          <div className="welcome-message">
            <span>Welcome!</span>
          </div>
        ) : (
          <div className="auth-buttons">
            <NavLink to="/login">
              <button className="btn login-btn">Log in</button>
            </NavLink>
            <NavLink to="/register">
              <button className="btn signup-btn">Sign Up</button>
            </NavLink>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <nav className={sidebarOpen ? "sidebar-container active" : "sidebar-container"}>
        <ul className="sidebar-items">
          <li className="sidebar-header">
            <NavLink to="/" onClick={handleLinkClick}>
              <h1>✨ AI Ethics</h1>
            </NavLink>
            <NavLink to="#" className="toggle-icons" onClick={toggleSidebar}>
              <AiIcons.AiOutlineClose className="contactIcon" />
            </NavLink>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className="sidebar-text">
              <NavLink to={item.path} onClick={handleLinkClick}>
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}

          {/* Logout button at the bottom */}
          {isLoggedIn && (
            <li className="sidebar-text">
              <button className="sidebar-link logout-btn" onClick={handleLogout}>
                <FaIcons.FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;
