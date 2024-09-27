import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";  // Import useNavigate
import "../styles/sidebar.css";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

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

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();  // Initialize the useNavigate hook

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

  // Add handlers for login and sign-up button clicks
  const handleLoginClick = () => {
    navigate("/login");  // Navigate to the login page
  };

  const handleSignupClick = () => {
    navigate("/register");  // Navigate to the sign-up page
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="navbar">
        <NavLink to="#" className="toggle-icons">
          <FaIcons.FaBars className="contactIcon" onClick={toggleSidebar} />
        </NavLink>

        <div className={sidebarOpen ? "search-bar expanded" : "search-bar"}>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>

        <div className="auth-buttons">
          <button className="btn login-btn" onClick={handleLoginClick}>Log in</button>  {/* Redirects to Login */}
          <button className="btn signup-btn" onClick={handleSignupClick}>Sign Up</button>  {/* Redirects to Sign Up */}
        </div>
      </div>

      <nav className={sidebarOpen ? "sidebar-container active" : "sidebar-container"}>
        <ul className="sidebar-items">
          <li className="sidebar-header">
            <NavLink to="/" onClick={handleLinkClick}>
              <h1>✨Ai Ethics</h1>
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
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;
